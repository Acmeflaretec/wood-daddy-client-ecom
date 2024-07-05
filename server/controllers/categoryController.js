const Category = require('../models/category')
const fs = require('fs')

const getCategory = async (req, res) => {
  try {
    const data = await Category.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};
const getSelectedCategory = async (req, res) => {
  try {
    const categories = await Category.find({ name: { $in: ["CHAIR", "SOFA","TABLE"] } });
    res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving categories" });
  }
};


const addCategory = async (req, res) => {
  const { name, desc } = req?.body
  const image = req?.file?.filename
  try {
    let arr = []
    const categoryData = await Category.find()
    categoryData.map(x => {
      arr.push(x?.name?.toUpperCase())
    })
    const category = name.toUpperCase()
    const isExisting = arr.findIndex(x => x == category)
    if (isExisting === -1) {
      const cat = new Category({ name:name.toUpperCase(), desc, image })
      await cat.save()
      res.status(201).json({ data: cat, message: 'category created successfully' });
    } else {
      return res.status(400).json({ message: 'category already exists' })
    }
  } catch (error) {
    console.log(error);
  }
}
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Category.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: 'Category not found' });
    }
    fs.unlink(`public/uploads/${data?.image}`, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        return;
      }  
      console.log('Image deleted successfully.');
    });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

const getCategoryById = async (req, res) => {
  try {
    const data = await Category.findOne({ _id: req.params.id });
    res.status(200).json({ data, message: 'product found successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}
const updateCategory = async (req, res) => {
  const {_id,name, desc ,isAvailable} = req?.body
  const image = req?.file?.filename
  try {
    const data = await Category.findById(_id);
    if (!data) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (image) {
      fs.unlink(`public/uploads/${data?.image}`, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
          return;
        }
        console.log('Image deleted successfully.');
      });
    }
    await Category.updateOne({ _id }, {
      $set: { name, desc,isAvailable, ...(image && { image }) }
    })
    res.status(200).json({ data, message: 'Category updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

module.exports = {
    getCategory,
    addCategory,
    deleteCategory,
    getSelectedCategory,
    getCategoryById,
    updateCategory
  }