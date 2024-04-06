const API_KEY = "a1ab01c853593d9f62ee15b0f7b8aca3";

const getLatandLon = async () => {
    const cityName = "Jakarta"
    const countryCode = "ID"
    const geoCodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=${API_KEY}`

    try {
        const fetchData = await fetch(geoCodingApiUrl)
        if (!fetchData.ok) {
            throw new Error(`Failed to fetch data, ${fetchData.status}`)
        } else {
            const data = await fetchData.json()
            if (!data) {
                throw new Error("Failed to fetch data")
            }
            const {lat, lon} = data[0]
            return { lat, lon }
        }

    } catch (error) {
        console.error(error)
        throw error
    }
}

const getForecast = async () => {
    const { lat, lon } = await getLatandLon()
    const forecastApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
        const fetchData = await fetch(forecastApiUrl)
        if (!fetchData.ok) {
            throw new Error(`Failed to fetch data, ${fetchData.status}`)
        } else {
            const data = await fetchData.json()
            
            const forecast: {date, temp}[] = []
            const dateCheck: string[] = []
            data.list.forEach(day => {
                const date = day.dt_txt.split(' ')[0]
                const today = new Date()
                const forecastDate = new Date(date)
                if (!dateCheck.includes(date) && forecastDate.getDay() !== today.getDay()) {
                    const formatDate = forecastDate.toLocaleDateString('en-US', {weekday: "short", day:"numeric", month:"short", year:"numeric"})
                    const temp = day.main.temp
                    forecast.push({date: formatDate, temp: temp})
                    dateCheck.push(date)
                }
            });

            let result = `Weather Forecast: \n`
            await forecast.forEach(entry => {
                result  += `${entry.date}: ${entry.temp}°C\n`
            })

            return result
        }

     } catch (error) {
        console.error(error)
        throw error
     }
}

// getLatandLon()
getForecast()
.then(result => {
    console.log(result);
})
.catch(error => {
    console.error(error);
});