"use client";
import React, { useEffect, useState } from "react";
import ReddingNavbarComponent from "../../../../reddingnavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiversComponentMainCity";
import ServicepageFooter from "../../../../servicepageFooter";
import Head from "next/head";

export default function CompanionCareComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/companion-care-service?populate[maincontent][populate]=*&populate[seo]=*')
      .then(response => response.json())
      .then(responseData => {
        console.log("Full API Response:", responseData); // Log the full API response for debugging

        if (responseData && responseData.data) {
          // Directly set attributes from single type
          setData(responseData.data.attributes);
          
          // Set the SEO data directly (accessing the first element of the SEO array)
          setSeoData(responseData.data.attributes.seo[0]);
        } else {
          console.log("No data in API response");
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  // If loading, show loading message
  if (loading) {
    return; // //<div>Loading...</div>;
  }

  // If error, show error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Helper function to render images
  const getImageUrl = (imageData) => {
    if (!imageData) return ''; // Ensure imageData is not null
    const url = `https://admin.interimhc.com${imageData.url}`;
    console.log('Image URL:', url); // Log image URL for debugging
    return url;
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

  // Render descriptions with links inside bullet points
  const renderDescription = (descriptions) => {
    return descriptions.map((para, index) => {
      if (para.type === "paragraph") {
        return (
          <p key={index} className="py-3">
            {para.children.map((item, idx) => {
              if (item.type === "link") {
                const isExternalLink = item.url.startsWith("http");
                return (
                  <a
                    key={idx}
                    href={item.url}
                    className="phone-link"
                    target={isExternalLink ? "_blank" : "_self"}
                    rel={isExternalLink ? "noopener noreferrer" : undefined}
                  >
                    {item.children?.[0]?.text || "Link"}
                  </a>
                );
              } else if (item.bold) {
                return <b key={idx}>{item.text}</b>;
              } else {
                return <span key={idx}>{item.text}</span>;
              }
            })}
          </p>
        );
      } else if (para.type === "list" && para.format === "unordered") {
        return (
          <ul key={index} style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            {para.children.map((listItem, listIdx) => (
              <li key={listIdx}>
                {listItem.children.map((item, idx) => {
                  if (item.type === "link") {
                    const isExternalLink = item.url.startsWith("http");
                    return (
                      <a
                        key={idx}
                        href={item.url}
                        className="phone-link"
                        target={isExternalLink ? "_blank" : "_self"}
                        rel={isExternalLink ? "noopener noreferrer" : undefined}
                      >
                        {item.children?.[0]?.text || "Link"}
                      </a>
                    );
                  } else if (item.bold) {
                    return <b key={idx}>{item.text}</b>;
                  } else {
                    return <span key={idx}>{item.text}</span>;
                  }
                })}
              </li>
            ))}
          </ul>
        );
      }
  
      return null;
    });
  };
  
  return (
    <div>
      {/* SEO Integration */}
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>

      <ReddingNavbarComponent />

      {/* Main Content */}
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data.maincontent[0]?.Heading}</h1>
              {data.maincontent[0]?.subHeading && (
                <>
                  <p className="paragrambold py-2">
                    {data.maincontent[0]?.subHeading.split('\n')[0]}
                  </p>
                  <p className="paragram py-2">
                    {data.maincontent[0]?.subHeading.split('\n')[1]}
                  </p>
                </>
              )}
              <p>Reach us today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to learn how we can assist your aging adults!</p>
            </Col>
            <Col md="6">
              {renderImage(data?.maincontent?.[0]?.bannerimg?.data?.attributes, "Companion care Services", 3102, 2064)}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {renderImage(data?.maincontent?.[1]?.img?.data?.attributes, "Exceptional Elderly companion care", 1785, 2340)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data?.maincontent?.[1]?.Heading}</h2>
              {data?.maincontent?.[1]?.description && renderDescription(data.maincontent[1].description)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data?.maincontent?.[2]?.Heading}</h2>
              {data?.maincontent?.[2]?.description && renderDescription(data.maincontent[2].description)}
            </Col>
            <Col md="6">
              {renderImage(data?.maincontent?.[2]?.img?.data?.attributes, "Who can benefit from companion home care", 1760, 1052)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {renderImage(data?.maincontent?.[3]?.img?.data?.attributes, "Experience Our Superior companion home care services", 1785, 1290)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data?.maincontent?.[3]?.Heading}</h2>
              {data?.maincontent?.[3]?.description && renderDescription(data.maincontent[3].description)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data?.maincontent?.[4]?.Heading}</h2>
              {data?.maincontent?.[4]?.description && renderDescription(data.maincontent[4].description)}
              <Button className="Contactbtn py-3 my-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(data?.maincontent?.[4]?.image?.data?.attributes, "Caring for Seniors is an Honor for us", 2408, 1784)}
            </Col>
          </Row>
        </Container>
      </div>

      <ServicepageFooter />
    </div>
  );
}
