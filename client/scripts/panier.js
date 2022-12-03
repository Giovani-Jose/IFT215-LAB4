

function chargerpanier() {
    console.log(IDCLIENT)
    if (IDCLIENT == -1){
        alert("Veuillez vous connecter.")
        window.location.replace("#/connexion")
        return;
    }

    $.ajax({
        url: "/clients/"+IDCLIENT+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function(result) {
            console.log(result.items)
            $.each(result.items, function (key, value) {
                let item = to_html(value)
                console.log(value)
                $('#cartItems').append(item);
            });
            let nbItem = result.items.length;
            let prixTotal = result.valeur;
            let checkout = checkoutHtml(nbItem, prixTotal)
            $('#checkout').append(checkout);
        }
    });
}

function to_html(item){
    let x = `<div class="Cart-Items">

                <div class="imagePanier">
                <img src=${item.image} alt="" height="100px" width="75">
            </div>
            <div class="infoPanier">
                <h1 class="nomPanier">${item.nomProduit}</h1>
                <h3 class="descPanier">${item.descriptionProduit}</h3>
            </div>
            <div class="counterPanier">
                <div class="quantitePanier">${item.quantite}</div>
            </div>
            <div class="prixPanier">
                <div class="prixPanierText">$${item.prix}</div>
                <div class="deletePanier"><u onclick="retirerItem(${item})">Remove</u></div>
            </div>
           </div> `

    return $('<div></div>').append(x);
}

function checkoutHtml(nb, prix){
    let x = ` <div class="totalPanier">
                <div>
                    <div class="subtotalPanier">Sub-Total</div>
                    <div class="nbItemsPanier">${nb} items</div>
                </div>
                <div class="prixTotalPanier">$${prix}</div>
            </div>
            <button class="btnCheckout">Checkout</button>`

    return $('<div></div>').append(x);
}

function retirerItem(item){
    $.ajax({
        url: "/clients/"+IDCLIENT+"/panier/"+item.idProduit,
        method:"DELETE"
        ,
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function(result) {
            console.log(result);
            chargerpanier();
        },
        error: function (result){
            console.log(result);
        }
    });
}
