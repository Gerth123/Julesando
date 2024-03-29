let array = [
    {
        'menus': ['Asiatische Teriyaki-Hühnchen-Bowl', 'Mediterrane Quinoa-Salat-Bowl', 'Mexikanische Burrito-Bowl', 'Vegane Buddha Bowl', 'Thailändische Erdnuss-Tofu-Bowl', 'Grüne Power-Bowl', 'Fruchtige Frühstücks-Bowl', 'Italienische Caprese-Bowl'],
        'description': ['Gegrilltes Hühnchen in Teriyaki-Sauce, Gedämpfter Jasminreis, Geröstetes Gemüse (Brokkoli, Paprika, Karotten), Garniert mit Sesamsamen und Frühlingszwiebeln.', 'Bunte Quinoa als Basis, Kirschtomaten, Gurken und Oliven, Mozzarella, Zitronen-Olivenöl-Dressing, Basilikum, Oregano.', 'Gewürztes Rinderhackfleisch, Schwarze Bohnen und Maismischung, Guacamole oder Avocadoscheiben, Pico de Gallo (Tomaten, Zwiebeln, Koriander), Reis als Basis.', 'Quinoa oder Vollkornreis, Gebratene Süßkartoffeln, Hummus als Proteinzusatz, Avocado-Scheiben, Frisches Gemüse wie Spinat, Tomaten und Radieschen.', 'Gebratener Tofu in Erdnusssoße, Jasminreis oder Reisnudeln, Wok-gebratenes Gemüse (Paprika, Zuckerschoten, Karotten), Frischer Koriander und Limettenspalten.', 'Quinoa oder Bulgur, Gegrillter Lachs, Spargel, Erbsen und Brokkoli, Avocado-Scheiben, Zitronen-Dill-Dressing.', 'Griechischer Joghurt, Frische Beeren wie Erdbeeren, Blaubeeren und Himbeeren, Granola, Honig, Mandeln.', 'Büffelmozzarella oder Mozzarella-Kugeln, Tomaten in Scheiben geschnitten, Frisches Basilikum, Balsamico-Glasur und Olivenöl, Gegrilltes Hühnchen optional.'],
        'prices': [6.99, 5.99, 7.99, 8.99, 6.99, 7.99, 8.99, 9.99],
        'shoppingBasket': [],
        'shoppingPrices': [],
        'amounts': [],
    },
]

function reloadPage() {
    saveArray();
    showOffer();
    updateShoppingBasket();
}

function showOffer() {
    loadArray();
    let offer = document.getElementById('offer');
    offer.innerHTML = '';
    for (let offerIndex = 0; offerIndex < array[0]['menus'].length; offerIndex++) {
        const actualOffer = array[0]['menus'][offerIndex];
        const actualOfferDescription = array[0]['description'][offerIndex];
        const actualPrice = array[0]['prices'][offerIndex];
        let actualPrices = Number(array[0]['prices'][offerIndex]).toFixed(2).replace('.', ',');
        offer.innerHTML += createOfferText(actualOffer, actualOfferDescription, actualPrices, actualPrice);
    }
    showBasket();
}

function createOfferText(actualOffer, actualOfferDescription, actualPrices, actualPrice){
  return /*html*/ `
                    <div class="offerContainer" onclick="addToBasket('${actualOffer}', ${actualPrice})" >
                        <span class="offerHeadline"><b>${actualOffer}</b></span>
                        <br>
                        <br>
                        <div class="offerDescriptionAndAddToBasketPngContainer">
                            <span class="offerDescription">${actualOfferDescription}</span>
                            <div class="addToBasket"><img src="png/addToBasket.png" class="addToBasketPng"></div>
                        </div>
                        <div class="price">${actualPrices}€</div>
                    </div>
                        `;
}


// Warenkorb
function addToBasket(actualOffer, actualPrice,) {
    let index = getMenuIndex(actualOffer);
    if (array[0]['amounts'][index]) {
        addOneProduct(index) > 0;
    } else {
        if (array[0]['shoppingBasket'] !== null && array[0]['shoppingPrices'] !== null) {
            let menuIndex = getMenuIndex(actualOffer);
            if (menuIndex !== -1) {
                array[0]['amounts'][menuIndex]++;
            } else {
                array[0]['shoppingBasket'].push(actualOffer);
                array[0]['shoppingPrices'].push(actualPrice);
                array[0]['amounts'].push(1);
            };
        };
    };
    showBasket();
    updateShoppingBasket();
}

function getMenuIndex(actualOffer) {
    let index = array[0]['shoppingBasket'].indexOf(actualOffer);
    return index;
}

function updateShoppingBasket() {
    let sum = 0;
    for (let i = 0; i < array[0]['shoppingPrices'].length; i++) {
        sum += array[0]['shoppingPrices'][i] * array[0]['amounts'][i];
    };
    let finalSum = sum + 3; 
    document.getElementById('sum').innerHTML = '';
    document.getElementById('sum').innerHTML += `
        ${sum.toFixed(2).replace('.', ',')}€            
    `;
    document.getElementById('finalSum').innerHTML = '';
    document.getElementById('finalSum').innerHTML += `
        ${finalSum.toFixed(2).replace('.', ',')}€
    `;
}

function getValueFromInput(inputId) {
    let inputElement = document.getElementById(inputId);
    return inputElement.value;
}

function getMenuFromInput() {
    let menuValue = getValueFromInput('menu');
    return menuValue.trim();
}

function getPriceFromInput() {
    let priceValue = getValueFromInput('price');
    return Number(priceValue);
}

