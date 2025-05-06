import React, { useState } from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap';
import Layout from '../../Layout/Layout';
import AddBudgetModal from './AddBudgetModal/AddBudgetModal';

const Budget = () => {
  const [showModal, setShowModal] = useState(false);

  const budgetData = [
    { category: "Housing", spent: 800, budget: 1000 },
    { category: "Food", spent: 300, budget: 400 },
    { category: "Transportation", spent: 150, budget: 300 },
    { category: "Entertainment", spent: 100, budget: 200 },
  ];

  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);

  return (
    <Layout>
      <section>
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Budget Overview</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              + Add New Budget
            </Button>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <Card className="shadow-sm p-3" style={{ backgroundColor: "#E3E9F1" }}>
                <h5>Total Budget</h5>
                <h3>${totalBudget}</h3>
              </Card>
            </div>
            <div className="col-md-6 mb-3">
              <Card className="shadow-sm p-3" style={{ backgroundColor: "#E3E9F1" }}>
                <h5>Remaining</h5>
                <h3>${totalBudget - totalSpent}</h3>
              </Card>
            </div>
          </div>

          <div className="row">
            {budgetData.map((item, index) => (
              <div className="col-md-6 mb-3" key={index}>
                <Card className="shadow-sm p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>{item.category}</h6>
                      <p className="mb-1">${item.spent} / ${item.budget}</p>
                    </div>
                    <div className="text-end">
                      <small>{Math.round((item.spent / item.budget) * 100)}% Used</small>
                    </div>
                  </div>
                  <ProgressBar
                    now={(item.spent / item.budget) * 100}
                    variant="success"
                    style={{ height: "8px", borderRadius: "50px" }}
                  />
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AddBudgetModal show={showModal} onClose={() => setShowModal(false)} />
    </Layout>
  );
};

export default Budget;
