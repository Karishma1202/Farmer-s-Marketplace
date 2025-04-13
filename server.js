const http = require("http");
const mysql = require("mysql");

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kari@123",
    database: "framers",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL Database!");
});

// Creating HTTP Server
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        try {
            const data = JSON.parse(body);
            const path = req.url;

         
            if (req.method === "POST" && path === "/register") {
                if (!data.phone || !data.name || !data.password) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: false, message: "All fields are required" }));
                    return;
                }

                const checkUserSql = `SELECT * FROM framers WHERE phone = ?`;
                db.query(checkUserSql, [data.phone], (err, results) => {
                    if (err) {
                        res.writeHead(500);
                        res.end(JSON.stringify({ success: false, message: "Database error" }));
                        return;
                    }

                    if (results.length > 0) {
                        res.writeHead(400);
                        res.end(JSON.stringify({ success: false, message: "Phone number already registered" }));
                        return;
                    }

                    const insertSql = `INSERT INTO framers (name, address, phone, email, password) VALUES (?, ?, ?, ?, ?)`;
                    db.query(insertSql, [data.name, data.address, data.phone, data.email, data.password], (err) => {
                        if (err) {
                            res.writeHead(500);
                            res.end(JSON.stringify({ success: false, message: "Registration failed" }));
                            return;
                        }
                        res.writeHead(200);
                        res.end(JSON.stringify({ success: true, message: "Registration successful!" }));
                    });
                });

            // 🌾 Farmer Login Route
            } else if (req.method === "POST" && path === "/login") {
                db.query("SELECT * FROM framers WHERE phone = ?", [data.phone], (err, results) => {
                    if (err) {
                        res.writeHead(500);
                        res.end(JSON.stringify({ success: false, message: "Database error" }));
                        return;
                    }

                    if (results.length === 0) {
                        res.writeHead(401);
                        res.end(JSON.stringify({ success: false, message: "Invalid phone number" }));
                        return;
                    }

                    if (results[0].password !== data.password) {
                        res.writeHead(401);
                        res.end(JSON.stringify({ success: false, message: "Invalid password" }));
                        return;
                    }

                    res.writeHead(200);
                    res.end(JSON.stringify({ success: true, message: "Login successful" }));
                });
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ success: false, message: "Invalid route" }));
            }
        } catch (error) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, message: "Invalid JSON format" }));
        }
    });
});

// Start the Server
server.listen(5000, () => console.log("🚀 Server running on port 5000"));
