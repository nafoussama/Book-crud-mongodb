import mongoose from "mongoose";

const connectionDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Database connected ✅`);
  } catch (error) {
    console.error(`Database not connected ❌ : ${error.message} `);
    process.exit(1);
  }
};

export default connectionDatabase;
