import User from "../user/user.model.js";
import ApiError from "../../utils/apiError.js";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.js";

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw ApiError.badRequest("Email already registered");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw ApiError.unauthorized("Invalid email or password");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw ApiError.unauthorized("Invalid email or password");
    }

    const payload = {
        userId: user._id,
        role: user.role,
    };

    const accessToken = signAccessToken(payload);
    const refreshtoken = signRefreshToken(payload);

    const userObj = user.toObject();
    delete userObj.password;

    return {
        user: userObj,
        accessToken,
        refreshtoken,
    };
};

export { registerUser, loginUser };
