const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { asyncHandler } = require('../middlewares/asyncHandler');

const createToken = (id) => {
    return jwt.sign({ userID: id }, 'DungLapLanh', { expiresIn: '1h' });
};

const registerUser = asyncHandler(async (req, res) => {
    const { username, msv, email, password } = req.body;

    if (!username || !msv || !email || !password) {
        throw new Error("Please fill all the inputs.");
    }

    const userExists = await User.findOne({ msv });
    if (userExists) {
        return res.status(400).send({ message: "User already exists", success: false });
    }

    const newUser = new User({ studentName: username, msv, email, password });

    try {
        await newUser.save();
        return res.status(201).json({ message: "Create account success", newUser: newUser._id, success: true });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(400).send({ message: "Invalid user data", success: false });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        return res.status(200).json({
            message: "Đăng nhập thành công",
            success: true,
            user: user._id.toString(),
            token, // Gửi token về frontend
        });
    } catch (error) {
        return res.status(400).json({ message: "Đăng nhập thất bại", success: false, error });
    }
});

const logoutUser = async (req, res) => {
    res.status(200).json({ message: 'Đăng xuất thành công!' });
};

module.exports = { registerUser, loginUser, logoutUser };

