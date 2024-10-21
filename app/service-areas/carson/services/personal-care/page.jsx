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
import FooterServiceCarsonComponent from "../../../../footerservicescarson";
import CarsonNavbarComponent from "../../../../carsonnavcomponent";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import Head from "next/head";

export default function PersonalCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://admin.interimhc.com/api/carson-personal-cares?populate[maincontent][populate]=*&populate[seo]=*"
        );
        const result = await res.json();

        if (result.data) {
          if (Array.isArray(result.data)) {
            setData(result.data[0].attributes); // Collection type
            setSeoData(result.data[0]?.attributes?.seo);
          } else {
            setData(result.data.attributes); // Single type
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

  // Dynamically set the meta title and description once the seoData is fetched
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
    return null; // <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getImageUrl = (imageData) => {
    return `https://admin.interimhc.com${imageData.url}`;
  };

  const renderImage = (imageData, alt) => {
    if (imageData) {
      const { width, height } = imageData; // Extract original width and height
      return (
        <Image
          src={getImageUrl(imageData)}
          alt={alt}
          width={width} // Original width
          height={height} // Original height
          onError={(e) => console.error("Error loading image:", e)}
        />
      );
    }
    return null;
  };

  const renderDescription = (description) => {
    return description.map((para, index) => {
      const hasValidContent = para?.children?.some(item => item?.text?.trim() || item.type === 'link'); // Check if the paragraph has valid text or links
  
      if (!hasValidContent) return null; // Skip rendering if no valid content
  
      return (
        <p className="footerrow" key={index}>
          {para?.children?.map((item, idx) => {
            if (item.type === "link") {
              const isExternalLink = item.url.startsWith("http");
              return (
                <a
                  key={idx}
                  href={item.url}
                  className="phone-link"
                  target={isExternalLink ? "_blank" : "_self"}
                  rel={isExternalLink ? "noopener noreferrer" : undefined}
                  style={{ display: "inline" }} // Ensure links are inline
                >
                  {item.children[0]?.text}
                </a>
              );
            } else if (item.type === "ul") {
              return (
                <ul key={idx} style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  {item.children.map((listItem, listIdx) => (
                    <li key={listIdx}>{renderDescription([listItem])}</li>
                  ))}
                </ul>
              );
            } else if (item.type === "li") {
              return <li key={idx}>{renderDescription([item])}</li>;
            } else if (item.bold) {
              return <b key={idx}>{item.text}</b>;
            } else {
              return <span key={idx} style={{ display: "inline" }}>{item.text}</span>;
            }
          })}
        </p>
      );
    });
  };
  

  return (
    <div>
      <CarsonNavbarComponent />
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data.maincontent[0].Heading}</h1>
              <p className="paragrambold py-2">{data.maincontent[0].subHeading.split("\n\n")[0]}</p>
              <p className="py-4">
                {data.maincontent[0].subHeading.split("\n\n")[1]}
                <br />
                Reach us today at <a href="tel:+1 775-883-4455" className="phone-link">+1 775-883-4455</a> to learn how we can assist your aging adults!
              </p>
            </Col>
            <Col md="6">
              {renderImage(
                data.maincontent[0].bannerimg.data.attributes,
                "Compassionate Personal Care Services"
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregiverCityComponent />

      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {renderImage(
                data.maincontent[1].img.data.attributes,
                "Uplifting the Hope to Stay Happy with Quality Personal Care"
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data.maincontent[1].Heading}</h2>
              {renderDescription(data.maincontent[1].description)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data.maincontent[2].Heading}</h2>
              {renderDescription(data.maincontent[2].description)}
              <ul className="custom-list" style={{ paddingLeft: "20px" }}>
                {data.maincontent[2].description[2]?.children.map((item, index) => (
                  <li className="custom-list-item" key={index}>{item?.children[0]?.text}</li>
                ))}
              </ul>
            </Col>
            <Col md="6">
              {renderImage(
                data.maincontent[2].img.data.attributes,
                "Who Can Benefit from Our Personal Care Services?"
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {renderImage(
                data.maincontent[3].img.data.attributes,
                "Get Care from Personal Care Experts with Over 50 Years of Experience"
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3].Heading}</h2>
              {renderDescription(data.maincontent[3].description)}
              <ul className="custom-list" style={{ paddingLeft: "20px" }}>
                {data.maincontent[3].description[1]?.children?.map((item, index) => (
                  <li key={index} className="custom-list-item">
                    <b>{item.children[0]?.text}</b> {item.children[1]?.text}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data.maincontent[4].Heading}</h2>
              {renderDescription(data.maincontent[4].description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(
                data.maincontent[4].image.data.attributes,
                "You Are Just a Few Steps Away from Personalized Care"
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>

      <FooterServiceCarsonComponent />
    </div>
  );
}
