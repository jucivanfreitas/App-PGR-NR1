const http = require("http");
const target = process.env.HEALTHCHECK_URL || "http://localhost:3000/api/health";
http.get(target, (res) => { process.exit(res.statusCode && res.statusCode < 500 ? 0 : 1); }).on("error", () => process.exit(1));
