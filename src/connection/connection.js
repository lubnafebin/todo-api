const mongoose = require('mongoose');
const connect =async()=>{
    await mongoose.connect( process.env.MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
      });
}
module.exports = connect

  
