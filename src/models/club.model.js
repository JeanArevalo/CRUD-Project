const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema(
    {
        name: String,
        country: String,
        city: String,
        champions: Number,
    }
)
module.exports = mongoose.model('Club', clubSchema)