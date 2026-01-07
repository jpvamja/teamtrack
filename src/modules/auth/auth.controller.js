import ApiResponse from "../../utils/apiResponse.js";
import {
    registerUser,
    loginUser,
    refreshAccessToken,
} from "./auth.service.js";

/**
 * Register new user
 */
const register = async (req, res) => {
    const user = await registerUser(req.body);

    return ApiResponse.created(
        res,
        user,
        "User registered successfully"
    );
};

/**
 * Login user
 */
const login = async (req, res) => {
    const result = await loginUser(req.body);

    return ApiResponse.success(
        res,
        result,
        "Login successful"
    );
};

/**
 * Logout user
 * (Stateless JWT – handled client-side)
 */
const logout = async (req, res) => {
    return ApiResponse.success(
        res,
        null,
        "Logout successful"
    );
};

/**
 * Refresh access token
 */
const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    const result = await refreshAccessToken(refreshToken);

    return ApiResponse.success(
        res,
        result,
        "Access token refreshed"
    );
};

export { register, login, logout, refresh };
