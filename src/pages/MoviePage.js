import React, { useEffect, useState } from 'react';
import { fetcher, tmdbAPI } from '../config';
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from '../components/movie/MovieCard';
import useDebounce from '../hooks/useDebounce';
import ReactPaginate from 'react-paginate';
import { v4 } from "uuid";
const itemsPerPage = 20;
const MoviePage = () => {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [nextPage,setNextPage]=useState(1);
    const [filter,setFilter] = useState("");
    const [url, setUrl] = useState(tmdbAPI.getMovieList("popular",nextPage));
    const filterDebounce = useDebounce(filter,500)
    const handleFilterChang = (e) => {
        setFilter(e.target.value);
    }
    const { data , error } = useSWR(url, fetcher);
    const loading = !data && !error
    useEffect (()=> {
        if(filterDebounce){
            setUrl(tmdbAPI.getMovieSearch(filterDebounce,nextPage));
        }else {
            setUrl(tmdbAPI.getMovieList("popular",nextPage));
        }
    },[filterDebounce,nextPage]);
    // if(!data) return null;
    const movies = data?.results || [];
    // const {page, total_pages} = data;
    useEffect (()=>{
        if(!data ||!data.total_results) return ;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    },[data, itemOffset])
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.total_results;
      setItemOffset(newOffset);
      setNextPage(event.selected +1);
    };
    return (
        <div className="py-1 page-container">
            <div className="flex mb-10">
                <div className="flex-1">
                    <input type="text" className="w-full p-4 bg-slate-800 outline-none text-white" placeholder='Type here to search...'
                    onChange = {handleFilterChang}
                    />   
                </div>
                <button className="p-4 bg-primary text-white">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    className="w-6 h-6">
                <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                </button>
            </div>
            {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
            <div className="grid grid-cols-4 gap-10">
                {!loading && movies.length > 0 && movies.map((item) => (
                <MovieCard key ={item.id} item={item}></MovieCard>
            ))}
           </div> 
           <div className="mt-10">
                <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< "
                renderOnZeroPageCount={null}
                className='pagination'
                />
           </div>
           {/* <div className="flex items-center justify-center mt-10 gap-x-5 hidden">
                <span className='cursor-pointer'onClick={() =>setNextPage(nextPage - 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </span>
                {new Array(pageCount).fill(0).map((item,index)=>(
                    <span className='cursor-pointer inline-block px-4 py-2 rounded leading-none bg-white text-slate-900'onClick={() =>setNextPage(index +1)}>
                    {index +1}
                    </span>
                ))}
                <span className='cursor-pointer'onClick={() =>setNextPage(nextPage +1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </span>
           </div> */}
        </div>
    );
};

export default MoviePage;