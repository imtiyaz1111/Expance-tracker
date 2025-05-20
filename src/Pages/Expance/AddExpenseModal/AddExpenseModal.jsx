import React, { useState, useEffect } from "react";
import { getDefaultCategory, getUserCategory } from "../../../Api/functions/categoryfunctions";
import { createExpense, getAllExpense } from "../../../Api/functions/expencseFunctions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AddExpenseModal = ({ show, onClose, setExpenses }) => {
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
    const newExpense = { note: expenseName, amount, categoryId: category, date };
    await createExpense(newExpense);
    await getAllExpense(setExpenses);
    setExpenseName("");
    setAmount("");
    setCategory("");
    setDate("");
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3" onSubmit={handleAddExpense}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Expense Note"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
           
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
         
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
         
            />
          </div>
          <div className="col-12 d-flex justify-content-end">
            <Button type="submit" className="main-btn">
              Add Expense
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpenseModal;
