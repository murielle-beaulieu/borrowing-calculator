function calculateNetMonthlyIncome(annualTax, income) {
  return (income - annualTax) / 12;
}

function calculateTotalLivingExpenses(baselineHEM, expenses) {
  return Math.max(expenses, baselineHEM);
}

function calculateCreditCardLiability(creditLimits) {
    return creditLimits * 0.03
}

function calculateMaxMonthlyRepayment(netMonthlyIncome, totalLivingExpenses, creditCardLiability) {
    return netMonthlyIncome - totalLivingExpenses - creditCardLiability;
}

function calculateMonthlyRate(annualAssessmentRate){
    return (annualAssessmentRate / 100) / 12
}

function calculateMaxLoanAmount( maxMonthlyRepayment, LOAN_TERM_MONTHS, monthlyRate) {
    return maxMonthlyRepayment *
    ((1 - Math.pow(1 + monthlyRate, - LOAN_TERM_MONTHS)) / monthlyRate);
}

module.exports = { calculateNetMonthlyIncome, calculateTotalLivingExpenses, calculateCreditCardLiability, calculateMonthlyRate, calculateMaxMonthlyRepayment, calculateMaxLoanAmount };

