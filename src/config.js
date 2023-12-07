export const fetcher = (...args) => fetch(...args).then(res => res.json())
export const api_key ="d9d00e97935d91a9997a4025581f5ca6";
const tmdbEndPoint  = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie?";
export const tmdbAPI ={
    getMovieList:(type, page=1)=>`${tmdbEndPoint}/${type}?api_key=${api_key}&page=${page}`,
    getDetailPage :(movie_id)=>`${tmdbEndPoint}/${movie_id}?api_key=${api_key}`,
    getMovieSearch :(query,page)=>`${tmdbEndpointSearch}?api_key=${api_key}&query=${query}&page=${page}`,
    getMovieMetas :(movie_id,type)=>`${tmdbEndPoint}/${movie_id}/${type}?api_key=${api_key}`,
    image500 :(url) =>`https://image.tmdb.org/t/p/w500/${url}`
}