// src/Pages/Categories/Categories.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../../Layout/Layout";
import ProfileAvtar from "../../Components/ProfileAvtar";
import AddCategoryModal from "../Categories/AddCategoryModal/AddCategoryModal";
import EditCategoryModal from "../Categories/EditCategoryModal/EditCategoryModal";
import {
  deleteCategory,
  getDefaultCategory,
  getDefaultCategoryImg,
  getUserCategory,
} from "../../Api/functions/categoryfunctions";

function Categories() {
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = () => {
    getDefaultCategory(setDefaultCategories);
    getUserCategory(setUserCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
    setShowEditModal(true);
  };

  const handleSaveEditCategory = () => {
    const updatedCategories = userCategories.map((cat) =>
      cat._id === editingCategory._id ? { ...cat, name: newCategory } : cat
    );
    setUserCategories(updatedCategories);
    setEditingCategory(null);
    setShowEditModal(false);
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    const updatedCategories = userCategories.filter((cat) => cat._id !== id);
    setUserCategories(updatedCategories);
  };

  return (
    <Layout>
      <section>
        <div className="container my-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Categories</h4>
            <ProfileAvtar />
          </div>

          <div
            className="p-4 rounded shadow-sm"
            style={{
              backgroundColor: "#F4F1F6",
              borderTopRightRadius: "100px",
              borderBottomLeftRadius: "100px",
            }}
          >
            {/* Default Categories */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {defaultCategories.map((cat, index) => (
                <div className="col d-flex align-items-center" key={index}>
                  <div className="me-3" style={{ fontSize: "2rem" }}>
                    <img src={getDefaultCategoryImg(cat.icon)} alt="" />
                  </div>
                  <div>{cat.name}</div>
                </div>
              ))}
            </div>

            {/* User Categories */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-2">
              {userCategories.map((cat, index) => (
                <div className="col d-flex align-items-center" key={index}>
                  <div
                    className="me-3 d-flex justify-content-center align-items-center rounded-circle bg-primary text-white"
                    style={{
                      width: "50px",
                      height: "50px",
                      fontSize: "1.2rem",
                    }}
                  >
                    {cat.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>{cat.name}</div>
                  <div className="ms-auto">
                    {/* <button
                      className="btn btn-outline-primary btn-sm mx-2"
                      onClick={() => handleEditCategory(cat)}
                    >
                      Edit
                    </button> */}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteCategory(cat._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Category Button */}
            <div className="text-center mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                + Add New Category
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add Category Modal */}
      <AddCategoryModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCategoryAdded={fetchCategories}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEditCategory}
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
    </Layout>
  );
}

export default Categories;
