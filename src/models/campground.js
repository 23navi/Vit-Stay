const mongoose=require("mongoose");
const catchAsync = require("../../utils/errors/catchAsync");
const Review=require("../models/reviews")

const Schema = mongoose.Schema;

const CampgroundSchema=new Schema({
    title:String,
    price:Number,
    description:String,
    location:String,
    image:String,
    reviews: [{

            type:mongoose.Types.ObjectId,  // reviews will be an array of obj that refer to reviews
            ref:"Review"                   // We ref to the name of the model as we defined.
      
    }]
    
})


const f=

CampgroundSchema.post("findOneAndDelete",((async function(campground,next){
    if(campground.reviews.length){
        await Review.deleteMany({id:{$in:campground.reviews}})
    }
    next();

})))


module.exports = mongoose.model("Campground", CampgroundSchema);
