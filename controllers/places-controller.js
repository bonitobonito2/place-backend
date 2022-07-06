let dummyData = require("../data/dummyData");
const converter = require("../converter");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../modals/http-error");

const getPlaceById = (req, res, next) => {
  console.log("get request in places");
  const params = req.params.id;
  const filtered = dummyData.find((data) => data.id === params);
  if (!filtered) {
    return next(new HttpError("could not find a place ", 404));
  }

  return res.json(filtered);
};
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.id;
  const places = dummyData.filter((state) => userId === state.creator);
  if (!places || places.length === 0) {
    return next(new HttpError("could not find a person ", 404));
  }

  return res.json(places);
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("inputs are invalid", 401));
  }
  const { title, description, address, creator } = req.body;
  const cordinates = await converter(address);
  if (cordinates.message) {
    return next(new HttpError("invalid address"), 401);
  }
  const createPlace = {
    title,
    description,
    location: cordinates,
    address,
    creator,
    id: uuidv4(),
  };
  dummyData.push(createPlace);
  res.status(201).json({ message: createPlace });
};

const updatePlaceById = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("invalid inputs"));
  }
  const param = req.params.id;
  const { title, description } = req.body;
  const find = dummyData.find((state) => state.id === param);
  const index = dummyData.findIndex((state) => state.id === param);
  find.title = title;
  find.description = description;
  dummyData[index] = find;
  console.log(dummyData);
  return res.status(200).send("changed");
};

const deletePlaceById = (req, res, next) => {
  const param = req.params.id;
  if (!dummyData.find((p) => p.id === param)) {
    return next(new HttpError("no such place", 401));
  }
  const deletedArray = dummyData.filter((id) => id.id !== param);
  dummyData = deletedArray;
  return res.status(201).json({ newData: dummyData });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
