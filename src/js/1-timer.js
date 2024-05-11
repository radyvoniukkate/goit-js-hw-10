import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Функція для виводу повідомлення про помилку
function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Поле для вибору дати
  const datetimePicker = document.getElementById('datetime-picker');
  const startBtn = document.getElementById('start-btn');
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  // Функція для перевірки правильності вибраної дати
  function validateDate(date) {
    const currentDate = new Date();
    if (date <= currentDate) {
      showError('Please choose a date in the future');
      return false;
    }
    return true;
  }

  // Функція для початку відліку
  function startCountdown(targetDate) {
    // Блокуємо поле вводу дати і кнопку "Start"
    datetimePicker.disabled = true;
    startBtn.disabled = true;

    // Відображаємо таймер
    const timerInterval = setInterval(updateTimer, 1000);

    // Функція для оновлення значень таймера
    function updateTimer() {
      const currentTime = new Date();
      const difference = targetDate - currentTime;
      if (difference <= 0) {
        clearInterval(timerInterval);
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        // Розблокуємо поле вводу дати
        datetimePicker.disabled = false;
        startBtn.disabled = false;
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(difference);
      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);
    }
  }

  // Додаткові параметри для Flatpickr
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (validateDate(selectedDate)) {
        startBtn.disabled = false;
      }
    },
  };

  // Ініціалізація Flatpickr
  flatpickr(datetimePicker, options);

  // Обробник кліку на кнопку "Start"
  startBtn.addEventListener('click', function () {
    const selectedDate = new Date(datetimePicker.value);
    if (validateDate(selectedDate)) {
      startCountdown(selectedDate);
    }
  });
});

// Функція для перетворення мілісекунд в дні, години, хвилини та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання нуля до числа, яке складається з однієї цифри
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
