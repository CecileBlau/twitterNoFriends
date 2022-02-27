import axios from 'axios';

import React, { Component } from 'react';
import OtherFriendsPosts from './OtherFriendsPosts'
import { Route, Link, Routes } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otherUsersArr: [],
            postsOtherUsers: []
        }

    }

    async componentDidMount() {
        const { user_email } = this.props
        try {
            const response = await axios.post('http://localhost:5050', {
                user_email,

            })
            console.log(response.data)
            this.setState({ otherUsersArr: response.data })
        } catch (error) {

        }
    }

    async otherProfile(emailOther) {
        console.log(emailOther)
        const { user_email } = this.props
        try {
            const response = await axios.post('http://localhost:5050/otherfriends', {
                emailOther,
                user_email,
            })

            console.log(response.data)
        } catch (error) {
            console.log(error)

        }
    }

    // watch friends profile
    async seeOtherProfile(emailOther) {
        // try {
        //     const responseTwo = await axios.get(`/emailOther/${emailOther}`)
        //     console.log(responseTwo.data)
        // } catch (error) {

        // }

        try {
            const response = await axios.post(`http://localhost:5050/emailOther`, {
                emailOther
            })
            this.setState({ postsOtherUsers: response.data })

        } catch (error) {

        }


    }



    render() {
        //aca se consologuea los posts del other user
        console.log(this.state.postsOtherUsers)
        const { otherUsersArr } = this.state
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
                    {/* {this.state.postsOtherUsers.map((item,i)=>{
                    console.log(item)
                    return <OtherFriendsPosts item={item}/>
                })} */}
                </div>
                <div>
                    <h4>People you may know</h4>
                    {otherUsersArr.map((item, i) => {
                        return (
                        <div key={i}>
                            <p>{item.name} {item.lastname}</p>
                            <button onClick={() => this.otherProfile(item.email)}>Follow</button>
                            <Link to={`/profileOther/${item.email}`}>Profile</Link>
                            
                        </div>)
                    })}

                    
                </div>



            </div>
        );
    }
}



export default Home;







