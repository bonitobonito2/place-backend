const { v4: newId } = require("uuid");
const validator = require("express-validator");
const HttpError = require("../modals/http-error");
const personData = [
  {
    id: "u1",
    name: "zaal tsagreli",
    email: "zaal@gmail.com",
    password: "zaalizaali2",
  },
];

const getAllUser = (req, res, next) => {
  console.log("shemovedi");

  res.json(personData);
};

const craeteUser = (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid inputs"));
  }
  const { name, email, password } = req.body;
  const user = personData.find((state) => state.email === email);
  if (user)
    return next(new HttpError("the email address is already registared!"), 401);
  const newPerson = {
    name,
    email,
    password,
    id: newId(),
  };
  personData.push(newPerson);
  res.send("user craeted");
};

const auth = (req, res, next) => {
  const { email, password } = req.body;
  const person = personData.find((state) => state.email === email);
  if (!person || person.password !== password) {
    return next(new HttpError("wrong information", 401));
  }
  res.json({ message: "succses" });
};
exports.getAllUser = getAllUser;
exports.craeteUser = craeteUser;
exports.auth = auth;
