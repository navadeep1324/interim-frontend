"use client";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiversComponentMainCity";
import FooterServiceCarsonComponent from "../../../../footerservicescarson";
import CarsonNavbarComponent from "../../../../carsonnavcomponent";
import Head from "next/head";

export default function VeteranCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://admin.interimhc.com/api/carson-veteran-cares?populate[maincontent][populate]=*&populate[seo]=*'
        );
        const result = await response.json();
        
        // Check the API structure and set the appropriate data
        if (result?.data) {
          if (Array.isArray(result.data) && result.data.length > 0) {
            setData(result.data[0].attributes);  // Collection type
            setSeoData(result.data[0]?.attributes?.seo);
          } else if (result.data.attributes) {
            setData(result.data.attributes);  // Single type
            setSeoData(result.data?.attributes?.seo);
          } else {
            throw new Error('No data available');
          }
        } else {
          throw new Error('Invalid data structure from API');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
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
    }
  }, [seoData]);

  if (loading) {
    return null; // You can return a loading spinner here if required
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Utility function to construct image URLs
  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : null;
  };

  // Rendering the image
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

  // Rendering the description with paragraphs, headings, and lists
  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null;
  
    return description.map((desc, index) => {
      if (desc.type === "paragraph") {
        return (
          <p key={index} className="py-2">
            {desc?.children?.map((child, idx) => {
              if (child.type === 'text') {
                return (
                  <span key={idx} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                    {child.text}
                  </span>
                );
              }
              if (child.type === 'link') {
                return (
                  <a key={idx} href={child.url} className="phone-link" style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                    {child.children?.[0]?.text || 'Link'}
                  </a>
                );
              }
              return null;
            })}
          </p>
        );
      } else if (desc.type === "list") {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
            {desc.children?.map((item, idx) => (
              <li key={idx}>
                {item.children?.map((child, childIdx) => {
                  if (child.type === 'text') {
                    return (
                      <span key={childIdx} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                        {child.text}
                      </span>
                    );
                  }
                  if (child.type === 'link') {
                    return (
                      <a key={childIdx} href={child.url} className="phone-link" style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
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
      return null;
    });
  };
  
  return (
    <div>
      <CarsonNavbarComponent />
      
      {/* Section 1: Banner */}
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data?.maincontent?.[0]?.Heading || ""}</h1>
              <p className="paragrambold py-2">
                {data?.maincontent?.[0]?.subHeading?.split("\n")[0] || ""}
              </p>
              <p className="py-2">
                {data?.maincontent?.[0]?.subHeading?.split("\n")[1] || ""}</p>
           
               <p> Reach us today at <a href="+1 541-779-0054" className="phone-link">+1 541-779-0054</a> to learn how we can assist your aging adults!
              </p>
            </Col>
            <Col md="6">
              {renderImage(data?.maincontent?.[0]?.bannerimg?.data?.attributes, "Veteran Home Care", 3102, 2064)}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      {/* Section 2 */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="3">
              {renderImage(data?.maincontent?.[1]?.img?.data?.attributes, "Veteran Care Service", 1785, 2340)}
            </Col>
            <Col md="9">
              <h2 className="heading2">{data?.maincontent?.[1]?.Heading || ""}</h2>
              {renderDescription(data?.maincontent?.[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 3 */}
      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="7">
              <h2 className="heading2">{data?.maincontent?.[2]?.Heading || ""}</h2>
              {renderDescription(data?.maincontent?.[2]?.description)}
            </Col>
            <Col md="5">
              {renderImage(data?.maincontent?.[2]?.img?.data?.attributes, "Respite Care Service", 830, 1000)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {renderImage(data?.maincontent?.[3]?.img?.data?.attributes, "Respite Care Service", 1785, 1290)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data?.maincontent?.[3]?.Heading || ""}</h2>
              {renderDescription(data?.maincontent?.[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 */}
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data?.maincontent?.[4]?.Heading || ""}</h2>
              {renderDescription(data?.maincontent?.[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(data?.maincontent?.[4]?.image?.data?.attributes, "Respite Care Contact", 2408, 1784)}
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
