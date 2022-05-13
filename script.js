const button1 = document.querySelector('.button_1');
const button2 = document.querySelector('.button_2');
const gameRules = document.querySelector('.game_rules');
const gameField = document.querySelector('.game_field');
const car = document.querySelector('.car');
const lifeField = document.querySelector('.life_field');
const heart = document.querySelector('.heart');
const coinsCount = document.querySelector('.coins_count');
const timerCount = document.querySelector('.timer_count');
const gameResult = document.querySelector('.result');
const playerResult = document.querySelector('.player_result');

const row1 = document.querySelector('.row_1');
const row2 = document.querySelector('.row_2');
const row3 = document.querySelector('.row_3');
const row4 = document.querySelector('.row_4');

let mainArr = [[], [], [], []];
console.log("1", mainArr[0]);
console.log("2", mainArr[1]);
console.log("3", mainArr[2]);
console.log("4", mainArr[3]);

let gameTime = 60;
let currentPosition = 1;
let life = 5;
let countCoins = 0;
let timer;

var thingsMapClasses = ["empty", "coin", "enemy", "fix", "wall"];

button1.addEventListener('click', function () {
  startEngine();
})

button2.addEventListener('click', function () {
  gameResult.setAttribute('hidden', 'true');
  gameTime = 60;
  life = 5;
  timerCount.innerHTML = '';
  coinsCount.innerHTML = '';
  countCoins = 0;
  playerResult.innerHTML = '';
  mainArr = [[], [], [], []];
  row1.innerHTML = '';
  row2.innerHTML = '';
  row3.innerHTML = '';
  row4.innerHTML = '';

  let quantityOfLife = lifeField.children.length;
  console.log(quantityOfLife);
  for (var i = quantityOfLife; i < 5; i++) {
    console.log(i);
    let newHeart = document.createElement('span');
    newHeart.style.width = '20px';
    newHeart.style.height = '20px';
    newHeart.style.background = 'url(img/hearts.png) no-repeat';
    lifeField.append(newHeart);
  }
  startEngine();
});

function startEngine() {
  gameRules.setAttribute('hidden', 'true');
  timer = setInterval(function set() {
    createElems(mainArr);
    events();
    gameTime -= 0.5;
    timerCount.innerHTML = ' ' + Math.floor(gameTime);
    if (gameTime === 0 || life === 0) {
      clearInterval(timer);
      gameResult.removeAttribute('hidden');
    }
  }, 500);
}

function getRandomInt(min, max) {                      //код функции getRandomInt скопируйте из учебника.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createElems(mainArr) {
  for (var i = 0; i < mainArr.length; i++) {
    var element = document.createElement("div");
    let randomNum = randomNumWithChance();
    element.className = thingsMapClasses[randomNum];

    let rowString = '.row_' + (i + 1);
    let row = document.querySelector(rowString);
    mainArr[i].push(element);
    row.append(element);
    if (mainArr[i].length > 10) {
      row.removeChild(row.firstChild);
      mainArr[i].shift();
    }
  }
}

function randomNumWithChance() {
  var randomNum = getRandomInt(1, 100);
  switch (true) {
    case (randomNum <= 70):
      return 0;  //empty 70%
      break;
    case (randomNum < 80):
      return 1;  //coin 10%
      break;
    case (randomNum < 85):
      return 2;  //enemy 5%
      break;
    case (randomNum < 90):
      return 3;  //fix 5%
      break;
    case (randomNum <= 100):
      return 4;  //wall 10%
      break;
  }
}

addEventListener('keydown', function (event) {
  if (event.keyCode == '40' && currentPosition !== 4) {         //down
    currentPosition++;
    car.style.marginTop = (currentPosition - 1) + '00px';
    //car.style.transform = 'rotate(5deg)';
  } else if (event.keyCode == '38' && currentPosition !== 1) {
    currentPosition--;
    car.style.marginTop = (currentPosition - 1) + '00px';
    //car.style.transform = 'rotate(-5deg)';
  }
});

function events() {
  for (i = 0; i < mainArr.length; i++) {
    if (mainArr[i][0].classList.contains('enemy') && currentPosition == i + 1 && mainArr[i].length == 10) {
      life -= 1;
      // console.log(life)
      lifeField.lastElementChild.remove();
    }
    if (mainArr[i][0].classList.contains('coin') && currentPosition == i + 1 && mainArr[i].length === 10) {
      countCoins++;
      coinsCount.innerHTML = ' ' + countCoins;
      playerResult.innerHTML = countCoins;
    }
    if (mainArr[i][0].classList.contains('fix') && currentPosition == i + 1 && mainArr[i].length === 10) {
      if (life < 5) {
        life += 1;
        let newHeart = document.createElement('span');
        newHeart.classList.add('heart');
        lifeField.appendChild(newHeart);
      }
    }
    if (mainArr[i][0].classList.contains('wall') && currentPosition == i + 1 && mainArr[i].length === 10) {
      clearInterval(timer);
      gameResult.removeAttribute('hidden');
    }
  }
}

// button2.addEventListener('click', function () {
//   gameResult.setAttribute('hidden', 'true');
//   gameTime = 60;
//   life = 5;
//   timerCount.innerHTML = '';
//   coinsCount.innerHTML = '';
//   countCoins = 0;
//   playerResult.innerHTML = '';
//   mainArr = [[], [], [], []];
//   startEngine();
// })





setInterval(function () {
  //console.log(life, 'life');
  //console.log(Math.floor(gameTime));

}, 1000);