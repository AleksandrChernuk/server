import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User from "../modules/User.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const has = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(has, salt);

    const doc = new User({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      password: passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, "secret123");

    const { password, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось зарегистрироваться" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Не верний логин или паароль" });
    }

    const isValudPass = await bcrypt.compare(req.body.password, user._doc.password);
    if (!isValudPass) {
      return res.status(400).json({ message: "Не верний логин или паароль" });
    }

    const token = jwt.sign({ _id: user._id }, "secret123");

    const { password, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось авторизоваться" });
  }
};

export const current = async (req, res) => {
  try {
    const user = await User.findOne(req.userId);
    if (!user) {
      res.status(404).json({ messege: "Пользоватеель не найден" });
    }

    const { password, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (error) {
    console.log(error);
    res.status(404).json({ messege: "Пользоватеель не найден" });
  }
};
