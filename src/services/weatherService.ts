import type { City } from "@/types";

export const getWeatherByCoords = async (latitude: number, longitude: number): Promise<number> => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
        );
        const data = await response.json()
        return data.current_weather.temperature
    } catch (error) {
        console.error("Error fetching weather data:", error)
        throw error
    }
}

export const getCityCoords = async (city: string): Promise<City | null> => {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        )
        const data = await response.json()

        if (!data.results) return null

        return data.results?.[0] as City
    } catch (error) {
        console.error("Error fetching city data:", error)
        throw error
    }
}