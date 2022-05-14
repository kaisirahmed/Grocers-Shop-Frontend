
export function localCategoryProducts() {
    const localCategoryProducts = localStorage.getItem("categoryProducts") || [];

    if(!localCategoryProducts) {
        return null;
    }

    return JSON.parse(localCategoryProducts);
}