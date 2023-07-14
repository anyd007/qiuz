let questionNumber = document.querySelector(".question__title--number")
let questionContent = document.querySelector(".question__content")
let answerContent = document.querySelectorAll(".answer-version__content")
const nextBtn = document.querySelector(".next-btn")
const startBtn = document.querySelector(".start-btn")
const mainView = document.querySelector(".main")
let sec = document.querySelector(".counter__sec")
let min = document.querySelector(".counter__min")

let userAnswersTable = []
let userChoose;
let userAnswersJSON = localStorage.getItem('userAnswersTable')
let userAnswers = JSON.parse(userAnswersJSON)
console.log(userAnswers)

import quiz from "./db.js";
let secCounter = 0
let minutes = 0
let questionsCounter = 1
let isAnswer = false;


let timeDisplay = () => {
    const intervalId = setInterval(() => {
        secCounter++
        if (secCounter > 9) {
            sec.textContent = secCounter;
        }
        else {
            sec.textContent = `0${secCounter}`
        }
        if (secCounter === 59) {
            secCounter = 0;
            minutes++
            setTimeout(() => {
                if (minutes > 9) {
                    min.textContent = minutes
                }
                else {
                    min.textContent = `0${minutes}`
                }

            }, 1000);
        }
    }, 1000)
}

const startQiuz = () => {
    localStorage.removeItem('userAnswersTable')
    startBtn.classList.add("hide")
    mainView.classList.remove("hide")
    questionContent.textContent = quiz[0].question
    answerContent.forEach((answer, indexAnswers) => {
        answer.textContent = quiz[0].answers[indexAnswers]
    })
    timeDisplay()
}

answerContent.forEach((answer, indexAnswers) => {
    answer.addEventListener("click", (e) => {
        answerContent.forEach((item) => {

            item.classList.remove("active");
        });
        e.target.classList.add("active");
        nextBtn.textContent = "następne pytanie"
        isAnswer = true
        userChoose = e.target.textContent
    })

});

const nextQuestion = () => {
    
    answerContent.forEach(el => {
        el.classList.remove("active")
    })
    if (!isAnswer) {
        nextBtn.textContent = "Wybierz odpowiedź"
    }
    else {
        userAnswersTable.push(userChoose)
        userAnswersJSON = JSON.stringify(userAnswersTable)
        localStorage.setItem('userAnswersTable', userAnswersJSON)

        nextBtn.textContent = "następne pytanie"

        questionNumber.textContent = questionsCounter + 1
        questionContent.textContent = quiz[questionsCounter].question
        answerContent.forEach((answer, indexAnswers) => {
            quiz[questionsCounter].answers.forEach((el, i) => {
                if (indexAnswers === i) {
                    answer.textContent = el
                }
            })
        })
        questionsCounter++
        isAnswer = false
    }
    if (questionsCounter === quiz.length) {
       return console.log("end")
    }
}





startBtn.addEventListener("click", startQiuz)
nextBtn.addEventListener("click", nextQuestion)