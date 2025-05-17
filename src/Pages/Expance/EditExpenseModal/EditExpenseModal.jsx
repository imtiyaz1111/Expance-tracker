import React, { useState, useEffect } from "react";
import {
  getDefaultCategory,
  getUserCategory,
} from "../../../Api/functions/categoryfunctions";
import {
  getAllExpense,
  updateExpense,
} from "../../../Api/functions/expencseFunctions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditExpenseModal = ({ show, onClose, expense, selectID, setExpenses }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    note: "",
    amount: "",
    category: "",
    date: "",
  });
  const [errors, setErrors] = useState({
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
            (defCat) => !userCats.some((userCat) => userCat.name === defCat.name)
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
        amount: expense.amount?.toString() || "",
        category: expense.categoryId?._id || "",
        date: new Date(expense.date).toISOString().split("T")[0] || "",
      });
      setErrors({ note: "", amount: "", category: "", date: "" });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { note: "", amount: "", category: "", date: "" };

    if (!formData.note.trim()) {
      newErrors.note = "Note is required";
      isValid = false;
      toast.error(newErrors.note);
    }

    if (!String(formData.amount).trim()) {
      newErrors.amount = "Amount is required";
      isValid = false;
      toast.error(newErrors.amount);
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
      isValid = false;
      toast.error(newErrors.amount);
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
      isValid = false;
      toast.error(newErrors.category);
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
      isValid = false;
      toast.error(newErrors.date);
    } else if (isNaN(Date.parse(formData.date))) {
      newErrors.date = "Invalid date format";
      isValid = false;
      toast.error(newErrors.date);
    }

    setErrors(newErrors);
    return isValid;
  };

const handleUpdateExpense = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    const updatedExpense = {
      note: formData.note,
      amount: Number(formData.amount),
      categoryId: formData.category,
      date: formData.date,
    };
    await updateExpense(selectID, updatedExpense);
    
    await getAllExpense(setExpenses);
    onClose();
  }
};

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row g-3" onSubmit={handleUpdateExpense}>
          <div className="col-md-6">
            <Form.Control
              type="text"
              name="note"
              placeholder="Note"
              value={formData.note}
              onChange={handleChange}
            />
            {errors.note && (
              <Form.Text className="text-danger">{errors.note}</Form.Text>
            )}
          </div>
          <div className="col-md-6">
            <Form.Control
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
            />
            {errors.amount && (
              <Form.Text className="text-danger">{errors.amount}</Form.Text>
            )}
          </div>
          <div className="col-md-6">
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
            {errors.category && (
              <Form.Text className="text-danger">{errors.category}</Form.Text>
            )}
          </div>
          <div className="col-md-6">
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && (
              <Form.Text className="text-danger">{errors.date}</Form.Text>
            )}
          </div>
          <div className="col-12 d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Update Expense
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditExpenseModal;
