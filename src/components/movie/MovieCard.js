import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { tmdbAPI } from '../../config';
import PropTypes from 'prop-types';
import {withErrorBoundary} from "react-error-boundary";
import LoadingSkeleton from '../loading/LoadingSkeleton';

const MovieCard = ({item}) => {
  const {
    title,
    vote_average,
    release_date,
    poster_path,
    id
  } = item;
  const navigate = useNavigate();
    return (
        <div>
             <div className="movie-card rounded-lg p-3 bg-slate-800 text-white h-full ">
              <img src={tmdbAPI.image500(poster_path)} alt=""  className="w-full h-[250px] rounded-lg mb-5 object-cover"/>
              <div className="">
              <h3 className="text-white whitespace-nowrap overflow-hidden text-xl font-bold mb-3">{title}</h3>
              <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                <span>{new Date(release_date).getFullYear()}</span>
                <span>{vote_average}</span>
              </div>
              <Button onClick={()=> navigate(`/movie/${id}`)} full>Watch now</Button>
              </div>
              </div>
        </div>
    );
};
MovieCard.propTypes = {
  item : PropTypes.shape({
    title : PropTypes.string,
    vote_average : PropTypes.number,
    release_date : PropTypes.string,
    poster_path : PropTypes.string,
    id : PropTypes.number
  })
};
function FallbackComponent(){
return (
  <p className='bg-red-50 text-red-400'>
    Something went wrong with this component
  </p>
);
}
export default withErrorBoundary(MovieCard,{
  FallbackComponent,
});
export const MovieCardSkeleton = () =>{
  return (
    <div>
    <div className="movie-card rounded-lg p-3 bg-slate-800 text-white h-full ">
     <LoadingSkeleton width ="100%" height ="250px" radius="8px" className ="mb-5"></LoadingSkeleton>
     <div className="">
     <h3 className="text-white whitespace-nowrap overflow-hidden text-xl font-bold mb-3">
     <LoadingSkeleton width ="100%" height ="20px" ></LoadingSkeleton>
     </h3>
     <div className="flex items-center justify-between text-sm opacity-50 mb-10">
       <span>
        <LoadingSkeleton width ="50px" height ="10px" ></LoadingSkeleton>
       </span>
       <span>
        <LoadingSkeleton width ="50px" height ="10px" ></LoadingSkeleton>
       </span>
     </div>
     <LoadingSkeleton width ="100%" height ="45px" radius ="6px" ></LoadingSkeleton>
     </div>
     </div>
</div>
  )
}