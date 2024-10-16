"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiversComponentMainCity";
import ServicepageFooter from "../../../../servicepageFooter";
import ReddingNavbarComponent from "../../../../reddingnavcomponent";
import Head from "next/head";

export default function HourcareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);


  useEffect(() => {
    fetch('https://admin.interimhc.com/api/twenty-four-hour-home-care?populate[maincontent][populate]=*&populate[seo]=*')
      .then(response => response.json())
      .then(data => {
        setData(data.data.attributes);
        setSeoData(data.data?.attributes?.seo);
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
    return <div>Loading...</div>;
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
            <ReddingNavbarComponent />
        <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="5">
              <h1 className="heading1">{data.maincontent[0].Heading}</h1><br></br>
              <p className="py-2">{data.maincontent[0].subHeading}</p><br></br>
              <p>Contact us today at <a href="tel:	+1 530-221-1212" className="phone-link">+1 530-221-1212</a> and let us offer compassionate and personalized care.</p>

            </Col>
            <Col md="7">
              {renderImage(data.maincontent[0].bannerimg.data.attributes, "Pioneers In Personalized 24 Hour Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregivertodayComponent />
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {renderImage(data.maincontent[1].img.data.attributes, "Enriching Lives with Holistic Care", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data.maincontent[1].Heading}</h2>
              {data.maincontent[1].description.map((desc, index) => (
                <p key={index} className="py-3">
                  {desc.bold ? <b>{desc.children[0].text}</b> : desc.children[0].text}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sectionbg" >
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6 ">
              <h2 className="heading2">{data.maincontent[2].Heading}</h2>
              {data.maincontent[2].description.map((desc, index) => (
                <p key={index} className="py-2">{desc.children[0].text}</p>
              ))}
            </Col>
            <Col md="6">
              {renderImage(data.maincontent[2].img.data.attributes, "Access to Top Professionals and Timely Solutions", 635, 735)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section3" >
        <Container>
          <Row className="align-items-center py-5 g-5">
            <Col md="6">
              {renderImage(data.maincontent[3].img.data.attributes, "Access to Top Professionals and Timely Solutions", 635, 735)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3].Heading}</h2>
              {data.maincontent[3].description.map((desc, index) => (
                <p key={index} className="py-2">{desc.children[0].text}</p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4" >
        <Container>
          <Row className="g-5 section4sub">
            <Col md={6}>
              <h2 className="heading2">{data.maincontent[4].Heading}</h2>
              {data.maincontent[4].description.map((desc, index) => (
                <p key={index} className="py-3">{desc.children[0].text}</p>
              ))}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(data.maincontent[4].image.data.attributes, "Contact Us Today", 635, 735)}
            </Col>
          </Row>
        </Container>
      </div>
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>
      <ServicepageFooter />
    </div>
  );
}
