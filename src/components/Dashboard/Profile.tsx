import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

const Profile = () => {
    const history = useHistory();
    const [token, setToken] = useState('');
    const [posts, setPosts] = useState([]) as any;
    const [user, setUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    useEffect(() => {
        const getUser = async () => {
            setToken(document.cookie.replace('token=', ''));
            if (token !== "" || null || undefined) {
                const decodedToken = await jwt_decode<any>(token);
                setUser(decodedToken.name)
                setEmailUser(decodedToken.email);
            }
        }

        getData();

        getUser()
    }, [user, token, emailUser])

    const getData = async () => {
        try {
            const resp = await axios.get("https://photodb-backend-capstone.herokuapp.com/api/post");
            setPosts(resp.data.reverse());
        } catch (err) {
            console.log({ error: err });
        }
    };

    const renderPost = () => {
        if (posts.length === 0) {
            return <ScaleLoader loading={true} color={"#0A748B"} />
        } else {
            return posts.map((post: any) => (
                <div
                    key={post._id}
                    className="profile__posts"
                    style={post.secretAuthor !== `${emailUser}` ? { display: "none" } : { display: "inherit" }}
                >
                    {
                        post.secretAuthor === `${emailUser}` ?
                            <button key={post._id}
                                onClick={() => history.push(`/post/${post.slug}`)}
                                className="profile__post">

                                <img className="profile__post__img" src={post.image} alt="No Post" />
                                <h1 className="profile__post__title">{"Title:  " + post.title}</h1>
                                <h2 className="profile__post__content">{"Author:  " + post.author}</h2>
                                <h2 className="profile__post__content">{"Description:  " + post.description}</h2>
                            </button>
                            : null
                    }

                </div>
            ));
        }
    };

    const logout = async (e: any) => {
        e.preventDefault();
        try {
            document.cookie = `token= ; expires= expires=Thu, 01 Jan 1970 00:00:00 UTC;`
            history.push('/auth');
            window.location.reload()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="profile">

            <h1 className="title">{user}</h1>
            <h2 className="title-2">{emailUser}</h2>

            {
                token ? <button className={window.matchMedia("(max-width: 1447px)").matches ? "profile__btn__lrg" : window.matchMedia("(max-width: 768px)").matches ? "profile__btn" : "profile__btn"} onClick={logout}>Log Out</button> : <button className="profile__btn_crt" onClick={() => history.push('/auth')}>Log In / Register</button>
            }
            <div className={window.matchMedia("(max-width: 768px)").matches ? "posts__grid__sm" : window.matchMedia("(max-width: 1448px)").matches ? "posts__grid__md" : "posts__grid"}>

                {renderPost()}
            </div>


        </div>
    )
}

export default Profile
