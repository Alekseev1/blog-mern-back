import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import { userController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  userController.login
);
app.post(
  "/auth/register",
  handleValidationErrors,
  registerValidation,
  userController.register
);
app.get("/auth/me", checkAuth, userController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/tags", PostController.getLastTags);

app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log("error bad", err);
  }
  console.log("app OK");
});
