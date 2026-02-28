const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyper Transfer Markup Link", correct: false },
            { text: "Home Tool Markup Language", correct: false },
        ]
    },
    {
        question: "Which CSS property is used to change the background color?",
        answers: [
            { text: "color", correct: false },
            { text: "bgcolor", correct: false },
            { text: "background-color", correct: true },
            { text: "surface-color", correct: false },
        ]
    },
    {
        question: "Which HTML element is used for the largest heading?",
        answers: [
            { text: "&lt;head&gt;", correct: false },
            { text: "&lt;h6&gt;", correct: false },
            { text: "&lt;header&gt;", correct: false },
            { text: "&lt;h1&gt;", correct: true },
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box in JavaScript?",
        answers: [
            { text: "msg('Hello World');", correct: false },
            { text: "alert('Hello World');", correct: true },
            { text: "console.log('Hello World');", correct: false },
            { text: "print('Hello World');", correct: false },
        ]
    },
    {
        question: "Which property is used in CSS to make the text bold?",
        answers: [
            { text: "font-weight", correct: true },
            { text: "text-style", correct: false },
            { text: "font-bold", correct: false },
            { text: "thickness", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let shuffledQuestions, currentQuestionIndex;
let score = 0;

function showWelcomeScreen() {
    resetState();
    questionElement.innerHTML = "Are you ready for the question?";
    
    const startButton = document.createElement("button");
    startButton.innerHTML = "Yes, I'm Ready!";
    startButton.classList.add("btn");
    startButton.style.textAlign = "center";
    startButton.addEventListener("click", startQuiz);
    
    answerButtons.appendChild(startButton);
}

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionElement.style.color = "#555";
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    const shuffledAnswers = currentQuestion.answers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) { 
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") { 
            button.classList.add("correct"); 
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    
    const finalGrade = Math.round((score / questions.length) * 100);
    
    let message = "";
    let color = "";

    if (finalGrade === 100) {
        message = "Excellent! You are a Front-End Master! 🏆";
        color = "#28a745"; 
    } else if (finalGrade >= 70) {
        message = "Well Done! You have a great understanding! 🌟";
        color = "#007bff"; 
    } else if (finalGrade >= 50) {
        message = "Keep Practicing! You're getting there! 📖";
        color = "#ffc107"; 
    } else {
        message = "Don't give up! Study more and try again! 💪";
        color = "#dc3545"; 
    }

    questionElement.innerHTML = `Your Score: ${finalGrade}`;
    questionElement.style.color = color;

    const feedback = document.createElement("p");
    feedback.innerHTML = message;
    feedback.style.fontSize = "1.1rem";
    feedback.style.textAlign = "center";
    feedback.style.margin = "10px 0";
    answerButtons.appendChild(feedback);

    const detail = document.createElement("p");
    detail.innerHTML = `You answered ${score} out of ${questions.length} questions correctly.`;
    detail.style.fontSize = "0.9rem";
    detail.style.textAlign = "center";
    detail.style.color = "#777";
    answerButtons.appendChild(detail);

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < shuffledQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

showWelcomeScreen();