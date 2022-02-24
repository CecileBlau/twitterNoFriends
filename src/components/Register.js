import React, { Component } from 'react';
import axios from 'axios'

class Register extends Component {
    constructor() {
        super();
        this.state={
            email:'',
            password:'',
            name:'',
            lastname:'',
            msg:'',
        }


    }

    handleChange=(e)=>{
        //console.log([e.target.id],e.target.value)
        this.setState({[e.target.id] : e.target.value})
    }
    handleClick= async ()=>{
        const {email,password, name, lastname} = this.state
       if(name.trim().length==0 || lastname.trim().length==0){
        this.setState({msg:'name or last name are require'})
        return;
       }
        //sendint it to the server. the server is in between of the front end and the database
        try { 
            const response = await axios.post(`http://localhost:5050/register`, {
               email,
               password,
               name,
               lastname
            })
            console.log(response.data.message)
            this.setState({msg:response.data.message})
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return (
            <>
                <div>
                         <h1>Register</h1>
                         <label>Name </label>
                         <input type='text' id='name' name='name' onChange={this.handleChange} />
                         <br/>
                         <label>Last name </label>
                         <input type='text' id='lastname' name='lastname' onChange={this.handleChange} />
                         <br/>

                         <label>Email </label>
                         <input type='email' id='email' name='email' onChange={this.handleChange}/>
                         <br/>

                    
                         <label>Password </label>
                         <input type='password' id='password' onChange={this.handleChange}/>
                         <br/>

                         <button onClick={this.handleClick}>Register!</button>

                         
                </div> 
                <div>{this.state.msg}</div>
            </>

        );
    }
}



export default Register;


