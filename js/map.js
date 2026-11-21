let map;
const cityMarkers = [];

const DEFAULT_CITIES = [
    { name: 'Москва', lat: 55.7558, lon: 37.6173, minZoom: 3 },
    { name: 'Санкт-Петербург', lat: 59.9343, lon: 30.3351, minZoom: 3 },
    { name: 'Новосибирск', lat: 55.0084, lon: 82.9357, minZoom: 3 },
    { name: 'Екатеринбург', lat: 56.8389, lon: 60.6057, minZoom: 3 },
    { name: 'Казань', lat: 55.8304, lon: 49.0661, minZoom: 3 },
    { name: 'Нижний Новгород', lat: 56.2965, lon: 43.9361, minZoom: 3 },
    { name: 'Челябинск', lat: 55.1644, lon: 61.4368, minZoom: 3 },
    { name: 'Самара', lat: 53.2001, lon: 50.1500, minZoom: 3 },
    { name: 'Омск', lat: 54.9885, lon: 73.3242, minZoom: 3 },
    { name: 'Ростов-на-Дону', lat: 47.2357, lon: 39.7015, minZoom: 3 },
    { name: 'Уфа', lat: 54.7388, lon: 55.9721, minZoom: 3 },
    { name: 'Красноярск', lat: 56.0184, lon: 92.8672, minZoom: 3 },
    { name: 'Воронеж', lat: 51.6720, lon: 39.1843, minZoom: 3 },
    { name: 'Пермь', lat: 58.0105, lon: 56.2502, minZoom: 3 },
    { name: 'Волгоград', lat: 48.7080, lon: 44.5133, minZoom: 3 },
    { name: 'Краснодар', lat: 45.0355, lon: 38.9753, minZoom: 3 },
    { name: 'Саратов', lat: 51.5924, lon: 46.0037, minZoom: 5 },
    { name: 'Тюмень', lat: 57.1522, lon: 65.5272, minZoom: 5 },
    { name: 'Тольятти', lat: 53.5303, lon: 49.3461, minZoom: 5 },
    { name: 'Ижевск', lat: 56.8527, lon: 53.2115, minZoom: 5 },
    { name: 'Барнаул', lat: 53.3548, lon: 83.7698, minZoom: 5 },
    { name: 'Ульяновск', lat: 54.3142, lon: 48.4031, minZoom: 5 },
    { name: 'Иркутск', lat: 52.2978, lon: 104.2964, minZoom: 5 },
    { name: 'Хабаровск', lat: 48.4827, lon: 135.0838, minZoom: 5 },
    { name: 'Ярославль', lat: 57.6261, lon: 39.8845, minZoom: 5 },
    { name: 'Владивосток', lat: 43.1155, lon: 131.8855, minZoom: 5 },
    { name: 'Махачкала', lat: 42.9849, lon: 47.5047, minZoom: 5 },
    { name: 'Томск', lat: 56.4977, lon: 84.9744, minZoom: 5 },
    { name: 'Оренбург', lat: 51.7727, lon: 55.0988, minZoom: 5 },
    { name: 'Кемерово', lat: 55.3547, lon: 86.0873, minZoom: 5 },
    { name: 'Новокузнецк', lat: 53.7557, lon: 87.1099, minZoom: 5 },
    { name: 'Рязань', lat: 54.6296, lon: 39.7414, minZoom: 5 },
    { name: 'Астрахань', lat: 46.3497, lon: 48.0408, minZoom: 5 },
    { name: 'Набережные Челны', lat: 55.7436, lon: 52.3958, minZoom: 5 },
    { name: 'Пенза', lat: 53.2007, lon: 45.0000, minZoom: 5 },
    { name: 'Липецк', lat: 52.6031, lon: 39.5708, minZoom: 5 },
    { name: 'Киров', lat: 58.6035, lon: 49.6679, minZoom: 5 },
    { name: 'Чебоксары', lat: 56.1439, lon: 47.2489, minZoom: 5 },
    { name: 'Тула', lat: 54.1931, lon: 37.6173, minZoom: 5 },
    { name: 'Калининград', lat: 54.7104, lon: 20.4522, minZoom: 5 },
    { name: 'Балашиха', lat: 55.7969, lon: 37.9385, minZoom: 5 },
    { name: 'Курск', lat: 51.7304, lon: 36.1926, minZoom: 5 },
    { name: 'Севастополь', lat: 44.6166, lon: 33.5254, minZoom: 5 },
    { name: 'Сочи', lat: 43.6028, lon: 39.7342, minZoom: 5 },
    { name: 'Ставрополь', lat: 45.0428, lon: 41.9734, minZoom: 5 },
    { name: 'Улан-Удэ', lat: 51.8335, lon: 107.5841, minZoom: 5 },
    { name: 'Тверь', lat: 56.8587, lon: 35.9176, minZoom: 5 },
    { name: 'Магнитогорск', lat: 53.4186, lon: 59.0472, minZoom: 5 },
    { name: 'Иваново', lat: 57.0004, lon: 40.9739, minZoom: 5 },
    { name: 'Брянск', lat: 53.2433, lon: 34.3634, minZoom: 5 },
    { name: 'Сургут', lat: 61.2540, lon: 73.3962, minZoom: 5 },
    { name: 'Владимир', lat: 56.1290, lon: 40.4070, minZoom: 5 },
    { name: 'Нижний Тагил', lat: 57.9101, lon: 59.9813, minZoom: 5 },
    { name: 'Архангельск', lat: 64.5393, lon: 40.5182, minZoom: 5 },
    { name: 'Чита', lat: 52.0340, lon: 113.4994, minZoom: 5 },
    { name: 'Симферополь', lat: 44.9521, lon: 34.1024, minZoom: 5 },
    { name: 'Калуга', lat: 54.5138, lon: 36.2612, minZoom: 5 },
    { name: 'Смоленск', lat: 54.7818, lon: 32.0401, minZoom: 5 },
    { name: 'Волжский', lat: 48.7861, lon: 44.7797, minZoom: 5 },
    { name: 'Курган', lat: 55.4408, lon: 65.3411, minZoom: 5 },
    { name: 'Череповец', lat: 59.1269, lon: 37.9093, minZoom: 5 },
    { name: 'Орёл', lat: 52.9651, lon: 36.0785, minZoom: 5 },
    { name: 'Саранск', lat: 54.1838, lon: 45.1749, minZoom: 5 },
    { name: 'Владикавказ', lat: 43.0367, lon: 44.6678, minZoom: 5 },
    { name: 'Мурманск', lat: 68.9585, lon: 33.0827, minZoom: 5 },
    { name: 'Якутск', lat: 62.0281, lon: 129.7326, minZoom: 5 },
    { name: 'Тамбов', lat: 52.7212, lon: 41.4523, minZoom: 5 },
    { name: 'Грозный', lat: 43.3180, lon: 45.6981, minZoom: 5 },
    { name: 'Стерлитамак', lat: 53.6303, lon: 55.9311, minZoom: 5 },
    { name: 'Кострома', lat: 57.7679, lon: 40.9269, minZoom: 5 },
    { name: 'Петрозаводск', lat: 61.7849, lon: 34.3469, minZoom: 5 },
    { name: 'Нижневартовск', lat: 60.9397, lon: 76.5693, minZoom: 5 },
    { name: 'Йошкар-Ола', lat: 56.6388, lon: 47.8908, minZoom: 5 },
    { name: 'Новороссийск', lat: 44.7239, lon: 37.7686, minZoom: 5 },
    { name: 'Химки', lat: 55.8887, lon: 37.4480, minZoom: 5 },
    { name: 'Таганрог', lat: 47.2214, lon: 38.9094, minZoom: 5 },
    { name: 'Комсомольск-на-Амуре', lat: 50.5502, lon: 137.0079, minZoom: 5 },
    { name: 'Сыктывкар', lat: 61.6688, lon: 50.8364, minZoom: 5 },
    { name: 'Нальчик', lat: 43.4981, lon: 43.6189, minZoom: 5 },
    { name: 'Шахты', lat: 47.7085, lon: 40.2159, minZoom: 5 },
    { name: 'Дзержинск', lat: 56.2372, lon: 43.4594, minZoom: 5 },
    { name: 'Орск', lat: 51.2296, lon: 58.4750, minZoom: 5 },
    { name: 'Братск', lat: 56.1323, lon: 101.6146, minZoom: 5 },
    { name: 'Ангарск', lat: 52.5404, lon: 103.8883, minZoom: 5 },
    { name: 'Благовещенск', lat: 50.2907, lon: 127.5272, minZoom: 5 },
    { name: 'Энгельс', lat: 51.5012, lon: 46.1235, minZoom: 5 },
    { name: 'Королёв', lat: 55.9142, lon: 37.8256, minZoom: 5 },
    { name: 'Великий Новгород', lat: 58.5215, lon: 31.2755, minZoom: 5 },
    { name: 'Псков', lat: 57.8194, lon: 28.3318, minZoom: 5 }
];

function initMap(onCitySelect) {
    map = L.map('map').setView([61.0, 90.0], 3); // Центр России, широкий охват

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=ВАШ КЛЮЧ', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);


    DEFAULT_CITIES.forEach(city => {
        const marker = L.marker([city.lat, city.lon])
            .addTo(map)
            .bindPopup(city.name);
        marker.on('click', () => onCitySelect(city.name, city.lat, city.lon));
    });
}

function addMarker(city) {
    // Проверка, чтобы не дублировать
    const exists = DEFAULT_CITIES.some(c => c.name === city.name);
    if (!exists) {
        L.marker([city.lat, city.lon])
            .addTo(map)
            .bindPopup(city.name)
            .on('click', () => onCitySelect(city.name, city.lat, city.lon));
    }
}

function flyToCity(lat, lon) {
    map.flyTo([lat, lon], 6, { duration: 1.5 });
}