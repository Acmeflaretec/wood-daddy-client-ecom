const ContentSection = require('../models/contentSection');

const getContentSection = async (req, res) => {
  try {
    const data = await ContentSection.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};

const addContentSection = async (req, res) => {
  // console.log('reached')
  // console.log(req.body)
  const { title, desc } = req?.body;
 


  try {
    // Find the existing ContentSection (assuming there is only one)
    let contSec = await ContentSection.findOne();

    if (contSec) {
      // Update the existing ContentSection
      contSec.title = title;
      contSec.desc = desc;
      await contSec.save();
      res.status(200).json({ data: contSec, message: 'ContentSection updated successfully' });
    } else {
      // Create a new ContentSection
      contSec = new ContentSection({ title, desc });
      await contSec.save();
      res.status(201).json({ data: contSec, message: 'ContentSection created successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const getWelcomeById = async (req, res) => {
  try {
    const data = await ContentSection.findOne({ _id: req.params.id });
    res.status(200).json({ data, message: 'product found successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error?.message ?? "Something went wrong !" });
  }
}
const updateWelcome = async (req, res) => {
  const {_id,title, desc} = req?.body
  try {
    const data = await ContentSection.findById(_id);
    if (!data) {
      return res.status(404).json({ message: 'Welcome not found' });
    }
    
    await ContentSection.updateOne({ _id }, {
      $set: { title, desc }
    })
    res.status(200).json({ data, message: 'Welcome updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}
const deleteWelcome = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ContentSection.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: 'Welcome not found' });
    }
    res.status(200).json({ message: 'Welcome deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}



module.exports = {

  getContentSection,
  addContentSection,
  getWelcomeById,
  updateWelcome,
  deleteWelcome


}
