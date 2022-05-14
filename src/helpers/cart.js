export function localCart() {
    const localCart = localStorage.getItem("cartProducts");

    if(!localCart) {
        return [];
    }

    return JSON.parse(localCart);
}