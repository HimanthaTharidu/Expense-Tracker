import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 2, maxlength: 50},
        email: { type: String, required: true, unique: true, lowercase: true },
        hashPassword: {type: String, required: true}
    },
    {timestamps: true}
)

const User = mongoose.model("User", userSchema);
export default User;