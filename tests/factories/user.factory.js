import User from "../../src/modules/user/user.model.js";

export const createUser = async (overrides = {}) => {
  return User.create({
    name: "Test User",
    email: `user${Date.now()}@test.com`,
    password: "password123",
    role: "MEMBER",
    ...overrides,
  });
};
