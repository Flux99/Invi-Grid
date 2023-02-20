const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
// const fs = require('fs');
const path = require('path');
const secret = 'your-256-bit-secret-oaiwdaojwdaw';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("req payload", req);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token in middleware", token);
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, secret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }


app.get('/pdf',authenticateToken, (req, res) => { // 
    console.log("req payload", req.user);
  const userId = req.user.name;
  let filename;
  if (userId === 'userA') {
    filename = 'pdfA.pdf';
  } else if (userId === 'userB') {
    filename = 'pdfB.pdf';
  } else {
    return res.status(400).send('Invalid user ID');
  }

    const fileName = userId === 'userA' ? 'pdf_A.pdf' : 'pdf_B.pdf';
    return res.sendFile(fileName, { root: __dirname });

});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});