// Inside CaregiverCityComponent.js (or wherever the component is located)

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CaregiverCityComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://admin.interimhc.com/api/caregiver-cta?populate[maincontent][populate]=*"
        );
        setData(response.data.data.attributes);
      } catch (error) {
        console.error("Error fetching data from Strapi", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
      return //<p>Loading...</p>;
 // Show loading state if data is not yet available
  }

  // Access the button information from the maincontent
  const btn = data.maincontent[0].btn[0]; // Assuming only one button exists in the array

  return (
    <div className="sectioncaregiversbg">
      <Container>
        <Row className="py-3">
          <Col md="8" className="coloum1txt">
            <h3 className="caregivertext">{data.maincontent[0].Heading}</h3>
          </Col>
          <Col md="4" className="numbercol">
            <Button
              className="caregivercitybtn crg-btn py-3"
              href={btn.isExternal ? btn.url : `https://www.interimhealthcare.com/careers`} // Adjusted based on whether the link is external
              target={btn.isExternal ? "_blank" : "_blank"} // Open in new tab if external
            >
              {btn.text || "Click Here"} {/* Display the button text */}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
