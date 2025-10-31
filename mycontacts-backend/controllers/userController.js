const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");   
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");


const prisma = new PrismaClient();

//@desc Register a user
//@route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // 1. Validate input
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // 2. Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    res.status(400);
    throw new Error("User already registered with this email!");
  }

  // 3. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);
  res.json({message: "User registration successful"});

  // 4. Create new user in DB with hashed password
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword, // store hashed password instead of plain text
    },
  });

  // 5. Respond to client
  res.status(201).json({
    success: true,
    message: "User registration successful",
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
  });
});

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check missing fields
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Find user in DB
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // If user not found
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Generate token (expires in 1 minute)
  const token = jwt.sign(
    { userId: user.id, email: user.email, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
  });
});


//@desc current user
//@route POST /api/users/current
//@access private - only for logged in users
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
};