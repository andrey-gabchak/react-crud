const TODAY = new Date().toISOString().split('T')[0];

export const EMPTY_WEATHER_DATA = {
    id: '',
    temperature: '',
    pressure: '',
    humidity: '',
    airQuality: '',
    windSpeed: '',
    date: TODAY
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

export const API_GET_BETWEEN_DATES_PATH = 'http://localhost/api/v1/weather-data/between-dates'
export const API_CRUD = 'http://localhost/api/v1/weather-data/'