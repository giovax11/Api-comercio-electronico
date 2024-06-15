import { describe, it, expect, vi } from "vitest";
import prismaMock from "../mocks/prisma.mjs";
import { app } from "../../index.mjs";
import supertest from "supertest";

vi.mock("../../models/prisma/prisma.mjs", () => {
  return {
    __esModule: true,
    default: prismaMock,
  };
});

describe("User Registration", () => {
  describe("given an invalid email", () => {
    it("should throw an error for invalid email", async () => {
      const userData = {
        email: "invalid-email",
        password: "Password123.",
      };
      const request = supertest(app);
      const response = await request.post("/api/auth/register").send(userData);
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe("Enter a valid email address");
    });
  });
  describe("given an invalid password", () => {
    it("should throw an error for invalid password", async () => {
      const userData = {
        email: "example@gmail.com",
        password: "password",
      };
      const request = supertest(app);
      const response = await request.post("/api/auth/register").send(userData);
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe(
        "The password must have at least one capital letter, a number and a special character."
      );
    });
  });
  describe("given a valid email and password", () => {
    it("should create a new user", async () => {
      const userData = {
        email: "user@example.com",
        password: "ValidPassword123!",
      };
      prismaMock.user.create.mockResolvedValue({
        id: 1,
        email: userData.email,
        password: userData.password,
      });
      const request = supertest(app);
      const response = await request.post("/api/auth/register").send(userData);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
    });
  });
});

describe("User login", () => {
  describe("given an invalid user", () => {
    it("should throw an error for not existing user", async () => {
      const userData = {
        email: "no-exist@example.com",
        password: "invalid-password",
      };
      const request = supertest(app);
      const response = await request.post("/api/auth/login").send(userData);
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe(
        "The user entered has not been registered"
      );
    });
  });
  /*describe("given a valid user with correct password", () => {
    it("should return a token", async () => {
      const userData = {
        email: "email@example.com",
        password: "ValidPassword123!",
      };

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      prismaMock.user.findFirst.mockResolvedValue({
        id: 1,
        email: userData.email,
        password: hashedPassword,
      });

      const request = supertest(app);
      const response = await request.post("/api/auth/login").send(userData);
      // Depuración: muestra el estado y el cuerpo de la respuesta
      console.log("Response status:", response.status);
      console.log("Response body:", response.body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });
  });*/
});

describe("Invalid token", () => {
  describe("given a body without a token", () => {
    it("should return a invalid token exception", async () => {
      const productId = 1;
      const request = supertest(app);
      const response = await request.get(`/api/products/${productId}`);
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Invalid token provided");
    });
  });
});
