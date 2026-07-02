import { useState, useEffect } from "react";
import "./App.css";
import { SingleCard } from "./components/SingleCard";

const imagePacks = {
  Shapes: [
    { src: "img/Shapes/circle.png" },
    { src: "img/Shapes/heart.png" },
    { src: "img/Shapes/octagon.png" },
    { src: "img/Shapes/pentagon.png" },
    { src: "img/Shapes/hexagon.png" },
    { src: "img/Shapes/square.png" },
    { src: "img/Shapes/star.png" },
    { src: "img/Shapes/triangle.png" }
  ],

  Animals: [
    { src: "img/Animals/Cow.png" },
    { src: "img/Animals/Fish.png" },
    { src: "img/Animals/Horse.png" },
    { src: "img/Animals/Jaguar.png" },
    { src: "img/Animals/Lion.png" },
    { src: "img/Animals/Shark.png" },
    { src: "img/Animals/Sheep.png" },
    { src: "img/Animals/Zebra.png" }
  ],

  Fruits: [
    { src: "img/Fruits/Apple.png" },
    { src: "img/Fruits/Banana.png" },
    { src: "img/Fruits/Orange.png" },
    { src: "img/Fruits/Strawberry.png" },
    { src: "img/Fruits/Cantaloupe.png" },
    { src: "img/Fruits/Grape.png" },
    { src: "img/Fruits/Blackberry.png" },
    { src: "img/Fruits/Blueberry.png" }
  ]
};

const levels = {
  Easy: 4,
  Medium: 6,
  Hard: 8
};

function App() {

  const [screen, setScreen] = useState("menu");

  const [pack, setPack] = useState("Shapes");
  const [difficulty, setDifficulty] = useState("Easy");

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);

  const startGame = () => {

    const selectedCards =
      imagePacks[pack].slice(0, levels[difficulty]);

    const shuffled = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({
        ...card,
        matched: false,
        id: Math.random()
      }));

    setCards(shuffled);

    setTurns(0);
    setMistakes(0);

    setChoiceOne(null);
    setChoiceTwo(null);

    setScreen("game");
  };

  const handleChoice = (card) => {

    if (disabled) return;

    choiceOne
      ? setChoiceTwo(card)
      : setChoiceOne(card);
  };

  useEffect(() => {

    if (choiceOne && choiceTwo) {

      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {

        setCards(prev =>
          prev.map(card =>
            card.src === choiceOne.src
              ? { ...card, matched: true }
              : card
          )
        );

        resetTurn();

      } else {

        setMistakes(m => m + 1);

        setTimeout(resetTurn, 1000);

      }

    }

  }, [choiceOne, choiceTwo]);

  function resetTurn() {

    setChoiceOne(null);
    setChoiceTwo(null);

    setTurns(t => t + 1);

    setDisabled(false);

  }

  const finished =
    cards.length > 0 &&
    cards.every(card => card.matched);

  if (screen === "menu") {

    return (

      <div className="App">

        <h1>Match Match</h1>

        <h2>Select Image Pack</h2>

        <select
          value={pack}
          onChange={(e)=>setPack(e.target.value)}
        >

          <option>Shapes</option>
          <option>Animals</option>
          <option>Fruits</option>

        </select>

        <h2>Select Difficulty</h2>

        <select
          value={difficulty}
          onChange={(e)=>setDifficulty(e.target.value)}
        >

          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>

        </select>

        <br/><br/>

        <button onClick={startGame}>
          Start Game
        </button>

      </div>

    );

  }

  return (

    <div className="App">

      <h1>Match Match</h1>

      <button onClick={startGame}>
        Restart
      </button>

      <button
        onClick={()=>setScreen("menu")}
        style={{marginLeft:"10px"}}
      >
        Main Menu
      </button>

      <div className="card-grid">

        {cards.map(card => (

          <SingleCard

            key={card.id}

            card={card}

            handleChoice={handleChoice}

            disabled={disabled}

            flipped={
              card === choiceOne ||
              card === choiceTwo ||
              card.matched
            }

          />

        ))}

      </div>

      <h3>Moves: {turns}</h3>

      <h3>Mistakes: {mistakes}</h3>

      {finished && (

        <div className="win-box">

          <h2>🎉 Congratulations! 🎉</h2>

          <p>

            You found all the pairs in

            <br/><br/>

            <strong>{turns}</strong> moves

            <br/>

            with

            <br/>

            <strong>{mistakes}</strong> mistakes.

          </p>

          <button onClick={startGame}>
            Play Again
          </button>

        </div>

      )}

    </div>

  );

}

export default App;
