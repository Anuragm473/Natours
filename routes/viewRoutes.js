/* eslint-disable */
const express=require('express')
const viewController=require('./../controllers/viewContoller')
const authController=require('./../controllers/authController')
const bookingController=require('./../controllers/bookingController')
const router=express.Router()
router.get('/',bookingController.createBookingCheckout,authController.isLoggedIn,viewController.getOverview)
router.get('/tours/:slug',authController.isLoggedIn,viewController.getTour)
router.get('/login',authController.isLoggedIn,viewController.login)
router.get('/me',authController.protect,viewController.getAccount)
module.exports=router