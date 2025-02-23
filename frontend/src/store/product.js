import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "please fill in all fields." }
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "product created successfully" };
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data })
    },

    deleteProduct: async (pid) => {
        try {
            const response = await fetch(`/api/products/${pid}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const error = await response.json();
                return { success: false, message: error.message || 'Failed to delete product' };
            }
            // Optionally, update the products state after deletion
            set((state) => ({
                products: state.products.filter((product) => product._id !== pid),
            }));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message || 'An error occurred' };
        }
    },

        updateProduct: async (pid, updatedProduct) => {
            try {
              const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
              });
          
              const data = await res.json();
              if (!data.success) {
                return { success: false, message: data.message };
              }
          
              // Update the store with the new product data
              set((state) => ({
                products: state.products.map((product) =>
                  product._id === pid ? data.data : product
                ),
              }));
          
              return { success: true, message: "Product updated successfully" };
            } catch (error) {
              return { success: false, message: error.message || 'Failed to update product' };
            }
          }
          
}))