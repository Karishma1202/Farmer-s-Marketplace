const http = require("http");
const mysql = require("mysql");

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kari@123",
  database: "framers",
});

db.connect((err) => {
  if (err) {
    console.error(" Database connection failed:", err);
    process.exit(1);
  }
  console.log(" Connected to MySQL Database!");
});

// Create Server
const server = http.createServer((req, res) => {
  // Set CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle Preflight Request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      if (!body) {
        return sendError(res, 400, "Request body is empty");
      }

      const data = JSON.parse(body);
      const { name, email, phone, password } = data;

      // Validation Regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (req.method === "POST" && req.url === "/api/register") {
        // Check Required Fields
        if (!name || !email || !phone || !password) {
          return sendError(res, 400, "All fields are required");
        }

        // Email Format Validation
        if (!emailRegex.test(email)) {
          return sendError(res, 400, "Invalid email format");
        }

        // Phone Format Validation
        if (!phoneRegex.test(phone)) {
          return sendError(res, 400, "Invalid phone number (must be 10 digits)");
        }

       
        const checkQuery = "SELECT email, phone FROM user WHERE email = ? OR phone = ?";
        db.query(checkQuery, [email, phone], (err, results) => {
          if (err) {
            return sendError(res, 500, "Database error");
          }

          if (results.length > 0) {
            let errorMessage = results[0].email === email
              ? "Email already exists!"
              : "Phone number already exists!";
            return sendError(res, 400, errorMessage);
          }

          // Insert User into Database
          const insertQuery = "INSERT INTO user (name, email, phone, password) VALUES (?, ?, ?, ?)";
          db.query(insertQuery, [name, email, phone, password], (insertErr) => {
            if (insertErr) {
              return sendError(res, 500, "Database error");
            }
            sendSuccess(res, "Registration successful! Please log in.");
          });
        });

      } else if (req.method === "POST" && req.url === "/api/login") {
        if (!email || !password) {
          return sendError(res, 400, "Email and password required");
        }

        const query = "SELECT * FROM user WHERE email = ? AND password = ?";
        db.query(query, [email, password], (err, results) => {
          if (err) {
            return sendError(res, 500, "Database error");
          }

          if (results.length === 0) {
            return sendError(res, 401, "Invalid credentials");
          }

          sendSuccess(res, "Login successful!");
        });

      } else {
        sendError(res, 404, "Invalid API endpoint");
      }

    } catch (error) {
      sendError(res, 400, "Invalid JSON format");
    }
  });
});

// Error Handling Function
function sendError(res, statusCode, message) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: false, message }));
}

// Success Handling Function
function sendSuccess(res, message) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: true, message }));
}

// Start Server
server.listen(5002, () => {
  console.log(" Server running on port 5002");
});
