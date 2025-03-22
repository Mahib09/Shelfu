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
