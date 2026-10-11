function checkAnswer(button, outputId) {
    if (button.dataset.correct === "true") {
        document.querySelector(outputId).innerText = "Correct!";
        button.classList.add("correct");

        const questionDiv = button.closest(".question");
        questionDiv.querySelectorAll("button").forEach((btn) => {
            btn.disabled = true;
        });
    } else {
        document.querySelector(outputId).innerText = "Incorrect! Please try again.";
        button.classList.add("incorrect");
    }

    button.classList.add("selected");
}

function checkTextAnswer(inputId, correctAnswer, outputId, buttonId) {
    const inputElement = document.getElementById(inputId);
    const buttonElement = document.getElementById(buttonId);
    const outputElement = document.getElementById(outputId);

    const userAnswerDisplay = inputElement.value.trim();
    const userAnswer = userAnswerDisplay.toLowerCase();

    if (String(userAnswer) === String(correctAnswer).toLowerCase()) {
        outputElement.innerText = "Correct!";
        buttonElement.classList.add("correct");
        inputElement.classList.add("correct");
    } else {
        outputElement.innerText = "Incorrect! The correct answer is: " + correctAnswer;
        buttonElement.classList.add("incorrect");
        inputElement.classList.add("incorrect");
    }

    if (inputElement) inputElement.disabled = true;
    if (buttonElement) buttonElement.disabled = true;
}