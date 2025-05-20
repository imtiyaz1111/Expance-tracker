import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { jsPDF } from "jspdf"; // Correct import for jsPDF v3.x
import autoTable from "jspdf-autotable"; // Correct import for autoTable plugin
import Layout from "../../Layout/Layout";
import ProfileAvtar from "../../Components/ProfileAvtar";
import { getAllExpense } from "../../Api/functions/expencseFunctions";
import Loader from "../../Components/Loader";
import { getAllSetting } from "../../Api/functions/settingFunctions";
import formatCurrency from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

const Transaction = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visibleTable, setVisibleTable] = useState(10);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [getSetting, setGetSetting] = useState([]);

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
    setVisibleTable(10);
  };

  useEffect(() => {
    setLoading(true);
    getAllExpense((data) => {
      setAllData(data);
      setLoading(false);
    });
    getAllSetting(setGetSetting)
  }, []);

  useEffect(() => {
    let filtered = allData;

    if (!showAll) {
      filtered = allData.filter((item) => {
        const date = new Date(item.date);
        return date.getMonth() === month && date.getFullYear() === year;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.note.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setVisibleTable(5);
  }, [allData, month, year, showAll, searchTerm]);

const handleDownloadPDF = () => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // Set bold font for title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);

  const title = "Expensio";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;

  // Draw centered bold title
  doc.text(title, titleX, 15);

  // Reset font to normal for subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.text("Transaction Report", 14, 28);

  doc.setFontSize(12);
  doc.text(
    `Month: ${new Date(year, month).toLocaleString("default", {
      month: "long",
      year: "numeric",
    })}`,
    14,
    36
  );

  const tableColumn = ["Date", "Description", "Category", "Amount"];
  const tableRows = filteredData.map((item) => [
    new Date(item.date).toISOString().split("T")[0],
    item.note,
    item.categoryId?.name || "N/A",
    item.amount,
  ]);

  autoTable(doc, {
    startY: 40,
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("transactions.pdf");
};



  return (
    <Layout>
       {/* Loader or Table */}
          {loading ? (
            <Loader />
          ) : (
      <section className="transaction-section">
        <div className="container-fluid p-3">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold m-0">Transaction</h4>
            <ProfileAvtar />
          </div>

          {/* Month Navigation */}
          <div className="d-flex justify-content-center my-3">
            <div
              className="month-navigate d-flex align-items-center justify-content-between px-4 py-2 "
              style={{
                backgroundColor: "#E3E9F1",
                borderRadius: "10px",
                width: "55%",
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
          </div>

          {/* Search Input */}
          <div className="d-flex justify-content-end my-3">
            <div
              className="position-relative transction-input"
              style={{ width: "30%" }}
            >
              <input
                type="text"
                placeholder="Search"
                className="form-control pe-5"
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#F4F1F6",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i
                className="fas fa-search position-absolute"
                style={{
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "black",
                  pointerEvents: "none",
                  cursor: "pointer",
                }}
              ></i>
            </div>
          </div>

         
            <div
              className="transcition-area rounded"
              style={{ background: "#f8f9fa" }}
            >
              <Table
                hover
                className="transcition-table mb-0 shadow-custom rounded"
              >
                <thead style={{ background: "#CFDBE9" }}>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr style={{ borderTop: "1px dashed #dee2e6" }}>
                      <td colSpan="4" className="text-center py-3">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    filteredData.slice(0, visibleTable).map((item, index) => (
                      <tr
                        key={index}
                        style={{ borderTop: "1px dashed #dee2e6" }}
                      >
                        <td>
                          {new Date(item.date).toISOString().split("T")[0]}
                        </td>
                        <td>{item.note}</td>
                        <td>{item.categoryId?.name}</td>
                        <td>{formatCurrency(
                                item.amount,
                                getSetting.data.currency
                              )}</td>
                      </tr>
                    ))
                  )}
                  {filteredData.length > visibleTable && (
                    <tr>
                      <td colSpan="4" className="text-center py-3">
                        <Button
                          variant="link"
                          onClick={handleVisibleTable}
                          style={{
                            color: "black",
                            textDecoration: "none",
                            fontWeight: "600",
                          }}
                        >
                          See more <FaChevronDown />
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          
          {/* Download PDF Button */}
          <div className="text-end px-3 pb-3 mt-2">
            <Button variant="dark" className="main-btn" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          </div>
        </div>
      </section>
      )}
        {/* Footer */}
      <footer id="expensio-footer" className="bg-dark text-white mp-3">
        <div className="container text-center">
          <hr style={{ borderTop: "2px solid white" }} />
          <p>
            Use of this website constitutes acceptance of the site{" "}
            <Link to="/terms-conditions" className="text-primary text-decoration-underline fw-semibold">
              Terms of Service
            </Link>
          </p>
          <p className="mb-0">&#169; 2025 Expensio – All rights reserved</p>
        </div>
      </footer>
      
    </Layout>
  );
};

export default Transaction;
