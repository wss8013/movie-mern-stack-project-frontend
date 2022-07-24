import axios from "axios";
class FavoritesDataService {
    updateFavorites(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, data);
    }

    getFavoritesByUserId(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${userId}`);
    }

    getFavoriteListByMovieIds(mIds) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favoritelist`, { params: { movieIds: mIds } });
    }
}
export default new FavoritesDataService();