const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transactions");

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

  //!Update
  update: asyncHandler(async (req, res) => {
    const categoryId = req.params;
    const { type, name } = req.body;
    const nomralizedName = name.toLowerCase();
    const category = await Category.findById(categoryId);
    if (!category || category.user.toString() !== req.user.toString()) {
      throw new Error("Category not found or user unauthorized");
    }
    const oldName = category.name;
    //!Update category properties
    category.name = nomralizedName;
    category.type = type;
    const updatedCategory = await category.save();
    //!Update the affected transactions
    if (oldName !== nomralizedName) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        {
          $set: { category: updatedCategory.name },
        }
      );
    }

    res.status(200).json(updatedCategory);
  }),

  //!delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category || category.user.toString() === req.user.toString()) {
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        {
          user: req.user,
          category: category._id,
        },
        { $set: { category: defaultCategory } }
      );

      await Category.findByIdAndDelete(req.params.id);
      res.json({
        message: "Category deleted successfully",
      });
    }
    else{
      res.json({
        message : 'Category not found or user unauthorized',
      })
    }
  }),
};

module.exports = categoryController;
