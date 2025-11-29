from flask import Flask, request, render_template_string, redirect, make_response, send_from_directory
import sqlite3
import os

app = Flask(__name__)
app.secret_key = 'weak_secret_key_123'
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Database connection helper
def get_db():
    conn = sqlite3.connect('vulnerable_app.db')
    conn.row_factory = sqlite3.Row
    return conn

# Shared CSS template
STYLE_TEMPLATE = '''
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
        color: #e0e0e0;
        min-height: 100vh;
        padding: 20px;
    }
    .container {
        max-width: 1200px;
        margin: 0 auto;
        background: rgba(30, 30, 46, 0.95);
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        padding: 40px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .header {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 2px solid #ff6b6b;
    }
    .logo {
        font-size: 2.5em;
        font-weight: bold;
        background: linear-gradient(45deg, #ff6b6b, #ee5a6f, #ff6b6b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 10px;
        text-shadow: 0 0 30px rgba(255, 107, 107, 0.3);
    }
    .subtitle {
        color: #a0a0a0;
        font-size: 1.1em;
    }
    .warning-badge {
        display: inline-block;
        background: rgba(255, 107, 107, 0.2);
        color: #ff6b6b;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9em;
        margin-top: 10px;
        border: 1px solid #ff6b6b;
    }
    h1 { color: #ff6b6b; margin-bottom: 20px; font-size: 2em; }
    h2 { color: #4ecdc4; margin: 30px 0 15px 0; font-size: 1.5em; }
    .nav-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin: 30px 0;
    }
    .nav-card {
        background: linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(255, 107, 107, 0.1));
        padding: 25px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
        text-decoration: none;
        display: block;
    }
    .nav-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
        border-color: #ff6b6b;
    }
    .nav-card h3 {
        color: #4ecdc4;
        margin-bottom: 10px;
        font-size: 1.3em;
    }
    .nav-card p {
        color: #b0b0b0;
        font-size: 0.9em;
    }
    .vulnerability-tag {
        display: inline-block;
        background: rgba(255, 107, 107, 0.2);
        color: #ff6b6b;
        padding: 3px 8px;
        border-radius: 3px;
        font-size: 0.75em;
        margin-top: 8px;
    }
    input[type="text"], input[type="password"], input[type="email"], textarea, input[type="file"] {
        width: 100%;
        padding: 12px;
        margin: 8px 0;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 5px;
        color: #e0e0e0;
        font-size: 1em;
    }
    input:focus, textarea:focus {
        outline: none;
        border-color: #4ecdc4;
        box-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
    }
    button, .btn {
        background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
        color: white;
        padding: 12px 30px;
        border: none;
        border-radius: 5px;
        font-size: 1em;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
        margin-top: 10px;
    }
    button:hover, .btn:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
    }
    .hint {
        background: rgba(78, 205, 196, 0.1);
        border-left: 3px solid #4ecdc4;
        padding: 12px;
        margin: 15px 0;
        border-radius: 5px;
        font-size: 0.9em;
    }
    .hint code {
        background: rgba(0, 0, 0, 0.3);
        padding: 2px 6px;
        border-radius: 3px;
        color: #4ecdc4;
    }
    a {
        color: #4ecdc4;
        text-decoration: none;
        transition: color 0.3s;
    }
    a:hover { color: #ff6b6b; }
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        background: rgba(0, 0, 0, 0.2);
    }
    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    th {
        background: rgba(255, 107, 107, 0.2);
        color: #ff6b6b;
        font-weight: bold;
    }
    .comment-box {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 15px;
        margin: 15px 0;
        border-radius: 8px;
        border-left: 3px solid #4ecdc4;
    }
    .comment-box strong {
        color: #4ecdc4;
    }
    .results {
        background: rgba(0, 0, 0, 0.2);
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
    }
    .success {
        background: rgba(78, 205, 196, 0.2);
        border: 1px solid #4ecdc4;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
    }
    .error {
        background: rgba(255, 107, 107, 0.2);
        border: 1px solid #ff6b6b;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
    }
    label {
        color: #b0b0b0;
        display: block;
        margin-top: 15px;
        font-weight: 500;
    }
    .home-link {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .password-toggle {
        position: relative;
    }
    .password-toggle input {
        padding-right: 50px;
    }
    .toggle-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(78, 205, 196, 0.2);
        border: 1px solid #4ecdc4;
        color: #4ecdc4;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 0.8em;
        margin-top: 4px;
    }
    .toggle-btn:hover {
        background: rgba(78, 205, 196, 0.3);
    }
</style>
'''

