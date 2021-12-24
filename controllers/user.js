const login = require("../models/query");
const db = require ('../config/knex_config')



const bcrypt = require("bcrypt");
// const { user } = require("../config/db_config");
const saltRounds = 10;

// const winston = require("winston");

// const { register } = require("../models/query");

const MODULE = "controllers/login";

module.exports = {
  /**
   * login controller
   */
   updateBlog: async (req, res, next) => {
    try {
      let dataresponse = {};
      let where = {};
      where ["id"] = req.params.id

      let data = {
        id: req.body.id,
        title: req.body.title,
        body: req.body.body,
        user_id: req.body.user_id,
      };
      let update = await login.update("blog", where, data);
      if (update) {
        dataresponse["status"] = 1;
        dataresponse["message"] = "Blog updated Successfully";
        res.send(dataresponse);
      } else {
        dataresponse["status"] = 0;
        dataresponse["message"] = "Unable To update";
        res.send(dataresponse);
      }
    } catch (error) {
      next(error);
    }
   },






  getBlog: async (req, res, next)=>{
    try{
      let dataresponse = {};
      let blog = await login.selectAll("*", "blog")
      if (blog) {
        dataresponse ["status"] = 1;
        dataresponse ["message"] = blog;
        res.send(dataresponse);
      }else{
        dataresponse["status"] = 0;
        dataresponse["message"] = "Unable To fetch";
        res.send(dataresponse);
      }
    }catch (error) {
      next(error);
  }
},


getUser: async (req, res, next)=>{
  try{
    let dataresponse = {};
    let user = await login.selectAll("*", "users")
    if (user) {
      dataresponse ["status"] = 1;
      dataresponse ["message"] = user;
      res.send(dataresponse);
    }else{
      dataresponse["status"] = 0;
      dataresponse["message"] = "Unable To fetch";
      res.send(dataresponse);
    }
  }catch (error) {
    next(error);
}
},



   createBlog: async (req, res, next) => {
    try {
      let dataresponse = {};
      // let where = {};
      console.log(req.body);

      let data = {
        title: req.body.title,
        body: req.body.body,
        user_id: req.body.user_id,
      };
      let insert = await login.insert("blog", data);
      if (insert) {
        dataresponse["status"] = 1;
        dataresponse["message"] = "Blog Inserted Successfully";
        res.send(dataresponse);
      } else {
        dataresponse["status"] = 0;
        dataresponse["message"] = "Unable To create";
        res.send(dataresponse);
      }
    } catch (error) {
      next(error);
    }
   },
    




  register: async (req, res, next) => {
    try {
      let dataresponse = {};
      let where = {};
      where["email"] = req.body.email;
      where["password"] = req.body.password;
      let userExist = await login.select("email", "users", where);
      console.log(userExist);
      if (userExist.length) {
        dataresponse["status"] = 2;
        dataresponse["message"] = "User Already Exist";
        return res.send(dataresponse);
      }
      const password = req.body.password;
      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      let data = {
        user_id: req.body.user_id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: encryptedPassword,
      };
      let insert = await login.insert("users", data);
      if (insert) {
        dataresponse["status"] = 1;
        dataresponse["message"] = "User Insert Successfully";
        res.send(dataresponse);
      } else {
        dataresponse["status"] = 0;
        dataresponse["message"] = "Unable To Insert";
        res.send(dataresponse);
      }
    } catch (error) {
      next(error);
    }
  },


  login: async (req, res, next) => {
    try {
      let dataresponse = {};
      let where = {};
      const email = req.body.email;
      const password = req.body.password;

      where["email"] = email;
      

      console.log(where);
      let result = await login.select(["user_id", "name", "email", "phone", "password"], "users", where);

      if (result.length) {
       console.log(result)
        const comparison = await bcrypt.compare(password, result[0].password);
        if (comparison) {
          dataresponse["status"] = 1;
          dataresponse["data"] = result;
          dataresponse["message"] = "Login Successfull";
          return res.send(dataresponse);
        } else {
          dataresponse["status"] = 0;
          dataresponse["message"] = "Email and password does not match";
          return res.send(dataresponse);
        }
      } else {
        dataresponse["status"] = 0;
        dataresponse["message"] = "Email Doesn't Exist";
        res.send(dataresponse);
      }
    } catch (error) {
      next(error);
    }
  },
};