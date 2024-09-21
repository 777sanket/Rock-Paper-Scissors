// rules DOMS
const btnRules = document.querySelector('.rules__btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

//Game DOMS
const choiceBtn = document.querySelectorAll('.game-item');
const game = document.querySelector('.game-container');

//Results DOMS
const res = document.querySelector('.results');
const selectBtn = document.querySelector('.select-btn');

//Play Again DOM
const textDisplay = document.querySelector('.me-win');
const commonText = document.querySelector('.common-text');

//NEXT DOM
const nextBtn = document.querySelector('.next__btn');


//PC Function to get random choice
const pcBtn = document.querySelector('.pc-result');
const choices = {
  rock: document.querySelector('.rock'),
  paper: document.querySelector('.paper'),
  scissor: document.querySelector('.scissor')
};
function getPcChoice() {
  const randomIndex = Math.floor(Math.random() * Object.keys(choices).length);
  const choiceKey = Object.keys(choices)[randomIndex];
  return choices[choiceKey];
}

//Modal/Rules Function
btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});

btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});


//Game Function
choiceBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    game.classList.toggle('game-show-no');
    btn.disabled = true;

    setTimeout(() => {
      btn.disabled = false;
    }, 2000)

    const istyle = getComputedStyle(btn);
    selectBtn.innerHTML = btn.innerHTML;
    selectBtn.style.border = istyle.border;

    const pcChoiceElement = getPcChoice();
    const pcStyle = getComputedStyle(pcChoiceElement);
    pcBtn.innerHTML = pcChoiceElement.innerHTML;
    pcBtn.style.border = pcStyle.border;

    const myChoice = btn.dataset.type;
    const pcChoice = pcChoiceElement.dataset.type;

    if (myChoice === pcChoice) {
      textDisplay.innerHTML = 'TIE UP';
      commonText.style.opacity = '0';
      PlayAgain.innerHTML = 'REPLAY';
      moveBtn();
    } else if (
      (myChoice === 'rock' && pcChoice === 'scissor') ||
      (myChoice === 'paper' && pcChoice === 'rock') ||
      (myChoice === 'scissor' && pcChoice === 'paper')
    ) {
      setTimeout(() => {
        textDisplay.innerHTML = 'YOU WIN';
        commonText.style.opacity = '1';
        PlayAgain.innerHTML = 'PLAY AGAIN';
        moveBtn();
      }, 500);
      updateScore();
      selectBtn.classList.add('pulse-effect');
    } else {
      textDisplay.innerHTML = 'YOU LOST';
      commonText.style.opacity = '1';
      PlayAgain.innerHTML = 'PLAY AGAIN';
      btnRules.classList.toggle('rules__btn_win');
      updateScore();
      moveBtn();
      pcBtn.classList.add('pulse-effect');
    }

    setTimeout(() => {
      res.classList.toggle('show-result');
    }, 500);

  });
});

//Replay Button
const PlayAgain = document.querySelector('.replay');

PlayAgain.addEventListener('click', () => {
  res.classList.toggle('show-result');
  btnRules.style.right = '2rem';
  nextBtn.style.opacity = '0';
  nextBtn.style.zIndex = '-10';

  pcBtn.classList.remove('pulse-effect');
  selectBtn.classList.remove('pulse-effect');

  setTimeout(() => {
    game.classList.toggle('game-show-no');
  }, 500);
})


//Score Update DOM
const myScore = document.querySelector('.myscore');
const pcScore = document.querySelector('.pcscore');
let myScoreValue = localStorage.getItem('myScoreValue') ? parseFloat(localStorage.getItem('myScoreValue')) : 0;
let pcScoreValue = localStorage.getItem('pcScoreValue') ? parseFloat(localStorage.getItem('pcScoreValue')) : 0;
myScore.innerHTML = myScoreValue;
pcScore.innerHTML = pcScoreValue;

//Update Score Function
function updateScore() {
  setTimeout(() => {
    if (textDisplay.innerHTML === 'YOU WIN') {
      myScoreValue++;
      myScore.innerHTML = myScoreValue;
      localStorage.setItem('myScoreValue', myScoreValue);
    } else if (textDisplay.innerHTML === 'YOU LOSE') {
      pcScoreValue++;
      pcScore.innerHTML = pcScoreValue;
      localStorage.setItem('pcScoreValue', pcScoreValue);
    };
  }, 1300);
}


//RULES BUTTON MOVE 
function moveBtn() {
  if (textDisplay.innerHTML === 'YOU WIN') {
    btnRules.style.right = '15rem';
    nextBtn.style.right = '2rem';
    nextBtn.style.opacity = '1';
    nextBtn.style.zIndex = '500';
  } else {
    btnRules.style.right = '2rem';
    nextBtn.style.opacity = '0';
    nextBtn.style.zIndex = '-10';
  }
}


//HURRAY DOMS
const hurray = document.querySelector('.Hurray');
const HPlayBtn = document.querySelector('.H-PlayBtn');
const header = document.querySelector('.header');

nextBtn.addEventListener('click', () => {
  res.classList.toggle('show-result');
  header.classList.toggle('header-show');
  hurray.classList.toggle('hurray-show');

  nextBtn.style.opacity = '0';
  nextBtn.style.zIndex = '-10';
  btnRules.style.right = '2rem';

  const stars = document.querySelectorAll('.star');
  const positions = [
    { top: '30%', left: '28%' },
    { top: '13%', left: '55%' },
    { top: '40%', left: '60%' },
    { top: '22%', left: '35%' },
    { top: '15%', left: '40%' },
    { top: '20%', left: '45%' },
    { top: '28%', left: '67%' },
    { top: '50%', left: '35%' }
  ];

  stars.forEach((star, index) => {
    const { top, left } = positions[index];
    setTimeout(() => {
      star.style.opacity = '1';
      star.style.transform = `translate(0, 0) scale(1)`;
      star.style.top = top;
      star.style.left = left;
    }, index * 100);
  });
});


//HURRAY PLAY Again BUTTON
HPlayBtn.addEventListener('click', () => {
  pcBtn.classList.remove('pulse-effect');
  selectBtn.classList.remove('pulse-effect');
  setTimeout(() => {
    hurray.classList.toggle('hurray-show');
    header.classList.toggle('header-show');
    game.classList.toggle('game-show-no');
  }, 100);
})
