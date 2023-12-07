import React from 'react';
import { useParams } from 'react-router-dom';
import { SwiperSlide , Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from '../config';
import MovieCard from '../components/movie/MovieCard';
// https://api.themoviedb.org/3/movie/{movie_id}
const MovieDetailsPage = () => {
    const {movie_id}= useParams();
    const {data}= useSWR(
        tmdbAPI.getDetailPage(movie_id),fetcher);
    if (!data) return null;
    const { backdrop_path , poster_path ,title, genres , overview} = data;
    return (
        <div className='py-10'>
            <div className="w-full h-[600px] relative" >
                <div className="absolute inset-0 bg-black bg-opacity-25"></div>                
                <div className="w-full h-full bg-cover bg-no-repeat" style={{
                backgroundImage:`url(${tmdbAPI.image500(backdrop_path)})`
                }}></div>
            </div>
            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
                <img src={tmdbAPI.image500(poster_path)}className='w-full h-full object-cover rounded-xl' alt="" />
            </div>
            <h1 className='text-center text-4xl mb-10 text-white text-bold'>{title}</h1>
            {genres.length > 0 &&(
            <div className="flex items-center justify-center gap-x-5 mb-10">
                {genres.map((item)=>(
                    <span className='py-2 px-4 border-primary text-primary border rounded' key = {item.id}>{item.name}</span>
                ))}
            </div>
            )}
            <p className='text-center text-sm leading-relaxe max-w-[600px] mx-auto mb-10'>{overview}
            </p>
            <MovieMetas type="credits"></MovieMetas>
            <MovieMetas type="videos"></MovieMetas>
            <MovieMetas type="similar"></MovieMetas>
        </div>
    );
};

function MovieMetas ({type ="video"}){
    const {movie_id}= useParams();
    const {data}= useSWR(tmdbAPI.getMovieMetas(movie_id,type),fetcher);
    if(!data) return null ;
    if(type === "credits"){
        const {cast}= data;
        if(!cast || cast.length <=0 ) return null;
    return (
        <div className='py-10'>
         <h2 className="text-center text-3xl mb-10"> Casts</h2>
         <div className="grid grid-cols-5 gap-5">
         {cast.slice(0,5).map((item)=>
            <div className="casts-item" key={item.id}>
                <img src={tmdbAPI.image500(item.profile_path)} className="w-full h-[350px] ojbect-cover rounded-lg mb-3" alt="" />
                <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
            )}
         </div>
    </div> 
    );
    }else {
        const {results}= data;
        if(!results || results.length <=0 ) return null;
        if (type ==="videos") return (
            <div className='py-10'> 
            <div className="flex flex-col gap-10">
            {results.slice(0,1).map((item) =>(
                <div key={item.id}>
                <h3 className="mb-5 text-xl font-medium text-white p-3">{item.name}</h3>
                <div key={item.id} className='w-full aspect-video'>
                    <iframe width="930" height="523" src={`https://www.youtube.com/embed/${item.key}`}title="TẬP 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className='w-full h-full object-fill'></iframe>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
    if(type ==="similar") return (
        <div className="py-10">
            <h2 className="text-3xl text-medium mb-10">Similar movies</h2>
            <div className="movie-list">
                <Swiper grabCursor ={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {results.length >0 && results.map(item =>(  
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item}></MovieCard>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    )
    }
    return null;
}
/**
function MovieCredits() {
    const {movie_id}= useParams();
    const {data}= useSWR(tmdbAPI.getMovieMetas(movie_id,"credits"),fetcher);
    if(!data) return null ;
    const {cast} =data;
    if(!cast && cast.length <=0 ) return null;
    return <div className='py-10'>
         <h2 className="text-center text-3xl mb-10"> Casts</h2>
         <div className="grid grid-cols-5 gap-5">
         {cast.slice(0,5).map((item)=>
            <div className="casts-item" key={item.id}>
                <img src={tmdbAPI.image500(item.profile_path)} className="w-full h-[350px] ojbect-cover rounded-lg mb-3" alt="" />
                <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
            )}
         </div>
    </div>       
}

function MovieVideos(){
    const {movie_id}= useParams();
    const {data}= useSWR(tmdbAPI.getMovieMetas(movie_id,"videos"),fetcher);
    if(!data) return null ;
    const {results}= data;
    if(!results || results.length <=0 ) return null;
    return(
    <div className='py-10'> 
        <div className="flex flex-col gap-10">
            {results.slice(0,1).map((item) =>(
                <div key={item.id}>
                <h3 className="mb-5 text-xl font-medium text-white p-3">{item.name}</h3>
                <div key={item.id} className='w-full aspect-video'>
                    <iframe width="930" height="523" src={`https://www.youtube.com/embed/${item.key}`}title="TẬP 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className='w-full h-full object-fill'></iframe>
                    </div>
                </div>
            ))}
        </div>
    </div>)
}

function MovieSimilar(){
    const {movie_id}= useParams();
    const {data}= useSWR(tmdbAPI.getMovieMetas(movie_id,"similar"),fetcher);
    if(!data) return null ;
    const {results}= data;
    if(!results || results.length <=0 ) return null;
    return(
        <div className="py-10">
            <h2 className="text-3xl text-medium mb-10">Similar movies</h2>
            <div className="movie-list">
                <Swiper grabCursor ={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {results.length >0 && results.map(item =>(  
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item}></MovieCard>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    )
}
**/
export default MovieDetailsPage;