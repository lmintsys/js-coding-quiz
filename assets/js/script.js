var pages = {
  startQuiz: 1,
  questions: 2,
  results: 3,
  highScores: 4,
};

const quizData = [
  {
    question: "Commonly used data types do NOT include:",
    answers: {
      a: "Strings",
      b: "Booleans",
      c: "Alerts",
      d: "Numbers",
    },
    correct: "c",
  },
  {
    question: "The condition in an if/else statement is enclosed in:",
    answers: {
      a: "Quotes",
      b: "Parentheses",
      c: "Curly Brackets",
      d: "Square Brackets",
    },
    correct: "b",
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    answers: {
      a: "Numbers and Strings",
      b: "Other Arrays",
      c: "Booleans",
      d: "All of the Above",
    },
    correct: "d",
  },
  {
    question:
      "String values must be enclosed within __________ when being assigned to variables:",
    answers: {
      a: "Commas",
      b: "Curly Brackets",
      c: "Quotes",
      d: "Parentheses",
    },
    correct: "c",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: {
      a: "JavaScript",
      b: "Terminal Bash",
      c: "for loops",
      d: "console.log",
    },
    correct: "d",
  },
];

let currentQuestion = 0;
let answers = [];

function setUpPage(currentPage) {
  clearContent();

  switch (currentPage) {
    case pages.highScores:
      setUpHighScores();
      break;
    case pages.questions:
      setUpQuestions();
      break;
    case pages.results:
      setUpResults();
      break;
    case pages.startQuiz:
    default:
      setUpStartQuiz();
      break;
  }
}

function setUpStartQuiz() {
  var mainContainer = document.querySelector("main#start");
  mainContainer.style.display = "block";

  document.querySelector("#start-button").addEventListener("click", (e) => {
    setUpPage(pages.questions);
  });
}

function setUpQuestions() {
  var quiz = document.querySelector("main#quiz");
  quiz.style.display = "block";

  loadQuestion();
  setTime();
}

function setUpResults() {
  var results = document.querySelector("main#game-over");
  results.style.display = "block";
}

function setUpHighScores() {
  var scores = document.querySelector("main#high-scores");
  scores.style.display = "block";
}

function clearContent() {
  var start = document.querySelector("main#start");

  if (start) {
    start.style.display = "none";
  }

  var quiz = document.querySelector("main#quiz");

  if (quiz) {
    quiz.style.display = "none";
  }

  var highScores = document.querySelector("main#high-scores");

  if (highScores) {
    highScores.style.display = "none";
  }
}

function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    setUpPage(pages.results);
    return;
  }

  const title = document.querySelector("#question");
  const optionContainer = document.querySelector("#options");
  const options = [];
  title.textContent = quizData[currentQuestion].question;

  var currentAnswers = Object.keys(quizData[currentQuestion].answers);

  optionContainer.innerHTML = "";

  for (var i = 0; i < currentAnswers.length; i++) {
    const optionElement = document.createElement("li");
    const answerButton = document.createElement("button");
    answerButton.setAttribute("id", currentAnswers[i]);
    answerButton.setAttribute("type", "submit");
    answerButton.setAttribute("name", "answer");
    answerButton.setAttribute("aria-setsize", currentAnswers.length);
    answerButton.setAttribute("aria-posinset", i + 1);
    answerButton.textContent =
      quizData[currentQuestion].answers[currentAnswers[i]];
    answerButton.addEventListener("click", submitAnswer);

    optionElement.append(answerButton);
    options.push(optionElement);
  }

  optionContainer.append(...options);
}

function submitAnswer(e) {
  e.preventDefault();

  var submittedAnswer = e.target.id;

  if (
    submittedAnswer &&
    submittedAnswer === quizData[currentQuestion].correct
  ) {
    document.querySelector("#feedback").textContent = "Correct!";
  } else {
    document.querySelector("#feedback").textContent = "Wrong!";
    secondsLeft -= 10;
  }

  currentQuestion++;

  loadQuestion();
}

var timer = document.querySelector("#timer");
var quizTime = 76;
var secondsLeft = quizTime;
var timerInterval;

function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      setUpPage(pages.results);
    }
  }, 1000);
}

setUpPage(pages.startQuiz);

document.querySelector("#view-high-scores").addEventListener("click", (e) => {
  e.preventDefault();
  setUpPage(pages.highScores);
  clearInterval(timerInterval);
});
