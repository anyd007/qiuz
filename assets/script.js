let questionNumber = document.querySelector(".question__title--number")
let questionContent = document.querySelector(".question__content")
let answerContent = document.querySelectorAll(".answer-version__content")
const nextBtn = document.querySelector(".next-btn")
const resltBtn = document.querySelector(".result-btn")
const startBtn = document.querySelector(".start-btn")
const mainView = document.querySelector(".main")
let sec = document.querySelector(".counter__sec")
let min = document.querySelector(".counter__min")
let questionsValue = document.querySelector(".quiz-overall__value")
let score = document.querySelector(".user-score__value")
let allQuestions = document.querySelector(".all-questions")
const modal = document.querySelector(".modal")
const closeModals = document.querySelector(".modal button")

let userAnswersTable = []
let userChoose;



import quiz from "./db.js";
let secCounter = 0
let minutes = 0
let questionsCounter = 1
let isAnswer = false;
let currentAnswers = quiz.map(el => el.correctAnswer)



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
    nextBtn.classList.remove("hide")
    nextBtn.disabled = false
    localStorage.removeItem('userAnswersTable')
    startBtn.classList.add("hide")
    mainView.classList.remove("hide")
    questionNumber.textContent = 1
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
        if (questionsCounter >= quiz.length) {
            nextBtn.disabled = true
            nextBtn.classList.add("hide")
            resltBtn.classList.remove("hide")
            mainView.classList.add("hide")
        }
        userAnswersTable.push(userChoose)
        let userAnswersJSON = JSON.stringify(userAnswersTable)
        localStorage.setItem('userAnswersTable', userAnswersJSON)

        nextBtn.textContent = "następne pytanie"
       
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
        questionNumber.textContent = questionsCounter
    }
}

const quizResult = () => {
    questionsCounter = 1;
    mainView.classList.add("hide")
    modal.classList.remove("hide")
    let userAnswersJSON = localStorage.getItem('userAnswersTable')
    let userAnswers = JSON.parse(userAnswersJSON)

    questionsValue.textContent = quiz.length
    score.textContent = currentAnswers.filter((el ,i) =>el === userAnswers[i]).length 
    for (let i = 0; i < quiz.length; i++) {

        let questionCount = document.createElement('p')
        let answerCont = document.createElement("ul")
        questionCount.classList.add("modal-question")
        questionCount.textContent = quiz[i].question

        for (let j = 0; j < quiz[i].answers.length; j++) {

            const answerList = document.createElement("li");
            answerList.classList.add("modal-answer")
            answerList.textContent = quiz[i].answers[j];
            if (userAnswers[i] !== currentAnswers[i]) {
                if (quiz[i].answers[j] === currentAnswers[i]) {
                    answerList.style.color = "green";

                }
                if (quiz[i].answers[j] === userAnswers[i]) {
                    answerList.style.color = "red";

                }
            }
            if (userAnswers[i] === currentAnswers[i]) {
                if (quiz[i].answers[j] === currentAnswers[i]) {
                    answerList.style.color = "green";
                }
            }

            answerCont.appendChild(answerList);
        }
        allQuestions.appendChild(questionCount)
        allQuestions.appendChild(answerCont);

    }

}

const closeModal = () => {
    startBtn.classList.remove("hide")
    mainView.classList.add("hide")
    resltBtn.classList.add("hide")
    modal.classList.add("hide")
    location.reload();
}




startBtn.addEventListener("click", startQiuz)
nextBtn.addEventListener("click", nextQuestion)
resltBtn.addEventListener("click", quizResult)
closeModals.addEventListener("click", closeModal)


