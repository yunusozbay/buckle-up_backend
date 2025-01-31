import mongoose from 'mongoose';

function dbConnection():void{

mongoose.set('strictQuery', false);

const MONGO_URI: string =
  process.env.MONGODB_URI!;

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName: string = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err);
  });
}


export default dbConnection