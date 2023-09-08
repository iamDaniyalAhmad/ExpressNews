import './App.css';

import React, { Component } from 'react'
import Navbar from './Component/Navbar.js';
import NewsComponent from './Component/NewsComponent.js'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  state={
    progress : 0
  }

  setProgress = (progress) => {
    this.setState({progress : progress})
  }
  pageSize =5;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
        
      />
        <Navbar/>
        <Routes >
        <Route exact path="/"   element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey}   key='general' pageSize={this.pageSize} country='us' category='general'/>} >  </Route>
        <Route exact path="/general"  element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey}   key='general' pageSize={this.pageSize} country='us' category='general'/>} >  </Route>
        <Route exact path="/business"  element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey}   key='business' pageSize={this.pageSize} country='us' category='business'/>}>  element={} </Route>
        <Route exact path="/entertainment"  element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey}   key='entertainment' pageSize={this.pageSize} country='us' category='entertainment'/>}>   </Route>
        <Route exact path="/health" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey}   key='health' pageSize={this.pageSize} country='us' category='health'/>}>  </Route>
        <Route exact path="/science" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey}   key='science' pageSize={this.pageSize} country='us' category='science'/>}> </Route>
        <Route exact path="/sports" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey}   key='sports' pageSize={this.pageSize} country='us' category='sports'/>}>  </Route>
        <Route exact path="/technology" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey}   key='technology' pageSize={this.pageSize} country='us' category='technology'/>}> </Route>
        </Routes>        
        </Router>
       </div>
    )
  }
}

// https://newsapi.org/v2/top-headlines?country=us&apiKey=a43bc5372ceb4b059cbff8d9e7560283