const { format } = require('express/lib/response');
const winston=require('winston');
const winstonMongodb=require('winston-mongodb');
const logConfiguration={
    transports:[
       
    new winston.transports.File({
        level:'info',
        filename:'logs/loggingErrors.log'

    }),
    new winston.transports.MongoDB({
        level:'error',
        db:'mongodb://srv1:27017/logsRMT',
        option:{
            useUnifiedTopology:true
        },
        collection:'server_logs',
        format:winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        )

    })
]
}

const logger=winston.createLogger(logConfiguration);
module.exports = logger;