# Home page
@app.route('/')
def home():
    username = request.cookies.get('username')
    is_logged_in = username is not None

    # Login status section
    if is_logged_in:
        login_status = f'''
            <div style="background: rgba(78, 205, 196, 0.1); padding: 15px; border-radius: 10px; border: 1px solid #4ecdc4; margin-bottom: 30px;">
                <p style="margin: 0;">
                    <strong>Logged in as:</strong> {username}
                    <a href="/logout" style="margin-left: 20px; color: #ff6b6b;">Logout</a>
                </p>
            </div>
        '''
        welcome_msg = f'Welcome back, {username}!'
    else:
        login_status = f'''
            <div style="background: rgba(255, 107, 107, 0.1); padding: 20px; border-radius: 10px; border: 1px solid #ff6b6b; margin-bottom: 30px;">
                <h3 style="color: #ff6b6b; margin-bottom: 15px;">Quick Login (Test Accounts)</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
                        <p style="margin: 0 0 8px 0;"><strong style="color: #4ecdc4;">👤 Regular User</strong></p>
                        <p style="margin: 5px 0; font-size: 0.9em;">Username: <code>user1</code></p>
                        <p style="margin: 5px 0; font-size: 0.9em;">Password: <code>password123</code></p>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
                        <p style="margin: 0 0 8px 0;"><strong style="color: #ff6b6b;">⭐ Administrator</strong></p>
                        <p style="margin: 5px 0; font-size: 0.9em;">Username: <code>admin</code></p>
                        <p style="margin: 5px 0; font-size: 0.9em;">Password: <code>admin</code></p>
                    </div>
                </div>
                <p style="margin: 15px 0 0 0; text-align: center;">
                    <a href="/login" class="btn" style="display: inline-block;">Go to Login Page</a>
                </p>
            </div>
        '''
        welcome_msg = 'Welcome to Security Testing Lab'

    return render_template_string(f'''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Security Testing Lab</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            {STYLE_TEMPLATE}
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🔒 Security Testing Lab</div>
                    <div class="subtitle">Intentionally Vulnerable Web Application</div>
                    <div class="warning-badge">⚠️ FOR EDUCATIONAL USE ONLY</div>
                </div>

                <h1>{welcome_msg}</h1>

                {login_status}

                <p style="margin-bottom: 30px; color: #b0b0b0;">This environment is designed to help you understand and practice identifying common web vulnerabilities in a safe, controlled setting.</p>

                <div class="nav-grid">
                    <a href="/login" class="nav-card">
                        <h3>🔐 Login</h3>
                        <p>Test authentication vulnerabilities</p>
                        <span class="vulnerability-tag">SQL Injection</span>
                        <span class="vulnerability-tag">Broken Auth</span>
                    </a>

                    <a href="/register" class="nav-card">
                        <h3>📝 Register</h3>
                        <p>Create new accounts with weak validation</p>
                        <span class="vulnerability-tag">SQL Injection</span>
                    </a>

                    <a href="/search" class="nav-card">
                        <h3>🔍 Search</h3>
                        <p>Search products database</p>
                        <span class="vulnerability-tag">SQL Injection</span>
                        <span class="vulnerability-tag">Reflected XSS</span>
                    </a>

                    <a href="/comments" class="nav-card">
                        <h3>💬 Comments</h3>
                        <p>Post and view user comments</p>
                        <span class="vulnerability-tag">Stored XSS</span>
                        <span class="vulnerability-tag">HTML Injection</span>
                    </a>

                    <a href="/upload" class="nav-card">
                        <h3>📤 File Upload</h3>
                        <p>Upload files without restrictions</p>
                        <span class="vulnerability-tag">File Upload</span>
                    </a>

                    <a href="/profile?id=1" class="nav-card">
                        <h3>👤 User Profile</h3>
                        <p>View user information</p>
                        <span class="vulnerability-tag">IDOR</span>
                    </a>

                    <a href="/admin" class="nav-card">
                        <h3>⚙️ Admin Panel</h3>
                        <p>Administrative functions</p>
                        <span class="vulnerability-tag">Broken Auth</span>
                        <span class="vulnerability-tag">Cookie Manipulation</span>
                    </a>
                </div>

                <div class="hint">
                    <strong>💡 Getting Started:</strong>
                    <ul style="margin-left: 20px; margin-top: 10px;">
                        <li>Default credentials: <code>admin</code> / <code>admin</code></li>
                        <li>All vulnerabilities are intentional and documented</li>
                        <li>Each page contains hints for exploitation</li>
                        <li>Use browser DevTools to manipulate cookies and requests</li>
                    </ul>
                </div>
            </div>
        </body>
        </html>
    ''')

