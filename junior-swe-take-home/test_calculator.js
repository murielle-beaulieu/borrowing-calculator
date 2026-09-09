/**
 * Borrowing Power Calculator Test Suite
 */

const assert = require("assert");
const {
  calculateBorrowingPower,
} = require("./calculators/calculateBorrowingPower");
const {
  calculateNetMonthlyIncome,
  calculateTotalLivingExpenses,
  calculateCreditCardLiability,
  calculateMaxMonthlyRepayment,
  calculateMonthlyRate,
  calculateMaxLoanAmount,
} = require("./calculators/calculatorUtils");

describe("Term Deposit Calculator Tests", () => {
  // testing the function as a whole
  it("should calculate borrowing power for standard values", async () => {
    const result = await calculateBorrowingPower(120000, 2, 3000, 10000, 7.5);
    assert.ok(
      result.maxLoanAmount > 0,
      "Should yield a positive borrowing power amount",
    );
    assert.strictEqual(result.monthlyRepayment, 4600);
  });

  // testing individual utils functions
  it("should return 0 for invalid negative inputs", async () => {
    const result = await calculateBorrowingPower(30000, 3, 4000, 5000, 7.5);
    assert.strictEqual(result.maxLoanAmount, 0);
    assert.strictEqual(result.monthlyRepayment, 0);
  });

  it("should calculate the net monthly income", () => {
    const result = calculateNetMonthlyIncome(24000, 120000);
    assert.strictEqual(result, 8000);
  });

  it("should return the bigger value between the hem and monthly expenses", () => {
    const result = calculateTotalLivingExpenses(3100, 4000);
    assert.strictEqual(result, 4000);
  });

  it("should calculate the credit card liability based on the credit card limit", () => {
    const result = calculateCreditCardLiability(2000);
    assert.strictEqual(result, 60);
  });

  it("should calculate the max montlhly payment", () => {
    const result = calculateMaxMonthlyRepayment(8000, 4000, 60);
    assert.strictEqual(result, 3940);
  });

  it("should calculate the monthly rate", () => {
    const result = calculateMonthlyRate(3);
    assert.strictEqual(result, 0.0025);
  });

});
