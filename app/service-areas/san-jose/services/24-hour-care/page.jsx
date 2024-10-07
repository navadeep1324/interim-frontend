"use client";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import ChicoFooter from "../../../../footerservicechico";
import FooterserviceComponent from "../../../../footerservicechico";
import ChicoNavComponent from "../../../../chiconavcomponent";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import SanjoseNavbarComponent from "../../../../sanjosenavcomponent";
import SanJoseFooter from "../../../../footerservicesanjose";

export default function HourcareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/sanjose-24-hour-cares?populate[maincontent][populate]=*')
      .then(response => response.json())
      .then(responseData => {
        if (responseData && responseData.data && responseData.data[0]) {
          setData(responseData.data[0].attributes);
        }
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

  if (!data || !data.maincontent) {
    return <div>No content available</div>;
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
                const isExternalLink = child.url.startsWith('http');
  
                return (
                  <a
                    key={idx}
                    href={child.url}
                    className="phone-link"
                    target={isExternalLink ? "_blank" : "_self"}
                    rel={isExternalLink ? "noopener noreferrer" : ""}
                  >
                    {child.children?.[0]?.text || 'Link'}
                  </a>
                );
              }
              return null;
            })}
          </p>
        );
      }
  
      // Handle unordered lists (bullet points)
      if (desc.type === 'list' && desc.format === 'unordered') {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {desc.children?.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item?.children?.map((child, idx) => {
                  if (child.type === 'text') {
                    return child.text;
                  }
                  if (child.type === 'link') {
                    const isExternalLink = child.url.startsWith('http');
  
                    return (
                      <a
                        key={idx}
                        href={child.url}
                        className="phone-link"
                        target={isExternalLink ? "_blank" : "_self"}
                        rel={isExternalLink ? "noopener noreferrer" : ""}
                      >
                        {child.children?.[0]?.text || 'Link'}
                      </a>
                    );
                  }
                  return null;
                })}
              </li>
            ))}
          </ul>
        );
      }
  
      // Handle headings (Assuming heading level comes from 'level' property in your JSON)
      if (desc.type === 'heading') {
        const HeadingTag = `h${desc.level}`;
        return (
          <HeadingTag key={index} className="section4-heading">
            {desc?.children?.[0]?.text || ""}
          </HeadingTag>
        );
      }
  
      return null;
    });
  };
  
  

  return (
    <div>
      <SanjoseNavbarComponent />

      {/* First Section */}
      <div className="sectionbg">
        <Container>
          <Row className="align-items-center g-5 py-5">
            <Col md="6">
              <h1 className="heading1">{data.maincontent[0]?.Heading || 'Default Heading'}</h1>
              <p className="py-2">{data.maincontent[0]?.subHeading || 'Default Subheading'}</p>
              <p>Contact us today at <a href="tel:+1 408-286-6888" className="phone-link">+1 408-286-6888</a> and let us offer compassionate and personalized care.</p>

            </Col>
            <Col md="6" className="d-flex justify-content-center">
              {renderImage(data.maincontent[0]?.bannerimg?.data?.attributes, "Pioneers In Personalized 24 Hour Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregiverCityComponent />

      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="align-items-center g-5 row3bg py-4">
            <Col md="4">
              {renderImage(data.maincontent[1]?.img?.data?.attributes, "Enriching Lives with Holistic Care", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data.maincontent[1]?.Heading || 'Default Heading'}</h2>
              {renderDescription(data.maincontent[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="sectionbg">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              <h2 className="heading2">{data.maincontent[2]?.Heading || 'Default Heading'}</h2>
              {renderDescription(data.maincontent[2]?.description)}
            </Col>
            <Col md="6">
              {renderImage(data.maincontent[2]?.img?.data?.attributes, "Access to Top Professionals and Timely Solutions", 635, 735)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {renderImage(data.maincontent[3]?.img?.data?.attributes, "Access to Top Professionals and Timely Solutions", 635, 735)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3]?.Heading || 'Default Heading'}</h2>
              {renderDescription(data.maincontent[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fifth Section */}
      <div className="section4 mt-5">
        <Container>
          <Row className="align-items-center g-5 px-5" style={{ background: '#ffff', borderRadius: '20px', padding: '3%' }}>
            <Col md={6}>
              <h2 className="heading2">{data.maincontent[4]?.Heading || 'Default Heading'}</h2>
              {renderDescription(data.maincontent[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(data.maincontent[4]?.image?.data?.attributes, "Contact Us Today", 635, 735)}
            </Col>
          </Row>
        </Container>
      </div>

      <SanJoseFooter/>
    </div>
  );
}
