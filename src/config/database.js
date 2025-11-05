
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://udaypalsam55_db_user:OAIGr9jYjEDdWHgp@devtinder.2x6z71z.mongodb.net/devTinder")
};

module.exports = connectDB;


