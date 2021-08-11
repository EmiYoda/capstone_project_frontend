import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/App";
import "./style/main.scss";
import Auth from "./components/Auth/Auth";
import Profile from './components/Dashboard/Profile';
import NewPost from './components/Uploads/NewPost';
import Post from './components/Uploads/Post';


function main() {
  ReactDOM.render(
    <BrowserRouter>
      <Route path="/" exact component={document.cookie.replace('token=', '') !== '' || null || undefined ? App : Auth} />
      <Route path="/dashboard" exact component={Profile} />
      <Route path="/edit/:slug" exact component={NewPost} />
      <Route path="/new/post" exact component={NewPost} />
      <Route path="/post/:slug" exact component={Post} />
    </BrowserRouter>,
    document.getElementById("root")
  );
}

document.addEventListener("DOMContentLoaded", main);