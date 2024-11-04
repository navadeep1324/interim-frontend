"use client";
import React, { useEffect, useState } from "react";
import GrantspassNavbarComponent from "../../../../grantspassnavcomponent"; // You can replace with the appropriate navbar
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity"; // Common caregiver component
import GrantsPassFooter from "../../../../footerservicegreantspass"; // Replace with appropriate footer component if needed
import Head from "next/head";

export default function AlzheimerMainComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://admin.interimhc.com/api/grant-pass-alzheimer-s-and-dementia-cares?populate[maincontent][populate]=*&populate[seo]=*"
        );
        const result = await res.json();
        if (result?.data[0]?.attributes?.maincontent) {
          setData(result.data[0].attributes.maincontent);
          setSeoData(result.data[0]?.attributes?.seo);
        } else {
          throw new Error("Main content not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Dynamically set the meta title and description once the seoData is fetched
  useEffect(() => {
    if (seoData && Array.isArray(seoData) && seoData.length > 0) {
      const seo = seoData[0]; // Access the first element of the seoData array
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
    return <div>Loading...</div>; // Can be customized with a spinner if needed
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  // Helper function to get image URL safely
  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : "";
  };

  // Render descriptions with safety checks (handling bold text, links, lists)
  const renderDescription = (descriptions) => {
    return descriptions.map((para, index) => (
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
            return <span key={idx}>{item.text}</span>;
          }
        })}
      </p>
    ));
  };
 
  return (
    <div>
      {/* Use the appropriate Navbar */}
      <GrantspassNavbarComponent />

      {/* First Section */}
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data[0]?.Heading || "Default Heading"}</h1>
              <p className="paragrambold py-2">{data[0]?.subHeading?.split("\n")[0]}</p>
              <p className="py-4">{data[0]?.subHeading?.split("\n")[1]}</p>
              <p>
                Reach us today at{" "}
                <a href="tel:408-286-6888" className="phone-link">
                  +1 408-286-6888
                </a>{" "}
                to learn how we can assist your aging adults!
              </p>
            </Col>
            <Col md="6">
              {data[0]?.bannerimg?.data ? (
                <img
                  src={getImageUrl(data[0]?.bannerimg?.data?.attributes)}
                  alt="Alzheimer’s and Dementia Home care Services"
                  width={3102}
                  height={2064}
                />
              ) : (
                <Image src="/fallback_image_path" alt="Default Alzheimer’s Image" width={500} height={400} />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Common Caregiver City Component */}
      <CaregiverCityComponent />

      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {data[1]?.img?.data ? (
                <img
                  src={getImageUrl(data[1]?.img?.data.attributes)}
                  alt="Choose Interim Healthcare"
                  width={data[1].img.data.attributes.width}
                  height={data[1].img.data.attributes.height}
                />
              ) : (
                <Image src="/fallback_image_path" alt="Happier Image" width={400} height={400} />
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data[1]?.Heading}</h2>
              {data[1]?.description ? renderDescription(data[1].description) : <p>No description available</p>}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data[2]?.Heading}</h2>
              <p className="py-2">
                Choosing Memory care services for your loved ones can be challenging, but here are some signs that they may require professional care:
                <ul className="px-3 py-3">
                  <li>Safety concerns</li>
                  <li>Risk of falls</li>
                  <li>Noticeable weight loss</li>
                  <li>Forgetfulness</li>
                  <li>Social isolation</li>
                  <li>Depression</li>
                  <li>Decline in personal hygiene</li>
                  <li>Agitation or aggression</li>
                  <li>Confusion about time or place</li>
                </ul>
                If you notice any of these signs, it might be time to choose our in-home memory care services.
              </p>
            </Col>
            <Col md="6">
              {data[2]?.img?.data ? (
                <img
                  src={getImageUrl(data[2]?.img.data.attributes)}
                  alt="When is the right time"
                  width={626}
                  height={525}
                />
              ) : (
                <Image src="/fallback_image_path" alt="Default Service Image" width={500} height={400} />
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
              {data[3]?.image?.data ? (
                <img
                  src={getImageUrl(data[3]?.image?.data.attributes)}
                  alt="Benefits of Memory Care"
                  width={data[3].image.data.attributes.width}
                  height={data[3].image.data.attributes.height}
                />
              ) : (
                <Image src="/fallback_image_path" alt="Services Image" width={500} height={400} />
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data[3]?.Heading}</h2>
              {data[3]?.description ? renderDescription(data[3].description) : <p>No description available</p>}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fifth Section */}
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data[4]?.Heading}</h2>
              {data[4]?.description ? renderDescription(data[4].description) : <p>No description available</p>}
              <Button className="Contactbtn py-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {data[4]?.image?.data ? (
                <img
                  src={getImageUrl(data[4].image.data.attributes)}
                  alt="Contact Us"
                  width={589}
                  height={422}
                />
              ) : (
                <Image src="/fallback_image_path" alt="Contact Us Image" width={500} height={400} />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>

      {/* Footer Component */}
      <GrantsPassFooter />
    </div>
  );
}
