// This is a JavaScript module that is loaded on demand. It can export any number of
// functions, and may import other JavaScript modules if required.

//export function showPrompt(message) {
//  return prompt(message, 'Type anything here');
//}

window.dabeatOnlineCheckRCL = {
    registerOnlineHandler : function (dotNetObjectRef) {
        function onlineHandler() {
            dotNetObjectRef.invokeMethodAsync("SetOnlineStatus",
                navigator.onLine);
        };

        // Set up initial values
        onlineHandler();

        // Register event handler
        window.addEventListener("online", onlineHandler);
        window.addEventListener("offline", onlineHandler);
    }
}
