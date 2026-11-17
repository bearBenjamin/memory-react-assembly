import React from 'react';
import getDeclension from '@dubaua/get-declension';

export function ResultsPage({ stepsCount, results, onResetGame }) {
      const stepsDeclension = getDeclension({
        count: stepsCount,
        one: 'шаг', few: 'шагов', many: 'шагов'
      });
      return (
        <section className="result container">
          <h2>Лучшие результаты:</h2>
          <p>Вы завершили игру за <b>{stepsDeclension}</b>, так держать!</p>
          <ResultsTable current={stepsCount} results={results} />
          <p>Хотите попробовать ещё раз?</p>
          <button onClick={onResetGame} className="button result-button" type="button">Новая игра</button>
        </section>
      );
    }

    function ResultsTable({ current, results }) {
      const sortedResults = [...results, { name: 'Ваш результат', stepsCount: current }]
        .sort((a, b) => a.stepsCount - b.stepsCount);
      return (
        <table className="result-table">
          <thead>
            <tr className="result-table-row">
              <th>Место</th>
              <th>Имя</th>
              <th>Шаги</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map(({ name, stepsCount }, i) => (
              <tr key={name} className={`result-table-row ${stepsCount === current ? 'active' : ''}`}>
                <td>{i + 1}</td>
                <td>{name}</td>
                <td>{stepsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }