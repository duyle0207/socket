import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient;

let connect = cb => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
    return stompClient.connect({}, function (frame) {
        console.log("Connected " + frame);
        stompClient.subscribe(
            "/topic/greetings", 
            function (greeting) {
                cb(greeting.body);
            }
        );
    });
};

const sendSomething = () => {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': '123123'}));
};

export { connect, sendSomething };