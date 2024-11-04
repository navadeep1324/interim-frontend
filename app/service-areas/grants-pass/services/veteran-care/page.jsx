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
import GrantpassFooter from "../../../../footergrantspass";
import GrantpassfooterComponent from "../../../../footerservicegreantspass";
import GrantpassNavComponent from "../../../../grantspassnavcomponent";
import Head from "next/head";
export default function VeteranCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://admin.interimhc.com/api/grant-pass-veteran-care?populate[maincontent][populate]=*&populate[seo]=*');
        const result = await response.json();
        
        // Debug: Log the entire API response
        console.log("API Response: ", result);

        // Handle the result structure carefully
        if (result?.data) {
          if (Array.isArray(result.data) && result.data.length > 0) {
            console.log("API Data: ", result.data[0].attributes);
            setData(result.data[0].attributes);  // For collection type
            setSeoData(result.data[0]?.attributes?.seo);
          } else if (result.data.attributes) {
            console.log("API Data: ", result.data.attributes);
            setData(result.data.attributes);  // For single type
          } else {
            console.error('No data found in the response');
            throw new Error('No data available');
          }
        } else {
          console.error('Invalid response format');
          throw new Error('No data available');
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

  // Loading state
  if (loading) {
    return // <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // No data state
  if (!data) {
    return <div>No data available</div>;
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

  // Rendering the description
  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null;
    
    return description.map((desc, index) => {
      // Handle paragraphs
      if (desc.type === 'paragraph') {
        return (
          <p key={index} className="py-2">
            {desc?.children?.map((child, idx) => {
              if (child.type === 'text') {
                return child.text;
              }
              if (child.type === 'link') {
                return (
                  <a key={idx} href={child.url} className="phone-link">
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
                {item?.children?.[0]?.text || ""}
              </li>
            ))}
          </ul>
        );
      }
  
      // Handle headings (Assuming heading level comes from 'level' property in your JSON)
      if (desc.type === 'heading') {
        const HeadingTag = `h${desc.level}`; // Dynamically select heading tag (h2, h3, etc.)
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
      <GrantpassNavComponent />
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data.maincontent[0]?.Heading || "No heading available"}</h1>
              <p className="paragrambold py-2">
                {data?.maincontent?.[0]?.subHeading?.split("\n")[0] || ""}
              </p>
              <p className="py-4">
                {data?.maincontent?.[0]?.subHeading?.split("\n")[1] || ""}
                <br />
                Reach us today at <a href="tel:+1 541-787-3140" className="phone-link">+1 541-787-3140</a> to learn how we can assist your aging adults!

              </p>
            </Col>
            <Col md="6">
              {renderImage(data.maincontent[0]?.bannerimg?.data?.attributes, "Veteran Home Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregivertodayComponent />
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {renderImage(data.maincontent[1]?.img?.data?.attributes, "Veteran Care Service", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data.maincontent[1]?.Heading || "No heading available"}</h2>
              {renderDescription(data.maincontent[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data.maincontent[2]?.Heading || "No heading available"}</h2>
              {renderDescription(data.maincontent[2]?.description)}
            </Col>
            <Col md="6">
              {renderImage(data.maincontent[2]?.img?.data?.attributes, "Respite Care Service", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section3">
        <Container>
          <Row>
            <Col md="6" className="align-items-center g-5">
              {renderImage(data.maincontent[3]?.img?.data?.attributes, "Respite Care Service", 595, 780)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3]?.Heading || "No heading available"}</h2>
              {renderDescription(data.maincontent[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4" >
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data.maincontent[4]?.Heading || "No heading available"}</h2>
              {renderDescription(data.maincontent[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6}className="section4sub-sanjose-col2">
              {renderImage(data.maincontent[4]?.image?.data?.attributes, "Respite Care Contact", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>
      <GrantpassfooterComponent />
    </div>
  );
}
