const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter service name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter description name"]
    },
    price: {
        type: Number,
        require: [true, "Please enter price name"],
        maxLength: [8, "price cannot exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images:[
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter service category"]
    },
    Stock: {
        type: Number,
        require: [true, "Please enter service stock"],
        maxLength: [4, "Stock cannot exceed 3 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                require: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                // required: true,
                default:"WOW"
            }
        }
    ],
    // the user id called 
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

module.exports = mongoose.model("Service", serviceSchema)