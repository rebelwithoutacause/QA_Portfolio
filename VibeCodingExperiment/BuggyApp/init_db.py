import sqlite3
import os

# Remove existing database if it exists
if os.path.exists('vulnerable_app.db'):
    os.remove('vulnerable_app.db')

# Create database and tables
conn = sqlite3.connect('vulnerable_app.db')
cursor = conn.cursor()

# Create users table
cursor.execute('''
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        is_admin INTEGER DEFAULT 0
    )
''')

# Create products table
cursor.execute('''
    CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL
    )
''')

# Create comments table
cursor.execute('''
    CREATE TABLE comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        comment TEXT NOT NULL
    )
''')

# Insert sample users (VULNERABLE: plain text passwords)
cursor.execute("INSERT INTO users (username, password, email, is_admin) VALUES ('admin', 'admin', 'admin@example.com', 1)")
cursor.execute("INSERT INTO users (username, password, email, is_admin) VALUES ('user1', 'password123', 'user1@example.com', 0)")
cursor.execute("INSERT INTO users (username, password, email, is_admin) VALUES ('alice', 'alice123', 'alice@example.com', 0)")
cursor.execute("INSERT INTO users (username, password, email, is_admin) VALUES ('bob', 'bob456', 'bob@example.com', 0)")

# Insert sample products
cursor.execute("INSERT INTO products (name, description, price) VALUES ('Laptop', 'High performance laptop', 999.99)")
cursor.execute("INSERT INTO products (name, description, price) VALUES ('Mouse', 'Wireless mouse', 29.99)")
cursor.execute("INSERT INTO products (name, description, price) VALUES ('Keyboard', 'Mechanical keyboard', 89.99)")
cursor.execute("INSERT INTO products (name, description, price) VALUES ('Monitor', '27 inch 4K monitor', 399.99)")

# Insert sample comments
cursor.execute("INSERT INTO comments (name, comment) VALUES ('John', 'This is a great app!')")
cursor.execute("INSERT INTO comments (name, comment) VALUES ('Jane', 'Very helpful, thank you!')")

conn.commit()
conn.close()

print("Database initialized successfully!")
print("\nSample accounts:")
print("  Admin: username=admin, password=admin")
print("  User: username=user1, password=password123")
print("\nThe database contains intentional vulnerabilities for testing.")
