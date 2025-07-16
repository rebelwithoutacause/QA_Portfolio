# pcstormbg.bestcomputers.bg-Manual-Testing-

[Bug Report Incorrect Currency Conversion – Price in EUR Doesn’t Match BGN Value.docx](https://github.com/user-attachments/files/20224585/Bug.Report.Incorrect.Currency.Conversion.Price.in.EUR.Doesn.t.Match.BGN.Value.docx)

1.Bug Title: Incorrect Currency Conversion – Price in EUR Doesn’t Match BGN Value

Environment:

•	Website: [https://pcstormbg.bestcomputers.bg/]
•	Device: [PC]
•	Browser: [Brave]
•	OS: [Windows 10]

Steps to Reproduce:

1.	Navigate to the product/service page.
2.	Click on the option to change the currency from BGN to EUR.
3.	Observe the displayed price.

Expected Result:
Price in EUR should reflect the correct conversion rate from 1400 BGN (e.g., ~715 EUR at current rates).

Actual Result:
Price in EUR is shown as nearly 3,000 EUR, which is over 4x higher than the correct value.

Impact:

•	Severity: High

•	Misleads customers and distorts actual product value

•	Potential loss of trust or business

•	Possible revenue loss or legal implications

•	May indicate a backend logic flaw or intentional misconfiguration

Screenshots:
 
![PriceInBGN](https://github.com/user-attachments/assets/50b1caf8-6812-4616-8564-7b600800e336)

![PriceInEUR](https://github.com/user-attachments/assets/f050e5aa-79be-4e61-85b0-b4fe93e73707)


[Bug Report Insufficient Validation on Registration Form.docx](https://github.com/user-attachments/files/20224598/Bug.Report.Insufficient.Validation.on.Registration.Form.docx)

2.Bug Report: Insufficient Validation on Registration Form

Bug Report: Insufficient Validation on Registration Form
URL:
https://pcstormbg.bestcomputers.bg/index.php?route=account/edit
________________________________________
Summary:
The site allows users to register with invalid data, such as a 2-letter name, a fake surname (e.g., "Tester"), and a phone number consisting entirely of asterisks ******* — with no actual digits.
________________________________________
Steps to Reproduce:
1.	Go to the registration page.
2.	Enter:
o	First name: QA (2 letters)
o	Last name: Tester
o	Phone: *1***1***
o	Other required info (use valid email/fake password for test)
3.	Submit the form.
________________________________________
Expected Result:
The system should validate:
•	First name: minimum 3 characters
•	Phone number: should contain only digits and possibly + or -, not just *
________________________________________
Actual Result:
Registration is successful with:
•	2-letter name
•	Completely fake last name
•	Phone number made entirely of *, accepted without error
________________________________________
Evidence:
You can add a screenshot of the edit page showing:
•	Registered name: QA Tester
•	Phone number: *******
________________________________________
Severity:
🟠 Medium
(Could lead to spam/fake accounts and weak data integrity)
________________________________________
Priority:
⚠️ High (especially for e-commerce or client-based platforms where real contact info matters)

Screenshot:

![FakeCredentials](https://github.com/user-attachments/assets/eb713e9a-fa69-468c-8d96-caa0e8bd7713)



