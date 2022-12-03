let TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";
let IDCLIENT = -1;

/*
=============
Load Category Products
=============
 */
//Get Products
const getProducts = async () => {
    try {
        const results = await fetch('./data/products.json');
        const data = await results.json();
        const products = data.products;
        return products; //returns array of objects from .jsob file
    } catch (err) {
        console.log(err);
    }
};

//Load Products


async function charger()
{
    $.ajax({
        url: '/produits',
        success: function(result) {
            $.each(result, function (key, value) {
                item = item_to_html(value)
                //console.log(value)
                $('#category-box').append(item);
            });
        }
    });
    const categoryCenter = document.querySelector('.category__center');
}

function item_to_html(item) {
    let x = `<div class="product category__product">
            <input type=hidden value="${item.id}" id="product_id"/>
            <div className="product__header">
                <img src=${item.image} alt="" height="250px" width="200">
            </div>
            <div class="product__footer">
            <h3>${item.nom}</h3>
            <div class="rating">
                <svg>
                <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                <use xlink:href="./images/sprite.svg#icon-empty-full"></use>
                </svg>
                <svg>
                <use xlink:href="./images/sprite.svg#icon-empty-full"></use>
                </svg>
            </div>
            <div class="product__price">
                <h4>$${item.prix}</h4>
               
                    <button type="button" class="product__btn" data-pid="${item.id}" onclick="ajouterPanier(${item.id})">Ajouter au panier</button>
               
            </div>
            <ul>
               
            </ul>
            </div>
      </div>`

    return $('<div></div>').append(x);
}

function ajouterPanier(itemID){
    if(IDCLIENT == -1){
        alert("Veuillez vous connecter.")
        return;
    }
console.log(IDCLIENT)
    $.ajax({
        url: "/clients/"+IDCLIENT+"/panier",
        method:"POST",
        data: {"idProduit": itemID, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function(result) {
            alert("Item ajouté au panier.")
            console.log(result);
        },
        error: function (result){
            alert("Impossible d'ajouter cet item à votre panier")
            console.log(result);
        }
    });
}
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

    console.log(localStorage.getItem("productsIncart"));
}

 

//Display Products
const categoryCenter = document.querySelector('.category__center');


const displayProductItems = (items,categoryCenter) => {
    /*<div className="product__header">
        <img src=${product.image} alt="">
    </div>*/
    //console.log(items)
    items.map(i => console.log(i))
    let displayProduct = items.map(product =>
        console.log(product.id + product.nom + product.prix)
        `<div class="product category__product">
            <input type=hidden value="${product.id}" id="product_id"/>
            
            <div class="product__footer">
            <h3>${product.nom}</h3>
            <div class="rating">
                <svg>
                <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                <use xlink:href="./images/sprite.svg#icon-empty-full"></use>
                </svg>
                <svg>
                <use xlink:href="./images/sprite.svg#icon-empty-full"></use>
                </svg>
            </div>
            <div class="product__price">
                <h4>$${product.prix}</h4>
               
                    <button type="button" class="product__btn" data-pid="${product.id}">Ajouter au panier</button>
               
            </div>
            <ul>
               
            </ul>
            </div>
      </div>`
    );

    displayProduct = displayProduct.join('');

    if (categoryCenter) {
        categoryCenter.innerHTML = displayProduct;
    }

};


/*
=============
Filtering
=============
 */
const filterBtn = document.querySelectorAll('.filter-btn');
const categoryContainer = document.getElementById('category');
const boutonAcheter = document.getElementById('buy_btn');

//implementer appel vers 
if(boutonAcheter){
    boutonAcheter.addEventListener('click', async e => {

    });
}


if (categoryContainer) {
    categoryContainer.addEventListener('click', async e => {
        const target = e.target.closest('.section__title');
        if (!target) return;

        const id = target.dataset.id;
        const products = await getProducts();

        if (id) {
            //remove active class from buttons
            Array.from(filterBtn).forEach(btn => {
                btn.classList.remove('active')
            });
            target.classList.add('active');

            //Filter products
            let menuCategory = products.filter(product => {
                if (product.category === id) return product;
            });

            if (id === 'All Products') {
                displayProductItems(products);
            } else {
                displayProductItems(menuCategory);
            }
        }
    });
}



