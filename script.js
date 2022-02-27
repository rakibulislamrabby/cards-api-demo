//First setup Button Event Handler
//2 get input value
//3 error handling for string value
//4 fetch api data of else condition
const main = document.getElementById("main");
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");
    const inputValue = parseInt(input.value);
    //error handling
    if (isNaN(inputValue) || inputValue <= 0 || inputValue == "") {
        error.innerText = "Please give a positive Number";
        input.value = "";
        main.innerHTML = "";
    }
    else {
        //error handling
        main.innerHTML = ""

        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            .then(res => res.json())
            .then(data => displayCards(data.cards))

        input.value = "";
        error.innerHTML = "";
    }
}
const displayCards = (cards) => {
    for (const card of cards) {
        //
        const div = document.createElement("div");
        div.className = "col-lg-4";
        div.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${card.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${card.suit}</h5>
        <p class="card-text">${card.code}</p>
        <button onclick="cardDetails('${card.code}')" class="btn btn-primary">See Details</button>
        </div>
    </div>
        `;
        main.appendChild(div)
    }
}
const cardDetails = (code) => {
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(res => res.json())
        .then(data => {
            const allCards = data.cards;
            const singleCard = allCards.find(card => card.code === code)
            const div = document.createElement("div");
            main.innerHTML = ""
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
        <img src="${singleCard.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${singleCard.suit}</h5>
        <p class="card-text">${singleCard.code}</p>
        <p class="card-text">${singleCard.value}</p>

        <button onclick="cardDetails('${singleCard.code}')" class="btn btn-primary">See Details</button>
        </div>
    </div>
            `;
            main.appendChild(div)
        })
}