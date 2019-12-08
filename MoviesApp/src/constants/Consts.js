
const apiBaseUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = "3cc8f72de2ed003a58014072ce9b54db";

export default {
    API_BASE_URL: apiBaseUrl,
    API_KEY: apiKey,
    API_PAGE_LIMIT: 500,
    API_POPULAR_ENDPOINT: apiBaseUrl + "popular?api_key=" + apiKey,
    IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w500",
}