# VULNERABILITY 1 & 6: SQL Injection + Broken Authentication
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        # VULNERABLE: Raw SQL query without parameterization
        conn = get_db()
        query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
        cursor = conn.cursor()
        cursor.execute(query)
        user = cursor.fetchone()
        conn.close()

        if user:
            # VULNERABLE: Plain text cookie for session
            resp = make_response(redirect('/'))
            resp.set_cookie('user_id', str(user['id']))
            resp.set_cookie('username', user['username'])
            resp.set_cookie('is_admin', str(user['is_admin']))
            return resp
        else:
            return render_template_string(f'''
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Login Failed - Security Testing Lab</title>
                    {STYLE_TEMPLATE}
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">🔒 Security Testing Lab</div>
                        </div>
                        <div class="error">
                            <h1>❌ Login Failed</h1>
                            <p>Invalid credentials provided</p>
                        </div>
                        <a href="/login" class="btn">Try Again</a>
                        <div class="home-link">
                            <a href="/">← Back to Home</a>
                        </div>
                    </div>
                </body>
                </html>
            ''')

    return render_template_string(f'''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Login - Security Testing Lab</title>
            {STYLE_TEMPLATE}
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🔒 Security Testing Lab</div>
                    <div class="subtitle">Authentication Testing</div>
                </div>

                <h1>🔐 Login</h1>
                <p style="color: #b0b0b0; margin-bottom: 20px;">Test SQL injection and authentication bypass techniques</p>

                <form method="POST">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter username" required>

                    <label>Password</label>
                    <div class="password-toggle">
                        <input type="password" id="password" name="password" placeholder="Enter password" required>
                        <button type="button" class="toggle-btn" onclick="togglePassword()">👁️ Show</button>
                    </div>

                    <button type="submit">Login</button>
                </form>

                <script>
                function togglePassword() {{
                    const passwordInput = document.getElementById('password');
                    const toggleBtn = event.target;

                    if (passwordInput.type === 'password') {{
                        passwordInput.type = 'text';
                        toggleBtn.innerHTML = '👁️ Hide';
                    }} else {{
                        passwordInput.type = 'password';
                        toggleBtn.innerHTML = '👁️ Show';
                    }}
                }}
                </script>

                <p style="margin-top: 20px;"><a href="/register">Don't have an account? Register here</a></p>

                <div class="hint">
                    <strong>🎯 Vulnerability Hints:</strong><br>
                    <strong>SQL Injection:</strong> Try <code>admin' OR '1'='1</code> as username<br>
                    <strong>Default Credentials:</strong> <code>admin</code> / <code>admin</code><br>
                    <strong>Cookie-based Auth:</strong> Check DevTools after login
                </div>

                <div class="home-link">
                    <a href="/">← Back to Home</a>
                </div>
            </div>
        </body>
        </html>
    ''')

