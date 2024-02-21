const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => console.log("CONNECTED TO DATABASE"))
    .catch(err=>console.log(err));


const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const images = [
    'https://res.cloudinary.com/dwxewr61q/image/upload/v1696491547/YelpCamp/camp1_wol7cu.jpg',
    'https://res.cloudinary.com/dwxewr61q/image/upload/v1696491615/YelpCamp/camp2_t1a6v5.jpg',
    'https://res.cloudinary.com/dwxewr61q/image/upload/v1697015065/YelpCamp/cam4_dn41rb.jpg',
    'https://res.cloudinary.com/dwxewr61q/image/upload/v1697015066/YelpCamp/camp3_gt0szw.jpg',
    'https://res.cloudinary.com/dwxewr61q/image/upload/v1697015067/YelpCamp/camp2_xpwxe3.jpg'
]

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const image = Math.floor(Math.random() * 5);
        const camp = new Campground({
            //YOUR USER ID
            author: "643852a2528afe9d6190c1ae",
            backgroundImg:`${images[image]}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwxewr61q/image/upload/v1696491547/YelpCamp/camp1_wol7cu.jpg',
                    filename: 'YelpCamp/camp1_wol7cu'
                },
                {
                    url: 'https://res.cloudinary.com/dwxewr61q/image/upload/v1696491615/YelpCamp/camp2_t1a6v5.jpg',
                    filename: 'YelpCamp/camp2_t1a6v5'
                },
                {
                    url: 'https://res.cloudinary.com/dwxewr61q/image/upload/v1697015065/YelpCamp/cam4_dn41rb.jpg',
                    filename: 'YelpCamp/camp4_dn41rb'
                },
                {
                    url: 'https://res.cloudinary.com/dwxewr61q/image/upload/v1697015066/YelpCamp/camp3_gt0szw.jpg',
                    filename: 'YelpCamp/camp3_gt0szw'
                },
                {
                    url: 'https://res.cloudinary.com/dwxewr61q/image/upload/v1697015067/YelpCamp/camp2_xpwxe3.jpg',
                    filename: 'YelpCamp/camp2_xpwxe3'
                },
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})