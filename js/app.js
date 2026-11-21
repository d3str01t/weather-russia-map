const HISTORY_KEY = 'weather_history_v1';
const MAX_HISTORY = 5;

let currentCity = null;

// DOM элементы
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const contentEl = document.getElementById('weatherContent');
const historyEl = document.getElementById('history');

// Инициализация карты (колбэк при клике на маркер)
initMap((name, lat, lon) => {
    loadWeatherForCity({ name, lat, lon });
    flyToCity(lat, lon);
});

// Поиск
searchBtn.addEventListener('click', async () => {
    const query = cityInput.value.trim();
    if (!query) return;
    showLoading();
    try {
        const city = await geocodeCity(query);
        addMarker(city);
        flyToCity(city.lat, city.lon);
        await loadWeatherForCity(city);
        cityInput.value = '';
    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// Загрузка погоды
async function loadWeatherForCity(city) {
    showLoading();
    hideError();
    try {
        const weather = await fetchWeather(city.lat, city.lon);
        currentCity = city;
        renderWeather(city, weather);
        saveToHistory(city);
        renderHistory();
    } catch (err) {
        showError('Не удалось загрузить погоду. Проверьте соединение.');
    } finally {
        hideLoading();
    }
}

// Отрисовка
function renderWeather(city, data) {
    const cur = data.current;
    const daily = data.daily;
    const desc = weatherDescription(cur.weather_code);
    
    let forecastHtml = '';
    for (let i = 0; i < daily.time.length; i++) {
        const date = new Date(daily.time[i]);
        const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' });
        const descDay = weatherDescription(daily.weather_code[i]);
        forecastHtml += `
            <div class="forecast-day">
                <div class="day-name">${dayName}</div>
                <div class="day-temp">${Math.round(daily.temperature_2m_min[i])}° / ${Math.round(daily.temperature_2m_max[i])}°</div>
                <div class="day-desc">${descDay}</div>
            </div>
        `;
    }

    contentEl.innerHTML = `
        <h2>${city.name}</h2>
        <div class="current-weather">
            <div class="temp-big">${Math.round(cur.temperature_2m)}°C</div>
            <div class="details">
                <p>${desc}</p>
                <p>Влажность: ${cur.relative_humidity_2m}%</p>
                <p>Ветер: ${cur.wind_speed_10m} м/с</p>
            </div>
        </div>
        <h3>Прогноз на 5 дней</h3>
        <div class="forecast">${forecastHtml}</div>
    `;
}

// LocalStorage
function saveToHistory(city) {
    let history = getHistory();
    history = history.filter(c => c.name !== city.name);
    history.unshift(city);
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch { return []; }
}

function renderHistory() {
    const history = getHistory();
    historyEl.innerHTML = history.map(c =>
        `<button class="history-btn" data-name="${c.name}" data-lat="${c.lat}" data-lon="${c.lon}">${c.name}</button>`
    ).join('');

    historyEl.querySelectorAll('.history-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const city = {
                name: btn.dataset.name,
                lat: parseFloat(btn.dataset.lat),
                lon: parseFloat(btn.dataset.lon)
            };
            flyToCity(city.lat, city.lon);
            loadWeatherForCity(city);
        });
    });
}

// UI helpers
function showLoading() { loadingEl.classList.remove('hidden'); }
function hideLoading() { loadingEl.classList.add('hidden'); }
function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
    contentEl.innerHTML = '';
}
function hideError() { errorEl.classList.add('hidden'); }

// Начальная загрузка истории
renderHistory();