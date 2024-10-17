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
import Head from "next/head";

export default function HospiceCareComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/hospice-care?populate[maincontent][populate]=*&populate[seo]=*')
      .then(response => response.json())
      .then(responseData => {
        console.log("Full API Response: ", responseData); // Log full API response for debugging

        if (responseData && responseData.data && responseData.data.attributes) {
          // Main content data
          setData(responseData.data.attributes);
          console.log("Main content:", responseData.data.attributes);

          // Handle SEO data (check if it's an array or direct object)
          if (responseData.data.attributes.seo && Array.isArray(responseData.data.attributes.seo)) {
            setSeoData(responseData.data.attributes.seo[0]); // Access the first element
            console.log("SEO Data:", responseData.data.attributes.seo);
          } else {
            console.warn("No SEO data found");
          }
        } else {
          console.error("No valid data returned from API");
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
    return // <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getImageUrl = (imageData) => {
    return `https://admin.interimhc.com${imageData?.url || ""}`;
  };

  const renderImage = (imageData, alt, width, height) => {
    if (!imageData) return null;
    const imageUrl = getImageUrl(imageData);
    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        onError={(e) => console.error('Error loading image:', e)}
      />
    );
  };

  const renderDescription = (description) => {
    return description?.map((desc, index) => {
      if (desc.type === "paragraph") {
        return <p key={index} className="py-3">{desc.children[0]?.text}</p>;
      } else if (desc.type === "list") {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
            {desc.children.map((item, idx) => (
              <li key={idx}>{item.children[0]?.text}</li>
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
        <title>{seoData?.metaTitle || "Hospice Care Services"}</title>
        <meta name="description" content={seoData?.metaDescription || "Providing compassionate hospice care services for your loved ones."} />
        {seoData?.keywords && <meta name="keywords" content={seoData.keywords} />}
        {seoData?.metaRobots && <meta name="robots" content={seoData.metaRobots} />}
        {seoData?.canonicalURL && <link rel="canonical" href={seoData.canonicalURL} />}
      </Head>

      <ReddingNavbarComponent />

      {/* Main Content */}
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data?.maincontent?.[0]?.Heading}</h1>
              <p className="paragram py-2">
                {data?.maincontent?.[0]?.subHeading.split('\n').map((str, index) => (
                  <span key={index}>{str}<br /></span>
                ))}
              </p>
            </Col>
            <Col md="7">
              {renderImage(data?.maincontent?.[0]?.bannerimg?.data?.attributes, "Hospice Home Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
            <Col md="4">
              {renderImage(data?.maincontent?.[1]?.img?.data?.attributes, "Hospice Care Service", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data?.maincontent?.[1]?.Heading}</h2>
              {renderDescription(data?.maincontent?.[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="sectionbg" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">{data?.maincontent?.[2]?.Heading}</h2>
              {renderDescription(data?.maincontent?.[2]?.description)}
            </Col>
            <Col md="6">
              {renderImage(data?.maincontent?.[2]?.img?.data?.attributes, "Respite Care Service", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              {renderImage(data?.maincontent?.[3]?.image?.data?.attributes, "Respite Care Service", 595, 780)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data?.maincontent?.[3]?.Heading}</h2>
              {renderDescription(data?.maincontent?.[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Final Section with Contact */}
      <div className="section4" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: '#ffff', borderRadius: '20px' }}>
            <Col md={6}>
              <h2 className="heading2">{data?.maincontent?.[4]?.Heading}</h2>
              {renderDescription(data?.maincontent?.[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 530-221-1212">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(data?.maincontent?.[4]?.image?.data?.attributes, "Hospice Care Contact", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>

      <ServicepageFooter />
    </div>
  );
}
