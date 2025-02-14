const supertest = require("supertest");
const createServer = require("../utils/server");
const prisma = require("../services/prismaService");

const app = createServer();
jest.mock("../services/firebaseService", () => ({
  auth: {
    verifyIdToken: jest.fn(() =>
      Promise.resolve({
        uid: "testuser123",
        email: "test@example.com",
      })
    ),
  },
}));
jest.mock("../services/prismaService", () => ({
  userCollection: {
    findMany: jest.fn(() => Promise.resolve([])),
    findUnique: jest.fn(() => Promise.resolve([])),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
  volumes: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Collection API", () => {
  describe("GET /usercollection/:userId", () => {
    it("should return 404 and 'No collection data found' message if collection does not exist", async () => {
      const userId = "testuser123";

      const response = await supertest(app)
        .get(`/usercollection/${userId}`)
        .set("Authorization", "Bearer mock-valid-token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "No collection data found." });
    });

    it("should return 200 and array of collection if collection exists", async () => {
      const mockdata = [
        {
          userCollectionId: 1,
          userId: "1",
          volumeId: 101,
          status: "Owned",
          notes: "Great series!",
          volume: {
            volumeId: 101,
            seriesName: "Manga Series A",
            volumeNumber: 1,
            coverImageUrl: "http://example.com/cover.jpg",
            releaseDate: "2023-05-01",
          },
        },
        {
          userCollectionId: 2,
          userId: "1",
          volumeId: 102,
          status: "Want_To_Buy",
          notes: "Looking forward to this one!",
          volume: {
            volumeId: 102,
            seriesName: "Manga Series B",
            volumeNumber: 2,
            coverImageUrl: "http://example.com/cover2.jpg",
            releaseDate: "2024-01-01",
          },
        },
      ];
      prisma.userCollection.findMany.mockResolvedValue(mockdata);

      const userId = "testuser123";

      const response = await supertest(app)
        .get(`/usercollection/${userId}`)
        .set("Authorization", "Bearer mock-valid-token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockdata);
    });
  });
  describe("POST /usercollection/", () => {
    const data = {
      userId: "testuser123",
      volumeId: 1,
      status: "Owned",
      notes: "Great series!",
      volumeInfo: {
        volumeId: 1,
        volumeNumber: 1,
        seriesName: "Naruto",
        author: "Masashi Kishimoto",
        booksApiId: "OL12345",
        description: "A description of Naruto Vol. 1",
        publisher: "Shueisha",
        isbn: "123456789",
        releaseDate: "2000-02-01",
        coverImage: "https://example.com/cover.jpg",
      },
    };
    it("should return 201 and the createdRecord and volume if volume does exist and api creates collection", async () => {
      const mockdata = {
        userId: "testuser123",
        volumeId: 1,
        status: "Owned",
        notes: "Great series!",
      };
      prisma.userCollection.create.mockResolvedValue({
        userId: "testuser123",
        volumeId: 1,
        status: "Owned",
        notes: "Great series!",
      });
      prisma.volumes.findUnique.mockResolvedValue({
        volumeId: 1,
        volumeNumber: 1,
        title: "Naruto Vol. 1",
        author: "Masashi Kishimoto",
        description: "Description of Naruto Vol. 1", // Volume exists in the table
      });
      const response = await supertest(app)
        .post("/usercollection")
        .send(mockdata)
        .set("Authorization", "Bearer mock-valid-token")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockdata);
    });
    it("should return 201 and the createdRecord and volume if volume doesnot exist and api adds volume and creates collection", async () => {
      prisma.userCollection.create.mockResolvedValue({
        userId: "testuser123",
        volumeId: 1,
        status: "Owned",
        notes: "",
      });
      prisma.volumes.findUnique.mockResolvedValue(null);
      prisma.volumes.create.mockResolvedValue({
        volumeId: "vol1",
        volumeNumber: 1,
        seriesName: "Naruto",
        author: "Masashi Kishimoto",
        booksApiId: "OL12345",
        description: "A description of Naruto Vol. 1",
        publisher: "Shueisha",
        isbn: "123456789",
        releaseDate: "2000-02-01",
        coverImage: "https://example.com/cover.jpg",
      });
      const response = await supertest(app)
        .post(`/usercollection`)
        .send(data)
        .set("Authorization", "Bearer mock-valid-token")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        userId: "testuser123",
        volumeId: 1,
        status: "Owned",
        notes: "",
      });
    });
    it("should return 400 and volumeInfoRequires if volume doesnot exist and volume info not provided", async () => {
      const mockdata = {
        userId: "testuser123",
        volumeId: 1,
        status: "Owned",
        notes: "Great series!",
        volumeInfo: null,
      };
      prisma.volumes.findUnique.mockResolvedValue(null);

      const response = await supertest(app)
        .post("/usercollection")
        .send(mockdata)
        .set("Authorization", "Bearer mock-valid-token")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Volume does not exist and volumeInfo is required"
      );
    });
    describe("handle missing required value", () => {
      it("should return 400 and Missing required fields if no userId provided", async () => {
        const data = {
          userId: "",
          volumeId: 1,
          status: "Owned",
          notes: "",
        };
        const response = await supertest(app)
          .post(`/usercollection`)
          .send(data)
          .set("Authorization", "Bearer mock-valid-token")
          .set("Content-Type", "application/json");
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Missing required fields" });
      });
      it("should return 400 and Missing required fields if no VolumeId provided", async () => {
        const data = {
          userId: "testuser123",
          volumeId: "",
          status: "Owned",
          notes: "",
        };
        const response = await supertest(app)
          .post(`/usercollection`)
          .send(data)
          .set("Authorization", "Bearer mock-valid-token")
          .set("Content-Type", "application/json");
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Missing required fields" });
      });
      it("should return 400 and Missing required fields if no status provided", async () => {
        const data = {
          userId: "testuser123",
          volumeId: 1,
          status: "",
          notes: "",
        };
        const response = await supertest(app)
          .post(`/usercollection`)
          .send(data)
          .set("Authorization", "Bearer mock-valid-token")
          .set("Content-Type", "application/json");
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Missing required fields" });
      });
    });
  });
  describe("GET /usercollection/byseries", () => {
    it("should return 200 and an array of volumes for the series", async () => {
      const mockVolumes = [
        {
          userId: "1",
          volumeId: 1,
          seriesName: "One Piece",
          status: "Owned",
          notes: "",
        },
        {
          userId: "1",
          volumeId: 2,
          seriesName: "One Piece",
          status: "Wishlist",
          notes: "Want to buy soon",
        },
      ];
      prisma.userCollection.findMany.mockResolvedValue(mockVolumes);
      const seriesName = "One Piece";
      const userId = "1";
      const response = await supertest(app)
        .post(`/usercollection/byseries`)
        .send({ userId: userId, seriesName: seriesName })
        .set("Authorization", "Bearer mock-valid-token")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockVolumes);
    });
    it("should return 404 and No collection data found. if the series doesn't exist in the userCollection", async () => {
      prisma.userCollection.findMany.mockResolvedValue([]);
      const seriesName = "One Piece";
      const userId = "1";
      const response = await supertest(app)
        .post(`/usercollection/byseries`)
        .set("Authorization", "Bearer mock-valid-token")
        .send({ userId: userId, seriesName: seriesName })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "No collection data found." });
    });
    describe("should return 400 and Missing required parameters if the any parameter are missing", () => {
      it("should return 400 and Missing required parameters if userId is missing", async () => {
        const response = await supertest(app)
          .post(`/usercollection/byseries`)
          .send({ seriesName: "Naruto" }) // Missing userId here
          .set("Authorization", "Bearer mock-valid-token")
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: "Missing required parameters",
        });
      });

      it("should return 400 and Missing required parameters if seriesName is missing", async () => {
        const response = await supertest(app)
          .post("/usercollection/byseries")
          .send({ userId: "1" }) // Missing seriesName here
          .set("Authorization", "Bearer mock-valid-token")
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: "Missing required parameters",
        });
      });
    });
  });
  describe("GET /usercollection/bystatus", () => {
    it("should return 200 and an array of volumes for the series", async () => {
      const mockVolumes = [
        {
          userId: "testuser123",
          volumeId: 1,
          seriesName: "One Piece",
          status: "Owned",
          notes: "",
        },
        {
          userId: "testuser123",
          volumeId: 2,
          seriesName: "One Piece",
          status: "Owned",
          notes: "Want to buy soon",
        },
      ];
      prisma.userCollection.findMany.mockResolvedValue(mockVolumes);
      const status = "Owned";
      const userId = "testuser123";
      const response = await supertest(app)
        .post(`/usercollection/bystatus`)
        .set("Authorization", "Bearer mock-valid-token")
        .send({ userId: userId, status: status })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockVolumes);
    });
    it("should return 404 and No collection data found. if the series doesn't exist in the userCollection", async () => {
      prisma.userCollection.findMany.mockResolvedValue([]);
      const status = "Want_To_Buy";
      const userId = "testuser123";
      const response = await supertest(app)
        .post(`/usercollection/bystatus`)
        .set("Authorization", "Bearer mock-valid-token")
        .send({ userId: userId, status: status })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "No collection data found." });
    });
    describe("should return 400 and Missing required parameters if the any parameter are missing", () => {
      it("userId missing", async () => {
        const response = await supertest(app)
          .post(`/usercollection/bystatus`)
          .set("Authorization", "Bearer mock-valid-token")
          .send({ status: "Owned" })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: "Missing required parameters",
        });
      });
      it("status missing", async () => {
        const response = await supertest(app)
          .post(`/usercollection/bystatus`)
          .set("Authorization", "Bearer mock-valid-token")
          .send({ userId: 1 })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: "Missing required parameters",
        });
      });
    });
  });
  describe("PATCH /usercollection/:userCollectionId", () => {
    const endpoint = "/usercollection/1";
    it("should return 200 and updated Details if the api updates the category or notes correctly", async () => {
      const mockUpdatedData = {
        userCollectionId: 1,
        status: "Owned",
        notes: "Updated notes",
      };

      prisma.userCollection.update.mockResolvedValue(mockUpdatedData);

      const response = await supertest(app)
        .patch(endpoint)
        .send({ status: "Owned", notes: "Updated notes" })
        .set("Authorization", "Bearer mock-valid-token")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedData);
    });
    it("should return 404 and Volume not Found if the specified userCollectionId doesnot exist", async () => {
      prisma.userCollection.update.mockRejectedValue({ code: "P2025" });
      const response = await supertest(app)
        .patch(endpoint)
        .send({ status: "Owned" })
        .set("Authorization", "Bearer mock-valid-token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Volume does not exist" });
    });
    it("should return 400 and No Changes Provided if the status and notes doesnot exist", async () => {
      const response = await supertest(app)
        .patch(endpoint)
        .send({})
        .set("Authorization", "Bearer mock-valid-token");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "No Changes Provided" });
    });
    it("should return 400 and Invalid Status if the status is not valid", async () => {
      const response = await supertest(app)
        .patch(endpoint)
        .send({ status: "Trying_To_Get" })
        .set("Authorization", "Bearer mock-valid-token");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid Status" });
    });
  });
  describe("DELETE /usercollection/:userCollectionId", () => {
    const endpoint = "/usercollection/1";
    it("should return 200 and the deletdata if deleted sucessfully", async () => {
      const deletedata = {
        userCollectionId: 1,
        status: "Owned",
        notes: "Deleted",
      };
      prisma.userCollection.delete.mockResolvedValue(deletedata);
      const response = await supertest(app)
        .delete(endpoint)
        .set("Authorization", "Bearer mock-valid-token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedata);
    });
    it("should return 400 and Invalid usercollectionId if no usercollectionId provided", async () => {
      const response = await supertest(app)
        .delete("/usercollection/hello")
        .set("Authorization", "Bearer mock-valid-token");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid userCollectionId" });
    });
    it("should return 404 and Volume doesnot exist if no volumes found", async () => {
      prisma.userCollection.delete.mockRejectedValue({ code: "P2025" });

      const response = await supertest(app)
        .delete("/usercollection/5")
        .set("Authorization", "Bearer mock-valid-token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Volume does not exist" });
    });
  });
});

