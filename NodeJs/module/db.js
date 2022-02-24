const knex = require('knex')

const db = knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        port:'5432',
        user:'postgres',
        password:'cecile',
        database:'users'
    }
})

const getUser = (email) =>{
    return db('users')
    .select('email', 'password', 'name', 'lastname').where({email:email})
}

const insertUser = (email, password, name, lastname) =>{
    return db('users')
    .insert({email, password, name, lastname})
    .returning('*')

}

const insertPost = (user_email, tweet)=>{
    return db('posts')
    .insert({tweet, user_email})
    .returning('*')
}


const getPosts = (email) =>{
    return db('posts')
    .select('tweet_id', 'user_email', 'tweet').where({user_email:email})
}

const getOtherUsers = (r) =>{
    return db ('users')
    .select('*')
    .whereNot ({email : r})
}


const deletePost = (deleteTweet)=>{
    return db('posts')
    .del()
    .where({tweet_id: deleteTweet})
    .returning('*')
}


module.exports={
    getUser,
    insertUser,
    insertPost,
    getPosts,
    getOtherUsers,
    deletePost
}