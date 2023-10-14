let timeoutId;

let eventNumber = 0
let deletionNumber = 0
// content.js
// Function to run when changes are detected in the target div
function handleChanges(mutationsList) {
    mutationsList.forEach(mutation => {
        eventNumber++
        clearTimeout(timeoutId);

        // Set a new timeout to wait for inactivity
        timeoutId = setTimeout(() => {
          // Perform bulk deletion after the inactivity period
          deleteElementsByClass(['taksi', 'durak']);
          deletionNumber++
        }, 100); // Adjust the timeout duration (in milliseconds) based on your needs
        console.log("event num:"+ eventNumber + " deletion Number: "+ deletionNumber)
    });
  }
  
  // Target node to observe for changes
  var targetNode = document.getElementById('markerContainer');
  
  // Options for the observer
  var config = { attributes: false, childList: true, subtree: false };
  
  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(handleChanges);
  
  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
  
// Function to delete elements with specified classes in bulk
  function deleteElementsByClass(classNames) {
    classNames.forEach(className => {
      const elementsToRemove = targetNode.getElementsByClassName(className);
  
      // Convert HTMLCollection to an array for bulk deletion
      const elementsArray = Array.from(elementsToRemove);
  
      // Remove elements in bulk
      elementsArray.forEach(element => {
        element.parentNode.removeChild(element);
      });
    });
  }
  