"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiversComponentMainCity";
import ServicepageFooter from "../../../../servicepageFooter";
import SanJoseFooter from "../../../../footersanjose";
import SanjoseNavbarComponent from "../../../../sanjosenavcomponent";
import SanJoseserviceFooter from "../../../../footerservicesanjose";
export default function VeteranCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/sanjose-veteran-cares?populate[maincontent][populate]=*')
      .then(response => response.json())
      .then(responseData => {
        // Log the API response to debug structure
        console.log('API Response:', responseData);

        // Adjusting for different possible API structures
        if (responseData?.data?.attributes?.maincontent) {
          // For expected structure: data -> attributes -> maincontent
          setData(responseData.data.attributes.maincontent);
        } else if (Array.isArray(responseData.data) && responseData.data.length > 0) {
          // If data is an array, use the first item
          setData(responseData.data[0].attributes.maincontent);
        } else {
          throw new Error("Invalid data structure received");
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

  const getImageUrl = (imageData) => {
    return `https://admin.interimhc.com${imageData?.url || ''}`;
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
  
      // Handle unordered lists (bullet points)
      if (desc.type === 'list' && desc.format === 'unordered') {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {desc.children?.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item?.children?.[0]?.text || ""}
              </li>
            ))}
          </ul>
        );
      }
  
      // Handle headings (Assuming heading level comes from 'level' property in your JSON)
      if (desc.type === 'heading') {
        const HeadingTag = `h${desc.level}`; // Dynamically select heading tag (h2, h3, etc.)
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
      <SanjoseNavbarComponent/>
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data?.[0]?.Heading || ""}</h1>
              <p className="paragrambold py-2">{data?.[0]?.subHeading?.split("\n\n")[0] || ""}</p>
              <p className="py-4">
                {data?.[0]?.subHeading?.split("\n\n")[1] || ""}
                <br></br>
                Reach us today at <a href="tel:+1 408-286-6888" className="phone-link">+1 408-286-6888</a> to learn how we can assist your aging adults!

              </p>
            </Col>
            <Col md="6">
              {renderImage(data?.[0]?.bannerimg?.data?.attributes, "Veteran Home Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregivertodayComponent />
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign ">
            <Col md="4">
              {renderImage(data?.[1]?.img?.data?.attributes, "Veteran Care Service", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data?.[1]?.Heading || ""}</h2>
              {renderDescription(data?.[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      {/* Section 3 */} 
<div className="sectionbg">
  <Container>
    <Row className="middlealign g-5 row-reverse-mobile">
      <Col md="6">
        <h2 className="heading2">{data?.[2]?.Heading || ""}</h2>
        {renderDescription(data?.[2]?.description)} {/* Use updated renderDescription */}
      </Col>
      <Col md="6">
        {renderImage(data?.[2]?.img?.data?.attributes, "Respite Care Service", 626, 525)}
      </Col>
    </Row>
  </Container>
</div>

      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {renderImage(data?.[3].img?.data?.attributes, "Respite Care Service", 595, 780)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data?.[3]?.Heading || ""}</h2>
              {renderDescription(data?.[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4">
        <Container>
          <Row className="g-5 section4sub">
            <Col md={6}>
              <h2 className="heading2">{data?.[4]?.Heading || ""}</h2>
              {renderDescription(data?.[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(data?.[4]?.image?.data?.attributes, "Respite Care Contact", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>
      <SanJoseserviceFooter  />
    </div>
  );
}
