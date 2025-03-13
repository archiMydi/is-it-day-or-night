const btnContinent = document.getElementById("continentBtn");
const btnCity = document.getElementById("cityBtn");
const sendBtn = document.getElementById("send");
const weatherImg = document.getElementById("weatherImg");

async function getData(city, continent) {
  if (!city || !continent) {
    console.error("Veuillez entrer un continent et une ville.");
    return;
  }

  const formattedCity = city.trim().replace(" ", "_");
  const formattedContinent = continent.trim();
  const url = `https://timeapi.io/api/time/current/zone?timeZone=${formattedContinent}%2F${formattedCity}`;

  try {
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error.message);
  }
}

async function getWeather() {
  weatherImg.src = "./assets/loader.svg";

  let night = null;
  const result = await getData(btnCity.value, btnContinent.value);

  const currentTime = new Date(result?.dateTime);
  const currentHour = currentTime.getHours();

  // TimeZone introuvable
  if (result == "Invalid Timezone") {
    document.body.classList.add("fog");
    weatherImg.src = "./assets/fog.svg";
    return;
  }

  if (currentHour >= 18 || currentHour < 8) {
    night = true;
  } else {
    night = false;
  }

  if (night) {
    document.body.classList.add("dark");
    document.body.classList.remove("fog");
    weatherImg.src = "./assets/moon.svg";
  } else {
    document.body.classList.remove("dark");
    document.body.classList.remove("fog");
    weatherImg.src = "./assets/sun.svg";
  }
}

btnCity.addEventListener("change", getWeather);
btnContinent.addEventListener("change", getWeather);
document.addEventListener("DOMContentLoaded", getWeather);
