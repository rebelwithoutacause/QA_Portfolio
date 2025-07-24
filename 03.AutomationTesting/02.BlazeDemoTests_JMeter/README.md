# JMeter Test Plan – CSV Data and Dynamic Parameters

This JMeter test demonstrates:
- Use of CSV Data Set Config (`fromPort`, `toPort`)
- Sending dynamic values into an HTTP request
- Basic assertion logic (JSR223-based)

## Notes
- Response Assertion that expected "Paris" in the response was removed, since the API does not return it.
- You can add your own endpoint or mock server to verify the response.

## How to Run
1. Open `BlazeDemoTests.jmx` in JMeter
2. Ensure `data.csv` is in the same folder
3. Run the test with a View Results Tree listener