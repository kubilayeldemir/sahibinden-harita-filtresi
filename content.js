let timeoutId;
let eventNumber = 0
let deletionNumber = 0
const isDevelopment = false;

const metroAndTrainState = {
    isOnlyMetroAndTrain: false
};

var targetNode = null;

var config = { attributes: false, childList: true, subtree: true };
var observer = new MutationObserver(handleChanges);

initTargetNodeObserver();

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
            deleteElementsByImageSrc(['durak.png', 'taksi.png']);
            isDevelopment && deletionNumber++;
            logInDevelopment("event num:" + eventNumber + " deletion Number: " + deletionNumber)
        }, 300);
    });
}

function initTargetNodeObserver() {
    targetNode = document.getElementById('gmap');

    if (targetNode) {
        observer.observe(targetNode, config);
        return;
    }

    const rootObserver = new MutationObserver(() => {
        const newTargetNode = document.getElementById('gmap');
        if (!newTargetNode) {
            return;
        }

        targetNode = newTargetNode;
        observer.observe(targetNode, config);
        rootObserver.disconnect();
    });

    rootObserver.observe(document.body, { childList: true, subtree: true });
}

function deleteElementsByImageSrc(imageNameParts) {
    if (!targetNode) {
        return;
    }

    const images = targetNode.querySelectorAll('img[src]');

    Array.from(images).forEach(image => {
        const imageSrc = image.getAttribute('src') || '';
        const shouldRemove = imageNameParts.some(imageNamePart => imageSrc.includes(imageNamePart));

        if (!shouldRemove) {
            return;
        }

        const markerContainer = image.closest('div');
        if (markerContainer && markerContainer !== targetNode && targetNode.contains(markerContainer)) {
            markerContainer.remove();
            return;
        }

        image.remove();
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