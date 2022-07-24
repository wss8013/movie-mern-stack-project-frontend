import update from "immutability-helper";
import { useCallback, useState, useEffect } from "react";
import { Card } from "./FavoriteCard.js";
import style from "./favorites.css"
import FavoritesDataService from "../services/favorites";
const mStyle = {
  width: 500,
  margin: 1
}

const FavoriteContainer = ({
  user,
  favorites,
  addFavorite,
  deleteFavorite
}) => {
  const [movies, setMovies] = useState([]);
  const [myFavorites, setMyFavorites] = useState([favorites]);
  const [doSaveFaves, setDoSaveFaves] = useState(false);

  useEffect(() => {
    const getMovie = favorites => {
      FavoritesDataService.getFavoriteListByMovieIds(favorites)
        .then(response => {
          let myMovie = response.data.movies
          myMovie.sort((a,b)=> favorites.indexOf(a._id)- favorites.indexOf(b._id));
          setMovies(response.data.movies);
        })
        .catch(e => {
          console.log(e);
        });
    }
    getMovie(favorites);
    setMyFavorites(favorites);
  }, [favorites]);
  useEffect(() => {
    if (user && doSaveFaves) {
      saveFavorites();
      setDoSaveFaves(false);
    }
  }, [user, myFavorites, saveFavorites, doSaveFaves]);


  const saveFavorites = useCallback(() => {
    var data = {
      _id: user.googleId,
      favorites: myFavorites
    }
    FavoritesDataService.updateFavorites(data).catch(e => {
      console.error(e);
    });
  }, [myFavorites, user]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setMovies((prevMovies) =>
      update(prevMovies, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevMovies[dragIndex]]
        ]
      })
    );

    setMyFavorites((prevMyFavorites) =>
      update(prevMyFavorites, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevMyFavorites[dragIndex]]
        ]
      })
    );
    setDoSaveFaves(true);
    // console.error(myFavorites);
    // console.error(movies);
  }, []);
  const renderCard = useCallback((movie, index) => {
    return (
      <div>
        <Card
          key={movie._id}
          index={index}
          id={movie._id}
          movie={movie}
          moveCard={moveCard}
        />
      </div>
    );
  }, []);

  return (
    <div className="favoritesContainer container">
      <div className="favoritesPanel">
        Drag your favorites to rank them
      </div>
      <div>
        {movies.map((movie, i) => renderCard(movie, i))}
      </div>
    </div>
  );

};
export default FavoriteContainer;