# VULNERABILITY 1 & 6: SQL Injection in Registration
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        email = request.form.get('email')

        # VULNERABLE: No password hashing, raw SQL
        conn = get_db()
        query = f"INSERT INTO users (username, password, email, is_admin) VALUES ('{username}', '{password}', '{email}', 0)"
        try:
            cursor = conn.cursor()
            cursor.execute(query)
            conn.commit()
            conn.close()
            return redirect('/login')
        except Exception as e:
            conn.close()
            return f"Error: {str(e)}"

    return render_template_string(f'''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Register - Security Testing Lab</title>
            {STYLE_TEMPLATE}
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🔒 Security Testing Lab</div>
                    <div class="subtitle">Account Registration</div>
                </div>

                <h1>📝 Register New Account</h1>
                <p style="color: #b0b0b0; margin-bottom: 20px;">Create a new account (no validation applied)</p>

                <form method="POST">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Choose a username" required>

                    <label>Password</label>
                    <div class="password-toggle">
                        <input type="password" id="reg-password" name="password" placeholder="Choose a password" required>
                        <button type="button" class="toggle-btn" onclick="toggleRegPassword()">👁️ Show</button>
                    </div>

                    <label>Email</label>
                    <input type="email" name="email" placeholder="Enter your email" required>

                    <button type="submit">Create Account</button>
                </form>

                <script>
                function toggleRegPassword() {{
                    const passwordInput = document.getElementById('reg-password');
                    const toggleBtn = event.target;

                    if (passwordInput.type === 'password') {{
                        passwordInput.type = 'text';
                        toggleBtn.innerHTML = '👁️ Hide';
                    }} else {{
                        passwordInput.type = 'password';
                        toggleBtn.innerHTML = '👁️ Show';
                    }}
                }}
                </script>

                <p style="margin-top: 20px;"><a href="/login">Already have an account? Login here</a></p>

                <div class="hint">
                    <strong>🎯 Vulnerability Hints:</strong><br>
                    <strong>SQL Injection:</strong> Inject malicious SQL in any field<br>
                    <strong>No Password Hashing:</strong> Passwords stored in plain text<br>
                    <strong>No Validation:</strong> Any input is accepted
                </div>

                <div class="home-link">
                    <a href="/">← Back to Home</a>
                </div>
            </div>
        </body>
        </html>
    ''')

# VULNERABILITY 1 & 4: SQL Injection + Reflected XSS in Search
@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    results = []

    if query:
        # VULNERABLE: Raw SQL query
        conn = get_db()
        sql = f"SELECT * FROM products WHERE name LIKE '%{query}%'"
        cursor = conn.cursor()
        try:
            cursor.execute(sql)
            results = cursor.fetchall()
        except Exception as e:
            results = [{'error': str(e)}]
        conn.close()

    # VULNERABLE: Reflected XSS - query displayed without escaping
    results_html = '<div class="results"><h2>Search Results:</h2>'
    if results:
        results_html += '<ul style="list-style: none; padding: 0;">'
        for r in results:
            if 'error' in dict(r):
                results_html += f'<li style="color: #ff6b6b; padding: 10px; background: rgba(255,107,107,0.1); margin: 5px 0; border-radius: 5px;">Error: {r["error"]}</li>'
            else:
                results_html += f'<li style="padding: 10px; background: rgba(78,205,196,0.1); margin: 5px 0; border-radius: 5px;"><strong>{dict(r).get("name", "N/A")}</strong> - {dict(r).get("description", "No description")} - ${dict(r).get("price", "0.00")}</li>'
        results_html += '</ul>'
    else:
        results_html += '<p style="color: #a0a0a0;">No results found</p>'
    results_html += '</div>'

    return render_template_string(f'''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Search - Security Testing Lab</title>
            {STYLE_TEMPLATE}
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🔒 Security Testing Lab</div>
                    <div class="subtitle">Product Search</div>
                </div>

                <h1>🔍 Search Products</h1>
                <p style="color: #b0b0b0; margin-bottom: 20px;">Search the product database</p>

                <form method="GET">
                    <label>Search Query</label>
                    <input type="text" name="query" value="{query}" placeholder="Enter search term">
                    <button type="submit">Search</button>
                </form>

                <h2 style="margin-top: 30px;">Results for: {query}</h2>
                {results_html}

                <div class="hint">
                    <strong>🎯 Vulnerability Hints:</strong><br>
                    <strong>Reflected XSS:</strong> Try <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code><br>
                    <strong>XSS Alternative:</strong> <code>&lt;img src=x onerror=alert(1)&gt;</code><br>
                    <strong>SQL Injection:</strong> Try <code>' OR '1'='1</code><br>
                    <strong>Union Injection:</strong> <code>' UNION SELECT id,username,password,email FROM users--</code>
                </div>

                <div class="home-link">
                    <a href="/">← Back to Home</a>
                </div>
            </div>
        </body>
        </html>
    ''')

