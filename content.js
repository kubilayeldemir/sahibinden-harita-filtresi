let timeoutId;
let eventNumber = 0
let deletionNumber = 0
const isDevelopment = false;

const metroAndTrainState = {
    isOnlyMetroAndTrain: false
};

var targetNode = document.getElementById('markerContainer');

var config = { attributes: false, childList: true, subtree: false };
var observer = new MutationObserver(handleChanges);
if (targetNode) {
    observer.observe(targetNode, config);
}

addActiveListItemToPoiInfo("Sadece Metro/Tren vb.", metroAndTrainState);

function handleChanges(mutationsList) {
    logInDevelopment(metroAndTrainState.isOnlyMetroAndTrain)
    if (!metroAndTrainState.isOnlyMetroAndTrain) {
        return
    }
    mutationsList.forEach(mutation => {
        isDevelopment && eventNumber++;
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            deleteElementsByClass(['taksi', 'durak']);
            isDevelopment && deletionNumber++;
            logInDevelopment("event num:" + eventNumber + " deletion Number: " + deletionNumber)
        }, 300);
    });
}

function deleteElementsByClass(classNames) {
    classNames.forEach(className => {
        const elementsToRemove = targetNode.getElementsByClassName(className);
        const elementsArray = Array.from(elementsToRemove);

        elementsArray.forEach(element => {
            element.parentNode.removeChild(element);
        });
    });
}

function addActiveListItemToPoiInfo(text, state) {
    var ulElement = document.querySelector('ul.poi-info');

    if (ulElement) {
        var liElement = document.createElement('li');
        if (state.isOnlyMetroAndTrain) {
            liElement.classList.add('active');
        }
        liElement.title = "Aşağıdaki Ulaşım Seçeneğini Aktif Etmeyi Unutmayın!"
        liElement.textContent = text;
        ulElement.appendChild(liElement);

        liElement.addEventListener('click', function () {
            state.isOnlyMetroAndTrain = !state.isOnlyMetroAndTrain
            liElement.classList.toggle('active', state.isOnlyMetroAndTrain);
            logInDevelopment('Active Status:', state.isOnlyMetroAndTrain);
        });
    } else {
        logInDevelopment('Could not find <ul> element with class "poi-info"');
    }
}

function logInDevelopment(message) {
    if (isDevelopment) {
        console.log(message);
    }
}