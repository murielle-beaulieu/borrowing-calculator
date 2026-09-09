async function getTax(income) {
        const response = await fetch(
      `http://localhost:3000/api/tax?income=${income}`,
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
    return data.tax;
}

module.exports = { getTax };
