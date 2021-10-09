var cardClass = Array.from(document.getElementsByClassName("card"));
var cardArr = [];
var clickArr = [];

var cardquery = document.querySelector(".deck");
// Change randomly cards every run
for (var i = cardquery.children.length; i >= 0; i--) {
    cardquery.appendChild(cardquery.children[Math.random() * i | 0]);
}

for (var i = 0; i < cardClass.length; i++) {

    // Set on click function for every card 
    cardClass[i].addEventListener("click", function(event) {

        // If card is clicked, then can't click card again so remove event 
        event.path[1].style['pointer-events'] = "none";
        clickArr.push(event.path[1]);

        // Add clicked card in array
        var cardID = event.path[1].id;
        cardArr.push(cardID);

        // Flip clicked card
        var f = document.getElementById(event.path[1].id).getElementsByClassName("front")[0];
        f.style['backface-visibility'] = "hidden";

        var b = document.getElementById(event.path[1].id).getElementsByClassName("back")[0];
        b.style['backface-visibility'] = "visible";

        checkCards(); // Check If two clicked cards are match
        checkEnd(); // Check If all cards are clicked
    });
}

function checkCards() {

    if (cardArr.length == 3) {
        // Check if the two cards have the same image
        if (cardArr[0].charAt(0) != cardArr[1].charAt(0)) {
            // If cards are not equal flip cards.
            getNotMatchItems();

            // Reset click function to can click again
            clickArr[0].style['pointer-events'] = "initial";
            clickArr[1].style['pointer-events'] = "initial";
        }

        // Reset Arrays
        clickArr.splice(0, clickArr.length - 1);
        cardArr.splice(0, cardArr.length - 1);
    }
}

// Flip cards
function getNotMatchItems() {
    var f1 = document.getElementById(cardArr[0]).getElementsByClassName("front")[0];
    var b1 = document.getElementById(cardArr[0]).getElementsByClassName("back")[0];
    changeVisibility(f1, b1);

    var f2 = document.getElementById(cardArr[1]).getElementsByClassName("front")[0];
    var b2 = document.getElementById(cardArr[1]).getElementsByClassName("back")[0];
    changeVisibility(f2, b2);
}

// Change card visibility
function changeVisibility(front, back) {
    front.style['backface-visibility'] = "visible";
    back.style['backface-visibility'] = "hidden";
}

// Check if game is finished
function checkEnd() {
    var j;
    for (j = 0; j < cardClass.length; j++) {
        // Check if all cards are clicked
        if (!cardClass[j].style.cssText.includes("none"))
            break;
    }

    // If all cards are clicked
    if (j == cardClass.length)
        createBtn();
}

function createBtn() {
    // Create replay button
    document.getElementById("finish").innerHTML = "CONGRATULATIONS 👏🎉🎉 <br><br> <button onclick=replayFun() id=btn> Replay </button>";

    // Style replay button
    document.getElementById("btn").style.cssText = "background-color: royalblue; border: none; color: white; padding: 15px 32px; text-align: center; font-size: 16px; margin: 4px 2px; cursor: pointer;"
}

// Refresh the page if replay button is clicked
function replayFun() {
    location.reload();
}