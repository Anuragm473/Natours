const stripe=require('stripe')(process.env.STRIPE_Key)
const Tour=require('./../models/tourModel')
const Booking=require('./../models/bookingModel')
const catchAsync=require('./../utils/catchAsync')
const AppError=require('../utils/appError')
exports.checkOutSession=catchAsync(async (req,res)=>{
    const tour=await Tour.findById(req.params.tourID)

    const session=await stripe.checkout.sessions.create({
        payment_method_types:[`card`],
        success_url:`${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
        cancel_url:`${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email:req.user.email,
        client_reference_id:req.params.tourID,
        mode:'payment',
        line_items:[{
            quantity: 1,
            price_data: {
                currency: "inr",
                unit_amount: tour.price * 100,
                product_data: {
                    description: tour.summary,
                    name: tour.name,
                    images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                },
                },
        }]
    })
    console.log(session)

    res.json({
        status:'sucess',
        session
    })
});
exports.createBookingCheckout=catchAsync(async(req,res,next)=>{
    const {tour,user,price}=req.query

    if(!tour && !user && !price) return next()
    await Booking.create({tour,user,price})
    res.redirect(req.originalUrl.split('?')[0])
});