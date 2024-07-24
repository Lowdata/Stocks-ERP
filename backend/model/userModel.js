import mongoose from "mongoose";
import bcrypt from "bcryptjs";


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
    //   maxLength: [25, "Please enter at most 255 characters"],
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
      default:
        "https://www.google.com/imgres?q=user%20profile&imgurl=https%3A%2F%2Fcdn.vectorstock.com%2Fi%2F1000v%2F30%2F97%2Fflat-business-man-user-profile-avatar-icon-vector-4333097.jpg&imgrefurl=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fflat-business-man-user-profile-avatar-icon-vector-4333097&docid=u1SY3va6wsUW9M&tbnid=i57iCtS92F1kdM&vet=12ahUKEwi6vKa57r6HAxURTmwGHbeZCTUQM3oECGMQAA..i&w=1000&h=1080&hcb=2&ved=2ahUKEwi6vKa57r6HAxURTmwGHbeZCTUQM3oECGMQAA", // add a default one
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

//password encryption
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);
export default User;
