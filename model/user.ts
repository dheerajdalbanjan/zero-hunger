import { models } from "mongoose";

const { default: mongoose, Schema } = require("mongoose");



const userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });


  const User = models.User || mongoose.model("User", userSchema);
  export default User;