# VULNERABILITY 2 & 3: HTML Injection + Stored XSS in Comments
@app.route('/comments', methods=['GET', 'POST'])
def comments():
    if request.method == 'POST':
        name = request.form.get('name')
        comment = request.form.get('comment')

        # VULNERABLE: No sanitization, stored directly
        conn = get_db()
        query = f"INSERT INTO comments (name, comment) VALUES ('{name}', '{comment}')"
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        conn.close()
        return redirect('/comments')

    # Get all comments
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM comments ORDER BY id DESC")
    all_comments = cursor.fetchall()
    conn.close()

    # VULNERABLE: Display comments without escaping
    comments_html = ''
    for c in all_comments:
        comments_html += f'<div class="comment-box"><strong>{c["name"]}</strong><br><div style="margin-top: 8px;">{c["comment"]}</div></div>'

    return render_template_string(f'''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Comments - Security Testing Lab</title>
            {STYLE_TEMPLATE}
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🔒 Security Testing Lab</div>
                    <div class="subtitle">User Comments</div>
                </div>

                <h1>💬 Comments Section</h1>
                <p style="color: #b0b0b0; margin-bottom: 20px;">Post and view user comments (no sanitization)</p>

                <form method="POST">
                    <label>Your Name</label>
                    <input type="text" name="name" placeholder="Enter your name" required>

                    <label>Your Comment</label>
                    <textarea name="comment" rows="5" placeholder="Write your comment here..." required></textarea>

                    <button type="submit">Post Comment</button>
                </form>

                <h2 style="margin-top: 40px;">All Comments</h2>
                {comments_html if comments_html else '<p style="color: #a0a0a0;">No comments yet. Be the first to comment!</p>'}

                <div class="hint">
                    <strong>🎯 Vulnerability Hints:</strong><br>
                    <strong>Stored XSS:</strong> Try <code>&lt;script&gt;alert('Stored XSS')&lt;/script&gt;</code><br>
                    <strong>HTML Injection:</strong> Try <code>&lt;h1 style="color:red"&gt;Injected!&lt;/h1&gt;</code><br>
                    <strong>Image XSS:</strong> Try <code>&lt;img src=x onerror=alert(document.cookie)&gt;</code><br>
                    <strong>Note:</strong> These payloads persist and execute for all users!
                </div>

                <div class="home-link">
                    <a href="/">← Back to Home</a>
                </div>
            </div>
        </body>
        </html>
    ''')

