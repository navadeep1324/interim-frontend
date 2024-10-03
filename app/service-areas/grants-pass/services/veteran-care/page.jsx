"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import CarsonFooter from "../../../../footercarson";
import GrantpassFooter from "../../../../footergrantspass";
import GrantpassfooterComponent from "../../../../footerservicegreantspass";
import GrantpassNavComponent from "../../../../grantspassnavcomponent";
export default function VeteranCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.interimhc.com/api/grant-pass-veteran-care?populate[maincontent][populate]=*');
        const result = await response.json();
        
        // Debug: Log the entire API response
        console.log("API Response: ", result);

        // Handle the result structure carefully
        if (result?.data) {
          if (Array.isArray(result.data) && result.data.length > 0) {
            console.log("API Data: ", result.data[0].attributes);
            setData(result.data[0].attributes);  // For collection type
          } else if (result.data.attributes) {
            console.log("API Data: ", result.data.attributes);
            setData(result.data.attributes);  // For single type
          } else {
            console.error('No data found in the response');
            throw new Error('No data available');
          }
        } else {
          console.error('Invalid response format');
          throw new Error('No data available');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // No data state
  if (!data) {
    return <div>No data available</div>;
  }

  // Utility function to construct image URLs
  const getImageUrl = (imageData) => {
    return imageData ? `https://api.interimhc.com${imageData.url}` : null;
  };

  // Rendering the image
  const renderImage = (imageData, alt, width, height) => {
    if (imageData && imageData.url) {
      return (
        <Image
          src={getImageUrl(imageData)}
          alt={alt}
          width={width}
          height={height}
          onError={(e) => console.error('Error loading image:', e)}
        />
      );
    }
    return <p>No image available</p>;  // Fallback when no image is available
  };

  // Rendering the description
  const renderDescription = (description) => {
    if (!description) return null;
    return description.map((desc, index) => {
      if (desc.type === "paragraph") {
        return <p key={index} className="py-3">{desc.children[0]?.text}</p>;
      } else if (desc.type === "list") {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
            {desc.children.map((item, idx) => (
              <li key={idx}>{item.children[0]?.text}</li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <GrantpassNavComponent />
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data.maincontent[0]?.Heading || "No heading available"}</h1>
              <p className="paragram py-2">
                {data.maincontent[0]?.subHeading?.split('\n').map((str, index) => (
                  <span key={index}>{str}<br /></span>
                )) || "No subheading available"}
              </p>
            </Col>
            <Col md="7">
              {renderImage(data.maincontent[0]?.bannerimg?.data?.attributes, "Veteran Home Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregivertodayComponent />
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
            <Col md="4">
              {renderImage(data.maincontent[1]?.img?.data?.attributes, "Veteran Care Service", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data.maincontent[1]?.Heading || "No heading available"}</h2>
              {renderDescription(data.maincontent[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sectionbg" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[2]?.Heading || "No heading available"}</h2>
              {renderDescription(data.maincontent[2]?.description)}
            </Col>
            <Col md="6">
              {renderImage(data.maincontent[2]?.img?.data?.attributes, "Respite Care Service", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section3" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              {renderImage(data.maincontent[3]?.img?.data?.attributes, "Respite Care Service", 595, 780)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3]?.Heading || "No heading available"}</h2>
              {renderDescription(data.maincontent[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: '#ffff', borderRadius: '20px' }}>
            <Col md={6}>
              <h2 className="heading2">{data.maincontent[4]?.Heading || "No heading available"}</h2>
              {renderDescription(data.maincontent[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(data.maincontent[4]?.image?.data?.attributes, "Respite Care Contact", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>
      <GrantpassfooterComponent />
    </div>
  );
}