const testServerError = (method, endpoint, mockFunction) => {
  it(`should return 500 if there’s a server error in ${method.toUpperCase()} ${endpoint}`, async () => {
    // Mock a database failure
    jest
      .spyOn(prisma.userCollection, mockFunction)
      .mockRejectedValue(new Error("Database failure"));

    let response;
    if (method === "get") {
      response = await supertest(app)
        [method](endpoint)
        .set("Authorization", "Bearer mock-valid-token");
    } else {
      response = await supertest(app)
        [method](endpoint)
        .send({
          status: "Owned",
          notes: "Test note",
          userId: "1",
          series: "One Piece",
          volumeInfo: {
            volumeId: 1,
            volumeNumber: 1,
            seriesName: "Naruto",
            author: "Masashi Kishimoto",
            booksApiId: "OL12345",
            description: "A description of Naruto Vol. 1",
            publisher: "Shueisha",
            isbn: "123456789",
            releaseDate: "2000-02-01",
            coverImage: "https://example.com/cover.jpg",
          },
        })
        .set("Authorization", "Bearer mock-valid-token")
        .set("Content-Type", "application/json");
    }

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
};
describe("Server Error Handling", () => {
  testServerError("get", "/usercollection/testuser123", "findMany");
  testServerError("post", "/usercollection", "create");
  testServerError("get", "/usercollection/byseries", "findMany");
  testServerError("get", "/usercollection/bystatus", "findMany");
  testServerError("patch", "/usercollection/1", "update");
  testServerError("delete", "/usercollection/1", "delete");
});
