import update from "immutability-helper";
import { useCallback, useState } from "react";
import { Card } from "./FavoriteCard.js";
import style from "./favorites.css"

const FavoriteContainer = () => {
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: "Write a cool JS library"
      },
      {
        id: 2,
        text: "Make it generic enough"
      },
      {
        id: 3,
        text: "Write README"
      },
      {
        id: 4,
        text: "Create some examples"
      },
      {
        id: 5,
        text:
          "Spam in Twitter and IRC to promote it (note that this element is taller than the others)"
      },
      {
        id: 6,
        text: "???"
      },
      {
        id: 7,
        text: "PROFIT"
      }
    ]);
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]]
          ]
        })
      );
    }, []);
    const renderCard = useCallback((card, index) => {
      return (
        <div>
        <Card 
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
        </div>
      );
    }, []);
    return (
        <div className="favoritesContainer">
          <div className="favoritesPanel">
           Drag your favorites to rank them
          </div>
          <div>
          {cards.map((card, i) => renderCard(card, i))}
          </div>
        </div>
    );
  }
};
export default FavoriteContainer;
