
const apiBaseUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = "<YOUR-TMDB-API-KEY>";

export default {
    API_BASE_URL: apiBaseUrl,
    API_KEY: apiKey,
    API_PAGE_LIMIT: 500,
    API_POPULAR_ENDPOINT: apiBaseUrl + "popular?api_key=" + apiKey,
    IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w500",
}
