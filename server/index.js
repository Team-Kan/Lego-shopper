const app = require('./app');
const { syncAndSeed, client } = require('./db');

const init = async()=> {
  try {
    await client.connect();
    if(process.env.MODE === "initalSeed"){
      await syncAndSeed();
    }
    const port = process.env.PORT || 3000;
    const server = app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();



