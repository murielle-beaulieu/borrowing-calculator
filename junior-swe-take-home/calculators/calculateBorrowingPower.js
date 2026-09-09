const { getTax } = require("../services/getTax");
const { getHem } = require("../services/getHem");
const { LOAN_TERM_MONTHS } = require("../services/constants/constants");

const {
  calculateNetMonthlyIncome,
  calculateTotalLivingExpenses,
  calculateCreditCardLiability,
  calculateMaxMonthlyRepayment,
  calculateMonthlyRate,
  calculateMaxLoanAmount,
} = require("./calculatorUtils");

async function calculateBorrowingPower(
  income,
  dependents,
  expenses,
  creditLimits,
  annualAssessmentRate,
) {
  const annualTax = await getTax(income);
  const baselineHEM = await getHem(income, dependents);

  //   // 1. Calculate Net Monthly Income after tax deductions
  const netMonthlyIncome = calculateNetMonthlyIncome(annualTax, income);

  // 2. Determine living expenses (User declared expenses vs HEM baseline, whichever is higher)
  const totalLivingExpenses = calculateTotalLivingExpenses(
    baselineHEM,
    expenses,
  );

  // 3. Calculate credit card liability (~3% of total limits)
  const creditCardLiability = calculateCreditCardLiability(creditLimits);

  // 4. Calculate monthly repayment capacity
  const maxMonthlyRepayment = calculateMaxMonthlyRepayment(
    netMonthlyIncome,
    totalLivingExpenses,
    creditCardLiability,
  );

  // Return early if user cannot afford a loan at all
  if (maxMonthlyRepayment <= 0) {
    return { maxLoanAmount: 0, monthlyRepayment: 0 };
  }

  // 5. Calculate the monthly interest rate
  const monthlyRate = calculateMonthlyRate(annualAssessmentRate);

  // 6. Calculate maximum borrowing power:
  const maxLoanAmount = calculateMaxLoanAmount(
    maxMonthlyRepayment,
    LOAN_TERM_MONTHS,
    monthlyRate,
  );

  return {
    maxLoanAmount: Number(maxLoanAmount.toFixed(2)),
    monthlyRepayment: Number(maxMonthlyRepayment.toFixed(2)),
  };
}

module.exports = { calculateBorrowingPower };
