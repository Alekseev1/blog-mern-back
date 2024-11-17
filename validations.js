import { body } from "express-validator";

export const loginValidation = [
  body("email").isEmail().withMessage("Неверный формат email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Пароль минимум 5 символов"),
];

export const registerValidation = [
  body("fullName").isLength({ min: 3 }).withMessage("Укажите полное имя"),
  body("email").isEmail().withMessage("Неверный формат email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Пароль минимум 5 символов"),
  body("avatarUrl").optional().isURL().withMessage("невалидная ссылка"),
];

export const postCreateValidation = [
  body("title").isLength({ min: 3 }).withMessage("Введите заголовок"),
  body("text").isLength({ min: 3 }).withMessage("Введите текст"),
  body("tags").optional(),
  body("imageUrl")
    .isURL()
    .optional()
    .withMessage("невалидная ссылка на картинку"),
];
