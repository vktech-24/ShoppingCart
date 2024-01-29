const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
    cart.classList.add('card-active')
})

btnClose.addEventListener('click',()=>{
    cart.classList.remove('card-active')
})

document.addEventListener('DOMContentLoaded',loadfood);

function loadfood(){
     loadcontent();
}

function loadcontent(){
    //remove food items from carts
     let btnRemove=document.querySelectorAll('.cart-remove')
     btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem)
     })

     // product item chenge event
     let qtyElement=document.querySelectorAll('.cart-quantity')
     qtyElement.forEach((input)=>{
        input.addEventListener('change',cheQty);
     })

     //product cart 
     let cartBtns=document.querySelectorAll('.add-cart');
     cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addCart);
     })

     updateTotal()
}

//remove item
function removeItem(){
   if(confirm("Are You Sure To Remove")){
    let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
    console.log(title)
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadcontent()
   }
}

//chenge Quantity
function cheQty(){
    
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadcontent()
}

let itemList=[];

//add cart
function addCart(){
    let food=this.parentElement;
    let title=food.querySelector('.food-title').innerHTML;
    let price=food.querySelector('.food-price').innerHTML;
    let imgSrc=food.querySelector('.food-img').src;

    let newProduct={
        title,price,imgSrc
    }

     //check product already exits in cart
     if(itemList.find((el)=>el.title==newProduct.title)){
        alert("product already in cart")
        return;
     }else{
        itemList.push(newProduct);
     }

    let newProductElement= createCartProduct(title,price,imgSrc);
     
    let element=document.createElement('div');
    element.innerHTML=newProductElement;

    let cartBasket=document.querySelector('.cart-content');
    cartBasket.append(element)

    loadcontent();
}

function createCartProduct(title,price,imgSrc){
    return `
    <div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="ditail-box">
        <div class="cart-food-title">${title}</div>
            <div class="price-box">
                <div class="cart-price">${price}</div>
            <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <ion-icon name="trash" class="cart-remove" ></ion-icon>
</div>
    `;
}

function updateTotal()
{
       const cartItems=document.querySelectorAll('.cart-box');
       const totalValue=document.querySelector('.total-price');

       let total=0;

       cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price')
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty)
        product.querySelector('.cart-amt').innerText="Rs."+price*qty;
       })
       totalValue.innerHTML='Rs.'+total;

       // add product count in cart icon

       const cartCount=document.querySelector('.cart-count');
       let count=itemList.length;
       cartCount.innerHTML=count;

       if(count==0){
             cartCount.style.display='none';
       }else{
        cartCount.style.display='block';
       }

}