const Joi=require("joi");

module.exports= Joi.object({
    campground:Joi.object({
        title:Joi.string().required(),
        price:Joi.number().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
        image:Joi.string()
    }).required()
});