const BASE_URL = "https://fakestoreapi.com/products";
// console.log(BASE_URL)
// Fetch all products
export const fetchProducts = async () => {
    console.log("fetchProducts function called");
  try {
    const response = await fetch(BASE_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// Update a product
export const updateProduct = async (id, productData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      
      if (response.ok) {
        return await response.json(); // return updated product data
      } else {
        throw new Error('Failed to update the product');
      }
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      return null;
    }
  };

// Delete a product
export const deleteProduct = async (id) => {
    console.log(id,'before delete')
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
        // Successfully deleted, you can log this or perform UI updates
        console.log(`Product with ID ${id} deleted successfully`);
  
        // Optionally, you can return a success message or the updated data
        return await response.json();
      } 
    return await response.json();
   
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    return null;
  }
};
