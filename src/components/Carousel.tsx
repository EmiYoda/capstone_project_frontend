import { useRef, useEffect, } from "react"
import styled from "styled-components";
import { ArrowBackIosRounded } from "@material-ui/icons"
import { ArrowForwardIosRounded } from "@material-ui/icons"
import { useHistory } from 'react-router-dom';
interface ITranslate {
    xPosition: Number
}


const Slide = styled.div<ITranslate>`
  display: flex;
  width: 100%;
  height: 450px;
  transition: transform 0.6s ease-in-out;
  transform: ${props => `translateX(${props.xPosition}px)`}; // (*)
img {
    width: 100%;
    height: 100%;
  }
`;

const Carousel = ({ posts, setWidth, xPosition, handleClickPrev, handleClicknext }: any) => {
    const slideRef = useRef() as any;
    const history = useHistory();

    useEffect(() => {
        if (slideRef.current) {
            const width = slideRef.current.clientWidth;
            setWidth(width);
        }
    }, [setWidth]);

    return (
        <div className="wrapper">
            <h1 className="carousel__title">Photo DB</h1>
            <div className={window.matchMedia("(width: 768px)").matches ? "carousel__ipad" : "carousel"}>
                <Slide xPosition={xPosition} ref={slideRef}>
                    {posts.map((post: any, i: any) => (
                        <>
                            {window.matchMedia("(min-width: 1008px)").matches ? <img style={{ transform: 'translateX(0px)', minWidth: '802px', maxWidth: '802px' }} onClick={() => history.push(`/post/${post.slug}`)} src={post.image} alt="a" key={i} /> : window.matchMedia("(max-width: 640px)").matches ? <img style={{ minWidth: '370px', maxWidth: '370px', height: "365px" }} onClick={() => history.push(`/post/${post.slug}`)} src={post.image} alt="a" key={i} /> : window.matchMedia("(max-width: 768px)").matches ? <img style={{ minWidth: '638px', maxWidth: '638px', height: "365px" }} onClick={() => history.push(`/post/${post.slug}`)} src={post.image} alt="a" key={i} /> : <img style={{ minWidth: '150px', maxWidth: '150px', height: "365px" }} onClick={() => history.push(`/post/${post.slug}`)} src={post.image} alt="a" key={i} />}
                        </>
                    ))}


                </Slide>
                <button className="carousel__btn prev" onClick={handleClickPrev} ><ArrowBackIosRounded color="primary" fontSize="large" /></button>
                <button className="carousel__btn" onClick={handleClicknext} ><ArrowForwardIosRounded color="primary" fontSize="large" /></button>
            </div>
        </div>
    )
}

export default Carousel
