const GEO_API = '';
const FORECAST_API = '';


async function geocodeCity(name) {
    const url = `${GEO_API}?name=${encodeURIComponent(name)}&count=5&language=ru&countryCode=RU`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Ошибка геокодинга');
    const data = await resp.json();
    if (!data.results || data.results.length === 0) {
        throw new Error('Город не найден');
    }
    // Возвращаем первый результат (наиболее релевантный)
    const r = data.results[0];
    return {
        name: r.name,
        lat: r.latitude,
        lon: r.longitude,
        admin: r.admin1 || ''
    };
}

// Получение погоды по координатам
async function fetchWeather(lat, lon) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
        forecast_days: 5,
        wind_speed_unit: 'ms'
    });
    const resp = await fetch(`${FORECAST_API}?${params}`);
    if (!resp.ok) throw new Error('Ошибка загрузки погоды');
    return await resp.json();
}

// Расшифровка WMO кода в текст
function weatherDescription(code) {
    const map = {
        0: 'Ясно', 1: 'Преимущественно ясно', 2: 'Переменная облачность', 3: 'Пасмурно',
        45: 'Туман', 48: 'Иней/туман',
        51: 'Морось слабая', 53: 'Морось умеренная', 55: 'Морось сильная',
        61: 'Дождь слабый', 63: 'Дождь умеренный', 65: 'Дождь сильный',
        71: 'Снег слабый', 73: 'Снег умеренный', 75: 'Снег сильный',
        80: 'Ливень слабый', 81: 'Ливень умеренный', 82: 'Ливень сильный',
        95: 'Гроза', 96: 'Гроза с градом', 99: 'Сильная гроза с градом'
    };
    return map[code] || 'Неизвестно';
}