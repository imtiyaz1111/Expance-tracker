import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import Layout from "../../Layout/Layout";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProfileAvtar from "../../Components/ProfileAvtar";
import AddExpenseModal from "../Expance/AddExpenseModal/AddExpenseModal";
import EditExpenseModal from "../Expance/EditExpenseModal/EditExpenseModal";
import {
  deleteExpense,
  getAllExpense,
} from "../../Api/functions/expencseFunctions";

Chart.register(ArcElement, Tooltip, Legend);

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [editData, setEditData] = useState(null);
  const [selectID, setSelectID] = useState(null);

  useEffect(() => {
    getAllExpense(setExpenses);
  }, []);

  const handleEditClick = (expense, id) => {
    setSelectID(id);
    setEditData(expense);
    const modal = new bootstrap.Modal(
      document.getElementById("editExpenseModal")
    );
    modal.show();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((exp) => exp._id !== id));
  };

  // Prepare Pie Chart data
  const categoryMap = {};
  expenses.forEach((exp) => {
    const categoryName = exp.categoryId?.name || "Unknown";
    const amount = parseFloat(exp.amount);

    if (categoryMap[categoryName]) {
      categoryMap[categoryName] += amount;
    } else {
      categoryMap[categoryName] = amount;
    }
  });

  const categories = Object.keys(categoryMap);
  const amounts = Object.values(categoryMap);

  const data = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: ["#d63384", "#dc3545", "#20c997", "#0d6efd"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "black",
          padding: 15,
          font: { size: 14, weight: "500" },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Layout>
      <section className="py-4">
        <div className="container-fluid">
          {/* Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-2 mb-md-0">Expense</h2>
            <ProfileAvtar />
          </div>

          {/* Add Expense Button */}
          <div className="mb-4">
            <button
              className="btn fw-semibold"
              style={{ backgroundColor: "#0164ab", color: "#fff" }}
              data-bs-toggle="modal"
              data-bs-target="#addExpenseModal"
            >
              + Add Expense
            </button>
          </div>

          {/* Content */}
          <div className="row g-4">
            {/* Table */}
            <div className="col-12 col-lg-7">
              <div
                className="card h-100 shadow-sm border-0"
                style={{ backgroundColor: "#F4F1F6", borderRadius: "12px" }}
              >
                <div className="card-body">
                  <h5 className="card-title fw-semibold mb-3">
                    Recent Expenses
                  </h5>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead style={{ backgroundColor: "#CFDBE9" }}>
                        <tr>
                          <th className="fw-semibold">Expense Note</th>
                          <th className="fw-semibold">Amount</th>
                          <th className="fw-semibold">Date</th>
                          <th className="fw-semibold">Category</th>
                          <th className="fw-semibold text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center py-3">
                              No expenses found
                            </td>
                          </tr>
                        ) : (
                          expenses.map((expense) => (
                            <tr key={expense._id}>
                              <td>{expense.note}</td>
                              <td>${expense.amount}</td>
                              <td>
                                {new Date(expense.date)
                                  .toISOString()
                                  .split("T")[0]}
                              </td>
                              <td>{expense.categoryId?.name}</td>
                              <td className="text-center">
                                <div className="d-flex justify-content-center gap-2">
                                  <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() =>
                                      handleEditClick(expense, expense._id)
                                    }
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                      handleDelete(expense._id)
                                    }
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="col-12 col-lg-5">
              <div
                className="card h-100 shadow-sm border-0"
                style={{ backgroundColor: "#f7f6fb" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-center fw-semibold mb-4">
                    Expenses by Category
                  </h5>
                  <div
                    style={{
                      height: "300px",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <Pie data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modals */}
          <AddExpenseModal setExpenses={setExpenses} />
          <EditExpenseModal
            expense={editData}
            selectID={selectID}
            setExpenses={setExpenses}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Expense;
