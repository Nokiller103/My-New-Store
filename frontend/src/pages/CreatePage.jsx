import { useState } from 'react';
import { useProductStore } from '../store/product';
import { toast } from 'react-toastify';


function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Call createProduct and handle response
    const { success, message } = await createProduct(newProduct);

    if (success) {
      toast.success('Product added successfully!');
      setNewProduct({ name: '', price: '', image: '' }); // Reset the form
    } else {
      toast.error(message || 'Failed to add product. Please try again.');
    }
    setNewProduct({name:'', price:'', image:''});
  };

  return (
    <section className="create-product-container">
      <h2>Create Product</h2>
      <form className="itemForm" onSubmit={handleAddProduct}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Image URL"
            name="image"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn">Add Product</button>
      </form>
    </section>
  );
}

export default CreatePage;