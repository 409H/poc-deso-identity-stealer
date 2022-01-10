// We are on the identity.deso.org domain because of the manifest.json content script match
// We send a message to the extension with the localStorage in the data field
chrome.runtime.sendMessage({func: "deso-keys", data: localStorage}, function(response) {
    console.log(response);
})