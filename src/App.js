/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-danger */
/* eslint-disable camelcase */
import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (waiting) return <SetupForm />;

  if (loading) return <Loading />;

  const { question, incorrect_answers, correct_answer } = questions[index];

  const answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);

  // randomazing correct answer spot
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    // push to the end the item of asnwers array with the index equal to the tempIndex
    answers.push(answers[tempIndex]);
    // replace that item with the correct answer
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, btnIndex) => (
              <button
                type="button"
                key={btnIndex}
                className="answer-btn"
                dangerouslySetInnerHTML={{ __html: answer }}
                onClick={() => checkAnswer(correct_answer === answer)}
              />
            ))}
          </div>
        </article>
        <button type="button" className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
