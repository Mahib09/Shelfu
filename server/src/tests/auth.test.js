const supertest = require("supertest");
const createServer = require("../utils/server");
const prisma = require("../services/prismaService");
const admin = require("../services/firebaseService");

const app = createServer();

jest.mock("firebase-admin", () => ({
  auth: jest.fn().mockReturnValue({
    verifyIdToken: jest.fn().mockResolvedValue({
      uid: "some-uid",
      email: "test@example.com",
      name: "Test User",
    }),
    createSessionCookie: jest.fn().mockResolvedValue("fake-session-cookie"),
  }),
}));

// Mock Prisma service
jest.mock("../services/prismaService", () => ({
  users: {
    create: jest.fn().mockResolvedValue({
      userId: 1,
      email: "test@test.com",
      name: "Test User",
    }),
    findUnique: jest.fn().mockResolvedValue(null), // No existing user
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Auth Api", () => {
  describe("POST /auth/signup", () => {
    it("should successfully sign up when a valid token is provided and the user does not exist in the database", async () => {
      const response = await supertest(app)
        .post("/auth/signup")
        .send({ token: "valid-firebase-token" });

      // Assert that the response status is 200
      expect(response.status).toBe(200);

      // Assert the success response body
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User signed up successfully");

      // Assert that the correct function was called on Prisma to create the user
      expect(prisma.users.create).toHaveBeenCalledWith({
        data: {
          firebaseUId: "some-uid",
          email: "test@example.com",
          name: "Test User",
        },
      });

      // Assert that the session cookie is being set correctly
      expect(response.headers["set-cookie"][0]).toContain(
        "token=fake-session-cookie"
      );
    });
    it("should return an error if token is not provided", async () => {
      const response = await supertest(app).post("/auth/signup").send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Token is required");
    });
    it("should return an error if an existing user tries to sign up", async () => {
      // Mock the case where the user already exists in the database
      prisma.users.findUnique.mockResolvedValueOnce({
        userId: 1,
        email: "test@test.com",
        name: "Test User",
      });

      const response = await supertest(app)
        .post("/auth/signup")
        .send({ token: "valid-firebase-token" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User already registered");
    });
    it("should return an error if Firebase token verification fails", async () => {
      // Mock the verifyIdToken to simulate a verification failure
      admin
        .auth()
        .verifyIdToken.mockRejectedValueOnce(
          new Error("Invalid Firebase token")
        );

      const response = await supertest(app)
        .post("/auth/signup")
        .send({ token: "invalid-firebase-token" });

      expect(response.status).toBe(401); // Unauthorized
      expect(response.body.message).toBe("Invalid Firebase token"); // Error message returned by Firebase verification failure
    });
  });

  describe("POST /auth/login", () => {
    // Implement login tests here
  });
});
