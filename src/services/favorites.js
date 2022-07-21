import axios from "axios";
class FavoritesDataService {
    updateFavorites(data){
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, data);
    }

    getFavoritesByUserId(userId) {
        console.error(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${userId}`);
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${userId}`);
    }
}
export default new FavoritesDataService();