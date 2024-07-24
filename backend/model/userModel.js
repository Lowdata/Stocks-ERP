import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [5, "Please enter atleast 5 characters"],
      maxLength: [25, "Please enter at most 255 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    photo: {
      type: String,
      required: [true, "Please enter a photo"],
      default: "", // add a default one
    },
    bio: {
      type: String,
      default: "HI",
      maxLength: [250, "Please enter at most 250 characters"],
    },
    phone: {
      type: String,
      default: "+91-123",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
