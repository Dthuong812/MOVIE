import React from "react";
import { SwiperSlide , Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from '../../config';
import Button from "../button/Button";
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const { data } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
    const movies = data?.results || [];
    return (
        <section className="banner h-[400px] page-container mb-20 overflow-hidden">
        <Swiper grabCursor ={"true"} slidesPerView={"auto"}>
        {movies.length >0 && movies.map(item =>(
            <SwiperSlide key ={item.id}>
                <BannerItems item={item}></BannerItems>
            </SwiperSlide>
            ))}
        </Swiper>
        </section>
    );
};
function BannerItems({item}){
    const {
        title,
        poster_path,
        vote_average,
        release_date,
        vote_count, id
      } = item;
      const navigate = useNavigate();
    return(
        <div className="w-full h-full rounded-lg relative">
        <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
        <img src={tmdbAPI.image500(poster_path)} alt=""  className="w-full h-full object-cover rounded-lg "/>
          <div className="absolute left-5 bottom-5 w-full text-white">
            <h2 className="font-bold text-3xl mb-5">{title}</h2>
            <div className="flex items-center gap-x-3 mb-8">
              <span className=" py-2 px-4 border border-white rounded-md">{vote_average}</span>
              <span className=" py-2 px-4 border border-white rounded-md">{release_date}</span>
              <span className=" py-2 px-4 border border-white rounded-md">{vote_count}</span>
            </div>
            <Button onClick={()=> navigate(`/movie/${id} `)}>Watch now</Button>
          </div>
        </div>
    )
}
export default Banner;