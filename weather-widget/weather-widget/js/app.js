const API_KEY = '2aeb4c1fcf414143b7c185758252402';
const API_BASE_URL = 'https://api.weatherapi.com/v1';
const TIMEOUT_DURATION = 8000;


const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cancelBtn = document.getElementById('cancel-btn');
const errorContainer = document.getElementById('error-container');
const weatherContainer = document.getElementById('weather-container');
const historyContainer = document.getElementById('history-container');
const historyList = document.getElementById('history-list');

const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const currentTemp = document.getElementById('current-temp');
const currentHumidity = document.getElementById('current-humidity');
const currentIcon = document.getElementById('current-icon');
const currentCondition = document.getElementById('current-condition');

const forecastContainer = document.getElementById('forecast-container');

let abortController = null;
let searchHistory = [];
let loader = null;

document.addEventListener('DOMContentLoaded', () => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
        searchHistory = JSON.parse(savedHistory);
        renderSearchHistory();
    }
});

searchBtn.addEventListener('click', getWeatherData);
cancelBtn.addEventListener('click', cancelRequest);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherData();
    }
});

function createLoader() {
    const loaderElement = document.createElement('div');
    loaderElement.id = 'loader';
    loaderElement.className = 'hidden';
    loaderElement.innerHTML = `
        <div class="spinner"></div>
        <p>Loading weather data...</p>
    `;
    return loaderElement;
}

function showLoader() {
    if (!loader) {
        loader = createLoader();
        errorContainer.parentNode.insertBefore(loader, errorContainer.nextSibling);
    }
    loader.classList.remove('hidden');
    errorContainer.classList.add('hidden');
    weatherContainer.classList.add('hidden');
}

function hideLoader() {
    if (loader) {
        loader.classList.add('hidden');
    }
}

function removeLoader() {
    if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
        loader = null;
    }
}

function showError(message) {
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');
    hideLoader();
    removeLoader();
}

function showWeatherData() {
    weatherContainer.classList.remove('hidden');
    historyContainer.classList.remove('hidden');
    removeLoader();
}

function formatDate(dateString) {
    const options = { weekday: 'short', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

async function getWeatherData() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    if (abortController) {
        abortController.abort();
    }
    abortController = new AbortController();
    const signal = abortController.signal;
    
    const timeoutId = setTimeout(() => {
        abortController.abort();
        showError('Request timed out. Please try again.');
    }, TIMEOUT_DURATION);
    
    showLoader();
    
    try {
        const forecastResponse = await fetch(
            `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`,
            { signal }
        );
        
        clearTimeout(timeoutId);
        
        if (!forecastResponse.ok) {
            const errorData = await forecastResponse.json();
            throw new Error(errorData.error.message || 'Failed to fetch weather data');
        }
        
        const forecastData = await forecastResponse.json();
        
        displayCurrentWeather(forecastData);
        displayForecast(forecastData.forecast.forecastday);
        
        addToSearchHistory(forecastData);
        
        hideLoader();
        showWeatherData();
        
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            if (signal.aborted) {
                if (error.message !== 'canceled') {
                    showError('Request was canceled or timed out');
                }
            }
        } else if (error.name === 'TypeError' && error.message.includes('Network')) {
            showError('Network error. Please check your internet connection');
        } else {
            showError(error.message || 'An unexpected error occurred');
        }
    } finally {
        abortController = null;
    }
}

function displayCurrentWeather(data) {
    const { location, current } = data;
    
    cityName.textContent = `${location.name}, ${location.country}`;
    currentDate.textContent = formatDate(location.localtime);
    currentTemp.textContent = current.temp_c;
    currentHumidity.textContent = current.humidity;
    currentIcon.src = current.condition.icon;
    currentCondition.textContent = current.condition.text;
}

function displayForecast(forecastData) {
    forecastContainer.innerHTML = '';
    
    forecastData.forEach(day => {
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        
        forecastDay.innerHTML = `
            <div class="forecast-date">${formatDate(day.date)}</div>
            <div class="forecast-icon">
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
            <div class="forecast-temp">${Math.round(day.day.avgtemp_c)}°C</div>
            <div class="forecast-condition">${day.day.condition.text}</div>
        `;
        
        forecastContainer.appendChild(forecastDay);
    });
}

function addToSearchHistory(data) {
    const { location, current } = data;
    
    const historyItem = {
        id: Date.now(),
        city: location.name,
        country: location.country,
        temperature: current.temp_c,
        icon: current.condition.icon,
        condition: current.condition.text,
        timestamp: new Date().toISOString()
    };
    
    searchHistory.unshift(historyItem);
    
    if (searchHistory.length > 10) {
        searchHistory.pop();
    }
    
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
    
    renderSearchHistory();
}

function renderSearchHistory() {
    historyList.innerHTML = '';
    
    if (searchHistory.length === 0) {
        historyList.innerHTML = '<p>No search history yet</p>';
        return;
    }
    
    searchHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.setAttribute('data-city', item.city);
        
        historyItem.innerHTML = `
            <div class="history-city">${item.city}, ${item.country}</div>
            <div class="history-temp">
                <span>${item.temperature}°C</span>
                <div class="history-icon">
                    <img src="${item.icon}" alt="${item.condition}">
                </div>
            </div>
        `;
        
        historyItem.addEventListener('click', () => {
            cityInput.value = item.city;
            getWeatherData();
        });
        
        historyList.appendChild(historyItem);
    });
}

function cancelRequest() {
    if (abortController) {
        abortController.abort('canceled');
        hideLoader();
        removeLoader();
        showError('Request canceled');
    }
}