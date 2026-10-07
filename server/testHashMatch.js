const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({});
        console.log(`Checking ${users.length} users in database...`);
        for (const user of users) {
            console.log(`User email: ${user.email}`);
            console.log(`  Password starts with $2a$ / $2b$ / $2y$: ${user.password ? user.password.startsWith("$2") : false}`);
            console.log(`  Password length: ${user.password ? user.password.length : 0}`);
        }
        process.exit(0);
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

check();
