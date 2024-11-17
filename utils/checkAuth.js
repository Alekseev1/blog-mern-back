import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization || "";
    if (token) {
      const decoded = jwt.verify(token, "secret123");
      req.userId = decoded._id;
    }

    next();
  } catch (e) {
    console.log(e);
    res.status(403).json({
      message: "Нет доступа",
    });
  }
};
