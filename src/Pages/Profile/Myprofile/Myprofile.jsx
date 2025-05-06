import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProfile } from "../../../Api/functions/profileFunction";
import { useAuth } from "../../../Context/AuthProvider";

const Myprofile = () => {
  const [
    profileData,
    setProfileData,
  ] = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProfile(setProfileData, setLoading);
  }, []);


  

  if (loading || !profileData) {
    return (
      <Container
        fluid
        className="py-4"
        style={{ backgroundColor: "#f4f1f6", minHeight: "100vh" }}
      >
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <section>
      <Container
        fluid
        className="py-4"
        style={{ backgroundColor: "#f4f1f6", minHeight: "100vh" }}
      >
        <Row className="g-4">
          {/* Sidebar */}
          <Col xs={12} md={4} lg={3}>
            <Card
              className="text-center p-4"
              style={{
                backgroundColor: "#2D80A3",
                border: "none",
                borderRadius: "20px",
                height: "667px",
              }}
            >
              <div
                className="position-relative mx-auto"
                style={{ width: "130px" }}
              >
                <img
                  src={profileData.profilePic}
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    width: "130px",
                    height: "130px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                className="d-flex flex-column gap-5 justify-content-between text-start mt-4"
                style={{ color: "white", fontSize: "14px" }}
              >
                <div>
                  <p>
                    <strong>Name:</strong> {profileData.fullname}
                  </p>
                  <p>
                    <strong>Email:</strong> {profileData.email}
                  </p>
                  <p>
                    <strong>Number:</strong> {profileData.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {profileData.address}
                  </p>
                </div>

                <div>
                  <Button
                    as={Link}
                    to="/update-password"
                    variant="light"
                    className="w-100 mb-2 rounded-pill"
                  >
                    Change Password
                  </Button>
                  <Button
                    as={Link}
                    to="/edit-profile"
                    variant="light"
                    className="w-100 rounded-pill"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Card>
          </Col>

          {/* Main Content */}
          <Col xs={12} md={8} lg={9}>
            {/* Financial Overview */}
            <Card
              className="p-4 mb-4"
              style={{
                backgroundColor: "#E2EBF4",
                border: "none",
                borderRadius: "20px",
              }}
            >
              <h5>Financial Overview</h5>
              <div className="mt-3">
                {[
                  { label: "This Month's Spending", value: "$1,980" },
                  { label: "Remaining Budget", value: "$520" },
                  { label: "Top Category", value: "Dining" },
                  { label: "Upcoming Bills", value: "$300" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="d-flex justify-content-between py-2 border-bottom"
                  >
                    <span>{item.label}</span>
                    <span className="fw-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Last 4 Budget Summary */}
            <Card
              className="p-4"
              style={{
                backgroundColor: "#f4f1f6",
                border: "none",
                borderRadius: "20px",
              }}
            >
              <h5>Last 4 Budget Summary</h5>
              <div className="mt-3">
                {[
                  {
                    label: "Groceries",
                    value: "3350 / 4000",
                    progress: 83,
                    color: "success",
                  },
                  {
                    label: "Rent",
                    value: "1200 / 1200",
                    progress: 100,
                    color: "danger",
                  },
                  {
                    label: "Utilities",
                    value: "180 / 200",
                    progress: 90,
                    color: "success",
                  },
                  {
                    label: "Entertainment",
                    value: "250 / 300",
                    progress: 83,
                    color: "success",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="d-flex justify-content-between">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <ProgressBar now={item.progress} variant={item.color} />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Myprofile;
