// inside /auth/login API instead of sending 'JWT' token a.k.a. AT(access token) we'll send RT(refresh token)

// after validationg logged in email & password valid :-

// step-1
// Generating Tokens
const {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} = require("../utils/token");

const accessToken = generateAccessToken(foundUser);
const refreshToken = generateRefreshToken();
const refreshTokenHash = hashToken(refreshToken);

// Create Session
const session = new sessionModel({
  userId: foundUser._id,
  refreshTokenHash,
  userAgent: req.headers["user-agent"] || "",
  ip: req.ip,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
});
await session.save();

// Setting Refresh Token Cookie
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  partitioned: true,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

// Also clear old token cookie if it exists to avoid confusion
res.clearCookie("token");

// Adding a new API /auth/refresh
authRouter.post("/auth/refresh", async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      const err = new Error("No Refresh Token");
      err.statusCode = 401;
      throw err;
    }

    const hashedRT = hashToken(refreshToken);
    const session = await sessionModel.findOne({
      refreshTokenHash: hashedRT,
      valid: true,
    });

    if (!session) {
      const err = new Error("Invalid Session");
      err.statusCode = 401;
      throw err;
    }

    if (new Date() > session.expiresAt) {
      const err = new Error("Session Expired");
      err.statusCode = 401;
      throw err;
    }

    const user = await userModel.findById(session.userId);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 401;
      throw err;
    }

    // Rotate Tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = hashToken(newRefreshToken);

    // Update Session
    session.refreshTokenHash = newRefreshTokenHash;
    session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await session.save();

    // Set New Cookie
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      partitioned: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.clearCookie("refreshToken");
    next(err);
  }
});
