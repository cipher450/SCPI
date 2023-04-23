const sql = require('mssql');
const configData = require("./config");
 
sql.connect(configData.sql).then((pool) => {
    if (pool.connected) {
        console.log('Connected to SQL Server')
      }
  },(err)=>{
    console.log(`an error ocured while connecting to the database : ${err}`)
  });


module.exports =  sql;
