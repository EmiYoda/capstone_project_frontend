import React, { useState, useEffect } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Post = () => {
    const history = useHistory();
    const [post, setPost] = useState({}) as any;
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const { slug } = useParams() as any;

    useEffect(() => {
        getDataBySlug(slug);
        const verifyUser = async () => {
            setToken(document.cookie.replace('token=', ''))
            if (token !== '' || null || undefined) {
                const decode = await jwt_decode<any>(token)

                setUser(decode.email)
            }
        }

        verifyUser()
    }, [slug, token, user, post.sercretAuthor]);


    const getDataBySlug = async (slug: any) => {
        try {
            const res = await axios.get(`https://photodb-backend-capstone.herokuapp.com/api/post/${slug}`);
            setPost(res.data);
        } catch (err) {
            console.log({ error: err });
        }
    };

    const deletePost = async (id: any) => {
        if (document.cookie.replace('token=', '') !== '' || null || undefined) {
            if (window.confirm("Do you wanna delete this post?")) {
                try {

                    await axios.delete(`https://photodb-backend-capstone.herokuapp.com/api/delete/${id}`);
                    history.push("/");
                } catch (err) {
                    console.log({ error: err });
                }
            }
        }
    };


    const adminPost = (id: any) => {
        if (document.cookie.replace('token=', '') !== '' || null || undefined) {
            return (
                <div className="post__content__admin">
                    <button
                        onClick={() => deletePost(id)}
                        className="post__content__btn"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => history.push(`/edit/${slug}`)}
                        className="post__content__btn"
                    >
                        Edit
                    </button>
                </div>
            );
        }


    };

    const renderMarkdown = () => {
        if (post.markdown === undefined) {
            return (
                <div className="post__content__markDown">
                    <h1>Null</h1>
                </div>
            );
        } else {
            return (
                <ReactMarkdown>{post.markdown}</ReactMarkdown>
            );
        }
    };


    return (
        <div className="post">
            <img className="post__content__img" src={post.image} alt="Post Img" />
            <h1 className="post__content">{"Title : " + post.title}</h1>
            <h2 className="post__content">{"Description : " + post.description}</h2>
            <h3 className="post__content">{"Author : " + post.author}</h3>
            <hr />
            {renderMarkdown()}
            <button className="post__content__btn" onClick={() => history.push('/')}>Back</button>
            {post.secretAuthor === user ? adminPost(post._id) : null}
        </div>
    )
}

export default Post
