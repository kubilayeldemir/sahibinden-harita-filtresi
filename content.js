// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "runContentScript") {
      // Your existing content.js logic goes here
      console.log("Content script is running!");
        deleteElementsByClassId("durak");
        deleteElementsByClassId("taksi");

    }
  });
  

  function deleteElementsByClassId(classId) {
    var elements = document.getElementsByClassName(classId);

    for (var i = elements.length - 1; i >= 0; i--) {
        var element = elements[i];
        element.parentNode.removeChild(element);
    }
}

// Example: Delete elements with class ID "example"
