'use strict';

function firstPromise() {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);

    document.addEventListener('click', (e) => {
      if (e.button === 0) {
        clearTimeout(timerId);
        resolve('First promise was resolved');
      }
    });
  });
}

function secondPromise() {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    });
  });
}

function thirdPromise() {
  return new Promise((resolve, reject) => {
    let isLeftClicked = false;
    let isRightClicked = false;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 2) {
        isRightClicked = true;
      }

      if (e.button === 0) {
        isLeftClicked = true;
      }

      if (isLeftClicked && isRightClicked) {
        resolve('Third promise was resolved');
      }
    });
  });
}

function showNotification(message, className) {
  const notification = document.querySelector('[data-qa="notification"]');

  notification.textContent = message;
  notification.className = '';
  notification.classList.add(className);
}

firstPromise()
  .then((msg) => showNotification(msg, 'success'))
  .catch((msg) => showNotification(msg, 'error'));

secondPromise().then((msg) => showNotification(msg, 'success'));
thirdPromise().then((msg) => showNotification(msg, 'success'));
