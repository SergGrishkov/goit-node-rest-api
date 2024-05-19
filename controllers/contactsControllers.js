import HttpError from "../helpers/HttpError.js";
import { errorWrapper } from "../helpers/Wrappre.js";
import Contact from "../db/models/Contact.js";
import { isValidObjectId } from "mongoose";

export const getAllContacts = errorWrapper(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const result = await Contact.find({ owner: userId }).populate(
      "owner",
      "_id name email subscription"
    );

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export const getOneContact = errorWrapper(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const result = await Contact.findById({ id, owner: userId }).populate(
      "owner",
      "_id name email subscription"
    );

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export const deleteContact = errorWrapper(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const result = await Contact.findByIdAndDelete({ id, owner: userId });

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export const createContact = errorWrapper(async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await Contact.create({ ...req.body, owner: id });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

export const updateContact = errorWrapper(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const result = await Contact.findByIdAndUpdate(
      { id, owner: userId },
      req.body,
      { new: true }
    );

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export const updateFavoriteContact = errorWrapper(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const { id: userId } = req.user;
    const result = await Contact.findByIdAndUpdate(
      { id, owner: userId },
      { favorite },
      { new: true }
    );

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
