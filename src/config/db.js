import mongoose from "mongoose";
import dbName from "../../const.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${dbName}`
    );

    console.log(
      `mongo db is connected successfully at ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`error in connecting the database ${error}`) || process.exit(1);
  }
};
export default connectDb;