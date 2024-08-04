const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false },
            { text: 'Rome', correct: false },
            { text: 'Berlin', correct: false }
        ]
    },
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'What is the national bird of India?',
        answers: [
            { text: 'Narendra Modi', correct: false },
            { text: 'Duck', correct: false },
            { text: 'Cukkoo', correct: false },
            { text: 'peacock', correct: true }
        ]
    }
];

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.remove('hide');
    prevButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    const questionElement = document.getElementById('question');
    questionElement.textContent = question.question;
    answerButtons.innerHTML = '';
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.classList.remove('hide');
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.classList.add('hide');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        prevButton.classList.remove('hide');
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.classList.add('hide');
        }
    } else {
        showResult();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.remove('hide');
        if (currentQuestionIndex === 0) {
            prevButton.classList.add('hide');
        }
    }
}

function showResult() {
    questionContainer.innerHTML = `
        <h2>Your score: ${score} out of ${questions.length}</h2>
        <button class="btn" onclick="startGame()">Restart</button>
    `;
    nextButton.classList.add('hide');
    prevButton.classList.add('hide');
}

startGame();
