import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'developer', 'reporter'],
    default: 'reporter'
  },
 
},{
    timestamps:true
});

//hashing the password
userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10);
    next();
})

//checking the password
userSchema.methods.isPasswordCorrect=async function(password){
        const isValid= await bcrypt.compare(password,this.password);
        return isValid;
};

export const User= mongoose.model("User",userSchema);