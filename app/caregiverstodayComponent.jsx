"use client";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

export default function CaregivertodayComponent() {
  const [ctaData, setCtaData] = useState(null);

  useEffect(() => {
    async function fetchCtaData() {
      try {
        const res = await fetch('http://localhost:1337/api/alzheimer-s-and-dementia?populate[maincontent][populate]=img');
        const result = await res.json();
        const cta = result.data.attributes.maincontent.find(section => section.__component === "components.cargiver-cta");
        setCtaData(cta);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchCtaData();
  }, []);

  if (!ctaData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sectioncaregiversbg">
      <Container>
        <Row className="py-4">
          <Col md="8">
            <h2 className="head2">{ctaData.Heading}</h2>
          </Col>
          <Col md="4" className="numbercol">
            <Button className="caregiverbtn py-3" href="tel:+1 408-286-6888">
              Click Here
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
