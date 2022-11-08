const Order = require("../models/orderModel");
const Service = require("../models/serviceModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create new order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {

    const {
        locationInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        collectionPrice,
        totalPrice, } = req.body


    const order = await Order.create({
        locationInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        collectionPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(201).json({
        success: true,
        order,
    })
})
 

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({
        success: true,
        order,
    })
})

//get Logged in User orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    // if(!order){
    //     return next(new ErrorHandler("Order not found with this Id", 404 ));
    // }
    res.status(200).json({
        success: true,
        orders,
    })
})

//get all orders --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
})
//get all orders --Collector
exports.getAllOrdersCollector = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount, 
        orders,
    })
})

//Update order status --Admin
exports.UpdateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Collected") {
        return next(new ErrorHandler("You have already collected this order", 400))
    }

    if (req.body.status === "Underway") {
        order.orderItems.forEach(async (o) => {
          await updateStock(o.service, o.quantity);
        });
      }
    order.orderStatus = req.body.status;

    if (order.orderStatus === "Collected") {
        order.collectedAt = Date.now()
    }

    await order.save({ ValidateBeforeSave: false })
    res.status(200).json({
        success: true,
    })
})
//created to sort the await function error
async function updateStock(id, quantity) {
    const service = await Service.findById(id)
    service.Stock -= quantity
    await service.save({ ValidateBeforeSave: false })
}


//delete order --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    await order.remove()

    res.status(200).json({
        success: true,

    })
})