export function localSubCategories() {
    const localSubCategories = localStorage.getItem("subcategories");

    if(!localSubCategories) {
        return [];
    }

    return JSON.parse(localSubCategories);
}

export function localParentCategory() {
    const localParentCategory = localStorage.getItem("parentcategory");

    if(!localParentCategory) {
        return null;
    }

    return JSON.parse(localParentCategory);
}