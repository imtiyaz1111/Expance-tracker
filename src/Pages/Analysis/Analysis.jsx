import React, { useEffect, useState, useMemo } from "react";
import { Card } from "react-bootstrap";
import { Pie, Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import Layout from "../../Layout/Layout";
import ProfileAvtar from "../../Components/ProfileAvtar";
import { getAllExpense } from "../../Api/functions/expencseFunctions";
import { getAllBudget, getBudgetDetails } from "../../Api/functions/budgetFunctions";

const Analysis = () => {
  const [expensesData, setExpensesData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [totalExpense, setTotalExpense] = useState(null);
  const [totalBudget, setTotalBudget] = useState(null);

  useEffect(() => {
    getAllExpense(setExpensesData, setTotalExpense);
    getAllBudget(setTotalBudget, setBudgetData);
    getBudgetDetails(setBudgetDetails)
  }, []);

  console.log("budgetDetails",budgetDetails);
  

  // GROUP EXPENSES BY CATEGORY
  const expenseByCategory = useMemo(() => {
    const totals = {};
    expensesData.forEach((exp) => {
      const categoryName = exp.categoryId?.name || "Uncategorized";
      totals[categoryName] = (totals[categoryName] || 0) + exp.amount;
    });
    return totals;
  }, [expensesData]);

  // GROUP BUDGETS BY CATEGORY
  const budgetByCategory = useMemo(() => {
    const totals = {};
    budgetData.forEach((budget) => {
      const categoryName = budget.categoryId?.name || "Uncategorized";
      totals[categoryName] = (totals[categoryName] || 0) + budget.amount;
    });
    return totals;
  }, [budgetData]);

  // PREPARE CATEGORIES (union of both budget and expense categories)
  const allCategories = useMemo(() => {
    const categories = new Set([
      ...Object.keys(budgetByCategory),
      ...Object.keys(expenseByCategory),
    ]);
    return Array.from(categories);
  }, [budgetByCategory, expenseByCategory]);

  // PREPARE BAR CHART DATA
  const barData = {
    labels: allCategories,
    datasets: [
      {
        label: "Budget",
        data: allCategories.map((cat) => budgetByCategory[cat] || 0),
        backgroundColor: "#FFC107",
      },
      {
        label: "Expense",
        data: allCategories.map((cat) => expenseByCategory[cat] || 0),
        backgroundColor: "#E040FB",
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    plugins: { legend: { display: false } },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { callback: (v) => "$" + v },
      },
    },
  };

  // EXISTING PIE CHART CODE
  const categoryTotals = expenseByCategory;
  const pieData = useMemo(() => {
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const backgroundColors = [
      "#FF5722", "#FF9800", "#FFC107", "#FFCD88", "#FFB855",
      "#B37626", "#F4C78B", "#FFE492", "#8E44AD", "#3498DB",
      "#2ECC71", "#E74C3C", "#95A5A6", "#34495E", "#16A085"
    ];
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, index) => backgroundColors[index % backgroundColors.length]),
          borderWidth: 0,
        },
      ],
    };
  }, [categoryTotals]);

  const pieOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            let value = context.parsed || 0;
            return `${label}: $${value}`;
          },
        },
      },
    },
    cutout: "0%",
    responsive: true,
    maintainAspectRatio: false,
  };

  const lineData = {
    labels: [
      "Nov 2024", "Dec 2024", "Jan 2025",
      "Feb 2025", "Mar 2025", "Apr 2025", "May 2025",
    ],
    datasets: [
      {
        label: "Budget",
        data: [4000, 8000, 19000, 17000, 6000, 7000, 7500],
        borderColor: "#00C8FF",
        backgroundColor: "#00C8FF",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "#00C8FF",
        pointRadius: 5,
      },
    ],
  };

  const expenseLineData = {
    labels: [
      "Nov 2024", "Dec 2024", "Jan 2025",
      "Feb 2025", "Mar 2025", "Apr 2025", "May 2025",
    ],
    datasets: [
      {
        label: "Expense",
        data: [3000, 4000, 18000, 16000, 5000, 6000, 6500],
        borderColor: "#1E1E99",
        backgroundColor: "#1E1E99",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "#1E1E99",
        pointRadius: 5,
      },
    ],
  };

  return (
    <Layout>
      <section className="py-4">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h4>Analysis</h4>
            <ProfileAvtar />
          </div>

          <div className="row g-3">
            <div className="col-lg-2">
              <select className="form-select mb-3">
                <option>All</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
              <Card className="text-center p-3 mb-3">
                <small>Total Budget</small>
                <h5 className="fw-bold mt-2">${totalBudget }</h5>
              </Card>
              <Card className="text-center p-3">
                <small>Total Expense</small>
                <h5 className="fw-bold mt-2">${totalExpense }</h5>
              </Card>
            </div>

            <div className="col-lg-2 d-flex flex-column gap-3">
              <Card className="text-center py-4 px-3">
                <small>Budget to Expense Ratio</small>
                <div className="progress my-2" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: "37%" }}
                  ></div>
                </div>
                <span className="fw-bold">37%</span>
              </Card>
              <Card className="text-center py-4 px-3">
                <small>Savings Rate</small>
                <div className="progress my-2" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "62%" }}
                  ></div>
                </div>
                <span className="fw-bold">62%</span>
              </Card>
            </div>

            <div className="col-lg-8">
              <div className="row g-3">
                <div className="col-md-6">
                  <Card className="p-3 d-flex justify-content-center align-items-center">
                    <h6 className="mb-3">Expense Breakdown by Category</h6>
                    <div style={{ height: "200px", width: "200px" }}>
                      <Pie data={pieData} options={pieOptions} />
                    </div>
                  </Card>
                </div>
                <div className="col-md-6">
                  <Card className="p-3" style={{ height: "260px" }}>
                    <h6 className="mb-3">Budget Compliance</h6>
                    <Bar
                      data={barData}
                      options={barOptions}
                      style={{ height: "200px" }}
                    />
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <Card className="p-3">
                <h6 className="mb-3">Budget Forecast</h6>
                <Line data={lineData} />
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="p-3">
                <h6 className="mb-3">Expense Forecast</h6>
                <Line data={expenseLineData} />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Analysis;
