import "./SingleCard.css";

export function SingleCard({
  card,
  handleChoice,
  flipped,
  disabled
}) {

  const handleClick = () => {

    if (!disabled) {
      handleChoice(card);
    }

  };

  return (

    <div className="card">

      <div className={flipped ? "flipped" : ""}>

        <img
          className="front"
          src={card.src}
          alt="card"
        />

        <div
          className="back"
          onClick={handleClick}
        >
          ?
        </div>

      </div>

    </div>

  );

}