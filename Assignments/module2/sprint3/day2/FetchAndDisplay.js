const url = "https://jsonplaceholder.typicode.com/users";

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach((user) => {
      console.log(user.name);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchData();
