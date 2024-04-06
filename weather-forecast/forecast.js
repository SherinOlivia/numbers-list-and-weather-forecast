var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "a1ab01c853593d9f62ee15b0f7b8aca3";
const getLatandLon = () => __awaiter(this, void 0, void 0, function* () {
    const cityName = "Jakarta";
    const countryCode = "ID";
    const geoCodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=${API_KEY}`;
    try {
        const fetchData = yield fetch(geoCodingApiUrl);
        if (!fetchData.ok) {
            throw new Error(`Failed to fetch data, ${fetchData.status}`);
        }
        else {
            const data = yield fetchData.json();
            if (!data) {
                throw new Error("Failed to fetch data");
            }
            const { lat, lon } = data[0];
            return { lat, lon };
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getForecast = () => __awaiter(this, void 0, void 0, function* () {
    const { lat, lon } = yield getLatandLon();
    const forecastApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
        const fetchData = yield fetch(forecastApiUrl);
        if (!fetchData.ok) {
            throw new Error(`Failed to fetch data, ${fetchData.status}`);
        }
        else {
            const data = yield fetchData.json();
            const forecast = [];
            const dateCheck = [];
            data.list.forEach(day => {
                const date = day.dt_txt.split(' ')[0];
                const today = new Date();
                const forcastDate = new Date(date);
                if (!dateCheck.includes(date) && forcastDate.getDay() !== today.getDay()) {
                    const formatDate = forcastDate.toLocaleDateString('en-US', { weekday: "short", day: "numeric", month: "short", year: "numeric" });
                    const temp = day.main.temp;
                    forecast.push({ date: formatDate, temp: temp });
                    dateCheck.push(date);
                }
            });
            let result = `Weather Forecast: \n`;
            yield forecast.forEach(entry => {
                result += `${entry.date}: ${entry.temp}°C\n`;
            });
            return result;
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
// getLatandLon()
getForecast()
    .then(result => {
    console.log(result);
})
    .catch(error => {
    console.error(error);
});
