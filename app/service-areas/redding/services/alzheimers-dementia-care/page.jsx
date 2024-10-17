"use client";
import React, { useEffect, useState } from "react";
import ReddingNavbarComponent from "../../../../reddingnavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import styles from "../../../../page.module.css";
import Image from "next/image";
import Alzheimersimg from "/public/images/Alzheimersimg.png";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import Happier from "/public/images/Happier.png";
import servicesimg from "/public/images/servicesimg.png";
import Services5img from "/public/images/Services5img.png";
import ServicepageFooter from "../../../../servicepageFooter";
import Head from "next/head";

export default function AlzheimerMainComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://admin.interimhc.com/api/alzheimer-s-and-dementia?populate[maincontent][populate]=*&populate[seo]=*');
        const result = await res.json();
        
        // Fetch main content and SEO data from the response
        setData(result.data.attributes.maincontent);
        setSeoData(result.data.attributes.seo);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // Dynamically set the meta title and description once the seoData is fetched
  useEffect(() => {
    if (seoData) {
      document.title = seoData.metaTitle || "Default Title";
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seoData.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seoData.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }

      // Set additional meta tags like keywords, robots, etc. if available
      if (seoData.keywords) {
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute("content", seoData.keywords);
        } else {
          const newMetaKeywords = document.createElement("meta");
          newMetaKeywords.name = "keywords";
          newMetaKeywords.content = seoData.keywords;
          document.head.appendChild(newMetaKeywords);
        }
      }
      
      if (seoData.metaRobots) {
        const metaRobots = document.querySelector('meta[name="robots"]');
        if (metaRobots) {
          metaRobots.setAttribute("content", seoData.metaRobots);
        } else {
          const newMetaRobots = document.createElement("meta");
          newMetaRobots.name = "robots";
          newMetaRobots.content = seoData.metaRobots;
          document.head.appendChild(newMetaRobots);
        }
      }
    }
  }, [seoData]);

  if (!data) {
    return // <div>Loading...</div>;
  }

  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : null;
  };

  return (
    <div>
      {/* SEO Meta Tags */}
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
        {seoData?.keywords && <meta name="keywords" content={seoData.keywords} />}
        {seoData?.metaRobots && <meta name="robots" content={seoData.metaRobots} />}
      </Head>

      <ReddingNavbarComponent />

      {/* First Section */}
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data[0].Heading}</h1>
              <p className="paragram py-2">{data[0].subHeading.split('\n')[0]}</p>
              <p className="py-4">{data[0].subHeading.split('\n')[1]}</p>
            </Col>
            <Col md="6">
              <Image
                src={Alzheimersimg}
                alt="Alzheimer’s and Dementia Home care Services"
                width={626}
                height={525}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <CaregiverCityComponent />
      
      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign ">
            <Col md="4">
              <Image src={Happier} alt="Happier" width={400} height={400} />
            </Col>
            <Col md="8">
              <h2 className="heading2">{data[2].Heading}</h2>
              {data[2].description.map((para, index) => (
                <p className="py-4" key={index}>
                  {para.bold ? <b>{para.children[0].text}</b> : para.children[0].text}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="sectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data[3].Heading}</h2>
              {data[3].description.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
            </Col>
            <Col md="6">
              <Image src={servicesimg} width={500} height={400} alt="Services Image" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              <Image src={Services5img} alt="Services Image" width={500} height={400} />
            </Col>
            <Col md="6">
              <h2 className="heading2">{data[4].Heading}</h2>
              {data[4].description.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fifth Section */}
      <div className="section4">
        <Container>
          <Row className="g-5 section4sub">
            <Col md={6}>
              <h2 className="heading2">{data[5].Heading}</h2>
              {data[5].description.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
              <Button className="Contactbtn py-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {data[5]?.image?.data ? (
                <Image
                  src={getImageUrl(data[5].image.data.attributes)}
                  alt="Contact Us"
                  width={data[5].image.data.attributes.width}
                  height={data[5].image.data.attributes.height}
                />
              ) : (
                <Image src={Services5img} alt="Contact Us Image" width={500} height={400} />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <ServicepageFooter />
    </div>
  );
}
