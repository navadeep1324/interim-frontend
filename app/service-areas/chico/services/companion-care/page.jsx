"use client";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiversComponentMainCity";
import ChicoNavbarComponent from "../../../../chiconavcomponent";
import ChicoFooter from "../../../../footerservicechico";
import Head from "next/head";

export default function CompanionCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState(null);

  // Fetching data from API
  useEffect(() => {
    fetch("https://admin.interimhc.com/api/chico-companion-cares?populate[maincontent][populate]=*&populate[seo]=*")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.data && responseData.data.length > 0) {
          setData(responseData.data[0].attributes);
          setSeoData(responseData.data[0]?.attributes?.seo);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Setting SEO meta dynamically
  useEffect(() => {
    if (seoData && Array.isArray(seoData) && seoData.length > 0) {
      const seo = seoData[0];
      document.title = seo.metaTitle || "Default Title";

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seo.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seo.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    }
  }, [seoData]);

  // Helper function to safely get image URL
  const getImageUrl = (imageData) => {
    return imageData?.url ? `https://admin.interimhc.com${imageData.url}` : "";
  };

  // Rendering images with safety checks
  const renderImage = (imageData, alt, width, height) => {
    if (imageData) {
      return (
        <Image
          src={getImageUrl(imageData)}
          alt={alt}
          width={width}
          height={height}
          onError={(e) => console.error("Error loading image:", e)}
        />
      );
    }
    return null;
  };

  // Rendering descriptions (paragraphs, lists, links) with safety checks
  const renderDescription = (description) => {
    return description.map((block, index) => {
      switch (block.type) {
        case "paragraph":
          return (
            <p key={index}>
              {block.children.map((child, idx) => {
                if (child.type === "link") {
                  return (
                    <a
                      key={idx}
                      href={child.url}
                      className="phone-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {child.children[0]?.text}
                    </a>
                  );
                } else {
                  return <span key={idx}>{child.text}</span>;
                }
              })}
            </p>
          );
  
        case "list":
          return (
            <ul key={index} style={{ listStyleType: block.format === "unordered" ? "disc" : "decimal", paddingLeft: "20px" }}>
              {block.children.map((listItem, idx) => (
                <li key={idx}>
                  {listItem.children.map((child, childIdx) => {
                    if (child.type === "link") {
                      return (
                        <a
                          key={childIdx}
                          href={child.url}
                          className="phone-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {child.children[0]?.text}
                        </a>
                      );
                    } else {
                      return <span key={childIdx}>{child.text}</span>;
                    }
                  })}
                </li>
              ))}
            </ul>
          );
  
        default:
          return null;
      }
    });
  };
  

  if (loading) {
    return null; // Optionally add a loading spinner
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <ChicoNavbarComponent />

      {/* First Section */}
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
  )}<p>
                Reach us today at <a href="tel:+1 530-899-9777" className="phone-link">+1 530-899-9777</a> to learn how we
                can assist your aging adults!
              </p>
            </Col>
            <Col md="6">
              {renderImage(data.maincontent[0]?.bannerimg?.data?.attributes, "Companion care Services", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {renderImage(
                data.maincontent[1]?.img?.data?.attributes,
                "Exceptional Elderly companion care",
                595,
                780
              )}
            </Col>
            <Col md="8">
            <h2 className="heading2">{data.maincontent[1]?.Heading}</h2>
              {data.maincontent[1]?.description?.map((desc, index) => (
                <p key={index} className="py-3">{desc?.children[0]?.text}</p>
              ))} </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data.maincontent[2]?.Heading}</h2>
              {data.maincontent[2]?.description ? renderDescription(data.maincontent[2].description) : <p>No description available</p>}
            </Col>
            <Col md="6">
              {renderImage(data.maincontent[2]?.img?.data?.attributes, "Who can benefit from companion home care", 625, 400)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {renderImage(
                data.maincontent[3]?.img?.data?.attributes,
                "Experience Our Superior companion home care services",
                550,
                520
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3]?.Heading}</h2>
              {data.maincontent[3]?.description ? renderDescription(data.maincontent[3].description) : <p>No description available</p>}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fifth Section */}
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data.maincontent[4]?.Heading}</h2>
              {data.maincontent[4]?.description ? renderDescription(data.maincontent[4].description) : <p>No description available</p>}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(data.maincontent[4]?.image?.data?.attributes, "Caring for Seniors is an Honor for us", 550, 520)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* SEO Meta Tags */}
      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>

      <ChicoFooter />
    </div>
  );
}
