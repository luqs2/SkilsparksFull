import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

// Create a new review
export const createReview = async (req, res, next) => {
    // Ensure the user is not a seller
    if (req.isSeller)
        return next(createError(403, "Seller can't create Review"));

    // Create a new review
    const newReview = new Review({
        userId: req.userId,         // User ID from the authenticated user
        gigId: req.body.gigId,      // gigId from the body of the request
        desc: req.body.desc,        // Description of the review
        star: req.body.star,        // Rating for the gig
    });

    try {
        // Check if the user has already reviewed this gig
        const review = await Review.findOne({
            gigId: req.body.gigId, // Use gigId from the request body
            userId: req.userId,
        });

        if (review)
            return next(createError(403, "You have already reviewed this gig"));

        // Save the new review
        const savedReview = await newReview.save();

        // Update the gig's star ratings
        await Gig.findByIdAndUpdate(req.body.gigId, {
            $inc: { totalStars: req.body.star, starNumber: 1 }, // Increment total stars and the number of reviews
        });

        res.status(201).send(savedReview); // Respond with the saved review
    } catch (err) {
        next(err); // Forward the error to error handling middleware
    }
};

// Get reviews for a specific gig
export const getReviews = async (req, res, next) => {
    try {
        // Find all reviews for a specific gigId from the request body
        const reviews = await Review.find({ gigId: req.params.gigid }); // Use gigId from request body
        res.status(200).send(reviews); // Send the reviews as a response
    } catch (err) {
        next(err); // Forward any errors
    }
};

// Delete a review (This function is not yet implemented)
export const deleteReview = async (req, res, next) => {
    try {
        // Logic for deleting a review goes here
    } catch (err) {
        next(err); // Forward errors if any
    }
};
