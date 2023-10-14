
// content.js
// Function to run when changes are detected in the target div
function handleChanges(mutationsList) {
    mutationsList.forEach(mutation => {
      // Check if the mutation is related to 'markerContainer'
      if (mutation.target.id === 'markerContainer') {
        // Run your script here
        console.log('Change detected in markerContainer!');
        // Add your script logic here
        deleteElementsByClassId("durak");
        deleteElementsByClassId("taksi");
      }
    });
  }
  
  // Target node to observe for changes
  var targetNode = document.getElementById('markerContainer');
  
  // Options for the observer (all changes)
  var config = { attributes: true, childList: true, subtree: true };
  
  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(handleChanges);
  
  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
  

  function deleteElementsByClassId(classId) {
    var elements = document.getElementsByClassName(classId);

    for (var i = elements.length - 1; i >= 0; i--) {
        var element = elements[i];
        element.parentNode.removeChild(element);
    }
}
