
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  try {
    console.log('server req accepted.....')
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('mongodb connection req accepted.....')
    app.listen(4000, () => {
      console.log(`Server is running on port 4000`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
