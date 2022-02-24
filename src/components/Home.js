import axios from 'axios';

import React, { Component } from 'react';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
        otherUsersArr:[],
        }

    }

 async componentDidMount(){
    const {user_email}= this.props
     try {
        const response = await axios.post('http://localhost:5050',{
            user_email,

        })
        console.log(response.data)
        this.setState({otherUsersArr:response.data})
     } catch (error) {
         
     }
 }   

async otherProfile(email){
console.log(email)
}




    render() {
        const {otherUsersArr}= this.state
        return (
            

    
        <div>
            <h1>Home</h1>

            <div>
                <h3>What are you thinking?</h3>
                <input onChange={this.props.handleChange} name='input'></input>
                <button onClick={this.props.handleClick}>post</button>
                <div>
                    {this.props.needToLoginMessage}
                </div>
                {/* <div>{this.props.text}</div> */}
               
            </div>

           
          
          <div><h3>Read your friends posts:</h3></div>
          <div>
              <h4>People you may know</h4>
              {otherUsersArr.map((item,i)=>{
                  return <div>
                      <p>{item.name} {item.lastname}</p><button>Follow</button>
                      <button onClick={()=>this.otherProfile(item.email)}>Profile</button>
                      </div>
              })}
          </div>
        </div>
    );
}}
            


export default Home;





 

