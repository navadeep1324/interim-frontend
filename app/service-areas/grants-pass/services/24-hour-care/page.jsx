"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import GrantpassfooterComponent from "../../../../footerservicegreantspass";
import GrantpassNavComponent from "../../../../grantspassnavcomponent";
import Head from "next/head";

export default function HourcareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null)

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/grant-pass-24-hour-home-cares?populate[maincontent][populate]=*&populate[seo]=*')
      .then(response => response.json())
      .then(responseData => {
        if (responseData && responseData.data && responseData.data[0]) {
          setData(responseData.data[0].attributes);
          setSeoData(responseData.data[0]?.attributes?.seo);
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
      console.log("No SEO Data received"); // Log if seoData is not available
    }
  }, [seoData]);
  if (loading) {
    return // <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.maincontent) {
    return <div>No data available</div>;
  }

  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : null;
  };

  const renderImage = (imageData, alt, width, height) => {
    const imageUrl = getImageUrl(imageData);
    return imageUrl ? (
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        onError={(e) => console.error('Error loading image:', e)}
      />
    ) : null;
  };

  // Render paragraphs and unordered lists
  const renderDescription = (description) => {
    return description?.map((para, index) => {
      if (para.type === 'list') {
        return (
          <ul key={index} style={{ paddingLeft: '20px' }}>
            {para.children.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '10px' }}>
                {item.children?.[0]?.text || ''}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index}>
          {para.children?.[0]?.text || ''}
        </p>
      );
    });
  };

  return (
    <div>
      <GrantpassNavComponent />

      {/* First Section */}
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data.maincontent[0]?.Heading || 'Heading not available'}</h1>
              <p className="py-2">{data.maincontent[0]?.subHeading || 'Subheading not available'}</p>
              <p>Contact us today at <a href="tel:+1 775-883-4455" className="phone-link">+1 775-883-4455</a> and let us offer compassionate and personalized care.</p>

            </Col>
            <Col md="7">
              {renderImage(data.maincontent[0]?.bannerimg?.data?.attributes, "Pioneers In Personalized 24 Hour Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4 px-5 g-5">
            <Col md="4">
              {renderImage(data.maincontent[1]?.img?.data?.attributes, "Enriching Lives with Holistic Care", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data.maincontent[1]?.Heading || 'Heading not available'}</h2><br></br>
              {renderDescription(data.maincontent[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="sectionbg">
        <Container>
          <Row className="d-flex align-items-center g-5">
            <Col md="6">
              <h2 className="heading2">{data.maincontent[2]?.Heading || 'Heading not available'}</h2><br></br>
              {renderDescription(data.maincontent[2]?.description)}
            </Col>
            <Col md="6">
              {renderImage(data.maincontent[2]?.img?.data?.attributes, "Access to Top Professionals and Timely Solutions", 635, 735)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3 px-5 py-5">
        <Container>
          <Row className="d-flex align-items-center g-5">
            <Col md="6">
              {renderImage(data.maincontent[3]?.img?.data?.attributes, "Access to Top Professionals and Timely Solutions", 635, 735)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3]?.Heading || 'Heading not available'}</h2><br></br>
              {renderDescription(data.maincontent[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fifth Section */}
      <div className="section4">
        <Container>
          <Row className="py-5 px-5 d-flex align-items-center" style={{ background: '#ffff', borderRadius: '20px' }}>
            <Col md={6} className="px-5">
              <h2 className="heading2">{data.maincontent[4]?.Heading || 'Heading not available'}</h2>
              {renderDescription(data.maincontent[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(data.maincontent[4]?.image?.data?.attributes, "Contact Us Today", 635, 735)}
            </Col>
          </Row>
        </Container>
      </div>
      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
      <GrantpassfooterComponent />
    </div>
  );
}
