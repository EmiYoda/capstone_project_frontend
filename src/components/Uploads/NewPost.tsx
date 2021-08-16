import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import jwt_decode from 'jwt-decode';


const NewPost = () => {
    const history = useHistory();
    const { slug } = useParams() as any;
    const [author, setAuthor] = useState("");
    const [secretAuthor, setSecretAuthor] = useState("");
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");
    const [token, setToken] = useState("");
    const [post, setPost] = useState({
        image: "",
        title: "",
        description: "",
        markdown: "",
        author: "",
        secretAuthor: "",
    });

    useEffect(() => {
        if (slug) {
            getArticleBySlug(slug);
            setEditing(true);
        }
        // if (token !== "" || null || undefined) {}

        if (author !== "" || null || undefined) {
            setLoading(false)
        }

        const decodeUser = async () => {
            setToken(document.cookie.replace('token=', ''));
            if (token !== '' || null || undefined) {
                const decodedToken = await jwt_decode<any>(token);

                setAuthor(decodedToken.name)
                setSecretAuthor(decodedToken.email)
                post.author = author
                post.secretAuthor = secretAuthor
            }
        }

        decodeUser()
    }, [slug, token, author, secretAuthor, post]);


    const getArticleBySlug = async (slug: any) => {
        try {
            const res = await axios.get(`https://photodb-backend-capstone.herokuapp.com/api/post/${slug}`);
            setId(res.data._id);
        } catch (err) {
            console.log({ error: err });
        }
    };

    const changeHandler = (e: any) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (document.cookie.replace('token=', '') !== '' || null || undefined) {
            if (editing) {
                try {
                    await axios.put(`https://photodb-backend-capstone.herokuapp.com/api/update/${id}`, post);
                    history.push(`/post/${slug}`);
                } catch (err) {
                    console.log({ error: err });
                }
            } else {
                try {
                    await axios.post("https://photodb-backend-capstone.herokuapp.com/api/new/post", post);
                    history.push("/");
                } catch (err) {
                    alert("Post Title Alredy exists please change it")
                }
            }
        }
    };


    return (
        <div className="newPost">
            {document.cookie.replace('token=', '') !== '' || null || undefined ? <form onSubmit={onSubmit} className="newPost__form">
                <ScaleLoader loading={loading} color={"#0A748B"} />
                <h1 className="newPost__title">{editing ? "Edit Post" : "New Post"}</h1>

                <div className="newPost__form__input">
                    <input
                        type="text"
                        required={editing ? false : true}
                        placeholder="Url image"
                        name="image"
                        value={post.image}
                        onChange={changeHandler}
                    />
                </div>

                <div className="newPost__form__input">
                    <input
                        type="text"
                        required={editing ? false : true}
                        placeholder="Title"
                        name="title"
                        value={post.title}
                        onChange={changeHandler}
                    />
                </div>

                <div className="newPost__form__input">
                    <input
                        type="text"
                        required={editing ? false : true}
                        placeholder="Description"
                        name="description"
                        value={post.description}
                        onChange={changeHandler}
                    />
                </div>

                <div className="newPost__form__input">
                    <textarea
                        required={editing ? false : true}
                        placeholder="Markdown here"
                        name="markdown"
                        value={post.markdown}
                        onChange={changeHandler}
                    />
                </div>

                <div>
                    <button className="newPost__form__btn" onClick={() => {
                        alert("the inputs that are empty will lose the data")
                        history.goBack()
                    }}>Back</button>
                    <button className="newPost__form__btn"
                        type="submit">{editing ? "Edit" : "Create"}</button>
                </div>
            </form> : <Link to="/auth">Login or Register</Link>}
        </div>
    )
}

export default NewPost
