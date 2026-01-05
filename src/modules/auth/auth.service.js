import User from "../user/user.model.js";
import ApiError from "../../utils/apiError.js";

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

export { registerUser };
