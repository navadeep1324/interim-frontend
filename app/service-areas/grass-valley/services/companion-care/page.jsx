"use client";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiversComponentMainCity";
import SanjoseNavbarComponent from "../../../../grassvalleynavcomponent";
import SanJoseFooter from "../../../../footerservicegrssvalley";
import Head from "next/head";

export default function CompanionCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    fetch(
      "https://admin.interimhc.com/api/grass-valley-companion-cares?populate[maincontent][populate]=*&populate[seo]=*'"
    )
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
        setLoading(false);
      });
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

  const getImageUrl = (imageData) => {
    return imageData?.url ? `https://admin.interimhc.com${imageData.url}` : "";
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
    if (!description || !Array.isArray(description)) return null;
  
    return description.map((desc, index) => {
      // Handle paragraphs
      if (desc.type === 'paragraph') {
        const hasValidContent = desc?.children?.some((child) => {
          if (child.type === 'text' && child.text.trim() !== '') return true;
          if (child.type === 'link' && child.url) return true;
          return false;
        });
  
        if (!hasValidContent) return null;
  
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
                const isExternalLink = child.url.startsWith('http');
                return (
                  <a
                    key={idx}
                    href={child.url}
                    className="phone-link"
                    target={isExternalLink ? "_blank" : "_self"}
                    rel={isExternalLink ? "noopener noreferrer" : ""}
                    style={{ fontWeight: child.bold ? 'bold' : 'normal' }}
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
  
      // Handle unordered lists (bullet points)
      if (desc.type === 'list' && desc.format === 'unordered') {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {desc.children?.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item?.children?.map((child, idx) => {
                  if (child.type === 'text') {
                    return (
                      <span key={idx} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                        {child.text}
                      </span>
                    );
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
                        style={{ fontWeight: child.bold ? 'bold' : 'normal' }}
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
  
      // Handle headings (Assuming heading level comes from 'level' property in your JSON)
      if (desc.type === 'heading') {
        const HeadingTag = `h${desc.level}`;
        return (
          <HeadingTag key={index} className="section4-heading">
            {desc?.children?.map((child, idx) => (
              <span key={idx} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                {child.text || ""}
              </span>
            ))}
          </HeadingTag>
        );
      }
  
      return null;
    });
  };
  

  if (loading) {
    return //// //<div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <SanjoseNavbarComponent />
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
              
              <p>Reach us today at <a href="tel:+1 530-272-0300" className="phone-link">+1 530-272-0300</a> to learn how we can assist your aging adults!</p>

            </Col>
            <Col md="6">
              {renderImage(
                data.maincontent[0]?.bannerimg?.data?.attributes,
                "Companion care Services",
                3102,
                2064
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {renderImage(
                data.maincontent[1]?.img?.data?.attributes,
                "Exceptional Elderly companion care",
                1785,
                2340
              )}
            </Col>
            <Col md="8">
            <h2 className="heading2">{data.maincontent[1]?.Heading}</h2>
              {data.maincontent[1]?.description?.map((desc, index) => (
                <p key={index} className="py-3">{desc?.children[0]?.text}</p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data.maincontent[2]?.Heading}</h2>
              {renderDescription(data.maincontent[2]?.description)}
            </Col>
            <Col md="6">
              {renderImage(
                data.maincontent[2]?.img?.data?.attributes,
                "Who can benefit from companion home care",
                1760,
                1052
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
                data.maincontent[3]?.img?.data?.attributes,
                "Experience Our Superior companion home care services",
                1785,
                1290
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3]?.Heading}</h2>
              {renderDescription(data.maincontent[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data.maincontent[4]?.Heading}</h2>
              {renderDescription(data.maincontent[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(
                data.maincontent[4]?.image?.data?.attributes,
                "Caring for Seniors is an Honor for us",
                2408,
                1784
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta
          name="description"
          content={seoData?.[0]?.metaDescription || "Default Description"}
        />
      </Head>
      <SanJoseFooter />
    </div>
  );
}
