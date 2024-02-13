

const clock = document.querySelector("h2#clock");


function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0"); //padStart(2, "0") 2자리수가 안되면 앞에 0을 붙여줌
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText =`${hours}:${minutes}:${seconds}`;
}

getClock();//1초의 기다림을 없애기 위해 실행
setInterval(getClock, 1000);