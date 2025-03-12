const url =
  "https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&daily=temperature_2m_max&timezone=Asia/Kolkata";

async function fetchWeatherData() {
  try {
    //Fetching data from the api
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error occured while fethcing data");
    }
    //Parse the json response
    const data = await res.json();

    //Extract the daily temperatures
    const temperatures = data.daily.temperature_2m_max;

    //Filter out hot days(above 35 degrees celsius)
    const hotDays = temperatures.filter((temp) => temp < 35);
    const filteredTemperatures = temperatures.filter((temp) => temp <= 35);

    //Map the reamaining temp to an object format{dayIndex: number, temp: value}
    const mappedTemp = filteredTemperatures.map((temp, index) => ({
      dayIndex: index,
      temperature: temp,
    }));

    //Reduce the temp to calculate avg max temp
    const avgTemp =
      filteredTemperatures.reduce((acc, cur) => acc + cur, 0) /
      filteredTemperatures.length;

    console.log("List of hot days (above 35)", hotDays);
    console.log("Remaining temp after filtering ", filteredTemperatures);
    console.log("Avg max temp of remaining days: ", avgTemp);
  } catch (error) {
    console.log("Error ", error);
  }
}
fetchWeatherData();
