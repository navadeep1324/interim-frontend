"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import YubaFooter from "../../../../footeryuba";
import MedfordNavComponent from "../../../../medfordnavcomponent";
import MedfordfooterserviceComponent from "../../../../footerservicemedford";
import Head from "next/head";

export default function AlzheimerMainComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the data from the correct endpoint
        const res = await fetch(
          "https://admin.interimhc.com/api/medford-alzheimer-s-and-dementia-cares?populate[maincontent][populate]=*&populate[seo]=*"
        );
        const result = await res.json();

        setData(result.data[0].attributes.maincontent);
        setSeoData(result.data[0]?.attributes?.seo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Dynamically set the meta title and description once the seoData is fetched
  useEffect(() => {
    if (seoData && Array.isArray(seoData) && seoData.length > 0) {
      const seo = seoData[0]; // Access the first element of the seoData array
      console.log("SEO Data received:", seo); // Log seoData for debugging
      document.title = seo.metaTitle || "Default Title";
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seo.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seo.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    } else {
      console.log("No SEO Data received"); // Log if seoData is not available
    }
  }, [seoData]);
  // If data is not yet available, show a loading state
  if (!data) {
    return // <div>Loading...</div>;
  }

  // Helper function to build the image URL from Strapi
  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : "";
  };

  return (
    <div>
      <MedfordNavComponent />

      {/* Section 1: Banner */}
      <div className="sectionbg">
        <Container>
          <Row className="align-items-center g-5 py-5">
            <Col md="6">
              <h1 className="heading1">{data[0]?.Heading}</h1>
              <p className="paragram py-2">{data[0]?.subHeading?.split("\n")[0]}</p>
              <p className="py-4">{data[0]?.subHeading?.split("\n")[1]}</p>
              
            </Col>
            <Col md="6" className="d-flex justify-content-center">
              {data[0]?.bannerimg?.data && (
                <Image
                  src={getImageUrl(data[0].bannerimg.data.attributes)}
                  alt="Alzheimer’s and Dementia Home care Services"
                  width={1034}
                  height={688}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Caregiver Component */}
      <CaregivertodayComponent />

      {/* Section 2: Choose Interim Healthcare */}
      <div className="section3bg">
        <Container>
          <Row className="align-items-center g-5 row3bg py-4">
            <Col md="4">
              {data[1]?.img?.data && (
                <Image
                  src={getImageUrl(data[1].img.data.attributes)}
                  alt="Choose Interim Healthcare for a Happier Tomorrow"
                  width={562}
                  height={802}
                />
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data[1]?.Heading}</h2>
              {data[1]?.description?.map((para, index) => (
                <p className="py-4" key={index}>
                  {para.bold ? <b>{para.children[0].text}</b> : para.children[0].text}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 3: When is the right time */}
      <div className="sectionbg">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              <h2 className="heading2">{data[2]?.Heading}</h2>
              {data[2]?.description?.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
            </Col>
            <Col md="6">
              {data[2]?.img?.data && (
                <Image
                  src={getImageUrl(data[2].img.data.attributes)}
                  alt="When is the right time"
                  width={626}
                  height={525}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4: Benefits of Memory Care */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {data[3]?.img?.data ? (
                <Image
                  src={getImageUrl(data[3].img.data.attributes)}
                  alt="Benefits of Memory Care Services"
                  width={562}
                  height={802}
                />
              ) : (
                <p>No image available for section 4.</p>
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data[3]?.Heading || "No heading available"}</h2>
              {data[3]?.description?.length ? (
                data[3].description.map((para, index) => (
                  <p className="py-3" key={index}>
                    {para.children[0].text}
                  </p>
                ))
              ) : (
                <p>No description available for section 4.</p>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5: Exceptional Memory Care */}
      <div className="section4">
        <Container>
          <Row className="align-items-center g-5 px-5" style={{ background: "#ffff", borderRadius: "20px", padding: "3%" }}>
            <Col md={6}>
              <h2 className="heading2">{data[4]?.Heading}</h2>
              {data[4]?.description?.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
              <Button className="Contactbtn py-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {data[4]?.image?.data && (
                <Image
                  src={getImageUrl(data[4].image.data.attributes)}
                  alt="Contact Us"
                  width={589}
                  height={422}
                />
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
      <MedfordfooterserviceComponent />
    </div>
  );
}
