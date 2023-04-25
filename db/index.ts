import mongoose from 'mongoose';

function dbConnection():void{

mongoose.set('strictQuery', false);

const MONGO_URI: string =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buckle-up_backend';

mongoose
  .connect(MONGO_URI)
  .then((x: any) => {
    const dbName: string = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err: any) => {
    console.error('Error connecting to mongo: ', err);
  });
}


export default dbConnection