const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}, "email name createdAt");
        console.log("Found Users list (email & name only):");
        users.forEach(u => console.log(` - Email: ${u.email}, Name: ${u.name}`));
        process.exit(0);
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

check();
