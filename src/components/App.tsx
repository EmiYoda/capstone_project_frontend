import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";


const App = () => {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const handleClickPrev = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setXPosition(xPosition + width);
  };



  const handleClicknext = () => {
    console.log(xPosition)
    console.log(index)
    console.log(width)
    if (index === posts.length - 1) {
      setIndex(0);
      setXPosition(0);
    } else {
      setIndex(index + 1);
      setXPosition(xPosition - width);
    }
  };

  const getData = async () => {
    try {
      const resp = await axios.get("https://photodb-backend-capstone.herokuapp.com/api/post");
      setPosts(resp.data.reverse());
    } catch (err) {
      console.log({ error: err });
    }
  };

  return (
    <div className="app">
      <div className="app__links">
        <Link to="/dashboard" className="app__link"> DashBoard </Link>
        <Link to="/new/post" className="app__link"> Create New Post </Link>
      </div>
      <Carousel
        posts={posts}
        setWidth={setWidth}
        xPosition={xPosition}
        handleClickPrev={handleClickPrev}
        handleClicknext={handleClicknext}
      />
    </div>
  )
};

export default App;