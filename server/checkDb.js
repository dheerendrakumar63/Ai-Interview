const mongoose = require("mongoose");
require("dotenv").config();

async function check() {
    try {
        console.log("Connecting...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
        console.log("Current Database:", mongoose.connection.name);
        console.log("Host:", mongoose.connection.host);

        const admin = mongoose.connection.db.admin();
        const { databases } = await admin.listDatabases();
        console.log("Databases list:");
        for (const dbInfo of databases) {
            console.log(` - ${dbInfo.name} (${dbInfo.sizeOnDisk} bytes)`);
        }

        // Check users in current db
        const User = mongoose.connection.collection("users");
        const count = await User.countDocuments();
        console.log(`User count in current db ('${mongoose.connection.name}'):`, count);

        // Check other dbs for users
        for (const dbInfo of databases) {
            if (["admin", "local"].includes(dbInfo.name)) continue;
            const db = mongoose.connection.client.db(dbInfo.name);
            const collections = await db.listCollections().toArray();
            const colNames = collections.map(c => c.name);
            if (colNames.includes("users")) {
                const uCount = await db.collection("users").countDocuments();
                console.log(`Database '${dbInfo.name}' has 'users' collection with ${uCount} documents.`);
            }
        }

        process.exit(0);
    } catch (err) {
        console.error("Check Error:", err.message);
        process.exit(1);
    }
}

check();
