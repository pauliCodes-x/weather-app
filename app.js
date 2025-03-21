const baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const apikey = "8F3M2P5ZDG7SGTKXGWLLBTXCM";
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formEl);
    let location = formData.get('city');
    let unit = formData.get('unit');
    let sanitizedCity = encodeURIComponent(location);

    const data = await fetchWeather(sanitizedCity, unit);

    if (data) {
        updateHeader(data.currentConditions.conditions);
    }

    if (data) {
        showWeather(data.currentConditions, unit)
    }

    if (data) {
        showRangeWeather(data.days)
    }
});

function showWeather(weather, unit) {
    console.log(weather.temp)
    console.log(unit)
    let scale;
    let temp = weather.temp;
    let humidity = weather.humidity;
    console.log(humidity)

    if (unit == 'metric') {
        scale = '° C';
    } else {
        scale = '° F';
    };

    const tempEl = document.querySelector('.temperature');
    tempEl.textContent = temp + "" + scale;

}

function showRangeWeather(rangeWeather) {
    let tempMin = rangeWeather[0].tempmin;
    console.log(tempMin);

    let tempMax = rangeWeather[0].tempmax;
    console.log(tempMax);
}

async function fetchWeather(city, unit) {
    try {
        const res = await fetch(`${baseURL}${city}?unitGroup=${unit}&key=${apikey}&contentType=json`);
        const data = await res.json();
        console.log("Weather Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
}

function updateHeader(weather) {
    const header = document.querySelector('h1');
    let message = "🌎 Check today's weather!";

    switch (weather) {
        case "Sunny":
            message = isNight ? "🌙 The night sky is clear and peaceful." : "☀️ It's a bright and beautiful day!";
            break;
        case "Clear":
            message = isNight ? "🌙 The night sky is clear and peaceful." : "☀️ It's a clear and beautiful day!";
            break;
        case "Cloudy":
        case "Partially cloudy":
            message = "☁️ Looks like a cloudy day!";
            break;
        case "Overcast":
            message = "☁️ The sky is fully covered today.";
            break;
        case "Rain":
        case "Rain Showers":
        case "Drizzle":
            message = "🌧️ Don't forget your umbrella!";
            break;
        case "Thunderstorm":
            message = "⛈️ Stay indoors, a storm is coming!";
            break;
        case "Snow":
        case "Snow Showers":
            message = "❄️ Stay warm! It's snowing outside.";
            break;
        case "Fog":
            message = "🌫️ Drive safely, it's foggy out there!";
            break;
        default:
            message = "🌎 Check today's weather!";
            break;
    }

    header.textContent = message;
}