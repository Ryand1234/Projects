var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema ({
    movie:{
        type: String
    },
    name:{
        type: String
    },
    npeople:{
        type: String
    }
});

module.exports = cinema = mongoose.model("cinema", movieSchema);