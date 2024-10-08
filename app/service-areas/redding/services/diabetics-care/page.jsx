"use client";
import React, { useEffect, useState } from "react";
import ReddingNavbarComponent from "../../../../reddingnavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import ServicepageFooter from "../../../../servicepageFooter";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";


export default function DiabetesCareComponent() {
  const [diabetesData, setDiabetesData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching data from Strapi
  useEffect(() => {
    fetch("https://admin.interimhc.comapi/diabetics-care?populate[maincontent][populate]=*")
      .then((response) => response.json())
      .then((json) => {
        setDiabetesData(json.data.attributes);
        setLoading(false);
        console.log("Fetched Data:", json.data.attributes); // Log the full data for debugging
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to get image URL or return a fallback if needed
  const getImageUrl = (imageData) => {
    if (imageData?.formats?.large?.url) {
      return `http://localhost:1337${imageData.formats.large.url}`;
    } else if (imageData?.url) {
      return `http://localhost:1337${imageData.url}`;
    }
    return null;
  };

  // Function to render image with proper error handling and fallback
  const renderImage = (imageData, alt, width, height) => {
    if (!imageData) return null; // Avoid errors when imageData is undefined or null
    const imageUrl = getImageUrl(imageData);
    if (!imageUrl) return null;

    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        onError={(e) => console.error("Error loading image:", e)}
      />
    );
  };

  // Function to render description
  const renderDescription = (description) => {
    return description?.map((desc, index) => {
      if (desc.type === "paragraph") {
        return <p key={index} className="py-3">{desc.children[0]?.text}</p>;
      } else if (desc.type === "list") {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
            {desc.children.map((item, index) => (
              <li key={index}>{item.children[0]?.text}</li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  return (
    <div>
            <ReddingNavbarComponent />
            {/* First Section */}
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{diabetesData?.maincontent[0]?.Heading}</h1>
              <p className="paragram py-2">
                {diabetesData?.maincontent[0]?.subHeading.split('\n').map((str, index) => (
                  <span key={index}>{str}<br /></span>
                ))}
              </p>
            </Col>
            <Col md="7">
              {/* Fetch and render the image from id: 84 */}
              {renderImage(diabetesData?.maincontent[0]?.bannerimg?.data?.attributes, "Diabetes Home Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregiverCityComponent />

      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
            <Col md="4">
              {/* Fetch and render the image from id: 87 */}
              {renderImage(diabetesData?.maincontent[1]?.img?.data?.attributes, "Diabetes Care Service", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{diabetesData?.maincontent[1]?.Heading}</h2>
              {renderDescription(diabetesData?.maincontent[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="sectionbg" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">{diabetesData?.maincontent[2]?.Heading}</h2>
              {renderDescription(diabetesData?.maincontent[2]?.description)}
            </Col>
            <Col md="6">
              {/* Fetch and render the image from id: 86 */}
              {renderImage(diabetesData?.maincontent[2]?.img?.data?.attributes, "Respite Care Service", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              {/* Fetch and render the image from id: 85 */}
              {renderImage(diabetesData.maincontent[3].image.data.attributes, "Respite Care Service", 595, 780)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{diabetesData?.maincontent[3]?.Heading}</h2>
              {renderDescription(diabetesData?.maincontent[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Final Section with Contact */}
      <div className="section4" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: '#ffff', borderRadius: '20px' }}>
            <Col md={6}>
              <h2 className="heading2">{diabetesData?.maincontent[4]?.Heading}</h2>
              {renderDescription(diabetesData?.maincontent[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {/* Image commented out as per your request */}
              {renderImage(diabetesData?.maincontent[4]?.image?.data?.attributes, "Respite Care Contact", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>

      <ServicepageFooter />
    </div>
  );
}


// Images need to fetch for this page 