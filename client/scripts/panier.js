

/*window.addEventListener("DOMContentLoaded", async () => {

    const products = await getProducts();

    let acheterBtn = document.querySelectorAll(".product__btn");

   console.log(acheterBtn)
    


    if (acheterBtn && acheterBtn.length==0) {
        Array.from(acheterBtn).forEach(btn => {

            btn.addEventListener('click', async e => {
                console.log("fr")
                const target = e.target;
                if (!target) return;
                // console.log(e.target);
                const pid = parseInt(target.dataset.pid);
                // console.log(products);

                // const products = await getProducts();

                let product_selected = products.filter(product => {
                    if (product.id === pid) return product;
                });


                product_selected = product_selected[0];
                if (product_selected) {
                    // add product to the cart
                    cartNumbers(product_selected)
                   // supprimer(product_selected)

                }
            });
        });

    }

});*/



// localStorage.clear();


// for (let i = 0; i < paniers.length; i++) {
//     // console.log(products)
//     paniers[i].addEventListener('click', () => {
//         // console.log(products[i]);
//         cartNumbers(products[i]);
//         setItems(products[i]);
//         totalCost(products[i]);
//     })
// }



function onLoadcartNumbers() {

    let productNumbers = localStorage.getItem('cartNumbers');


    if (productNumbers) {
        document.querySelector('.panier span').textContent = productNumbers;
    }
}
// quantite de l'icone du panier
function cartNumbers(product) {


    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
      //  document.querySelector('.panier span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
       // document.querySelector('.panier span').textContent = 1;

    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.id] === undefined) {
            cartItems = {
                ...cartItems,
                [product.id]: product
            };
            cartItems[product.id].incart = 1

        } else {
            cartItems[product.id].incart -= 1;
        }
    } else {
        // product.incart = 1;
        cartItems = {};
        cartItems[product.id] = product;
        cartItems[product.id].incart = 1;


    }


    localStorage.setItem("productsIncart", JSON.stringify
    (cartItems));
}



function totalCost(product) {

    //console.log("le prix du prod est ", product.price);
    let cartCost = localStorage.getItem("totalCost");

    console.log('my cart cost is', cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}



function chargerpanier() {

    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);

    console.log(cartItems)


    let productContainer = document.querySelector
    ("#cart_product");

       let ResumTable = document.querySelector
         ("#Resum");

        // ResumTable.innerHTML = '<td class="Resum">salut</td>'

    let totalPriceElement = document.querySelector
    (".total-price");

    // console.log('cartItems');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        let total = 0;
        let cartItemsHtml = Object.values(cartItems).map( item => {
            total += item.price * item.incart
            
            return  `<tr class =  "product_item">
            <td class="product-title">
            
                <div class="cart-info" style="display: flex;flex-wrap: wrap;">
                    <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    
                    </a><img src= ${item.image} style = "position: center">

                    <div>
                    <a><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a> <p id = "itemTitle">${item.title}</p>
                     <button id="btn_sup" style="color: crimson;" data-supp="${item.id}"  onclick="add_item(${item.id})">Suprimer</button>
                                          
                 </div>
                </div>
            </td>
            
            <td class="total">${item.price * item.incart}</td>
            </tr>`
            
        

        });
        // console.log(cartItemsHtml);




         productContainer.innerHTML = cartItemsHtml.join('');
        totalPriceElement.innerHTML = '$' + total
    }
}



async function add_item(item_id)
{
    let cartItems = localStorage.getItem("productsIncart");
    let jsonItems = JSON.parse(cartItems)
    delete jsonItems[item_id];
    localStorage.setItem("productsIncart", JSON.stringify(jsonItems))
    chargerpanier();
}

onLoadcartNumbers();
