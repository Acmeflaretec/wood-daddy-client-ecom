const Advertisement = require('../models/advertisement');
const fs = require('fs')

const getAdvertisement = async (req, res) => {
  try {
    const data = await Advertisement.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
  }
};

const addAdvertisement = async (req, res) => {
  
  const {offer, title, subtitle } = req?.body
  const imgUrl = req?.file?.filename
  try {
    
    const adv = new Advertisement({offer,title, subtitle, imgUrl })
    await adv.save()
    console.log('hello',adv);  
      res.status(201).json({ data: adv, message: 'advertisement created successfully' });
     
  } catch (error) {
    console.log(error);
  }
}

 const getAdvertisementById = async(req,res) => {
  const { id } = req.params;
  try {
    const advertisement = await Advertisement.findById(id);
    if (!advertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    res.status(200).json({ data: advertisement });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }


}

const deleteAdvertisementById = async (req, res) => {
  const { id } = req.params;
  try {
    const advertisement = await Advertisement.findByIdAndDelete(id);
    if (!advertisement) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const updateAdvertisementById = async (req, res) => {
  const {_id,offer,title, subtitle} = req?.body
  const  imgUrl= req?.file?.filename
  console.log(_id,offer,title, subtitle,imgUrl);
  try {
    const data = await Advertisement.findById(_id);
    if (!data) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    if (imgUrl) {
      fs.unlink(`public/uploads/${data?.imgUrl}`, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
          return;
        }
        console.log('Image deleted successfully.');
      });
    }
    await Advertisement.updateOne({ _id }, {
      $set: { offer,title, subtitle, ...(imgUrl && { imgUrl }) }
    })
    res.status(200).json({ data, message: 'Advertisement updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};


module.exports = {
  getAdvertisement,
  addAdvertisement,
getAdvertisementById,
deleteAdvertisementById,
updateAdvertisementById

}