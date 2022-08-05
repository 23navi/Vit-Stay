const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers'); // we exported 2 module.exports... it came as obj
const Campground = require('../src/models/campground');

const imageLastnumber= [40, 45, 48, 51, 53, 57, 59];


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


//a function which will take in an array and give one element of it from the array
const sample = (array_input) => array_input[Math.floor(Math.random() * array_input.length)];

console.log(sample(imageLastnumber));
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/collection/4832${String(sample(imageLastnumber))}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
    console.log("Seeded new Data")
}

seedDB().then(() => {
    mongoose.connection.close();
})