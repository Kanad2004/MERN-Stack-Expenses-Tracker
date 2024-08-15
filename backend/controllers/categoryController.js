const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");

const categoryController = {
  //!add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and type are required for creating category");
    }
    //*Convert the name to lowercase
    const nomralizedName = name.toLowerCase();

    //!Check if the type is valid or not
    const validTypes = ["income", "expense"];

    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category type" + type);
    }

    //!Check if the category already exists on the user
    const categoryExists = await Category.findOne({
      name: nomralizedName,
      user: req.user,
    });

    if (categoryExists) {
      throw new Error(`Category ${categoryExists.name} already exists`);
    }

    //!Create the category
    const category = await Category.create({
      name: nomralizedName,
      type: type,
      user: req.user,
    });

    res.status(201).json({
      category,
    });
  }),

  //!lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({
      user: req.user,
    });
    res.status(200).json(categories);
  }),
};

module.exports = categoryController;
