let changeColorButton = document.getElementById('changeColor');

console.log("Setup started");
chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColorButton.onclick = function(event) {
    console.log("Button clicked");
    let color = event.target.value;
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        function(tabs) {
            console.log("Execute script");
            chrome.tabs.executeScript(
                tabs[0].id,
                {
                    code: 'document.body.style.backgroundColor = "' + color + '";',
                }
            );
        }
    );
};