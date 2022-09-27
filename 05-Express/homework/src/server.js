// const bodyParser = require("body-parser");
const { json } = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422; 

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
var id = 1;

server.post('/posts', (req, res) => {
    let {author, title, contents} = req.body;
    if(author && title && contents) {
        let post = {author, title, contents, id: id++};
        posts.push(post);
        return res.json(post);
    } else {
        return res.status(STATUS_USER_ERROR).json({
            error: 'No se recibieron los parámetros necesarios para crear el Post'
        })
    }
});

server.post('/posts/author/:author', (req, res) => {
    let {title, contents} = req.body;
    let {author} = req.params;
    if(author && title && contents) {
        let post = {author, title, contents, id: id++};
        posts.push(post);
        return res.json(post);
    } else {
        return res.status(STATUS_USER_ERROR).json({
            error: 'No se recibieron los parámetros necesarios para crear el Post'
        })
    }
});

server.get('/posts', (req, res) => {
    let {term} = req.query;
    if(!term) {
        return res.json(posts)
    } else {
        let filtered = posts.filter(post => post.title.includes(term) || post.contents.includes(term))
        return res.json(filtered); 
    }
});

server.get('/posts/:author', (req, res) => {
    let {author} = req.params;
    let postsFromAuthor = posts.filter(post => post.author === author.replace('%20', ' '));
    if(postsFromAuthor.length) {
        return res.json(postsFromAuthor)
    } else {
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    }
});

server.get('/posts/:author/:title', (req, res) => {
    let {author, title} = req.params;
    let result = posts.filter(post => post.author === author && post.title === title);
    if(result.length) {
        return res.json(result)
    } else {
        return res.status(STATUS_USER_ERROR).json({
            error: "No existe ningun post con dicho titulo y autor indicado"
        })
    }
});

server.put('/posts', (req, res) => {
    let {id, title, contents} = req.body;
    if(id && title && contents) {
        let post = posts.find(post => post.id === id);
        if(post) {
            post.title = title,
            post.contents = contents
            return res.json(post)
        } else {
            res.status(STATUS_USER_ERROR).json({error: 'No se encontro el post'})
        }
    } else {
        return res.status(STATUS_USER_ERROR).json({
            error: 'No se recibieron los parametros necesarios para modificar el post'
        })
    }
});

server.delete('/posts', (req, res) => {
    let {id} = req.body;
    let post = posts.filter(post => post.id === id);
    if(id && post.length) {
        posts = posts.filter(post => post.id !== id);
        return res.json({ success: true });
    } else {
        res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});
    }
});

server.delete('/author', (req, res) => {
    let {author} = req.body;
    let deletedPosts = posts.filter(post => post.author === author);
    if(author && deletedPosts.length) {
        posts = posts.filter(post => post.author !== author);
        return res.json(deletedPosts);
    } else {
        return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});
    }
})

module.exports = { posts, server };
