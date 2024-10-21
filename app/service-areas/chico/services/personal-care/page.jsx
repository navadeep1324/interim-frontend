"use client";
import React, { useEffect, useState } from "react";
import ChicoNavbarComponent from "../../../../chiconavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import FooterServiceChicoComponent from "../../../../footerservicechico";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import Head from "next/head";

export default function PersonalCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://admin.interimhc.com/api/chico-personal-cares?populate[maincontent][populate]=*&populate[seo]=*"
        );
        const result = await res.json();

        if (result.data) {
          if (Array.isArray(result.data)) {
            setData(result.data[0].attributes); // Handle collection type
            setSeoData(result.data[0]?.attributes?.seo);
          } else {
            setData(result.data.attributes); // Handle single type
          }
        } else {
          throw new Error("Invalid API structure");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Set SEO meta data dynamically
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

  if (loading) {
    return null; // You can add a loading spinner if needed
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Helper to fetch image URL safely
  const getImageUrl = (imageData) => {
    return `https://admin.interimhc.com${imageData.url}`;
  };

  // Function to render images with error handling
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

  // Render description with custom handling (lists, bold text, links)
  const renderDescription = (description) => {
    return description.map((block, index) => {
      if (!block || !block.children || block.children.length === 0) return null; // Skip empty blocks
  
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
                  return <span key={idx}>{child.text || ""}</span>;
                }
              })}
            </p>
          );
  
        case "list":
          return block.format === "unordered" ? (
            <ul key={index} style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {block.children.map((listItem, listIdx) => (
                <li key={listIdx}>
                  {listItem.children.map((child, childIdx) => (
                    <span key={childIdx}>{child.text || ""}</span>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <ol key={index} style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
              {block.children.map((listItem, listIdx) => (
                <li key={listIdx}>
                  {listItem.children.map((child, childIdx) => (
                    <span key={childIdx}>{child.text || ""}</span>
                  ))}
                </li>
              ))}
            </ol>
          );
  
        default:
          return null;
      }
    });
  };
  const renderDescriptionWithoutDuplicates = (description) => {
    return description.map((block, index) => {
      if (!block || !block.children || block.children.length === 0) return null; // Skip empty blocks
  
      // Avoid rendering duplicates
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
                  return <span key={idx}>{child.text || ""}</span>;
                }
              })}
            </p>
          );
  
        case "list":
          return block.format === "unordered" ? (
            <ul key={index} style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {block.children.map((listItem, listIdx) => (
                <li key={listIdx}>
                  {listItem.children.map((child, childIdx) => (
                    <span key={childIdx}>{child.text || ""}</span>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <ol key={index} style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
              {block.children.map((listItem, listIdx) => (
                <li key={listIdx}>
                  {listItem.children.map((child, childIdx) => (
                    <span key={childIdx}>{child.text || ""}</span>
                  ))}
                </li>
              ))}
            </ol>
          );
  
        default:
          return null;
      }
    });
  };
 

  return (
    <div>
      <ChicoNavbarComponent />
      
      {/* First Section */}
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data.maincontent[0].Heading}</h1>
              <p className="paragrambold py-2">{data.maincontent[0].subHeading.split("\n\n")[0]}</p>
              <p className="py-4">
                {data.maincontent[0].subHeading.split("\n\n")[1]}
                <br />
                Reach us today at <a href="tel:+1 530-899-9777" className="phone-link">+1 530-899-9777</a> to learn how we can assist your aging adults!
              </p>
            </Col>
            <Col md="6">
              {renderImage(
                data.maincontent[0].bannerimg.data.attributes,
                "Compassionate Personal Care Services",
                1034,
                688
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregiverCityComponent />

      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {renderImage(
                data.maincontent[1].img.data.attributes,
                "Uplifting the Hope to Stay Happy with Quality Personal Care",
                595,
                780
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data.maincontent[1].Heading}</h2>
              {renderDescription(data.maincontent[1].description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
<div className="servicessectionbg">
  <Container>
    <Row className="middlealign g-5 row-reverse-mobile">
      <Col md="6">
        <h2 className="heading2">{data.maincontent[2]?.Heading}</h2>
        {data.maincontent[2]?.description ? renderDescription(data.maincontent[2].description) : <p>No description available.</p>}
      </Col>
      <Col md="6">
        {data.maincontent[2]?.img?.data ? (
          renderImage(
            data.maincontent[2].img.data.attributes,
            "Who Can Benefit from Our Personal Care Services?",
            626,
            525
          )
        ) : (
          <p>No image available.</p>
        )}
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
                data.maincontent[3].img.data.attributes,
                "Get Care from Personal Care Experts with Over 50 Years of Experience",
                595,
                780
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3].Heading}</h2>
              {renderDescription(data.maincontent[3].description)}

            </Col>
          </Row>
        </Container>
      </div>

      {/* Fifth Section */}
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data.maincontent[4].Heading}</h2>
              {renderDescription(data.maincontent[4].description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 530-899-9777">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(
                data.maincontent[4].image.data.attributes,
                "You Are Just a Few Steps Away from Personalized Care",
                595,
                780
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>

      <FooterServiceChicoComponent />
    </div>
  );
}
