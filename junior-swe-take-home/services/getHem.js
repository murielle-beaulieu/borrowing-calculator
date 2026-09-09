async function getHem(income, dependents) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/hem?income=${income}&dependents=${dependents}`,
      {
        headers: {
          Authorization: "Bearer pat_abcdefghijklmnopqrstuvwxyz0123456789",
        },
      },
    );
     if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data.hem;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getHem }