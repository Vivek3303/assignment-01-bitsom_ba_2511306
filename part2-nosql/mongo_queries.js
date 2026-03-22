// OP1: insertMany() — insert all 3 documents from sample_documents.json
db.products.insertMany([
    {
        "product_id": "ELEC-101",
        "category": "Electronics",
        "name": "Noise-Canceling Wireless Headphones",
        "price": 24999,
        "specs": { "voltage_v": 5, "warranty_years": 2, "battery_life_hours": 30 },
        "features": ["bluetooth", "active noise cancellation", "built-in microphone"]
    },
    {
        "product_id": "CLOT-202",
        "category": "Clothing",
        "name": "Men's Classic Cotton T-Shirt",
        "price": 899,
        "attributes": { "sizes_available": ["S", "M", "L", "XL"], "material": "100% Cotton", "color": "Navy Blue" },
        "care_instructions": { "wash": "Machine wash cold", "iron": "Low heat, inside out" }
    },
    {
        "product_id": "GROC-303",
        "category": "Groceries",
        "name": "Organic Almond Milk 1L",
        "price": 350,
        "expiry_date": "2024-12-15",
        "nutrition_info": { "calories_per_100ml": 15, "protein_g": 0.5, "is_vegan": true, "allergens": ["Tree Nuts"] }
    }
]);

// OP2: find() — retrieve all Electronics products with price > 20000
db.products.find({ 
    category: "Electronics", 
    price: { $gt: 20000 } 
});

// OP3: find() — retrieve all Groceries expiring before 2025-01-01
db.products.find({ 
    category: "Groceries", 
    expiry_date: { $lt: "2025-01-01" } 
});

// OP4: updateOne() — add a "discount_percent" field to a specific product
db.products.updateOne(
    { product_id: "ELEC-101" }, 
    { $set: { discount_percent: 15 } }
);

// OP5: createIndex() — create an index on category field and explain why
db.products.createIndex({ category: 1 });
/* Explanation: Creating an index on the 'category' field significantly improves query performance. 
Because our platform frequently filters products by category (e.g., retrieving all Electronics or Groceries), 
an index prevents MongoDB from performing a "collection scan" (reading every single document in the database). 
Instead, it can use the index to jump directly to the relevant documents, resulting in faster and more efficient reads.
*/
