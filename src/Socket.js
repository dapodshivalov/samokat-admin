// var socket = new WebSocket("ws://217.198.83.164:49999/");

class Socket {

    static socketCallbacks = {};


    static initFunction() {
        var socket = new WebSocket("wss://scooter.mac-siemens.ru:49999/");
        socket.onmessage = (event) => {
            // console.log("ONMESSAGE");
            // console.log(Socket.socketCallbacks);
            Object.keys(Socket.socketCallbacks) .forEach(key => {
                Socket.socketCallbacks[key](event);
            });
        }
        return socket;
    }

    static socket = Socket.initFunction();

}

export default Socket;