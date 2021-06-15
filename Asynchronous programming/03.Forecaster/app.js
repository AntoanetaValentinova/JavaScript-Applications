function attachEvents() {
    document.querySelector('#submit').addEventListener('click', onClick);
    const forecast = document.querySelector('#forecast');
    const current = document.querySelector('#current');
    const upcoming = document.querySelector('#upcoming');
    const symbols = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°'
    }

    function createUpcomingDay(div, data) {
        let mainSpan = document.createElement('span');
        mainSpan.classList.add('upcoming');
        let symbol = document.createElement('span');
        symbol.classList.add('symbol');
        symbol.textContent = `${symbols[data.condition]}`
        mainSpan.appendChild(symbol);
        let degrees = document.createElement('span');
        degrees.classList.add('forecast-data');
        degrees.textContent = `${data.low}${symbols.Degrees}/${data.high}${symbols.Degrees}`;
        mainSpan.appendChild(degrees);
        let condition = document.createElement('span');
        condition.classList.add('forecast-data');
        condition.textContent = `${data.condition}`;
        mainSpan.appendChild(condition);
        div.appendChild(mainSpan);
    }

    function createElements(dataToday, dataThreeDays) {
        //create today div
        forecast.style.display = 'block';
        let div = document.createElement('div');
        div.classList.add('forecasts');
        let spanSymbol = document.createElement('span');
        spanSymbol.classList.add('condition');
        spanSymbol.classList.add('symbol');
        spanSymbol.textContent = symbols[dataToday.forecast.condition];
        div.appendChild(spanSymbol);
        let spanCondition = document.createElement('span');
        spanCondition.classList.add('condition');
        let spanCity = document.createElement('span');
        spanCity.classList.add('forecast-data');
        spanCity.textContent = dataToday.name;
        spanCondition.appendChild(spanCity);
        let spanDegrees = document.createElement('span');
        spanDegrees.classList.add('forecast-data');
        spanDegrees.textContent = `${dataToday.forecast.low}${symbols.Degrees}/${dataToday.forecast.high}${symbols.Degrees}`;
        spanCondition.appendChild(spanDegrees);
        let spanConditionToday = document.createElement('span');
        spanConditionToday.classList.add('forecast-data');
        spanConditionToday.textContent = `${dataToday.forecast.condition}`;
        spanCondition.appendChild(spanConditionToday);
        div.appendChild(spanCondition);
        current.lastChild.remove();
        current.appendChild(div);
        
        //create 3days
        let divThreeDays = document.createElement('div');
        divThreeDays.classList.add('forecast-info');
        createUpcomingDay(divThreeDays, dataThreeDays.forecast[0]);
        createUpcomingDay(divThreeDays, dataThreeDays.forecast[1]);
        createUpcomingDay(divThreeDays, dataThreeDays.forecast[2]);
        upcoming.lastChild.remove();
        upcoming.appendChild(divThreeDays);

    }

    async function getForecast(city) {
        try {
            let urlToday = 'http://localhost:3030/jsonstore/forecaster/today/' + city.code;
            let responceToday = await fetch(urlToday);
            let dataToday = await responceToday.json();
            let urlThreeDys = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + city.code;
            let responceThreeDays = await fetch(urlThreeDys);
            let dataThreeDays = await responceThreeDays.json();
            createElements(dataToday, dataThreeDays);
        } catch {
            displayError();
        }
    }

    async function onClick(e) {
        let input = document.querySelector('#location').value;
        let url = 'http://localhost:3030/jsonstore/forecaster/locations';
        let responce = await fetch(url);
        if (responce.ok) {
            let data = await responce.json();
            let city = data.find(c => c.name === input);
            if (city === undefined || !city.name || !city.code) {
                displayError();
            } else {
                getForecast(city);
            }
        } else {
            displayError();
        }
    }

    function displayError() {
        let err = document.createElement('div');
        err.classList.add('label');
        err.textContent = 'Error';
        forecast.innerHTML = '';
        forecast.style.display = 'block';
        forecast.appendChild(err);
    }

}

attachEvents();