const API_URL = "http://localhost:8081/api/v1";

export const productProvider = async (
    productData,
    //img
) => {

    const formData = new FormData();

    formData.append("managementDTO", new Blob([JSON.stringify({
        name: productData.name,
        description: productData.description,
        model: productData.model,
        price: productData.price,
        category: productData.category,
        productVariantDTO: productData.variantProduct
    })], { type: 'application/json' }));

    const response = await fetch(`${API_URL}/shopSite/addproduct`, {
        method: "POST",
        credentials: "include",
        body: formData
    });

    if (!response.ok) {
        throw new Error("Nie dodano produktu!");
    }

    return response.json();
};