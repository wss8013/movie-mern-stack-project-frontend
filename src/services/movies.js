import axios from "axios";

class MovieDataService {
    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?page=${page}`);
    }

    find(query, by = "title", page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?${by}=${query}&page=${page}`);
    }

    findById(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/id/${id}`);
    }

    getRatings() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/ratings`);
    }

    createReview(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/review`, data);
    }

    updateReview(data){
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/updatereview`, data);
    }

    deleteReview(deleteData){
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/deletereview`, {data: deleteData} );
    }
}

export default new MovieDataService();