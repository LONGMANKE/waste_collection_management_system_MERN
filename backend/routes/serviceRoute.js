const express = require("express");
const { getAllServices, createService, updateService, deleteService, getServiceDetails, createServiceReview, deleteReview, getServiceReviews, getAdminServices, } = require("../controllers/serviceControllers");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/services").get(getAllServices);
router.route("/admin/service/new").post(isAuthenticatedUser, authorizedRoles("admin"), createService);
router.route("/admin/services").get(isAuthenticatedUser, authorizedRoles("admin"), getAdminServices);
router.route("/admin/service/:id").put(isAuthenticatedUser, authorizedRoles("admin"), updateService).delete(isAuthenticatedUser, authorizedRoles("admin"), deleteService);
router.route("/service/:id").get(getServiceDetails);
router.route("/review").put(isAuthenticatedUser, createServiceReview);
router.route("/reviews").get(getServiceReviews).delete(isAuthenticatedUser, deleteReview); 

module.exports = router;