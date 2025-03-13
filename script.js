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

  const url = `https://timeapi.io/api/Time/current/zone?timeZone=${formattedContinent}/${formattedCity}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error.message);
    document.body.classList.add("fog");
    weatherImg.src = "./assets/fog.svg";
  }
}

cityBtn.addEventListener("change", async function () {
  let night = null;
  const result = await getData(btnCity.value, btnContinent.value);

  const currentTime = new Date(result?.dateTime);
  const currentHour = currentTime.getHours();

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
});
