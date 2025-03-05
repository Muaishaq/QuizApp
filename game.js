const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text "));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const nextbtn = document.getElementById("nextbtn");
const message = document.getElementById("timeUpMessage");
const timerDisplay = document.getElementById("timer");
const oneMinuteWarning = document.getElementById("oneMinuteWarning");

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timerInterval;
let answerSelected = false;
let selectedChoiceElement = null;

let questions = [
  {
    question:
      "Who holds the record for the most goals scored in a single FIFA World Cup tournament?",
    choice1: "Pelé",
    choice2: "Just Fontaine",
    choice3: "Gerd Müller",
    choice4: "Ronaldo Nazário",
    answer: 2,
  },
  {
    question: "Which player has won the most Ballon d'Or awards?",
    choice1: "Cristiano Ronaldo",
    choice2: "Lionel Messi",
    choice3: "Michel Platini",
    choice4: "Johan Cruyff",
    answer: 2,
  },
  {
    question: "Who is the all-time top scorer in the UEFA Champions League?",
    choice1: "Raúl González",
    choice2: "Robert Lewandowski",
    choice3: "Cristiano Ronaldo",
    choice4: "Lionel Messi",
    answer: 3,
  },
  {
    question:
      "Which country holds the record for the most FIFA World Cup titles?",
    choice1: "Germany",
    choice2: "Italy",
    choice3: "Argentina",
    choice4: "Brazil",
    answer: 4,
  },
  {
    question:
      "Who is the top scorer in the history of the English Premier League?",
    choice1: "Alan Shearer",
    choice2: "Wayne Rooney",
    choice3: "Andy Cole",
    choice4: "Thierry Henry",
    answer: 1,
  },
  {
    question: "Which player is known as 'O Fenômeno' (The Phenomenon)?",
    choice1: "Ronaldinho",
    choice2: "Ronaldo Nazário",
    choice3: "Kaká",
    choice4: "Rivaldo",
    answer: 2,
  },
  {
    question:
      "Which player scored the 'Hand of God' goal in the 1986 World Cup?",
    choice1: "Pelé",
    choice2: "Diego Maradona",
    choice3: "Zinedine Zidane",
    choice4: "Marco van Basten",
    answer: 2,
  },
  {
    question: "Which African player won the Ballon d'Or in 1995?",
    choice1: "Samuel Eto'o",
    choice2: "Didier Drogba",
    choice3: "George Weah",
    choice4: "Yaya Touré",
    answer: 3,
  },
  {
    question:
      "Who scored the winning goal for Germany in the 2014 World Cup final?",
    choice1: "Thomas Müller",
    choice2: "Miroslav Klose",
    choice3: "Mario Götze",
    choice4: "Toni Kroos",
    answer: 3,
  },
  {
    question: "Which club has won the most UEFA Champions League titles?",
    choice1: "Barcelona",
    choice2: "AC Milan",
    choice3: "Real Madrid",
    choice4: "Liverpool",
    answer: 3,
  },
  {
    question: "Which player is nicknamed 'CR7'?",
    choice1: "Lionel Messi",
    choice2: "Neymar Jr.",
    choice3: "Cristiano Ronaldo",
    choice4: "Kylian Mbappé",
    answer: 3,
  },
  {
    question: "Which team is known as 'The Red Devils'?",
    choice1: "Liverpool",
    choice2: "Manchester United",
    choice3: "Arsenal",
    choice4: "Chelsea",
    answer: 2,
  },
  {
    question: "In which year did the first FIFA World Cup take place?",
    choice1: "1920",
    choice2: "1930",
    choice3: "1938",
    choice4: "1950",
    answer: 2,
  },
  {
    question:
      "What is the name of the trophy awarded to the winner of the UEFA Europa League?",
    choice1: "The Champions Cup",
    choice2: "The UEFA Cup",
    choice3: "The Europa Trophy",
    choice4: "The Europa League Cup",
    answer: 2,
  },
  {
    question: "Which player is known for his 'Panenka' penalty kick?",
    choice1: "Michel Platini",
    choice2: "Antonín Panenka",
    choice3: "Zinedine Zidane",
    choice4: "Franz Beckenbauer",
    answer: 2,
  },
  {
    question:
      "Which South American club has won the most Copa Libertadores titles?",
    choice1: "Boca Juniors",
    choice2: "River Plate",
    choice3: "Peñarol",
    choice4: "Independiente",
    answer: 4,
  },
  {
    question: "Who is the current president of FIFA?",
    choice1: "Sepp Blatter",
    choice2: "Michel Platini",
    choice3: "Gianni Infantino",
    choice4: "Joseph S. Blatter",
    answer: 3,
  },
  {
    question: "Which country is known for its 'Tiki-taka' style of play?",
    choice1: "Brazil",
    choice2: "Germany",
    choice3: "Spain",
    choice4: "Italy",
    answer: 3,
  },
  {
    question: "Which player is known as 'King Eric'?",
    choice1: "David Beckham",
    choice2: "Eric Cantona",
    choice3: "Ryan Giggs",
    choice4: "Paul Scholes",
    answer: 2,
  },
  {
    question:
      "How many players are on a football team on the field at one time?",
    choice1: "9",
    choice2: "10",
    choice3: "11",
    choice4: "12",
    answer: 3,
  },
  {
    question: "Which city is home to the San Siro stadium?",
    choice1: "Rome",
    choice2: "Milan",
    choice3: "Turin",
    choice4: "Naples",
    answer: 2,
  },
  {
    question: "What is the name of the offside rule introduced in 1925?",
    choice1: "The Two-Player Rule",
    choice2: "The Three-Player Rule",
    choice3: "The One-Player Rule",
    choice4: "The Four-Player Rule",
    answer: 2,
  },
  {
    question: "Which country won the UEFA European Championship in 2016?",
    choice1: "France",
    choice2: "Germany",
    choice3: "Portugal",
    choice4: "Italy",
    answer: 3,
  },
  {
    question: "Who is the all-time top scorer for the England national team?",
    choice1: "Wayne Rooney",
    choice2: "Harry Kane",
    choice3: "Bobby Charlton",
    choice4: "Gary Lineker",
    answer: 2,
  },
  {
    question: "What is the term for a goal scored directly from a corner kick?",
    choice1: "A Direct Goal",
    choice2: "An Olympic Goal",
    choice3: "A Corner Goal",
    choice4: "A Curved Goal",
    answer: 2,
  },
  {
    question: "Which player is known for his 'Scorpion Kick' save?",
    choice1: "Iker Casillas",
    choice2: "René Higuita",
    choice3: "Gianluigi Buffon",
    choice4: "Peter Schmeichel",
    answer: 2,
  },
  {
    question: "Which club plays their home games at Signal Iduna Park?",
    choice1: "Bayern Munich",
    choice2: "Borussia Dortmund",
    choice3: "Schalke 04",
    choice4: "Bayer Leverkusen",
    answer: 2,
  },
  {
    question:
      "What is the name of the major league in the United States and Canada?",
    choice1: "USPL",
    choice2: "MSL",
    choice3: "MLS",
    choice4: "NASL",
    answer: 3,
  },
  {
    question: "Which player is known as 'The Egyptian King'?",
    choice1: "Mohamed Salah",
    choice2: "Sadio Mané",
    choice3: "Riyad Mahrez",
    choice4: "Achraf Hakimi",
    answer: 1,
  },
  {
    question:
      "How many minutes are played in a regular football match (excluding injury time)?",
    choice1: "75",
    choice2: "80",
    choice3: "90",
    choice4: "100",
    answer: 3,
  },
];

