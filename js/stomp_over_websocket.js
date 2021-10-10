/*Stomp over websocket connection */

var stompClient = null;


const createWebsocketConnectionFunc = function () {
    websocket = new WebSocket("ws://localhost:8080/gs-guide-websocket");
    stompClient = new Stomp.over(websocket);

    stompClient.connect({}, function (frame) {
        console.log("Connection established");
        deactivateButtonFunc(connectBtn);
        activateButtonFunc(disconnectBtn);
        // Subscribe to stomp endpoint
        subscribeToMessageTopicFunc();
    })

}


const subscribeToMessageTopicFunc = function () {
    stompClient.subscribe("/topic/greetings", function (msg) {
        messageContent=JSON.parse(msg.body).content;
        const subscribeNotifications = document.getElementById("subcribe-notification");
        subscribeNotifications.innerHTML += `<div class="alert alert-success">${messageContent}</div>`;
        console.log("SUBCRIBED SUCCESSSSSSS")
    });

}

const sendMessageFunc = function () {
    const userName = document.getElementById("input-message");
    stompClient.send("/app/hello", {}, JSON.stringify({ 'name': `${userName.value}` }));
}

const disconnectWebsocketConnectionFunc = function () {
    stompClient.disconnect(function () {
        console.log("Disconnected");
        activateButtonFunc(connectBtn);
        deactivateButtonFunc(disconnectBtn);
    });
}

const activateButtonFunc = function (btn) {
    btn.disabled = false;
}

const deactivateButtonFunc = function (btn) {
    btn.disabled = true;
}

/*Create socket connection when Connect btn clicked */
const connectBtn = document.getElementById('connect-btn');
connectBtn.addEventListener('click', createWebsocketConnectionFunc);

/*CLose socket connection when Disconnect btn clicked */
const disconnectBtn = document.getElementById('disconnect-btn');
disconnectBtn.addEventListener('click', disconnectWebsocketConnectionFunc);

const sendMessageBtn = document.getElementById('send-message-btn');
sendMessageBtn.addEventListener('click', sendMessageFunc);