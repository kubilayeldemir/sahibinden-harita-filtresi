chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the content script to trigger its execution
    chrome.tabs.sendMessage(tab.id, { action: "runContentScript" });
  });
  