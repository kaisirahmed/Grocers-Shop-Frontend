export function localOrders() {
    const localOrders = localStorage.getItem("localOrders");
//console.log(localOrders)
    if(!localOrders) {
        return [];
    }

    return JSON.parse(localOrders);
}

