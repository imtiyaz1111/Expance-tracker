import React, { useState, useEffect } from "react";
import { getDefaultCategory, getUserCategory } from "../../../Api/functions/categoryfunctions";
import { createExpense, getAllExpense } from "../../../Api/functions/expencseFunctions";

const AddExpenseModal = ({ setExpenses }) => {
  const [categories, setCategories] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getUserCategory((userCats) => {
      getDefaultCategory((defaultCats) => {
        const combined = [
          ...userCats,
          ...defaultCats.filter(
            (defCat) => !userCats.some((userCat) => userCat.name === defCat.name)
          ),
        ];
        setCategories(combined);
      });
    });
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const newExpense = {
      note: expenseName,
      amount: amount,
      categoryId: category,
      date: date,
    };
    await createExpense(newExpense);
    getAllExpense(setExpenses); 
    setExpenseName("");
    setAmount("");
    setCategory("");
    setDate("");
    const modal = bootstrap.Modal.getInstance(document.getElementById("addExpenseModal"));
    modal.hide();
  };

  return (
    <div className="modal fade" id="addExpenseModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Add Expense</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className="row g-3" onSubmit={handleAddExpense}>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Expense Note"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn fw-semibold"
                  style={{ backgroundColor: "#0164ab", color: "#fff" }}
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;
