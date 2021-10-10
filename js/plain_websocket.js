/*Use plain websocket connection */


var websocket = null;


const createWebsocketConnectionFunc = function () {
    websocket = new WebSocket("wss://ws-feed-public.sandbox.exchange.coinbase.com");
    websocket.onopen = function (e) {
        console.log("Connection established");
        deactivateButtonFunc(connectBtn);
        activateButtonFunc(disconnectBtn);
        /*We are subscribing to coinbase BTC ticks */
        subscribeToTickFunc();
    };

}


const subscribeToTickFunc = function () {

    console.log("Sending to server");
    message = {
        "type": "subscribe",
        "channels": [
            {
                "name": "ticker",
                "product_ids": [
                    "BTC-USD"
                ]
            }
        ]
    };
    websocket.send(
        JSON.stringify(message)
    );
}

const disconnectWebsocketConnectionFunc = function(){
    if (websocket != null) {
        websocket.close();
    }
    console.log("Disconnected");
    activateButtonFunc(connectBtn);
    deactivateButtonFunc(disconnectBtn);

    
}

const activateButtonFunc=function(btn){
    btn.disabled=false;
}

const deactivateButtonFunc=function(btn){
    btn.disabled=true;
}

/*Create socket connection when Connect btn clicked */
const connectBtn=document.getElementById('connect-btn');
connectBtn.addEventListener('click',createWebsocketConnectionFunc);

/*CLose socket connection when Disconnect btn clicked */
const disconnectBtn=document.getElementById('disconnect-btn');
disconnectBtn.addEventListener('click',disconnectWebsocketConnectionFunc);

