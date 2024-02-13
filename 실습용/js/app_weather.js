const API_KEY = "51343bd738cdd108458b7732beb5388e";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("You live in", lat, lng);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    //units=metric은 섭씨온도로 변환
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
});
}
    //fetch()는 javascript로 url을 호출하는 함수

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
//getCurrentPosition()은 두 개의 함수를 인자로 받음
//첫 번째 함수는 위치 정보를 가져오는 데 성공했을 때, 두 번째 함수는 실패했을 때 실행