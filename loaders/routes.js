 module.exports = function (app){

app.use(require("../routes/user"));
 
app.use('/register', require('../routes/user'));

app.use('/login', require('../routes/user'))

app.use('/blog', require('../routes/user'))

app.use('/user', require('../routes/user'))

app.use('/createblog', require('../routes/user'))

app.use('/updateblog', require('../routes/user'))

// app.use((req, res, next) => {
//     const error = new Error();
//     error.status = 404;
//     error.message = "404 NOT FOUND";
//     next(error);
//   });

 }