-- Create Categories table
CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL
);

INSERT INTO Categories (CategoryID, CategoryName) VALUES
(1, "Beverages"),
(2, "Dairy"),
(3, "Frozen Foods"),
(4, "Bakery"),
(5, "deli"),
(6, "meat"),
(7, "seafood"),
(8, "snack"),
(9, "condiments"),
(10, "canned food"),


-- Create Products table
CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL,
    CategoryID INT REFERENCES Categories(CategoryID)
);

INSERT INTO Products (ProductID, Name, Description, Price, StockQuantity, CategoryID) VALUES
(1, "CocaCola", "A coke based drink", 300, 5000, 1),
(2, "Peak milk", "Peak Milk sachet", 120, 10000, 2),
(3, "Chicken", "Laps of frozen chicken", 2600, 15000, 3),
(4, "yale bread", "a bread by yale", 500, 3000, 4),
(5, "digestive", "a digestive busicuit", 400, 5000, 5),
(6, "cow", "a cow meat", 4000, 200, 6),
(7, "prawn", "a seafood", 4000, 300, 7),
(8, "Trombone", "Chocolate", 5000, 5000, 8),
(9, "curry", "for club and country", 4000, 2000, 9),
(10, "geisha", "sardines", 900, 400, 10),
(11, "ginger bread", "a ginger with bread", 300, 5000, 4),
(12, "Titus", "sardine", 120, 10000, 10),



-- Create Images table
CREATE TABLE Images (
    ImageID SERIAL PRIMARY KEY,
    ProductID INT REFERENCES Products(ProductID),
    ImageURL VARCHAR(255) NOT NULL
);

INSERT INTO Images (ProductID, ImageURL) VALUES
(1, "\product_images\cocacola.jpg"),
(6, "\product_images\cow meat.jpg"),
(9, "\product_images\curry.jpg"),
(5, "\product_images\digestive.jpg"),
(3, "\product_images\frozen chicken.jpg"),
(10, "\product_images\geishasardine.jpg"),
(11, "\product_images\gingerbread.jpg"),
(2, "\product_images\peak milk.jpg"),
(7, "\product_images\prawn.jpg"),
(8, "\product_images\R.png"),
(12, "\product_images\titus.jpg"),
(4, "\product_images\yale bread.jpg");





-- Create Customers table
CREATE TABLE Customers (
    CustomerID SERIAL PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Address TEXT,
    PhoneNumber VARCHAR(15),
    ProfileImage VARCHAR(255)
);


INSERT INTO Customers (CustomerID, FirstName, LastName, Email, Password, Address, PhoneNumber, ProfileImage) VALUES 
(1, 'ogo', 'chukwu', 'ogo@gmail.com', 'byte77', 'orile iganmu', '0902223334', "customers\ogo.jpg"),
(2, 'suge', 'fist', 'g@t.com', 'tyr543', 'nsukka', '0802223331', "\customers\spiff.jpg"),
(2, 'ge', 'cep', '1q@e.com', 'tyr5q3', 'nsukka', '08022244231', "\customers\shola.jpg");


-- Create Orders table
CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    CustomerID INT REFERENCES Customers(CustomerID),
    OrderDate DATE NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL
);

INSERT INTO Orders (CustomerID, OrderDate, TotalAmount) VALUES
(1, '2024-01-28', 150.50),
(2, '2024-01-29', 200.75),
(3, '2024-01-30', 120.00),
(4, '2024-01-31', 180.25);

-- Create OrderDetails table
CREATE TABLE OrderDetails (
    OrderDetailsID SERIAL PRIMARY KEY,
    OrderID INT REFERENCES Orders(OrderID),
    ProductID INT REFERENCES Products(ProductID),
    Quantity INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL
);

-- Insert data into OrderDetails table
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Subtotal) VALUES
(1, 12, 2, 50.00),
(1, 2, 1, 100.50),
(2, 3, 3, 75.75),
(3, 5, 1, 30.00),
(3, 7, 2, 90.25),
(4, 8, 2, 120.25);


-- Create Interactions table
CREATE TABLE Interactions (
    InteractionID SERIAL PRIMARY KEY,
    CustomerID INT REFERENCES Customers(CustomerID),
    InteractionDate DATE NOT NULL,
    InteractionType VARCHAR(255) NOT NULL,
    InteractionDetails TEXT
);

INSERT INTO Interactions (CustomerID, InteractionDate, InteractionType, InteractionDetails) VALUES
(1, '2024-01-28', 'Feedback', 'Had a positive experience with our product.'),
(2, '2024-01-29', 'Support Request', 'Customer requested assistance with a technical issue.'),
(3, '2024-01-30', 'Query', 'Inquired about product availability and pricing.'),
(4, '2024-01-31', 'Complaint', 'Customer expressed dissatisfaction with service.');
