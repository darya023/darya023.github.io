function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.js_days');
  var hoursSpan = clock.querySelector('.js_hours');
  var minutesSpan = clock.querySelector('.js_minutes');
  var secondsSpan = clock.querySelector('.js_seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
        document.getElementsByClassName("timer__clock")[0].classList.add("hidden");
        document.getElementsByClassName("timer__deadlineMessage")[0].classList.add("visible");
        clearInterval(timeinterval);
        return true;
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

// var deadline = new Date(Date.parse(new Date()) + 2 * 1000); // for endless timer
// var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
var deadline = '2021-06-10';
initializeClock('js_timer', deadline);
