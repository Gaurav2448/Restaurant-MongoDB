const express=require('express');
const router=express.Router();
const auth_controller=require("../controller/auth-controller");


router.route('/').get(auth_controller.home);
router.route('/book').post(auth_controller.book);
router.route('/view').get(auth_controller.view);
router.route('/view/:id').get(auth_controller.getUserById);
router.route('/view/delete/:id').delete(auth_controller.deleteById);
router.route('/view/update/:id').patch(auth_controller.updateById);

module.exports=router;