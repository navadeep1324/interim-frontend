"use client";
import React, { useEffect, useState } from "react";
import YubaNavbarComponent from "../../../../yubanavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import YubaFooter from "../../../../footeryuba";
import YubaserviceFooter from "../../../../footerserviceyuba";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import Head from "next/head";
export default function VeteranCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/yuba-veteran-cares?populate[maincontent][populate]=*&populate[seo]=*')
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data[0] && data.data[0].attributes) {
          setData(data.data[0].attributes.maincontent);
          setSeoData(data.data[0]?.attributes?.seo);
        } else {
          throw new Error("No maincontent found in API response");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
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
  if (loading) {
    return // //<div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getImageUrl = (imageData) => {
    return `https://admin.interimhc.com${imageData.url}`;
  };

  const renderImage = (imageData, alt, width, height) => {
    if (imageData) {
      return (
        <Image
          src={getImageUrl(imageData)}
          alt={alt}
          width={width}
          height={height}
          onError={(e) => console.error('Error loading image:', e)}
        />
      );
    }
    return null;
  };

  const renderDescription = (description) => {
    return description.map((desc, index) => {
      if (desc.type === "paragraph") {
        return <p key={index} className="py-3">{desc.children[0]?.text}</p>;
      } else if (desc.type === "list") {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
            {desc.children.map((item, index) => (
              <li key={index}>{item.children[0]?.text}</li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <YubaNavbarComponent/>
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data[0].Heading}</h1>
              <p className="paragram py-2">{data[0].subHeading.split('\n').map((str, index) => <span key={index}>{str}<br /></span>)}</p>
            </Col>
            <Col md="7">
              {renderImage(data[0].bannerimg.data.attributes, "Veteran Home Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregiverCityComponent />
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
            <Col md="4">
              {renderImage(data[1].img.data.attributes, "Veteran Care Service", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data[1].Heading}</h2>
              {renderDescription(data[1].description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sectionbg" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">{data[2].Heading}</h2>
              {renderDescription(data[2].description)}
            </Col>
            <Col md="6">
              {renderImage(data[2].img.data.attributes, "Respite Care Service", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section3" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              {renderImage(data[3].img.data.attributes, "Respite Care Service", 595, 780)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data[3].Heading}</h2>
              {renderDescription(data[3].description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: '#ffff', borderRadius: '20px' }}>
            <Col md={6}>
              <h2 className="heading2">{data[4].Heading}</h2>
              {renderDescription(data[4].description)}
              <Button className="Contactbtn py-3 my-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(data[4].image.data.attributes, "Respite Care Contact", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>
      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
      <YubaserviceFooter/>
    </div>
  );
}
