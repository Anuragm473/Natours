const Tour=require('./../models/tourModel')
const catchAsync=require('./../utils/catchAsync')
const AppError=require('../utils/appError')
const User=require('../models/userModel')
exports.getOverview=catchAsync(async(req,res,next)=>{
    const tours=await Tour.find()
    res.render('overview',{
      title:'Overview',
      tours
    })
})
exports.getTour=catchAsync(async(req,res,next)=>{
    const tour=await Tour.findOne({slug:req.params.slug}).populate({
        path:'reviews',
        fields:'review rating user'
    })
    if(!tour){
      return next(new AppError('This Tour is Not Found',404))
    }
    res.render('tour',{
      title:`${tour.name}`,
      tour
    })
})
exports.login=(req,res)=>{
  res.render('login',{
    title:'Login page'
  })
}
exports.getAccount=(req,res)=>{
  res.render('account',{
    title:'My Account'
  })
}