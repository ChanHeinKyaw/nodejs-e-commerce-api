const TB = require("../models/category");
const SubcatTB = require("../models/subcat");
const ChildcatTB = require("../models/childcat");
const LIBBY = require("../utils/libby");

let all = async (req, res) => {
  let result = await TB.find().populate({
    path: "subcats",
    model: SubcatTB,
    populate: {
      path: "childcats",
      model: ChildcatTB,
    },
  });
  LIBBY.fMsg(res, "All Categories", result);
};

let add = async (req, res) => {
  let saveCat = new TB(req.body);
  let result = await saveCat.save();
  LIBBY.fMsg(res, "Category Save Success", result);
};

let get = async (req, res) => {
  let result = await TB.findById(req.params.id);
  LIBBY.fMsg(res, "Single Category", result);
};

let drop = async (req, res, next) => {
  let existCat = await TB.findById(req.params.id);
  if (existCat) {
    let result = await TB.findByIdAndDelete(existCat._id);
    LIBBY.fMsg(res, "Category Deleted", result);
  } else {
    next(new Error(`There is no category with id of ${req.params.id}`));
  }
};

let put = async (req, res, next) => {
  let existCat = await TB.findById(req.params.id);
  if (existCat) {
    await TB.findByIdAndUpdate(req.params.id, req.body);
    let result = await TB.findById(req.params.id);
    LIBBY.fMsg(res, "Category Deleted", result);
  } else {
    next(new Error(`There is no category with id of ${req.params.id}`));
  }
};

module.exports = {
  all,
  add,
  get,
  drop,
  put,
};
