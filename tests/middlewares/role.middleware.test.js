import authorizeRoles from "../../src/middlewares/role.middleware.js";
import ApiError from "../../src/utils/apiError.js";

const runMiddleware = (middleware, req) =>
  new Promise((resolve, reject) => {
    middleware(req, {}, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

describe("Role Middleware", () => {
  it("allows permitted role", async () => {
    const req = { user: { role: "ADMIN" } };
    await expect(
      runMiddleware(authorizeRoles("ADMIN"), req)
    ).resolves.toBeUndefined();
  });

  it("blocks forbidden role", async () => {
    const req = { user: { role: "MEMBER" } };
    await expect(
      runMiddleware(authorizeRoles("ADMIN"), req)
    ).rejects.toBeInstanceOf(ApiError);
  });
});
