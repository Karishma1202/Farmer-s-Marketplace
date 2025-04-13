import React, { useEffect, useState } from "react";

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handlePurchase = async (productId, purchaseQuantity) => {
        const response = await fetch("http://localhost:8003/purchase-product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, purchaseQuantity }),
        });

        const data = await response.json();
        if (data.success) {
            alert("Purchase successful! Remaining stock: " + data.remainingQuantity);
            setProducts(products.map(p => 
                p.id === productId ? { ...p, quantity: data.remainingQuantity } : p
            ));
        } else {
            alert(data.message);
        }
    };

    return (
        <div>
            <h2>Available Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <strong>{product.product_name}</strong> - {product.quantity} {product.unit_type} 
                        <br />
                        {product.quantity > 0 ? (
                            <button onClick={() => handlePurchase(product.id, 1)}>Buy 1</button>
                        ) : (
                            <span style={{ color: "red" }}>Out of Stock</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
