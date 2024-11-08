"use client";
import { useState, useEffect } from "react";
import "../styles/globals.css"; // Ensure global styles are applied

const Quiz = () => {
  const questionsSet1 = [
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      answer: 1,
    },
    {
      question: "What is the national animal of India?",
      options: ["Lion", "Tiger", "Elephant", "Peacock"],
      answer: 1,
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: 1,
    },
  ];

  const questionsSet2 = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: 2,
    },
    {
      question: "Who wrote 'Macbeth'?",
      options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
      answer: 1,
    },
    {
      question: "What is 3 + 3?",
      options: ["6", "7", "5", "8"],
      answer: 0,
    },
  ];

  const [currentSet, setCurrentSet] = useState(1);
  const [questions, setQuestions] = useState(questionsSet1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [darkMode, setDarkMode] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // New state for start screen

  useEffect(() => {
    if (isStarted && timer > 0 && !isSubmitted) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsSubmitted(true);
    }
  }, [timer, isSubmitted, isStarted]);

  const handleOptionChange = (optionIndex) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = optionIndex;
    setSelectedOptions(updatedSelections);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSetChange = (setNumber) => {
    setCurrentSet(setNumber);
    setQuestions(setNumber === 1 ? questionsSet1 : questionsSet2);
    setCurrentQuestion(0);
    setSelectedOptions(Array(questions.length).fill(null));
    setIsSubmitted(false);
    setTimer(60);
  };

  const calculateResults = () => {
    const correctAnswers = selectedOptions.filter((selected, i) => selected === questions[i].answer).length;
    const attempted = selectedOptions.filter((option) => option !== null).length;
    return { correct: correctAnswers, incorrect: attempted - correctAnswers, unattempted: questions.length - attempted };
  };

  const { correct, incorrect, unattempted } = calculateResults();

  const handleStartQuiz = () => {
    setIsStarted(true); // Start quiz when "Start" is clicked
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      {!isStarted ? (
        <div className="start-screen">
          <h1>Good Luck!</h1>
          <p>Are you ready to start the quiz?</p>
          <button onClick={handleStartQuiz}>Start</button>
        </div>
      ) : (
        <div className="quiz-container">
          <div className="header">
            <button onClick={toggleDarkMode}>Change screen color</button>
            <div className="timer-box">{timer}s</div>
          </div>
          <div className="set-options">
            <button onClick={() => handleSetChange(1)}>Set 1</button>
            <button onClick={() => handleSetChange(2)}>Set 2</button>
          </div>
          {!isSubmitted ? (
            <div className="question-card">
              <h2>Question {currentQuestion + 1}/{questions.length}</h2>
              <p>{questions[currentQuestion].question}</p>
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`option ${selectedOptions[currentQuestion] === index ? "selected" : ""}`}
                    onClick={() => handleOptionChange(index)}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <div className="controls">
                <button onClick={handlePrev} disabled={currentQuestion === 0}>Prev</button>
                <button onClick={handleNext} disabled={currentQuestion === questions.length - 1}>Next</button>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          ) : (
            <div className="results-card">
              <h2>Results</h2>
              <div className="results-summary">
                <div className="result-box correct">Correct: {correct}</div>
                <div className="result-box incorrect">Incorrect: {incorrect}</div>
                <div className="result-box unattempted">Unattempted: {unattempted}</div>
              </div>
              <button onClick={() => setShowAnswers(!showAnswers)}>Show Answers</button>
              {showAnswers && (
                <ul className="answers-list">
                  {questions.map((q, index) => (
                    <li key={index}>
                      <p>Q: {q.question}</p>
                      <p>Correct Answer: {q.options[q.answer]}</p>
                      <p>Your Answer: {selectedOptions[index] !== null ? q.options[selectedOptions[index]] : "Not Answered"}</p>
                    </li>
                  ))}
                </ul>
              )}
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
