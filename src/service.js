chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    // We get a message from the content script

    switch(request.func) {
        default:
            // do something else
            break;
        case 'deso-keys':
            // Write the keys to the extension storage
            chrome.storage.local.set({data: request.data})
            break;
    }

    sendResponse({farewell: "Thanks."});
});