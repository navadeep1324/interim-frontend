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

export default function RespiteCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/respite-care?populate[maincontent][populate]=*')
      .then(response => response.json())
      .then(data => {
        setData(data.data.attributes);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getImageUrl = (imageData) => {
    return `https://admin.interimhc.com${imageData.url}`;
  };

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

  // Function to render description including handling headings
  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null;

    return description.map((desc, index) => {
      // Handle paragraphs
      if (desc.type === 'paragraph') {
        return (
          <p key={index} className="py-3">
            {desc?.children?.map((child, idx) => {
              if (child.type === 'text') {
                return child.text;
              }
              if (child.type === 'link') {
                return (
                  <a key={idx} href={child.url} className="phone-link">
                    {child.children?.[0]?.text || 'Link'}
                  </a>
                );
              }
              return null;
            })}
          </p>
        );
      }

      // Handle headings with the "heading2" class
      if (desc.type === 'heading') {
        return (
          <h2 key={index} className="heading3">
            {desc?.children?.[0]?.text || ""}
          </h2>
        );
      }

      return null;
    });
  };

  // Filter out undefined or empty list items
  const renderListItems = (items) => {
    return items
      .filter(item => item?.children?.[0]?.text) // Only include items with non-empty text
      .map((item, index) => (
        <li key={index}>
          {item?.children?.[0]?.text || ""}
        </li>
      ));
  };

  return (
    <div>
      <ReddingNavbarComponent />

      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data?.maincontent?.[0]?.Heading || ""}</h1>
              <p className="paragrambold py-2">
                {data?.maincontent?.[0]?.subHeading?.split("\n")[0] || ""}
              </p>
              <p >
                {/* {data?.maincontent?.[0]?.subHeading?.split("\n")[1] || ""} */}
                Caring for a loved one is incredibly rewarding yet demanding, often taking up a lot of time and energy. Finding moments of rest and managing personal responsibilities outside of caregiving are essential for your well-being. At Interim Healthcare, we provide compassionate support to lighten your load as a family caregiver.<br></br>
                <br></br>Reach us today at <a href="tel:+1 530-221-1212" className="phone-link">+1 530-221-1212</a> to learn how we can assist your aging adults!
              </p>
            </Col>
            <Col md="6">
              {renderImage(data?.maincontent?.[0]?.bannerimg?.data?.attributes, "Compassionate Respite Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {renderImage(data?.maincontent?.[1]?.img?.data?.attributes, "Extending your Caregiving Warmth Even During Your Absence", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data?.maincontent?.[1]?.Heading}</h2>
              {renderDescription(data?.maincontent?.[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data?.maincontent?.[2]?.Heading}</h2>
              {renderDescription(data?.maincontent?.[2]?.description)}
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                {renderListItems(data?.maincontent?.[2]?.description?.[2]?.children || [])}
              </ul>
            </Col>
            <Col md="6">
              {renderImage(data?.maincontent?.[2]?.img?.data?.attributes, "Our Commitments as Your Respite Caregiver", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {renderImage(data?.maincontent?.[3]?.img?.data?.attributes, "Benefits of our Respite Caregiving", 595, 780)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data?.maincontent?.[3]?.Heading}</h2>
              {renderDescription(data?.maincontent?.[3]?.description)}
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                {renderListItems(data?.maincontent?.[3]?.description?.[1]?.children || [])}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data?.maincontent?.[4]?.Heading}</h2>
              {renderDescription(data?.maincontent?.[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(data?.maincontent?.[4]?.image?.data?.attributes, "Interim: Providing Help, When You Need It!", 595, 780)}
            </Col>
          </Row>
        </Container>
      </div>
      <ServicepageFooter />
    </div>
  );
}