const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 20;

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  nextbtn.style.display = "none";
  runGame();
}

function getNewQuestion() {
  answerSelected = false;
  selectedChoiceElement = null;
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    clearInterval(timerInterval);
    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    choice.parentElement.classList.remove("correct", "incorrect");
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswer = true;
  nextbtn.style.display = "none";
}

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    answerSelected = true;
    selectedChoiceElement = e.target.parentElement;
    const selectedAnswer = choice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoiceElement.classList.add(classToApply);

    nextbtn.style.display = "block";
  });
});

nextbtn.addEventListener("click", () => {
  if (answerSelected) {
    getNewQuestion();
  }
});

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}

function runGame() {
  let startTime = new Date().getTime();
  let duration = 370000;
  let endTime = startTime + duration;
  let oneMinuteMark = endTime - 60000;

  function updateTimer() {
    let now = new Date().getTime();
    let remaining = endTime - now;

    if (remaining <= 0) {
      clearInterval(timerInterval);
      endQuiz();
      return;
    }
    if (now >= oneMinuteMark && now < endTime) {
      timerDisplay.style.color = "red";
      oneMinuteWarning.style.display = "block";
    } else {
      timerDisplay.style.color = "";
      oneMinuteWarning.style.display = "none";
    }

    let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    timerDisplay.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  timerInterval = setInterval(updateTimer, 1000);

  function endQuiz() {
    message.style.display = "block";
    acceptingAnswer = false;
    nextbtn.style.display = "none";
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("./end.html");
  }
}

startGame();
