const cluster = require ("cluster")
const http = require ("http")
const numCPUs = require ("os").cpus().length

//console.log(numCPUS)

if (cluster.isMaster){
    console.log("Master ${process.pid} is running");
}