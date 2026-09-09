async function getHem(income, dependents) {
  const response = await fetch(
    `http://localhost:3000/api/hem?income=${income}&dependents=${dependents}`,
    {
      headers: {
        Authorization: "Bearer pat_abcdefghijklmnopqrstuvwxyz0123456789",
      },
    },
  );
  if (!response.ok) {
    throw new Error("An error happened: Status code" + response.status);
  }
  const data = await response.json();
  return data.hem;
}

module.exports = { getHem };
