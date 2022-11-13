let userData = {
    USD: 1000,
    EUR: 900,
    UAH: 15000,
    BIF: 20000,
    AOA: 100,
  },
  bankData = {
    USD: {
      max: 3000,
      min: 100,
      img: "💵",
    },
    EUR: {
      max: 1000,
      min: 50,
      img: "💶",
    },
    UAH: {
      max: 0,
      min: 0,
      img: "💴",
    },
    GBP: {
      max: 10000,
      min: 100,
      img: "💷",
    },
  };

function getMoney(userData, bankData) {
  return new Promise((resolve, reject) => {
    let con = confirm("Посмотреть баланс на карте?");
    con === true
      ? resolve(userData)
      : reject({
          userData: userData,
          bankData: bankData,
        });
  });
}

getMoney(userData, bankData)
  .then(
    (userMoney) => {
      let currentMoney;

      do {
        currentMoney = prompt("Введите валюту", "USD").toUpperCase();
        Object.keys(userMoney).map((elem) => {
          if (currentMoney === elem) {
            alert(`Баланс составляет: ${userMoney[elem]} ${elem}`);
          }
        });
      } while (!userMoney[currentMoney]);
    },

    (data) => {
      let currentMoney;
      let sum;

      do {
        currentMoney = prompt("Введите валюту для снятия", "USD").toUpperCase();
      } while (
        !data.userData[currentMoney] ||
        !data.bankData[currentMoney] ||
        !data.bankData[currentMoney].min > 0
      );

      do {
        sum = prompt("Введите сумму для снятия");
      } while (+sum !== +sum);

      if (sum > data.bankData[currentMoney].max) {
        alert(
          `Введенная сумма больше допустимой.\nМаксимальная сумма снятия: ${data.bankData[currentMoney].max}`
        );
      }

      if (sum < data.bankData[currentMoney].min) {
        alert(
          `Введенная сумма меньше допустимой.\nМинимальная сумма снятия: ${data.bankData[currentMoney].min}`
        );
      }

      if (
        sum <= data.bankData[currentMoney].max &&
        sum >= data.bankData[currentMoney].min
      ) {
        alert(`Вот Ваши денежки ${sum} ${data.bankData[currentMoney].img}`);
      }
    }
  )

  .finally(() => {
    alert("Спасибо, хорошего дня 😊");
  });
