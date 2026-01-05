import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import { registerUser, loginUser } from "./auth.service.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw ApiError.badRequest("All fields are required");
    }

    const user = await registerUser({ name, email, password });

    return ApiResponse.created(res, user, "User registered successfully");
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw ApiError.badRequest("Email and password are required");
    }

    const result = await loginUser({ email, password });

    return ApiResponse.success(res, result, "Login successful", 200);
};

const logout = async (req, res) => {
    return ApiResponse.success(res, "Logout successful", 200);
};

export { register, login, logout };
