import { body } from "express-validator";

export const createContactsValidation = [
  body("firstName", "Не верное Имя").isString(),
  body("lastName", "Не верная Фамилия").isString(),
  body("phone", "Не верний номер телефона").isString(),
];
