const { getTax } = require("../services/getTax");
const { getHem } = require("../services/getHem");

async function calculateNetMonthlyIncome(income) {
  // 1. Calculate Net Monthly Income after tax deductions
  const annualTax = await getTax(income);
  const netMonthlyIncome = (income - annualTax) / 12;
  return netMonthlyIncome;
}

async function calculateTotalLivingExpenses(income, dependents, expenses) {
  // 2. Determine living expenses (User declared expenses vs HEM baseline, whichever is higher)
  const baselineHEM = await getHem(income, dependents);
  const totalLivingExpenses = Math.max(expenses, baselineHEM);
  return totalLivingExpenses;
}

module.exports = { calculateNetMonthlyIncome, calculateTotalLivingExpenses };
