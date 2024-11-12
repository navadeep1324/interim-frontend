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

export default function HospiceCareComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/hospice-care?populate[maincontent][populate]=*&populate[seo]=*')
      .then(response => response.json())
      .then(responseData => {
        if (responseData && responseData.data && responseData.data.attributes) {
          setData(responseData.data.attributes);
          if (responseData.data.attributes.seo && Array.isArray(responseData.data.attributes.seo)) {
            setSeoData(responseData.data.attributes.seo[0]);
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
    return null;
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
      // Check if the paragraph contains any text before rendering
      if (desc.type === 'paragraph' && desc?.children?.some(child => child.type === 'text' && child.text.trim() !== "")) {
        return (
          <p key={index} className="py-2">
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
      
      // Check if list contains text before rendering
      if (desc.type === 'list' && desc.format === 'unordered' && desc.children?.length > 0) {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {desc.children?.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item?.children?.map((child, idx) => {
                  if (child.type === 'text' && child.text.trim() !== "") {
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
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data?.maincontent?.[0]?.Heading}</h1>
              <p className="paragram py-2">
                {data?.maincontent?.[0]?.subHeading.split('\n').map((str, index) => (
                  <span key={index}>{str}<br /></span>
                ))}
              </p>
              {/* <Button href={data?.maincontent?.[0]?.btn?.url} className="py-3 my-3">
                {data?.maincontent?.[0]?.btn?.text || "Contact Us"}
              </Button> */}
            </Col>
            <Col md="6">
              {renderImage(data?.maincontent?.[0]?.bannerimg?.data?.attributes, "Hospice Home Care", 1034, 688)}
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
      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="7">
              <h2 className="heading2">{data?.maincontent?.[2]?.Heading}</h2>
              {renderDescription(data?.maincontent?.[2]?.description)}
            </Col>
            <Col md="5">
              {renderImage(data?.maincontent?.[2]?.img?.data?.attributes, "Respite Care Service", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
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
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data?.maincontent?.[4]?.Heading}</h2>
              {renderDescription(data?.maincontent?.[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href={data?.maincontent?.[4]?.btn?.url || "/contact-us"}>
                {data?.maincontent?.[4]?.btn?.text || "Contact Us"}
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(data?.maincontent?.[4]?.image?.data?.attributes, "Hospice Care Contact", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>

      <ServicepageFooter />
    </div>
  );
}
