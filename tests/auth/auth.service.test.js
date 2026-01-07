import {
  registerUser,
  loginUser,
} from "../../src/modules/auth/auth.service.js";
import ApiError from "../../src/utils/apiError.js";

describe("Auth Service", () => {
  it("registers a new user", async () => {
    const user = await registerUser({
      name: "John",
      email: "john@test.com",
      password: "password123",
    });

    expect(user.email).toBe("john@test.com");
    expect(user.password).toBeUndefined();
  });

  it("prevents duplicate registration", async () => {
    await registerUser({
      name: "John",
      email: "john@test.com",
      password: "password123",
    });

    await expect(
      registerUser({
        name: "John",
        email: "john@test.com",
        password: "password123",
      })
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("logs in valid user", async () => {
    await registerUser({
      name: "John",
      email: "john@test.com",
      password: "password123",
    });

    const result = await loginUser({
      email: "john@test.com",
      password: "password123",
    });

    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
  });

  it("rejects invalid password", async () => {
    await registerUser({
      name: "John",
      email: "john@test.com",
      password: "password123",
    });

    await expect(
      loginUser({
        email: "john@test.com",
        password: "wrongpass",
      })
    ).rejects.toBeInstanceOf(ApiError);
  });
});
