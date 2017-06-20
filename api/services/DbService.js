var mysql = require("mysql");

var BIConnectionProperties = sails.config.connections.dbServer;
BIConnectionProperties["connectionLimit"] = 100;
var BIpool = mysql.createPool(BIConnectionProperties);

module.exports = {

   
    query : function (query, callback) {
        sails.log.info('Db Query : ' + query);
        //DbService.getBIConnection().query(query, callback);
        BIpool.getConnection(function (err, connection) {
            if (err) {
                if (connection) {
                    connection.release();
                }
                return callback(err, connection);
            }

            if (connection) {
                connection.query(query, function (err1, rows){
                    if (connection) {
                        connection.release();
                    }

                    return callback(err1, rows);
                });
                connection.on('error', function(err2) {      
                  return callback(err2, []);   
                });
            }
        });
    }

};