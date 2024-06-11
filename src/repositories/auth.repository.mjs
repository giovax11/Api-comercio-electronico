import prisma from "../models/prisma/prisma.mjs";

export class UserRepository {
  async userRegister(email, password) {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    return user;
  }
}
