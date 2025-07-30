# K6 Performance Testing Suite

This repository contains a collection of **k6 performance and load testing scripts** organized by test type.  
Each test folder includes:
- **Test script** (`.js`)
- **Summary report** (`summary.html`) generated after running the test

---

## 📂 Folder Structure & Reports

| Test Type     | Script | Report |
|---------------|--------|--------|
| **Main Script** | [main-script.js](main-script/main-script.js) | [summary.html](main-script/summary.html) |
| **Smoke Test** | [smoke-test.js](smoke-test/smoke-test.js) | [summary.html](smoke-test/summary.html) |
| **Spike Test** | [spike-test.js](spike-test/spike-test.js) | [summary.html](spike-test/summary.html) |
| **Load Test**  | [load-test.js](load-test/load-test.js)     | [summary.html](load-test/summary.html) |
| **Stress Test**| [stress-test.js](stress-test/stress-test.js) | [summary.html](stress-test/summary.html) |

---

## 📝 Test Descriptions

- **Main Script** – Base performance script used for reference or baseline testing.
- **Smoke Test** – Quick and light test to ensure the system is up and running without heavy load.
- **Spike Test** – Simulates sudden traffic spikes to check how the system handles rapid load increases.
- **Load Test** – Measures performance under expected user load to validate stability and response time.
- **Stress Test** – Pushes the system beyond normal load to identify breaking points and bottlenecks.

---

## ▶️ How to Run a Test

Make sure you have **k6** installed:  
```bash
# Install (Mac/Linux with Homebrew)
brew install k6

# Windows (using Chocolatey)
choco install k6
