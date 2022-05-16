var cyber_words = [
	"osi model",
	"routers",
	"network",
	"sysadmin",
	"hypervisor",
	"exploits",
	"threats",
	"malware",
	"botnet",
	"incident",
	"false positive",
	"demilitarized zone",
	"honeypots",
	"cryptography",
  "hashing",
  "authentication",
  "firewall",
  "snort",
  "splunk",
  "endpoint",
  "host",
  "switches",
  "trunks",
  "vlan",
  "nmap",
  "addresses"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let numberGuessed = 0
let numberLost = 0
let container = document.getElementById('container');
let button = document.createElement("button")  // Create with DOM
button.innerHTML = "Reset";
button.click = reset()

//console.log(button.attributes.onClick == alert("hi"))


function randomWord() {
  answer = cyber_words[Math.floor(Math.random() * cyber_words.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz '.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer && numberGuessed == 0) {
    document.getElementById('keyboard').innerHTML = 'You got 1 word, 2 more to unlock the password';
    numberGuessed += 1
    updateWon()
    unhideReset(false)
  } else if (wordStatus === answer && numberGuessed == 1) {
    document.getElementById('keyboard').innerHTML = 'You got 2 word, 1 more to unlock the password';
    numberGuessed += 1
    updateWon()
    unhideReset(false)
  } else if (wordStatus === answer && numberGuessed == 2) {
    document.getElementById('keyboard').innerHTML = 'password: CTF{h$ngm&n}';
    numberGuessed = 0
    updateWon()
    unhideReset(false)
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    // document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    numberLost++
    updateLost()
    unhideReset(false)
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function updateLost() {
  document.getElementById('numberLost').innerHTML = numberLost;
}

function updateWon() {
  document.getElementById('numberWin').innerHTML = numberGuessed;
}

function unhideReset(value){
  document.getElementById("button").hidden = value;
}


function reset() {
  mistakes = 0;
  guessed = [];
  if (numberLost == 3) {
    numberLost = 0;
    if (numberGuessed > 0) {
      numberGuessed -= 1
    }
    updateWon()
    updateLost()
    
  }
  document.getElementById('hangmanPic').src = './images/0.jpg';
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
  unhideReset(true)
}

document.getElementById('maxWrong').innerHTML = maxWrong;
document.getElementById('numberWin').innerHTML = numberGuessed;
document.getElementById('numberLost').innerHTML = numberLost;
unhideReset(true)

randomWord();
generateButtons();
guessedWord();
