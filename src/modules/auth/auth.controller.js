import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import { registerUser } from "./auth.service.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw ApiError.badRequest("All fields are required");
    }

    const user = await registerUser({ name, email, password });

    return ApiResponse.created(res, user, "User registered successfully");
};

export { register };
