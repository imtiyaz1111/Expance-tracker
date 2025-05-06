import React, { useState, useEffect } from "react";
import {
  getDefaultCategory,
  getUserCategory,
} from "../../../Api/functions/categoryfunctions";
import { getAllExpense, updateExpense } from "../../../Api/functions/expencseFunctions";

const EditExpenseModal = ({ expense, selectID, setExpenses }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    note: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    getUserCategory((userCats) => {
      getDefaultCategory((defaultCats) => {
        const combined = [
          ...userCats,
          ...defaultCats.filter(
            (defCat) =>
              !userCats.some((userCat) => userCat.name === defCat.name)
          ),
        ];
        setCategories(combined);
      });
    });
  }, []);



  useEffect(() => {
    if (expense) {
      setFormData({
        note: expense.note || "",
        amount: expense.amount || "",
        categoryId: expense.categoryId._id || "",
        date: new Date(expense.date).toISOString().split("T")[0] || "",
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateExpense = (e) => {
    e.preventDefault();
    const updatedExpense = {
      note: formData.note,
      amount: formData.amount,
      categoryId: formData.category,
      date: formData.date,
    };
    updateExpense(selectID, updatedExpense);
    getAllExpense(setExpenses);
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editExpenseModal")
    );
    modal.hide();
  };

  
  return (
    <div
      className="modal fade"
      id="editExpenseModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Expense</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3" onSubmit={handleUpdateExpense}>
              <div className="col-md-6">
                <input
                  type="text"
                  name="note"
                  className="form-control"
                  placeholder="Expense Name"
                  value={formData.note}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn fw-semibold"
                  style={{ backgroundColor: "#0164ab", color: "#fff" }}
                >
                  Update Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
