const Banner = require('../models/banner');
const fs=require('fs')

const getBanners = async (req, res) => {
  try {
    const data = await Banner.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};

const addBanner = async (req, res) => {
  try {
    const { title, subtitle, status } = req?.body   
    console.log('123',title, subtitle);
    const image = req?.file?.filename
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const data = new Banner({ title, subtitle,image })
    await data.save()
    res.status(201).json({ data, message: 'Banner created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

 const getBannerById = async(req,res) => {
  const { id } = req.params;
  try {
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json({ data: banner });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }


}

const deleteBannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await Banner.findByIdAndDelete(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const updateBanner = async (req, res) => {
  const { _id, title, subtitle, status } = req.body;
  const image = req?.file?.filename;
  try {
    const data = await Banner.findById(_id);
    if (!data) {
      return res.status(404).json({ message: 'Banner not found' });
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
    await Banner.updateOne({ _id }, {
      $set: { title, subtitle, status, ...(image && { image }) }
    })
    res.status(200).json({ data, message: 'Banner updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};


module.exports = {
  getBanners,
  addBanner,
getBannerById,
deleteBannerById,
updateBanner

}