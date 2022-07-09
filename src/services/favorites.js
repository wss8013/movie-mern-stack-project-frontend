import axios from "axios";
class FavoritesDataService {
    updateFavorites(data){
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, data);
    }

    getFavoritesByUserId(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/favorites/userId/${id}`);
    }
}
export default new FavoritesDataService();