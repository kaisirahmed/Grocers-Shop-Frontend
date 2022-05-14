
export function localCategories() {
    const localCategories = localStorage.getItem("categories");

    if(!localCategories) {
        return [];
    }

    return JSON.parse(localCategories);
}