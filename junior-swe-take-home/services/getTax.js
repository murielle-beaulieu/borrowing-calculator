async function getTax(income) {
    
  try {
    const response = await fetch(
      `http://localhost:3000/api/tax?income=${income}`,
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
    return data.tax;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getTax };
