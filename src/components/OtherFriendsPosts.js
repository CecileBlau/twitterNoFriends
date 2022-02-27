import React, { useState,useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';

//imp
// const params = useParams()
// console.log(params.useremail)
// 'localchost 5005/ profileOther/ {params.useremail}' 

function OtherFriendsPosts(props) {
    const [display, setDisplay] = useState([])
    const [name, setName] = useState([])
    const params = useParams()
    useEffect( async ()=>{
    try {
        const responseName =  await axios.get(`http://localhost:5050/profileName/${params.useremail}`)
        const response =  await axios.get(`http://localhost:5050/profileOther/${params.useremail}`)
        console.log(response.data)
        console.log('response name', responseName.data)
        if(response.data){
            setDisplay(response.data)
            setName(responseName.data)
            
        }
        
    } catch (error) {
        console.log(error)
    }
    },[])
    return(
        <>
        uhihi
        {name.length>0 ? <h1>{name[0].name} {name[0].lastname}</h1>: null}
        {display.map((item, i)=>{
            return <div><p>{item.tweet}</p></div>
        })}
        </>
        
    )
        
}

export default OtherFriendsPosts;