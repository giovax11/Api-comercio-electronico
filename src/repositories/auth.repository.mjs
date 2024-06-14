import prisma from "../models/prisma/prisma.mjs";

/**
 * @typedef {import("../types/user").User} user
 */

export class UserRepository {
  /**
   * Register a new user
   *
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} - Registered user
   */
  async userRegister(email, password) {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    return user;
  }

  /**
   * Get a user by email
   *
   * @param {string} email - User email
   * @returns {Promise<user>} - User
   */
  async getUserByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }
}
