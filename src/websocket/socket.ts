import { io } from "../index";

export const socket = () => {
    console.log("Hello from socket")
    io.on("connection", (socket) => {
        console.log("Socket connected", socket.id);
    })
}


