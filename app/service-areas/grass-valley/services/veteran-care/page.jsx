"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiversComponentMainCity";
import SanjoseNavbarComponent from "../../../../grassvalleynavcomponent";
import SanJoseserviceFooter from "../../../../footerservicegrssvalley";
import Head from "next/head";
export default function VeteranCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/grass-valley-veteran-cares?populate[maincontent][populate]=*&populate[seo]=*')
      .then(response => response.json())
      .then(responseData => {
        console.log('API Response:', responseData);
  
        // Check if responseData.data is an array or object
        const isDataArray = Array.isArray(responseData.data);
  
        // Extract the correct data based on whether it's an array or object
        const mainData = isDataArray ? responseData.data[0]?.attributes?.maincontent : responseData.data?.attributes?.maincontent;
        const seoData = isDataArray ? responseData.data[0]?.attributes?.seo : responseData.data?.attributes?.seo;
  
        if (mainData) {
          setData(mainData);  // Set main content data
          setSeoData(seoData); // Set SEO data
        } else {
          throw new Error("Invalid data structure received");
        }
  
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);
  
  
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
      console.log("No SEO Data received");
    }
  }, [seoData]);
  
  
  
  if (loading) {
    return // //<div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getImageUrl = (imageData) => {
    return `https://admin.interimhc.com${imageData?.url || ''}`;
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
  
  return (
    <div>
      <SanjoseNavbarComponent/>
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data?.[0]?.Heading || ""}</h1>
              <p className="paragrambold py-2">{data?.[0]?.subHeading?.split("\n\n")[0] || ""}</p>
              <p className="py-2">
                {data?.[0]?.subHeading?.split("\n\n")[1] || ""}
                <br></br>
                Reach us today at <a href="tel:+1 530-272-0300" className="phone-link">+1 530-272-0300</a> to learn how we can assist your aging adults!

              </p>
            </Col>
            <Col md="6">
              {renderImage(data?.[0]?.bannerimg?.data?.attributes, "Veteran Home Care", 3102, 2064)}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregivertodayComponent />
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign ">
            <Col md="3">
              {renderImage(data?.[1]?.img?.data?.attributes, "Veteran Care Service", 1785, 2340)}
            </Col>
            <Col md="9">
              <h2 className="heading2">{data?.[1]?.Heading || ""}</h2>
              {renderDescription(data?.[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      {/* Section 3 */} 
<div className="servicessectionbg">
  <Container>
    <Row className="middlealign g-5 row-reverse-mobile">
      <Col md="6">
        <h2 className="heading2">{data?.[2]?.Heading || ""}</h2>
        {renderDescription(data?.[2]?.description)} {/* Use updated renderDescription */}
      </Col>
      <Col md="6">
        {renderImage(data?.[2]?.img?.data?.attributes, "Respite Care Service", 830, 1000)}
      </Col>
    </Row>
  </Container>
</div>

      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {renderImage(data?.[3].img?.data?.attributes, "Respite Care Service", 1785, 1290)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data?.[3]?.Heading || ""}</h2>
              {renderDescription(data?.[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data?.[4]?.Heading || ""}</h2>
              {renderDescription(data?.[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(data?.[4]?.image?.data?.attributes, "Respite Care Contact", 2408, 1784)}
            </Col>
          </Row>
        </Container>
      </div>
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>
      <SanJoseserviceFooter  />
    </div>
  );
}
