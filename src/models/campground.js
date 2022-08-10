const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const CampgroundSchema=new Schema({
    title:String,
    price:Number,
    description:String,
    location:String,
    image:String,
    reviews: [{
        review: {
            type:mongoose.Types.ObjectId,  // reviews will be an array of obj that refer to reviews
            ref:"Review"                   // We ref to the name of the model as we defined.
        }
    }]
    
})


module.exports = mongoose.model("Campground", CampgroundSchema);
