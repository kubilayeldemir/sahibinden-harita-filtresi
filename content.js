let timeoutId;

let eventNumber = 0
let deletionNumber = 0

const metroAndTrainState = {
    isOnlyMetroAndTrain: true
  };
  
// content.js
// Function to run when changes are detected in the target div
function handleChanges(mutationsList) {
    console.log(metroAndTrainState.isOnlyMetroAndTrain)
    if (!metroAndTrainState.isOnlyMetroAndTrain) {
        return
    }
    mutationsList.forEach(mutation => {
        eventNumber++
        clearTimeout(timeoutId);

        // Set a new timeout to wait for inactivity
        timeoutId = setTimeout(() => {
            // Perform bulk deletion after the inactivity period
            deleteElementsByClass(['taksi', 'durak']);
            deletionNumber++
            console.log("event num:" + eventNumber + " deletion Number: " + deletionNumber)
        }, 100); // Adjust the timeout duration (in milliseconds) based on your needs
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

function addActiveListItemToPoiInfo(text, state) {
    // Find the <ul> element with class "poi-info"
    var ulElement = document.querySelector('ul.poi-info');

    if (ulElement) {
        // Create a new <li> element
        var liElement = document.createElement('li');

        // Set the attributes of the <li> element
        liElement.classList.add('active');
        liElement.id = 'skdfksefkskefksdfkksefksdfkefk';
        liElement.textContent = text;

        // Append the <li> element to the <ul> element
        ulElement.appendChild(liElement);

        // Add a click listener to the <li> element
        liElement.addEventListener('click', function () {
            // Toggle the "active" class
            state.isOnlyMetroAndTrain = !state.isOnlyMetroAndTrain
            liElement.classList.toggle('active', state.isOnlyMetroAndTrain);

            // Output the active status to the console
            console.log('Active Status:', state.isOnlyMetroAndTrain);
        });
    } else {
        console.error('Could not find <ul> element with class "poi-info"');
    }
}

// Example usage
addActiveListItemToPoiInfo("Sadece Metro/Tren", metroAndTrainState);
