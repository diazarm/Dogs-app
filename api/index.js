const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = 3001;

server.listen(PORT, ()=> {
  conn.sync({force:false});
  console.log(`Listening on port ${PORT}`);
});