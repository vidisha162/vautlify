import mongoose from "mongoose";

const secretSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  encrypted: {
    type: String,
    required: true,
  },
});

// export const Secret = mongoose.model("Secret", secretSchema);
const Secret = mongoose.model("Secret", secretSchema);
export default Secret;
