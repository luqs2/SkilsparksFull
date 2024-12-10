import User from "../models/user.model.js";
import createError from "../utils/createError.js";

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Check if the authenticated user is the same as the user to be deleted
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted successfully.");
  } catch (error) {
    next(createError(500, "An error occurred while deleting the user."));
  }
};

// Get User
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json(user);
  } catch (error) {
    next(createError(500, "An error occurred while fetching the user."));
  }
};
