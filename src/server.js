const app = require('./app');
const connectDatabase =require('./connection/connection')

const PORT =process.env.PORT || 4000;


app.listen(PORT, async()=>{
    await connectDatabase();
    console.log('Server Listening on PORT:',PORT);   

});