const app = require("./app");
const http = require("http");

const server = http.createServer(app);

server.listen(5099, async () => {
    console.log("Test server running on port 5099");

    function makeReq(path, method = "GET", headers = {}) {
        return new Promise((resolve) => {
            const req = http.request({
                hostname: "localhost",
                port: 5099,
                path,
                method,
                headers
            }, (res) => {
                let data = "";
                res.on("data", chunk => data += chunk);
                res.on("end", () => resolve({ status: res.statusCode, data }));
            });
            req.on("error", (err) => resolve({ status: 500, data: err.message }));
            req.end();
        });
    }

    console.log("Testing GET /api/resume/stats with Bearer undefined:");
    let r1 = await makeReq("/api/resume/stats", "GET", { Authorization: "Bearer undefined" });
    console.log("  Status:", r1.status, "Body:", r1.data);

    console.log("Testing GET /api/interview with Bearer undefined:");
    let r2 = await makeReq("/api/interview", "GET", { Authorization: "Bearer undefined" });
    console.log("  Status:", r2.status, "Body:", r2.data);

    server.close(() => process.exit(0));
});
