import './App.css';
import React, { Component } from 'react';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import axios from 'axios'
import {Route, Link, Routes} from "react-router-dom";

import {Auth} from './auth/Auth'
import {ToastContainer} from 'react-toastify';


class App extends Component {
  constructor() {
    super();
    this.state={
      post:'',
      text:'',
      user_email:'',
      needToLoginMessage:'',
      allPosts:'',
      name:null,
      lastname:null,
      
      

      
    }
    
  }

handleChange=(e)=>{  
    this.setState({post:e.target.value}) 

}

setUserEmail= (email, name, lastname)=>{
  this.setState({user_email:email,name:name, lastname:lastname})
  console.log('try name', name)
  
}


handleClick = async (e)=>{

  const {user_email,post, allPosts} = this.state
  
  try {
    const response = await axios.post('http://localhost:5050/addTweet',{
      user_email,
      post
    })
    console.log(response.data)
    if(response.data.message=='You need to login first'){
      this.setState({needToLoginMessage:response.data.message})
    }else{
      this.setState({needToLoginMessage:''})
      this.setState({text:response.data[0].tweet}) 
      this.setState({allPosts:response.data[0]})
    }
  } catch (error) {
    
  }

  
}


 

  render() {
    console.log(this.state.name)
    return (
     
      <>
        <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Home handleClick={this.handleClick} handleChange={this.handleChange} text={this.state.text} post={this.state.post} user_email={this.state.user_email} needToLoginMessage={this.state.needToLoginMessage} text={this.state.text}/>} />
          <Route path="/login" element={<Login setUserEmail={this.setUserEmail}/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile text={this.state.text} user_email={this.state.user_email} name={this.state.name} lastname={this.state.lastname}/>} />
        </Routes>
      
      </div>
      </>
    );
  }
}


export default App;
