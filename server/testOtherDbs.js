const mongoose = require("mongoose");
require("dotenv").config();

const baseUri = process.env.MONGO_URI;
const candidateDbNames = [
    "ai_interview",
    "ai-interview",
    "AiInterview",
    "Ai-Interview",
    "resumeAnalyzer",
    "resume_analyzer",
    "resume",
    "resumes",
    "test"
];

async function testDbs() {
    for (const dbName of candidateDbNames) {
        let uri = baseUri;
        if (uri.includes(".net/?")) {
            uri = uri.replace(".net/?", `.net/${dbName}?`);
        } else if (uri.includes(".net?")) {
            uri = uri.replace(".net?", `.net/${dbName}?`);
        }

        try {
            const conn = await mongoose.createConnection(uri).asPromise();
            const collections = await conn.db.listCollections().toArray();
            const colNames = collections.map(c => c.name);
            let uCount = 0;
            if (colNames.includes("users")) {
                uCount = await conn.db.collection("users").countDocuments();
            }
            console.log(`DB '${dbName}' -> Collections: [${colNames.join(", ")}], Users count: ${uCount}`);
            if (uCount > 0) {
                const users = await conn.db.collection("users").find({}).toArray();
                users.forEach(u => {
                    console.log(`   User in '${dbName}': email=${u.email}, passwordHasHash=${!!u.password && u.password.startsWith('$2')}, passwordLen=${u.password ? u.password.length : 0}`);
                });
            }
            await conn.close();
        } catch (err) {
            console.log(`DB '${dbName}' -> Error: ${err.message}`);
        }
    }
    process.exit(0);
}

testDbs();
