export const EMPTY_WEATHER_DATA = {
    id: '',
    temperature: '',
    pressure: '',
    humidity: '',
    airQuality: '',
    windSpeed: '',
    date: ''
}

export const WEATHER_TABLE_HEADERS = [
    'id',
    'Temperature C°',
    'Pressure mm',
    'Humidity %',
    'Air Quality %',
    'Wind speed m/s',
    'Date',
    'Actions'
]

export const API_GET_BETWEEN_DATES_PATH = '/api/v1/weather-data/between-dates'
export const API_CRUD = '/api/v1/weather-data/'