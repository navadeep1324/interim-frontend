"use client";
import React, { useEffect, useState } from "react";
import RenoNavbarComponent from "../../../../renonavcomponent"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import RenoFooter from "../../../../footerreno";
import RenoFooterServices from "../../../../footerservicereno";
export default function VeteranCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:1337/api/reno-veteran-cares?populate[maincontent][populate]=*')
      .then(response => response.json())
      .then(result => {
        console.log('API Response:', result); // Debug the response structure
        setData(result.data[0]?.attributes); // Adjusted to access the first item in the array
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Helper function to get the image URL
  const getImageUrl = (imageData) => {
    return imageData ? `http://127.0.0.1:1337${imageData.url}` : '/default.jpg';
  };

  // Helper function to render an image using next/image
  const renderImage = (imageData, alt, width, height) => {
    if (imageData) {
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
    return null;
  };

  // Helper function to render description paragraphs and lists
  const renderDescription = (description) => {
    return description.map((desc, index) => {
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
<RenoNavbarComponent/>
<div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">
                {data?.maincontent?.[0]?.Heading || 'No Heading Available'}
              </h1>
              <p className="paragram py-2">
                {data?.maincontent?.[0]?.subHeading?.split('\n').map((str, index) => (
                  <span key={index}>{str}<br /></span>
                ))}
              </p>
            </Col>
            <Col md="7">
              {renderImage(data?.maincontent?.[0]?.bannerimg?.data?.attributes, "Veteran Home Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>
      < CaregiverCityComponent/>
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
            <Col md="4">
              {renderImage(data?.maincontent?.[1]?.img?.data?.attributes, "Veteran Care Service", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data?.maincontent?.[1]?.Heading || 'No Heading Available'}</h2>
              {renderDescription(data?.maincontent?.[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sectionbg" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">{data?.maincontent?.[2]?.Heading || 'No Heading Available'}</h2>
              {renderDescription(data?.maincontent?.[2]?.description)}
            </Col>
            <Col md="6">
              {renderImage(data?.maincontent?.[2]?.img?.data?.attributes, "Respite Care Service", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section3" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              {renderImage(data?.maincontent?.[3]?.img?.data?.attributes, "Respite Care Service", 595, 780)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data?.maincontent?.[3]?.Heading || 'No Heading Available'}</h2>
              {renderDescription(data?.maincontent?.[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: '#ffff', borderRadius: '20px' }}>
            <Col md={6}>
              <h2 className="heading2">{data?.maincontent?.[4]?.Heading || 'No Heading Available'}</h2>
              {renderDescription(data?.maincontent?.[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(data?.maincontent?.[4]?.image?.data?.attributes, "Respite Care Contact", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>
      <RenoFooterServices />
    </div>
  );
}
