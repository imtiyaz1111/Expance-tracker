import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import Layout from "../../Layout/Layout";
import ProfileAvtar from "../../Components/ProfileAvtar";
import { getAllExpense } from "../../Api/functions/expencseFunctions";

const Transaction = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visibleTable, setVisibleTable] = useState(10);
  const [month, setMonth] = useState(new Date().getMonth()); 
  const [year, setYear] = useState(new Date().getFullYear());
  const [showAll, setShowAll] = useState(false);

  const handleVisibleTable = () => {
    setVisibleTable((prev) => prev + 10);
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
    setShowAll(false);
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
    setShowAll(false);
  };

  const handleShowAll = () => {
    setShowAll(true);
    setVisibleTable(10)
  };

  useEffect(() => {
    getAllExpense(setAllData);
  }, []);

  useEffect(() => {
    if (showAll) {
      setFilteredData(allData);
    } else {
      const filtered = allData.filter((item) => {
        const date = new Date(item.date);
        return date.getMonth() === month && date.getFullYear() === year;
      });
      setFilteredData(filtered);
    }
    setVisibleTable(5);
  }, [allData, month, year, showAll]);

  return (
    <Layout>
      <section style={{ backgroundColor: "#F8F9FA" }}>
        <div className="container-fluid p-3">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold m-0">Transaction</h4>
            <ProfileAvtar />
          </div>

          {/* Month Navigation */}
          <div className="d-flex justify-content-center my-3">
            <div
              className="d-flex align-items-center justify-content-between px-4 py-2"
              style={{
                backgroundColor: "#E3E9F1",
                borderRadius: "10px",
                width: "320px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Button
                variant="link"
                style={{ color: "#333", textDecoration: "none" }}
                className="p-0"
                onClick={handlePrevMonth}
              >
                <FaChevronLeft />
              </Button>
              <span style={{ fontWeight: "600" }}>
                {new Date(year, month).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <Button
                variant="link"
                style={{ color: "#333", textDecoration: "none" }}
                className="p-0"
                onClick={handleNextMonth}
              >
                <FaChevronRight />
              </Button>
            </div>
            <Button
              className={`ms-3 rounded-pill fw-semibold px-4 py-2 border-0 ${
                showAll ? "active-btn" : ""
              }`}
              style={{
                backgroundColor: showAll ? "#69A1CE" : "#E3E9F1",
                color: showAll ? "#fff" : "#333",
                transition: "all 0.3s ease",
              }}
              onClick={handleShowAll}
            >
              Show All
            </Button>
          </div>

          {/* Table */}
          <div
            className="table-responsive rounded"
            style={{ background: "#f8f9fa" }}
          >
            <Table hover className="mb-0">
              <thead style={{ background: "#d6e4f0" }}>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody style={{ borderTop: "1px dashed #dee2e6" }}>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredData.slice(0, visibleTable).map((item, index) => (
                    <tr key={index}>
                      <td>{new Date(item.date).toISOString().split("T")[0]}</td>
                      <td>{item.note}</td>
                      <td>{item.categoryId?.name}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          {/* See more */}
          {filteredData.length > visibleTable && (
            <div className="text-center py-3">
              <button
                className="btn btn-light rounded-pill"
                onClick={handleVisibleTable}
              >
                See more <FaChevronDown />
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Transaction;
