# Borrowing Power Calculator

# Features
- A simple calculator allowing you to find out your borrowing power

# Tech Stack
- JavaScript and Node.js
- Mocha (testing)

# Installation 
With SSH:
- git clone git@github.com:murielle-beaulieu/borrowing-calculator.git
- cd borrowing-calculator
- npm install

# Running the app
- npm run api (server is available at http://localhost:3000/)
- npm start

# Running the tests
- npm test (please ensure you keep the server running for tests)

# Known Limitations
- Tests currently depend on the mock server, rather than mocking the getTax/getHem directly
- Currently no input validation on negative, non-numeric, or otherwise invalid values (income, dependents, credit limits, etc.)
