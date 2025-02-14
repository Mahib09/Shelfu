const supertest = require("supertest");
const createServer = require("../utils/server");
const prisma = require("../services/prismaService");
const admin = require("../services/firebaseService");

const app = createServer();

// Mock Firebase service
jest.mock("../services/firebaseService", () => ({
  auth: {
    createUser: jest.fn().mockResolvedValue({
      uid: 1,
      email: "test@test.com",
    }),
    getUserByEmail: jest.fn().mockResolvedValue(null),
    createCustomToken: jest.fn(),
  },
}));

// Mock Prisma service
jest.mock("../services/prismaService", () => ({
  users: {
    create: jest.fn().mockResolvedValue({
      userId: 1,
      email: "test@test.com",
    }),
    findUnique: jest.fn().mockResolvedValue(null), // This ensures no user exists initially
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Auth Api", () => {
  describe("POST /auth/signup", () => {
    it("should successfully create a user with a valid email and password", async () => {
      prisma.users.findUnique.mockResolvedValue(null);
      prisma.users.create.mockResolvedValue({
        userId: 1,
        email: "test@test.com",
      });

      const response = await supertest(app)
        .post("/auth/signup")
        .set("Content-Type", "application/json")
        .send({ email: "test@test.com", password: "testtest" });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "User created successfully",
        userId: 1,
      });
    });
    it("should return 400 if email is already in use", async () => {
      prisma.users.findUnique.mockResolvedValue({
        userId: 1,
        email: "test@test.com",
      });
      const response = await supertest(app)
        .post("/auth/signup")
        .set("Content-Type", "application/json")
        .send({ email: "test@test.com", password: "testtest" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Email is already in use",
      });
    });
    it("should return 500 if there is a database error", async () => {
      prisma.users.findUnique.mockRejectedValue(new Error("Database Error"));

      const response = await supertest(app)
        .post("/auth/signup")
        .set("Content-Type", "application/json")
        .send({ email: "test@test.com", password: "testtest" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Error creating user",
      });
    });
    it("should return 500 if Firebase createUser fails", async () => {
      admin.auth.createUser.mockRejectedValue(new Error("Firebase Error"));

      const response = await supertest(app)
        .post("/auth/signup")
        .send({ email: "test@test.com", password: "testtest" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Error creating user" });
    });
  });
  describe("POST /auth/login", () => {
    it("should successfully log in a user with valid credentials", async () => {
      admin.auth.getUserByEmail.mockResolvedValue({
        userId: 1,
        email: "test@test.com",
      });
      admin.auth.createCustomToken.mockResolvedValue(123);

      const response = await supertest(app)
        .post("/auth/login")
        .send({ email: "test@test.com", password: "testtest" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Login successful",
        token: 123,
      });
    });
    it("should return 400 if email is not found", async () => {
      admin.auth.getUserByEmail.mockResolvedValue(null);
      const response = await supertest(app)
        .post("/auth/login")
        .send({ email: "test@test.com", password: "testtest" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "User Not Found",
      });
    });
    it("should return 400 if email is missing", async () => {
      const response = await supertest(app)
        .post("/auth/login")
        .send({ email: null, password: "testtest" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Email and Password Required",
      });
    });
  });
});
