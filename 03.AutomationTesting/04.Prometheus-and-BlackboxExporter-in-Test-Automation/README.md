Prometheus & Blackbox Exporter in Test Automation

This project demonstrates how Prometheus and Blackbox Exporter can be integrated into test automation workflows to provide real-time logging, monitoring, and reporting.

📌 Overview
Prometheus: Collects and stores time-series data from automation tests.
Blackbox Exporter: Probes HTTP endpoints to check availability, latency, and response times.
probe_http_duration_seconds: Key metric used to track HTTP request performance.

📂 Files
prometheus.yml – Prometheus configuration for scraping targets.
blackbox_exporter.yml – Blackbox Exporter configuration for HTTP probes.
probe_http_duration_seconds.png – Example visualization of HTTP probe duration metrics.

⚙ How It Works
Blackbox Exporter sends HTTP probes to a target URL.
Prometheus scrapes the metrics exposed by Blackbox Exporter.
Metrics such as probe_http_duration_seconds are collected for monitoring latency and uptime.
Visualizations can be created in Grafana or directly from Prometheus UI for reporting.

🚀 Use Cases in Test Automation
Monitoring API and website uptime during automated test runs.
Detecting performance degradation early.
Logging HTTP response times for regression analysis.
