const mysql = require("mysql");
const http = require("http");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kari@123",
    database: "framers"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error(" Database connection failed:", err);
        return;
    }
    console.log(" Connected to MySQL database");
});

// Function to add a new product
const addProduct = (product, callback) => {
    if (!product.productName || !product.category || !product.quantity || !product.unitType || !product.price ||
        !product.farmerName || !product.contact || !product.location || !product.delivery) {
        return callback(new Error("Missing required fields"), null);
    }

    const sql = `INSERT INTO products 
        (product_name, category, quantity, unit_type, price, description, image_url, harvest_date, farmer_name, contact, location, delivery) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        product.productName, 
        product.category, 
        product.quantity, 
        product.unitType, 
        product.price, 
        product.description || "", 
        product.image || "", 
        product.harvestDate || null, 
        product.farmerName, 
        product.contact, 
        product.location, 
        product.delivery
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(" MySQL Error:", err.sqlMessage);
            return callback(err, null);
        }
        console.log(" Product added successfully:", result);
        callback(null, result);
    });
};

// Function to get all products
const getProducts = (callback) => {
    const sql = "SELECT * FROM products ORDER BY id DESC"; 

    db.query(sql, (err, results) => {
        if (err) {
            console.error(" MySQL Error:", err.sqlMessage);
            return callback(err, null);
        }
        callback(null, results);
    });
};

const updateProduct = (productId, quantity, callback) => {
    const sql = "UPDATE products SET quantity = ? WHERE id = ?";
    db.query(sql, [quantity, productId], (err, result) => {
        if (err) {
            console.error(" MySQL Error:", err.sqlMessage);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Create HTTP server
const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        if (req.method === "POST" && req.url === "/add-product") {
            try {
                const product = JSON.parse(body);

                addProduct(product, (err, result) => {
                    res.writeHead(200, { "Content-Type": "application/json" });

                    if (err) {
                        res.end(JSON.stringify({ success: false, message: "Error adding product", error: err.message }));
                    } else {
                        res.end(JSON.stringify({ success: true, message: "Product added successfully" }));
                    }
                });

            } catch (error) {
                console.error(" JSON Parsing Error:", error.message);
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, message: "Invalid JSON format" }));
            }

        } else if (req.method === "GET" && req.url === "/get-products") {
            getProducts((err, products) => {
                res.writeHead(200, { "Content-Type": "application/json" });

                if (err) {
                    res.end(JSON.stringify({ success: false, message: "Error fetching products", error: err.message }));
                } else {
                    res.end(JSON.stringify({ success: true, products }));
                }
            });

        } else if (req.method === "POST" && req.url === "/update-product") {
            try {
                const { id, quantity } = JSON.parse(body);

                if (!id) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ success: false, message: "Product ID is required." }));
                }

                updateProduct(id, quantity, (err, result) => {
                    res.writeHead(200, { "Content-Type": "application/json" });

                    if (err) {
                        res.end(JSON.stringify({ success: false, message: "Error updating product", error: err.message }));
                    } else {
                        res.end(JSON.stringify({ success: true, message: "Product updated successfully" }));
                    }
                });

            } catch (error) {
                console.error(" JSON Parsing Error:", error.message);
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, message: "Invalid JSON format" }));
            }

        } else if (req.method === "PUT" && req.url.startsWith("/update-stock/")) {
            const productId = req.url.split("/")[2]; 
            try {
                const { quantity } = JSON.parse(body);

                if (!quantity) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ success: false, message: "Quantity is required" }));
                }

                updateProduct(productId, quantity, (err, result) => {
                    res.writeHead(200, { "Content-Type": "application/json" });

                    if (err) {
                        res.end(JSON.stringify({ success: false, message: "Error updating stock", error: err.message }));
                    } else {
                        res.end(JSON.stringify({ success: true, message: "Stock updated successfully" }));
                    }
                });

            } catch (error) {
                console.error(" JSON Parsing Error:", error.message);
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, message: "Invalid JSON format" }));
            }

        } else if (req.method === "OPTIONS") {
            res.writeHead(204);
            res.end();

        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
        }
    });
});

// Start server
server.listen(5001, () => {
    console.log(" Server running on port 5001");
});