function formattedPrice(inputId) {
    let formattedPrice = inputId.replace('.', ',').toFixed(2);
    return formattedPrice;
}

function onAddMenu() {
    let newMenu = getMenuFromInput();
    let newPrice = getPriceFromInput();

    if (newMenu !== null && newPrice !== null) {
        let menuIndex = getMenuIndex(newMenu);
        if (menuIndex !== -1) {
            amounts[menuIndex]++;
        } else {
            menus.push(newMenu);
            prices.push(newPrice);
            amounts.push(1);
        }
    }
}

function showBasket() {
    saveArray();
    loadArray();

    if (array[0]['amounts'][0] !== null) {
        let basket = document.getElementById('fullBasketContainer');
        basket.innerHTML = '';
        document.getElementById(`basketContainerFull`).classList.remove('d-none');
        document.getElementById(`basketContainerEmpty`).classList.add('d-none');
        for (let basketIndex = 0; basketIndex < array[0]['shoppingBasket'].length; basketIndex++) {
            const shoppingBasket = array[0]['shoppingBasket'][basketIndex];
            const shoppingPrices = array[0]['shoppingPrices'][basketIndex];
            let actualShoppingPrices = Number(shoppingPrices * array[0]['amounts'][basketIndex]).toFixed(2).replace('.', ',');
            basket.innerHTML += createBasketText(shoppingBasket, actualShoppingPrices, basketIndex);
        }
    }
    if (array[0]['amounts'][0] == null) {
        document.getElementById('basketContainerFull').classList.add('d-none');
        document.getElementById('basketContainerEmpty').classList.remove('d-none');
    };
    updateShoppingBasket();
}

function createBasketText(shoppingBasket, actualShoppingPrices, basketIndex) {
    return /*html*/ `
    <div class="fullBasket">
            <span class="basketHeadline"><b>${shoppingBasket}</b></span>
        <div class="addOrDeleteAndPriceContainer">
            <div class="deleteOrAddOneProduct"> <img src="png/minus.png" class="deleteOneProductPng" onclick="deleteOneProduct(${basketIndex})"><span class="amountBetweenAddOrDelete">${array[0]['amounts'][basketIndex]}</span><img src="png/addToBasket.png" class="addOneProductPng" onclick="addOneProduct(${basketIndex})" id="addOneProductPng${basketIndex}"></div>
            <div class="deleteWholeProduct"> <img src="png/bin.png" class="deleteWholeProductPng" onclick="deleteWholeProduct(${basketIndex})"> </div>
            <div class="price" id="actualPrice">${actualShoppingPrices}€</div>
        </div>
            
    </div>
        `;
}

function deleteOneProduct(basketIndex) {
    array[0]['amounts'][basketIndex]--;
    if (array[0]['amounts'][basketIndex] == 0) {
        deleteWholeProduct(basketIndex);
    }
    showBasket();
}

function addOneProduct(basketIndex) {
    if (array[0]['amounts'][basketIndex] > 9) {
        array[0]['amounts'][basketIndex] = 10;
        document.getElementById(`addOneProductPng${basketIndex}`).classList.add('d-none');
    }
    else {
        array[0]['amounts'][basketIndex]++;
    }
    showBasket();
}

function deleteWholeProduct(basketIndex) {
    array[0]['shoppingBasket'].splice(basketIndex, 1);
    array[0]['shoppingPrices'].splice(basketIndex, 1);
    array[0]['amounts'].splice(basketIndex, 1);

    if (array[0]['amounts'][0] == null) {
        document.getElementById('basketContainerFull').classList.add('d-none');
        document.getElementById('basketContainerEmpty').classList.remove('d-none');
        reloadPage();
    };
    showBasket();
}

function openBasket() {
    document.getElementById('offerAndTopSectionContainer').classList.add('d-none');

    if (array[0]['amounts'][0] == null) {
    document.getElementById('basketContainerEmpty').classList.add('basketContainerEmptyResponsive');
    } else{
    document.getElementById('basketContainerFull').classList.add('basketContainerFullResponsive');
    };
}

function closeBasket(){
    document.getElementById('offerAndTopSectionContainer').classList.remove('d-none');

    if(array[0]['amounts'][0] == null) {
        document.getElementById('basketContainerEmpty').classList.remove('basketContainerEmptyResponsive');
    };

    if (array[0]['amounts'][0] !== null) {
        document.getElementById('basketContainerFull').classList.remove('basketContainerFullResponsive');
    };
}

function placeOrder(){
    document.getElementById('orderButton').classList.add('d-none');
    document.getElementById('orderCheckPngAndOrderFeedback').classList.remove('d-none');
    setTimeout(resetOrderButton, 2000);
}

async function resetOrderButton(){
    await document.getElementById('orderCheckPngAndOrderFeedback').classList.add('d-none'); 
    await document.getElementById('orderButton').classList.remove('d-none');
    array[0]['amounts'].length = 0;
    array[0]['shoppingBasket'].length = 0;
    array[0]['shoppingPrices'].length = 0;
    showBasket();
    closeBasket();
}


window.addEventListener('load', checkWidth);
window.addEventListener('resize', checkWidth);

function checkWidth() {
  var minBreite = 700;
  if (window.innerWidth > minBreite) {
   closeBasket();
  }
}

function saveArray() {
    let arrayAsText = JSON.stringify(array);
    localStorage.setItem('array', arrayAsText);
}

function loadArray() {
    let arrayAsText = localStorage.getItem('array');
    if (arrayAsText) {
        array = JSON.parse(arrayAsText);
    }
}