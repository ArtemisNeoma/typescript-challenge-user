import app from '../index.js'
import { config } from 'dotenv'
import { createServer } from 'http'

config( {path: './config/config.env'} )
const port = process.env.PORT || 3000
app.set("port", port)
const server = createServer(app)
server.listen(port)

server.on("error", onError)
server.on("listening", onListening)

function pipeOrPort(address: string | any) :string {
    return typeof address == "string" ? `pipe ${address}` : `port ${address.port}`
}

function onError(error: NodeJS.ErrnoException) :void {
    if (error.syscall != "listen") throw error

    let bind = pipeOrPort(server.address)
    switch (error.code) {
        case "EACESS":
            console.log(`${bind} requires elevated privileges`)
            process.exit(1)
        case "EADDRINUSE":
            console.log(`${bind} is already in use`)
            process.exit(1)
        default:
            throw error
    }
}

function onListening() {
    let bind = pipeOrPort(server.address())
    console.log(`Listening on ${bind}`)
}