# VULNERABILITY 5: File Upload without validation
@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        file = request.files.get('file')
        if file:
            # VULNERABLE: No file type checking, no extension validation
            filename = file.filename
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return render_template_string(f'''
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Upload Success - Security Testing Lab</title>
                    {STYLE_TEMPLATE}
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">🔒 Security Testing Lab</div>
                        </div>
                        <div class="success">
                            <h1>✅ File Uploaded Successfully!</h1>
                            <p><strong>Filename:</strong> {filename}</p>
                            <p><strong>Location:</strong> /uploads/{filename}</p>
                        </div>
                        <a href="/uploads/{filename}" class="btn">View Uploaded File</a>
                        <a href="/upload" class="btn" style="background: linear-gradient(135deg, #4ecdc4, #44a08d); margin-left: 10px;">Upload Another</a>
                        <div class="home-link">
                            <a href="/">← Back to Home</a>
                        </div>
                    </div>
                </body>
                </html>
            ''')

    return render_template_string(f'''
        <!DOCTYPE html>
        <html>
        <head>
            <title>File Upload - Security Testing Lab</title>
            {STYLE_TEMPLATE}
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🔒 Security Testing Lab</div>
                    <div class="subtitle">File Upload Testing</div>
                </div>

                <h1>📤 File Upload</h1>
                <p style="color: #b0b0b0; margin-bottom: 20px;">Upload any file without validation or restrictions</p>

                <form method="POST" enctype="multipart/form-data">
                    <label>Choose File</label>
                    <input type="file" name="file" required>
                    <button type="submit">Upload File</button>
                </form>

                <div class="hint">
                    <strong>🎯 Vulnerability Hints:</strong><br>
                    <strong>Malicious HTML:</strong> Upload an HTML file with embedded JavaScript<br>
                    <strong>Script Files:</strong> Try uploading .js, .php, or other executable files<br>
                    <strong>No Validation:</strong> File type, size, and extension are not checked<br>
                    <strong>Direct Access:</strong> Uploaded files are served directly from /uploads/
                </div>

                <div class="home-link">
                    <a href="/">← Back to Home</a>
                </div>
            </div>
        </body>
        </html>
    ''')

# Serve uploaded files (VULNERABLE)
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# VULNERABILITY 7: IDOR - Insecure Direct Object Reference
@app.route('/profile')
def profile():
    user_id = request.args.get('id', '1')

    # VULNERABLE: No authorization check
    conn = get_db()
    query = f"SELECT * FROM users WHERE id = {user_id}"
    cursor = conn.cursor()
    cursor.execute(query)
    user = cursor.fetchone()
    conn.close()

    if user:
        return render_template_string(f'''
            <!DOCTYPE html>
            <html>
            <head>
                <title>User Profile - Security Testing Lab</title>
                {STYLE_TEMPLATE}
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">🔒 Security Testing Lab</div>
                        <div class="subtitle">User Profile</div>
                    </div>

                    <h1>👤 User Profile</h1>
                    <p style="color: #b0b0b0; margin-bottom: 20px;">Viewing profile for user ID: {user['id']}</p>

                    <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
                        <table style="background: transparent;">
                            <tr><td style="color: #4ecdc4;"><strong>User ID:</strong></td><td>{user['id']}</td></tr>
                            <tr><td style="color: #4ecdc4;"><strong>Username:</strong></td><td>{user['username']}</td></tr>
                            <tr><td style="color: #4ecdc4;"><strong>Email:</strong></td><td>{user['email']}</td></tr>
                            <tr><td style="color: #ff6b6b;"><strong>Password:</strong></td><td>{user['password']}</td></tr>
                            <tr><td style="color: #4ecdc4;"><strong>Admin Status:</strong></td><td>{'Yes ⭐' if user['is_admin'] else 'No'}</td></tr>
                        </table>
                    </div>

                    <div class="hint">
                        <strong>🎯 Vulnerability Hints:</strong><br>
                        <strong>IDOR (Insecure Direct Object Reference):</strong><br>
                        Change the <code>id</code> parameter in the URL to view other users' profiles<br>
                        Try: <code>/profile?id=2</code>, <code>/profile?id=3</code>, <code>/profile?id=4</code><br>
                        <strong>Information Disclosure:</strong> Passwords displayed in plain text!
                    </div>

                    <div class="home-link">
                        <a href="/">← Back to Home</a>
                    </div>
                </div>
            </body>
            </html>
        ''')
    else:
        return render_template_string(f'''
            <!DOCTYPE html>
            <html>
            <head>
                <title>User Not Found - Security Testing Lab</title>
                {STYLE_TEMPLATE}
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">🔒 Security Testing Lab</div>
                    </div>
                    <div class="error">
                        <h1>❌ User Not Found</h1>
                        <p>No user exists with ID: {user_id}</p>
                    </div>
                    <div class="home-link">
                        <a href="/">← Back to Home</a>
                    </div>
                </div>
            </body>
            </html>
        ''')

