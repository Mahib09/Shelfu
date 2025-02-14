const supertest = require("supertest");
const createServer = require("../utils/server");
const prisma = require("../services/prismaService");

const app = createServer();
jest.mock("axios");
const axios = require("axios");
jest.mock("../services/prismaService", () => ({
  userCollection: {
    findUnique: jest.fn(() => Promise.resolve([])),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
  volumes: {
    findUnique: jest.fn(() => Promise.resolve([])),
  },
}));
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Manga APi", () => {
  describe("GET /search", () => {
    const mockdata = [
      {
        booksApiId: "/works/OL30906839W",
        title: "Naruto Vol. 2",
        author: "Hinaka Natsu", // author_name is an array, so it is joined into a string
        coverImageUrl: null, // Assuming cover_i exists
        description: "No description available", // If first_sentence isn't available
        publisher: "Unknown", // publisher is an array, so you join it
        volumeNumber: 2, // Extracted from the title, "Vol. 2"
      },
    ];
    it("should return 200 and a list of manga results", async () => {
      axios.get.mockResolvedValue({
        data: {
          docs: [
            {
              author_key: ["OL11272563A"],
              author_name: ["Hinaka Natsu"],
              edition_count: 1,
              first_publish_year: 2020,
              has_fulltext: false,
              key: "/works/OL30906839W",
              language: ["eng"],
              public_scan_b: false,
              title: "Naruto Vol. 2",
            },
          ],
        },
      });
      const response = await supertest(app).get("/manga/search?q=Naruto");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockdata);
    });
    it("should return 200 and an empty array when no results are found", async () => {
      axios.get.mockResolvedValue({
        data: {
          docs: [],
        },
      });

      const response = await supertest(app).get("/manga/search?q=UnknownManga");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    it("should filter out unwanted books based on keyword", async () => {
      axios.get.mockResolvedValue({
        data: {
          docs: [
            {
              author_key: ["OL11272563A"],
              author_name: ["Hinaka Natsu"],
              edition_count: 1,
              first_publish_year: 2020,
              has_fulltext: false,
              key: "/works/OL30906839W",
              language: ["eng"],
              public_scan_b: false,
              title: "Naruto Vol. 2",
            },
            {
              author_key: ["OL11272563B"],
              author_name: ["Eiichiro Oda"],
              edition_count: 1,
              first_publish_year: 2020,
              has_fulltext: false,
              key: "/works/OL30906840W",
              language: ["eng"],
              public_scan_b: false,
              title: "Naruto Vol. 2 coloring book",
            },
          ],
        },
      });
      const response = await supertest(app).get("/manga/search?q=Naruto");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockdata);
    });
    it("should filter out non english books", async () => {
      axios.get.mockResolvedValue({
        data: {
          docs: [
            {
              author_key: ["OL11272563B"],
              author_name: ["Eiichiro Oda"],
              edition_count: 1,
              first_publish_year: 2020,
              has_fulltext: false,
              key: "/works/OL30906840W",
              language: ["jp"],
              public_scan_b: false,
              title: "One Piece Vol. 2 Japanese Edition",
            },
            {
              author_key: ["OL11272563A"],
              author_name: ["Hinaka Natsu"],
              edition_count: 1,
              first_publish_year: 2020,
              has_fulltext: false,
              key: "/works/OL30906839W",
              language: ["eng"],
              public_scan_b: false,
              title: "Naruto Vol. 2",
            },
          ],
        },
      });
      const response = await supertest(app).get("/manga/search?q=Naruto");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockdata);
    });
    it("should return an empty array when the external API request fails", async () => {
      axios.get.mockRejectedValue(new Error("API Fetch Error"));

      const response = await supertest(app).get("/manga/search?q=Naruto");

      expect(response.body).toEqual([]);
    });
    it("should correctly extract and sort volumes numerically", async () => {
      const mockdata = [
        {
          key: "/works/OL30906841W",
          title: "Attack on Titan Vol. 10",
          author_name: ["Hajime Isayama"],
          cover_i: 123458,
          first_sentence: null,
          publisher: ["Kodansha"],
          language: ["eng"],
        },
        {
          key: "/works/OL30906839W",
          title: "Attack on Titan Vol. 2",
          author_name: ["Hajime Isayama"],
          cover_i: 123456,
          first_sentence: null,
          publisher: ["Kodansha"],
          language: ["eng"],
        },
        {
          key: "/works/OL30906840W",
          title: "Attack on Titan Vol. 5",
          author_name: ["Hajime Isayama"],
          cover_i: 123457,
          first_sentence: null,
          publisher: ["Kodansha"],
          language: ["eng"],
        },
      ];

      axios.get.mockResolvedValue({
        data: { docs: mockdata },
      });

      const response = await supertest(app).get(
        "/manga/search?q=Attack+on+Titan"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          booksApiId: "/works/OL30906839W",
          title: "Attack on Titan Vol. 2",
          author: "Hajime Isayama",
          coverImageUrl: "https://covers.openlibrary.org/b/id/123456-M.jpg",
          description: "No description available",
          publisher: "Kodansha",
          volumeNumber: 2,
        },
        {
          booksApiId: "/works/OL30906840W",
          title: "Attack on Titan Vol. 5",
          author: "Hajime Isayama",
          coverImageUrl: "https://covers.openlibrary.org/b/id/123457-M.jpg",
          description: "No description available",
          publisher: "Kodansha",
          volumeNumber: 5,
        },
        {
          booksApiId: "/works/OL30906841W",
          title: "Attack on Titan Vol. 10",
          author: "Hajime Isayama",
          coverImageUrl: "https://covers.openlibrary.org/b/id/123458-M.jpg",
          description: "No description available",
          publisher: "Kodansha",
          volumeNumber: 10,
        },
      ]);
    });
    it("should return 400 and Search query is required if query not provided", async () => {
      const response = await supertest(app).get("/manga/search");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Search query is required" });
    });
  });
  describe("GET /:bookId", () => {
    it("should return 200 and volume details if found on database", async () => {
      prisma.volumes.findUnique.mockResolvedValue([
        {
          volumeId: 1,
          volumeNumber: 1,
          seriesName: "Naruto",
          author: "Kisimoto",
          booksApiId: "OL30906839W",
          description: "",
          publisher: "Suesha",
          isbn: "",
          releaseDate: "",
          coverImageUrl: "url",
        },
      ]);

      const response = await supertest(app).get("/manga/OL30906839W");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          author: "Kisimoto",
          booksApiId: "OL30906839W",
          coverImageUrl: "url",
          description: "",
          isbn: "",
          publisher: "Suesha",
          releaseDate: "",
          seriesName: "Naruto",
          volumeId: 1,
          volumeNumber: 1,
        },
      ]);
    });
    it("should return 200 and manga fetched from api if not found on database", async () => {
      prisma.volumes.findUnique.mockResolvedValue(null);
      axios.get.mockResolvedValueOnce({
        data: {
          title: "Naruto, Vol. 1",
          covers: [2806275],
          key: "/works/OL8756055W",
          authors: [{ type: [Object], author: { key: "/authors/OL2980579A" } }],
          type: { key: "/type/work" },
          subjects: [
            "Comics & graphic novels, east asian style, manga, fantasy",
          ],
          latest_revision: 4,
          revision: 4,
          created: {
            type: "/type/datetime",
            value: "2009-12-10T23:15:55.445991",
          },
          last_modified: {
            type: "/type/datetime",
            value: "2024-02-17T09:25:02.246759",
          },
        },
      });
      axios.get.mockResolvedValueOnce({
        data: {
          key: "/authors/OL2980579A",
          name: "Masashi Kishimoto",
        },
      });
      const response = await supertest(app).get("/manga/OL8756055W");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        title: "Naruto, Vol. 1",
        author: "Masashi Kishimoto",
        coverImageUrl: "https://covers.openlibrary.org/b/id/2806275-M.jpg",
        booksApiId: "/works/OL8756055W",
        description: "No description available",
        publisher: "Unknown",
        volumeNumber: 1,
      });
    });
    it("should return 400 and Manga not found if cannot find the manga anywhere", async () => {
      prisma.volumes.findUnique.mockResolvedValue(null);
      axios.get.mockRejectedValue({ response: { status: 404 } });

      const response = await supertest(app).get("/manga/OL8756055W");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Manga not Found" });
    });
    it("should return 500 if the external API request fails", async () => {
      prisma.volumes.findUnique.mockResolvedValue(null);
      axios.get.mockRejectedValue(new Error("Network Error"));

      const response = await supertest(app).get("/manga/OL8756055W");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
    it("should return 500 if the database query fails", async () => {
      prisma.volumes.findUnique.mockRejectedValue(new Error("Database Error"));

      const response = await supertest(app).get("/manga/OL1234567W");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });
});
