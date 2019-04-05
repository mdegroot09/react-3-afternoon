import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.updateSearchText = this.updateSearchText.bind(this);
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`).then(results => {
      this.setState({posts: results.data})
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then( results => {
      this.setState({ posts: results.data });
    })
    .catch(err => {
      console.log('err:',err)
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then(results => {
      this.setState({posts: results.data})
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then(results => {
      this.setState({posts: results.data})
    })
  }

  updateSearchText(searchText) {
    this.setState({searchText: searchText})
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        {this.state.searchText}
        <Header 
          updateSearchTextFn={this.updateSearchText}
        />
        <section className="App__content">

          <Compose 
            createPostFn={this.createPost}
          />
          { 
            posts.map(post => (
                <Post
                  key={post.id}
                  text={post.text}
                  date={post.date}
                  updatePostFn={this.updatePost}
                  id={post.id}
                  deletePostFn={this.deletePost}
                  searchText={this.state.searchText}
                />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
