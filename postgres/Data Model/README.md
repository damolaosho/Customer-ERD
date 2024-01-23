# Database Schema
The database consists of the following tables:

Products: Stores information about the products available in the store, including product name, description, price, stock quantity, and the category it belongs to.

Categories: Manages product categories, allowing for the organization and categorization of products.

Customers: Contains customer details such as first name, last name, email, address, and phone number. It also includes a field for a customer's profile image.

Orders: Tracks customer orders, including the order date and total amount spent.

OrderDetails: Manages the details of each order, such as the products included, quantities, and subtotals.

Interactions: Records customer interactions, including the interaction date, type (e.g., inquiry, feedback), and details.

Images: Stores URLs of product images, linked to the respective products.

# Relationships
Products - Categories: One-to-Many relationship. Each product belongs to one category, but a category can have many products.

Customers - Orders: One-to-Many relationship. One customer can place many orders, but each order belongs to one customer.

Orders - OrderDetails: Many-to-One relationship. One order can have many order details, but each order detail belongs to one order.

Customers - Interactions: One-to-Many relationship. One customer can have many interactions, but each interaction belongs to one customer.

Products - Images: Many-to-One relationship. One product can have many images, but each image belongs to one product.


