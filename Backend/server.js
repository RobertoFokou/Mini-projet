const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 5000
const server = http.createServer(app)

server.listen(5000,"0.0.0.0", ()=>{
    console.log("le server tourne sur le port 5000")
})