# VULNERABILITY 6: Broken Authentication - Admin page with no auth check
@app.route('/admin')
def admin():
    # VULNERABLE: No authentication check, just checking cookie value
    is_admin = request.cookies.get('is_admin', '0')

    # Even worse: just check cookie value without server validation
    if is_admin == '1':
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        conn.close()

        users_html = '<table><tr><th>ID</th><th>Username</th><th>Password</th><th>Email</th><th>Admin</th></tr>'
        for u in users:
            admin_badge = '⭐ Yes' if u["is_admin"] else 'No'
            users_html += f'<tr><td>{u["id"]}</td><td>{u["username"]}</td><td>{u["password"]}</td><td>{u["email"]}</td><td>{admin_badge}</td></tr>'
        users_html += '</table>'

        return render_template_string(f'''
            <!DOCTYPE html>
            <html>
            <head>
                <title>Admin Panel - Security Testing Lab</title>
                {STYLE_TEMPLATE}
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">🔒 Security Testing Lab</div>
                        <div class="subtitle">Administrator Dashboard</div>
                    </div>

                    <div class="success">
                        <h1>⚙️ Admin Panel</h1>
                        <p>✅ Access Granted - You have administrator privileges</p>
                    </div>

                    <h2>👥 All Users Database</h2>
                    {users_html}

                    <div class="hint">
                        <strong>🎯 How You Got Here:</strong><br>
                        <strong>Cookie Manipulation:</strong> The <code>is_admin</code> cookie was set to <code>1</code><br>
                        <strong>No Server Validation:</strong> The server trusts client-side cookies without verification<br>
                        <strong>Security Issue:</strong> Authentication should NEVER rely solely on cookies!<br>
                        <br>
                        <strong>To Test:</strong> Open DevTools → Application → Cookies → Set <code>is_admin=1</code>
                    </div>

                    <div class="home-link">
                        <a href="/">← Back to Home</a>
                    </div>
                </div>
            </body>
            </html>
        ''')
    else:
        return render_template_string(f'''
            <!DOCTYPE html>
            <html>
            <head>
                <title>Access Denied - Security Testing Lab</title>
                {STYLE_TEMPLATE}
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">🔒 Security Testing Lab</div>
                        <div class="subtitle">Administrator Dashboard</div>
                    </div>

                    <div class="error">
                        <h1>🚫 Access Denied</h1>
                        <p>You must be an administrator to access this page.</p>
                        <p>Current admin status: <code>is_admin={is_admin}</code></p>
                    </div>

                    <div class="hint">
                        <strong>🎯 Vulnerability Hints:</strong><br>
                        <strong>Cookie Manipulation:</strong><br>
                        1. Open DevTools (F12)<br>
                        2. Go to Application → Cookies<br>
                        3. Find or create <code>is_admin</code> cookie<br>
                        4. Set its value to <code>1</code><br>
                        5. Refresh this page<br>
                        <br>
                        <strong>Why This Works:</strong> The application trusts client-side cookies for authorization!
                    </div>

                    <div class="home-link">
                        <a href="/">← Back to Home</a>
                    </div>
                </div>
            </body>
            </html>
        ''')

# Logout route
@app.route('/logout')
def logout():
    resp = make_response(redirect('/'))
    # VULNERABLE: Simple cookie deletion, no session invalidation
    resp.set_cookie('user_id', '', expires=0)
    resp.set_cookie('username', '', expires=0)
    resp.set_cookie('is_admin', '', expires=0)
    return resp

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
