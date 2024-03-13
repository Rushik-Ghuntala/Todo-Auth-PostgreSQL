import { io } from "..";

export const socket = () => {
io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);
    socket.on('user-message', (message) => {
        console.log("todo Fetch message", message);
        io.emit("server-message", message);
    });
    socket.on('todoFetch', (message) => {
        console.log(message);
        io.emit(message);
    });
    socket.on('todoAdded', (message) => {
        console.log(message);
        io.emit(message);
    });
    socket.on('todoUpdated', (message) => {
        console.log(message);
        io.emit(message);
    });
    socket.on('todoDeleted', (message) => {
        console.log(message);
        io.emit(message);
    });
})
}