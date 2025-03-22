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
jest.mock("redisMock",()=>{
  get: jest.fn(),
      set: jest.fn(),
})
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Manga Api", () => {
  describe("GET /search", () => {
    it("should return 400 with search query is required when No query is provided in the request", async () => {
      const response = await supertest(app).get("/manga/search?q=");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Search query is required");
    });
    it("should return 200 with cached results from redis if search query exist in redis cache", async () => {
      const redisMock = app.locals.redis;
      const cachedData = [
        {
          seriesTitle: "One Piece",
          title: "One Piece Vol. 1",
          volumeNumber: 1,
          author: ["Eiichiro Oda"],
          booksApiId: "1234567890",
          description: "Adventure of Luffy",
          publisher: "Shueisha",
          isbn: "1234567890",
          releaseDate: "1997-07-22",
          image: "https://example.com/onepiece.jpg",
        },
      ];

      // Mock Redis get method
      redisMock.get = jest.fn().mockResolvedValue(JSON.stringify(cachedData));

      const response = await supertest(app).get("/manga/search?q=onepiece");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(cachedData);
      expect(redisMock.get).toHaveBeenCalledWith("searchResults:onepiece");
    });
  });
  describe("GET /:bookId", () => {});
});
