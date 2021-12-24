const router = require('express-promise-router')();

const user = require('../controllers/user');



router.route("/Uregister").post(user.register);

router.route('/Ulogin').post(user.login)

router.route('/blog').post(user.createBlog)

router.route('/getblog').get(user.getBlog)

router.route('/getuser').get(user.getUser)

router.route('/Ublog/:id').put(user.updateBlog)

// router.route('/blog').get(query.getBlog)
// controller 

module.exports = router;