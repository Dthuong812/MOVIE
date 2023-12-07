import { Fragment , lazy , Suspense } from "react";
import "swiper/scss";
import {Route, Routes} from "react-router-dom";
import Main from "./components/layout/Main";
// import HomePage from "./pages/HomePage";
import Banner from "./components/banner/Banner";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";

const HomePage = lazy (()=> import("./pages/HomePage"));
const MoviePage= lazy (()=> import( "./pages/MoviePage"));
const MovieDetailsPage = lazy (()=> import("./pages/MovieDetailsPage"));


function App() {
  return (
    <Fragment >
    <Suspense fallback = {<></>}>
      <Routes>
        <Route element ={<Main></Main>}>
        <Route path="/" element ={
        <>
          <Banner></Banner>
          <HomePage></HomePage>
        </>
        }></Route>
        <Route path="/movies" element ={<MoviePage></MoviePage>}></Route>
        <Route path="/movie/:movie_id" element ={<MovieDetailsPage></MovieDetailsPage>}></Route>
        </Route>
      </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
