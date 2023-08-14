import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { current, login, register } from "./controllers/UserController.js";
import { create, getContacts, removeContacts, updateContacts } from "./controllers/ContactsController.js";
import { createContactsValidation } from "./validations/contacts.js";

mongoose
  .connect("mongodb+srv://aleksandrcernuk3:Velomoped44@cluster0.uexlrer.mongodb.net/auth?retryWrites=true&w=majority")
  .then(() => console.log("ok Dd"))
  .catch((er) => console.log(er));

const app = express();
app.use(express.json());

const port = 4444;

app.post("/user/register", registerValidation, register);
app.post("/user/login", loginValidation, login);
app.get("/user/current", checkAuth, current);

app.get("/contacts", checkAuth, getContacts);
app.post("/contacts", checkAuth, createContactsValidation, create);
app.delete("/contacts/:id", checkAuth, removeContacts);
app.patch("/contacts/:id", checkAuth, updateContacts);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("ok");
});

app.get("/", (req, res) => {
  res.send(`<h1>My server</h1>`);
});
