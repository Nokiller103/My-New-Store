import React, { useState } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useProductStore } from '../store/product';
import { toast } from 'react-toastify';

const CardSection = ({ product, isDarkMode }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast.success('Product deleted successfully'); // Success toast
    } else {
      toast.error(message || 'Failed to delete product'); // Error toast
    }
  };

 
  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    console.log('Update Response:', { success, message }); // Log the response for debugging
  
    if (success) {
      toast.success('Product updated successfully'); // Success toast
      setIsModalOpen(false); // Close the modal
    } else {
      toast.error(message || 'Failed to update product'); // Error toast
    }
  };
  

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    border: isDarkMode ? "1px solid #444" : "1px solid #ddd",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: isDarkMode
      ? "0 2px 4px rgba(255, 255, 255, 0.1)"
      : "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const modalStyle = {
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    borderRadius: "8px",
    padding: "2rem",
    width: "90%",
    maxWidth: "500px",
    boxShadow: isDarkMode
      ? "0 4px 8px rgba(255, 255, 255, 0.2)"
      : "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
  };

  const inputStyle = {
    backgroundColor: isDarkMode ? "#444" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    border: isDarkMode ? "1px solid #555" : "1px solid #ccc",
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "4px",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "1.2rem",
    color: isDarkMode ? "#fff" : "#000",
    cursor: "pointer",
  };

  return (
    <>
      <div className="column">
        <div style={cardStyle} className="card">
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p>${product.price}</p>
          <button className="edit-button" onClick={handleEditClick}>
            <FaRegEdit />
          </button>
          <button onClick={() => handleDeleteProduct(product._id)} className="delete-button">
            <RiDeleteBin5Line />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div style={modalStyle} className="modal-content">
            <button style={closeButtonStyle} onClick={handleModalClose}>
              &times;
            </button>
            <h3 style={{ marginBottom: "1rem" }}>Edit Product</h3>
            <label>
              <input
                placeholder="Product Name"
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({ ...prev, name: e.target.value }))
                }
                style={inputStyle}
              />
            </label>
            <label>
              <input
                placeholder="Price"
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({ ...prev, price: e.target.value }))
                }
                style={inputStyle}
              />
            </label>
            <label>
              <input
                placeholder="Image URL"
                type="text"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({ ...prev, image: e.target.value }))
                }
                style={inputStyle}
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleUpdateProduct} className="update-button">
                Update
              </button>
              <button onClick={handleModalClose} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardSection;