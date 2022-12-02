

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
    const products = await getProducts();
    const categoryCenter = document.querySelector('.category__center');

    displayProductItems(products,categoryCenter);
    btn(products)
}

function btn(products)
{
    let acheterBtn = document.querySelectorAll(".product__btn");
 
 
     if (acheterBtn) {
         Array.from(acheterBtn).forEach(btn => {
 
             btn.addEventListener('click', async e => {
                 const target = e.target;
                 if (!target) return;

                 // console.log(e.target);
                 const pid = parseInt(target.dataset.pid);
                 console.log(target);
                 // console.log(products);
 
                 // const products = await getProducts();
 
               let product_selected = products.filter(product => {
                     if(product.id === pid){
                        return product
                     } 
                 });

                 product_selected = product_selected[0];
                 if (product_selected) {
                     // add product to the cart
                     cartNumbers(product_selected)
                     console.log("fr")

                    // supprimer(product_selected)
 
                 }
             });
         });
 
     }
 
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

    let displayProduct = items.map(product =>
        `<div class="product category__product">
            <input type=hidden value="${product.id}" id="product_id"/>
            <div class="product__header">
            <img src=${product.image} alt="">
            </div>
            <div class="product__footer">
            <h3>${product.title}</h3>
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
                <h4>$${product.price}</h4>
               
                    <button type="button" class="product__btn" data-pid="${product.id}">Consulter</button>
               
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



