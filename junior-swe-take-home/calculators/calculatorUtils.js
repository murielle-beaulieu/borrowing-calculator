function calculateNetMonthlyIncome(annualTax, income) {
  // 1. Calculate Net Monthly Income after tax deductions
  const netMonthlyIncome = (income - annualTax) / 12;
  return netMonthlyIncome;
}

function calculateTotalLivingExpenses(baselineHEM, expenses) {
  // 2. Determine living expenses (User declared expenses vs HEM baseline, whichever is higher)
  return Math.max(expenses, baselineHEM);
}

function calculateCreditLimits(creditLimits) {
    return creditLimits * 0.03
}

function calculateMaxMonthlyRepayment(netMonthlyIncome, totalLivingExpenses, creditCardLiability) {
    return netMonthlyIncome - totalLivingExpenses - creditCardLiability;
}

function calculateMonthlyRate(annualAssessmentRate){
    return annualAssessmentRate / 100 / 12
}

function calculateMaxLoanAmount( maxMonthlyRepayment, LOAN_TERM_MONTHS, monthlyRate) {
    return maxMonthlyRepayment *
    ((1 - Math.pow(1 + monthlyRate, -LOAN_TERM_MONTHS)) / monthlyRate);
}

module.exports = { calculateNetMonthlyIncome, calculateTotalLivingExpenses, calculateCreditLimits, calculateMonthlyRate, calculateMaxMonthlyRepayment, calculateMaxLoanAmount };

