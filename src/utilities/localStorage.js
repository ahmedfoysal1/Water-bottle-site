const getStoredCart = () =>{
    const checkCart = localStorage.getItem('cart');
    if(checkCart){
        return JSON.parse(checkCart);
    }
    return [];
}


const saveItemToLs = cart =>{
    const stringifyCart = JSON.stringify(cart);
    localStorage.setItem('cart', stringifyCart);
}



const addToLs = (id) =>{
    const cart = getStoredCart();
    cart.push(id);

    //save to local storage
    saveItemToLs(cart);
}

export {addToLs, getStoredCart}