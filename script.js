const weddingDate = new Date("September 17, 2026 03:30:00").getTime();

const timer = setInterval(function () {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
        days + " Days " +
        hours + " Hours " +
        minutes + " Minutes " +
        seconds + " Seconds";

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "💍 Today is our Wedding Day!";
    }

}, 1000);
