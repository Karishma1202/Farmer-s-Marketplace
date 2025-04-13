const http = require('http');
const mysql = require('mysql');

const PORT = 8000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Kari@123', 
    database: 'framers' 
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Create HTTP server
const server = http.createServer((req, res) => {
    // Set headers for CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Handle POST requests for placing orders
    if (req.method === 'POST' && req.url === '/api/orders') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', () => {
            try {
                const order = JSON.parse(body);
                console.log("Received order:", order);

                const query = `
                INSERT INTO orders 
                (customer_name, customer_email, customer_address, customer_phone, cart, total_amount, payment_method, payment_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                
            const values = [
                order.customer.name,
                order.customer.email,
                order.customer.address,
                order.customer.phone,
                JSON.stringify(order.cart),
                order.totalAmount,
                order.paymentMethod,
                order.paymentId
            ];


                db.query(query, values, (error, results) => {
                    if (error) {
                        console.error("Database insertion error:", error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Failed to place order' }));
                        return;
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Order placed successfully!', orderId: results.insertId }));
                });
            } catch (error) {
                console.error("Error parsing request body:", error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid request body' }));
                return;
            }
        });
    }

    // Handle GET requests for fetching orders
    else if (req.method === 'GET' && req.url === '/api/get-orders') {
        const query = 'SELECT * FROM orders';

        db.query(query, (error, results) => {
            if (error) {
                console.error("Database retrieval error:", error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to retrieve orders' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    }

    // Handle invalid requests
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request' }));
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
