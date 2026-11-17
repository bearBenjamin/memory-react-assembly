import React from 'react';
import { InitialPage } from "./initial-page.jsx";
import { GamePage } from "./game-page.jsx";
import { ResultsPage } from "./result-page.jsx";
import { AppRoute } from './settings.js';

export function App({ results, getImages }) {
  const [page, setPage] = React.useState(AppRoute.Initial);
  const [result, setResult] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [cardType, setCardType] = React.useState(null);

  const showResults = (stepsCount) => {
    setResult(stepsCount);
    setPage(AppRoute.Results);
  };

  const handleReset = () => {
    setPage(AppRoute.Initial);
  };

  const handleStart = (type) => {
    const images = getImages(type);
    setImages(images);
    setPage(AppRoute.Game);
    setCardType(type);
  };

  const getPage = (route) => {
    switch (route) {
      case AppRoute.Initial:
        return <InitialPage onStart={handleStart} />;
      case AppRoute.Game:
        return (
          <GamePage
            images={images}
            onShowResults={showResults}
            typeCard={cardType}
          />
        );
      case AppRoute.Results:
        return (
          <ResultsPage
            stepsCount={result}
            onResetGame={handleReset}
            results={results}
          />
        );
      default:
        return null;
    }
  };
  return getPage(page);
}
