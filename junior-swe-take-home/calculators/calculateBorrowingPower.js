const LOAN_TERM_MONTHS = 360; // 30 Years

const {
  calculateNetMonthlyIncome,
  calculateTotalLivingExpenses,
} = require("./calculatorUtils");

async function calculateBorrowingPower(
  income,
  dependents,
  expenses,
  creditLimits,
  annualAssessmentRate,
) {
  //   // 1. Calculate Net Monthly Income after tax deductions
  const netMonthlyIncome = await calculateNetMonthlyIncome(income);

  // 2. Determine living expenses (User declared expenses vs HEM baseline, whichever is higher)
  const totalLivingExpenses = await calculateTotalLivingExpenses(
    income,
    dependents,
    expenses,
  );

  // 3. Calculate credit card liability (~3% of total limits)
  const creditCardLiability = creditLimits * 0.03;

  // 4. Calculate monthly repayment capacity
  const maxMonthlyRepayment =
    netMonthlyIncome - totalLivingExpenses - creditCardLiability;

  // Return early if user cannot afford a loan at all
  if (maxMonthlyRepayment <= 0) {
    return { maxLoanAmount: 0, monthlyRepayment: 0 };
  }

  // 5. Calculate the monthly interest rate
  const monthlyRate = annualAssessmentRate / 100 / 12;

  // 6. Calculate maximum borrowing power using the following formula:
  // P = M * (1 - (1 + R)^-N) / R
  const maxLoanAmount =
    maxMonthlyRepayment *
    ((1 - Math.pow(1 + monthlyRate, -LOAN_TERM_MONTHS)) / monthlyRate);
  console.log("Max loan: " + maxLoanAmount);
  console.log("Max loan toFixed: " + Number(maxLoanAmount.toFixed(2)));

  return {
    maxLoanAmount: Number(maxLoanAmount.toFixed(2)),
    monthlyRepayment: Number(maxMonthlyRepayment.toFixed(2)),
  };
}

module.exports = { calculateBorrowingPower };
