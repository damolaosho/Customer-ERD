-- Create Categories table
CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL
);

-- Create Products table
CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL,
    CategoryID INT REFERENCES Categories(CategoryID)
);

-- Create Images table
CREATE TABLE Images (
    ImageID SERIAL PRIMARY KEY,
    ProductID INT REFERENCES Products(ProductID),
    ImageURL VARCHAR(255) NOT NULL
);

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

-- Create Orders table
CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    CustomerID INT REFERENCES Customers(CustomerID),
    OrderDate DATE NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL
);

-- Create OrderDetails table
CREATE TABLE OrderDetails (
    OrderDetailsID SERIAL PRIMARY KEY,
    OrderID INT REFERENCES Orders(OrderID),
    ProductID INT REFERENCES Products(ProductID),
    Quantity INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL
);

-- Create Interactions table
CREATE TABLE Interactions (
    InteractionID SERIAL PRIMARY KEY,
    CustomerID INT REFERENCES Customers(CustomerID),
    InteractionDate DATE NOT NULL,
    InteractionType VARCHAR(255) NOT NULL,
    InteractionDetails TEXT
);
