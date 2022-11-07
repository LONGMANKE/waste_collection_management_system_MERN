const Service = require("../models/serviceModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const { findById } = require("../models/serviceModel");
const cloudinary = require("cloudinary");

// create A Service --Admin
// exports.createService = catchAsyncErrors(async (req, res, next) => {
//     req.body.user = req.user.id;
//     const service = await Service.create(req.body);
//     res.status(201).json({
//         success: true,
//         service,

//     })
// });
// Create Service -- Admin
exports.createService = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }


  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Services",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    service,
  });
});


// Get All Service
exports.getAllServices = catchAsyncErrors(async (req, res, next) => {

  // return next(new ErrorHandler("This is my temp error", 500));
  const resultPerPage = 6;
  const servicesCount = await Service.countDocuments();

  const apiFeature = new ApiFeatures(Service.find(), req.query)
    .search()
    .filter()

  // .pagination(resultPerPage);
  // const services = await apiFeature.query;


  let services = await apiFeature.query;
  let filteredServicesCount = services.length;
  apiFeature.pagination(resultPerPage);
  services = await apiFeature.query.clone();




  res.status(200).json({
    success: true,
    services,
    servicesCount,
    resultPerPage,
    filteredServicesCount,

  })
});

//This works collects all services 
/*
const services = await Service.find();
res.status(200).json({
    success: true,
    services,

})
});*/
//Get Service Details
exports.getServiceDetails = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  ////check well on above code
  // const servicesCount = awaitService.countDocuments();

  //before using clustered error handling
  /*if (!service) {
      res.status(500).json(
          {
              success: true,
              message: "Service not found"
          }
      )
  }*/
  if (!service) {
    return next(new ErrorHandler("Service not found, 404"));
  }
  else {
    res.status(200).json(
      {
        success: true,
        service

      }
    );
  }

}
);

// Get All Service (Admin)
exports.getAdminServices = catchAsyncErrors(async (req, res, next) => {
  const services = await Service.find();

  res.status(200).json({
    success: true,
    services,
  });
});
// //Update Service -- Admin
// exports.updateService = catchAsyncErrors(async (req, res, next) => {
//     let service = await Service.findById(req.params.id);
//     /* if (!service) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Service not found"
//             })
//         } */

//     if (!service) {
//         return next(new ErrorHandler("Service not found, 404"));
//     }
//     {

//         service = await Service.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//             useFindAndModify: false
//         });
//         res.status(200).json({
//             success: true,
//             service

//         })
//     }

// });

// Update Service -- Admin

exports.updateService = catchAsyncErrors(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorHander("Service not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < service.images.length; i++) {
      await cloudinary.v2.uploader.destroy(service.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "services",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    service,
  });
});


//Delete Service -- Admin

exports.deleteService = catchAsyncErrors(async (req, res, next) => {

  const service = await Service.findById(req.params.id)
  /*   if (!service) {
         return res.status(500).json({
             success: false,
             message: "service not found"
         })
     }
 */
  if (!service) {
    return next(new ErrorHandler("Service not found, 404"));
  }
  else {

    // Deleting Images From Cloudinary
    for (let i = 0; i < service.images.length; i++) {
      await cloudinary.v2.uploader.destroy(service.images[i].public_id);
    }
    await service.remove()





    res.status(201).json({
      success: true,
      message: "service deleted successfully"

    })
  }
});

//create review or update review

exports.createServiceReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, serviceId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }
  const service = await Service.findById(serviceId);

  const isReviewed = service.reviews.find(
    rev => rev.user.toString() === req.user._id)
  if (isReviewed) {
    service.reviews.forEach(rev => {
      if (rev => rev.user.toString() === req.user._id)
        rev.rating = rating,
          rev.comment = comment
    })
  }
  else {
    service.reviews.push(review);
    service.numOfReviews = service.reviews.length
  }


  let avg = 0;
  // 4,5,5,2 = 166/==4=4
  service.reviews.forEach(rev => {
    avg = avg + rev.rating

    //avg+= rev.rating

  })

  service.ratings = avg / service.reviews.length

  await service.save({
    validateBeforeSave: false
  })
  res.status(200).json({
    success: true,
  })
});
//Get all reviews  
exports.getServiceReviews = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.query.id);

  if (!service) {
    return next(new ErrorHandler("Service not found", 404))
  }
  res.status(200).json({
    success: true,
    reviews: service.reviews,
  })

})

//Delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.query.serviceId);

  if (!service) {
    return next(new ErrorHandler("Service not found", 404))
  }

  const reviews = service.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

  let avg = 0;
  // 4,5,5,2 = 166/==4=4
  reviews.forEach(rev => {
    avg = avg + rev.rating

    //avg+= rev.rating

  })

  const ratings = avg / reviews.length
  const numOfReviews = reviews.length
  await Service.findByIdAndUpdate(req.query.serviceId, {
    ratings, reviews, numOfReviews,
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,

  })
})