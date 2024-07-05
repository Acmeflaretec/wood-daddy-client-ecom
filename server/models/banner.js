const mongoose = require('mongoose')
const bannerSchema = mongoose.Schema({

  title: {

    type: String,
    required: true

  },

  subtitle: {

    type: String,
    required: true

  },
  image: {

    type: String,
    required: true

  },
  status: {
    type: Boolean,
    default: true
}

},
{
  timestamps: true
})

module.exports = mongoose.model('banner', bannerSchema)