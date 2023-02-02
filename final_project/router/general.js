const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username
  const password = req.body.password
  if (username && password) {
      if (!isValid(username)) {
          users.push({"username":username, "password":password})
          return res.status(200).json({message: "User successfully registered."})
      } else {
          return res.status(404).json({message: "User exists already"})
      }
  }
  return res.status(404).json({message: "Unable to register"})
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   res.send(JSON.stringify(books,null,4));
// });

public_users.get('/',function (req, res) {
    new Promise((resolve,reject) => {
        resolve(books)
    })
    .then(
        result => res.send(result)
    )
  });

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   res.send(books[req.params.isbn])
//  });

public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn
    new Promise((resolve,reject) => {
        if (books[isbn]) {
            resolve(books[isbn])
        }
    })
    .then(
        result => res.send(result)
    )
   });
  
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   const author = req.params.author
//   let book = []
//   Object.keys(books).forEach(single => {
//       if (books[single].author === author) book.push(books[single])
//   })
//   res.send(book)
// });

public_users.get('/author/:author',function (req, res) {
    const author = req.params.author
    new Promise((resolve, reject) => {
        let book = [];
        Object.keys(books).forEach(i => {
            if(books[i].author == author){
                book.push(books[i])
            }
        });
        if(book.length>0){
            resolve(book)
        }
    })
    .then(
        result => res.send(result)
    )
  });

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   const title = req.params.title
//   let book = []
//   Object.keys(books).forEach(single => {
//       if (books[single].title === title) book.push(books[single])
//   })
//   res.send(book)
// });

public_users.get('/title/:title',function (req, res) {
    const title = req.params.title
    new Promise((resolve, reject) => {
        let book = [];
        Object.keys(books).forEach(i => {
            if(books[i].title == title){
                book.push(books[i])
            }  
        });
        if(book.length>0){
            resolve(book);
        }
    })
    .then(
        result => res.send(result)
    )
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  res.send(books[req.params.isbn].reviews)
});

module.exports.general = public_users;
