"use client";
import React, { useEffect, useState } from "react";
import ReddingNavbarComponent from "../../../../reddingnavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import ServicepageFooter from "../../../../servicepageFooter";
import Head from "next/head";

export default function AlzheimerMainComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://admin.interimhc.com/api/alzheimer-s-and-dementia?populate[maincontent][populate]=*&populate[seo]=*');
        const result = await res.json();
        
        if (result?.data?.attributes?.maincontent) {
          setData(result.data.attributes.maincontent);
          setSeoData(result.data.attributes.seo);
        } else {
          throw new Error("Main content not found");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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

      // Set additional meta tags like keywords, robots, etc.
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
    }
  }, [seoData]);

  if (loading) {
    return //<div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  // Helper function to get image URL safely
  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : null;
  };

  // Render descriptions with safety checks, including lists and links
  const renderDescription = (descriptions) => {
    return descriptions.map((para, index) => (
      <p key={index} className="py-3">
        {para?.children?.map((item, idx) => {
          if (item.type === "link") {
            const isExternalLink = item.url.startsWith("http");
            return (
              <a
                key={idx}
                href={item.url}
                className="phone-link"
                target={isExternalLink ? "_blank" : "_self"}
                rel={isExternalLink ? "noopener noreferrer" : undefined}
              >
                {item.children[0]?.text}
              </a>
            );
          } else if (item.type === "ul") {
            return (
              <ul key={idx} style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                {item.children.map((listItem, listIdx) => (
                  <li key={listIdx}>{renderDescription([listItem])}</li>
                ))}
              </ul>
            );
          } else if (item.type === "li") {
            return <li key={idx}>{renderDescription([item])}</li>;
          } else if (item.bold) {
            return <b key={idx}>{item.text}</b>;
          } else {
            return <span key={idx}>{item.text}</span>;
          }
        })}
      </p>
    ));
  };

  return (
    <div>
      {/* SEO Meta Tags */}
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
        {seoData?.keywords && <meta name="keywords" content={seoData.keywords} />}
      </Head>

      <ReddingNavbarComponent />

      {/* First Section */}
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data[0]?.Heading || "Default Heading"}</h1>
              <p className="paragrambold py-2">{data[0]?.subHeading?.split('\n')[0]}</p>
              <p className="py-4">{data[0]?.subHeading?.split('\n')[1]}</p>
              <p>Reach us today at <a href="tel:530-221-1212" className="phone-link"> +1 530-221-1212</a> to learn how we can assist your aging adults!</p>
            </Col>
            <Col md="6">
              {data[0]?.bannerimg?.data ? (
                <img
                  src={getImageUrl(data[0]?.bannerimg?.data?.attributes)}
                  alt="Alzheimer’s and Dementia Home care Services"
                  width={data[0].bannerimg.data.attributes.width}
                  height={data[0].bannerimg.data.attributes.height}
                />
              ) : (
                <Image
                  src={Alzheimersimg}
                  alt="Default Alzheimer’s Image"
                  width={500}
                  height={400}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregiverCityComponent />

      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {data[2]?.img?.data ? (
                <img
                  src={getImageUrl(data[2]?.img?.data.attributes)}
                  alt="Choose Interim Healthcare for a Happier Tomorrow"
                  width={data[2].img.data.attributes.width}
                  height={data[2].img.data.attributes.height}
                />
              ) : (
                <Image src={Happier} alt="Happier Image" width={400} height={400} />
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data[2]?.Heading}</h2>
              {data[2]?.description ? renderDescription(data[2].description) : <p>No description available</p>}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data[3]?.Heading}</h2>
              {/* {renderDescription(data[3]?.description || [])} */}
              <p className="py-2">Choosing Memory care services for your loved ones can be challenging, but here are some signs that they may require professional care to manage this condition.
              <ul className="px-3 py-3">
              <li>Safety concerns</li>
<li>Risk of falls</li>
<li>Noticeable weight loss</li>
<li>Forgetfulness</li>
<li>Social isolation</li>
<li>Depression</li>
<li>Persistent sadness</li>
<li>Decline in personal hygiene</li>
<li>Agitation or aggression</li>
<li>Confusion about time or place</li>
              </ul>
              
If you notice any of these signs in your beloved elders, then it might be the right time to choose our in home memory care services. Our caregivers provide the best care possible to prevent worsening of the condition.</p>
            </Col>
            <Col md="6">
              {data[3]?.img?.data ? (
                <img
                  src={getImageUrl(data[3]?.img?.data.attributes)}
                  alt="When is the right time to choose Memory Care"
                  width={data[3].img.data.attributes.width}
                  height={data[3].img.data.attributes.height}
                />
              ) : (
                <Image src={servicesimg} alt="Default Service Image" width={500} height={400} />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {data[4]?.image?.data ? (
                <img
                  src={getImageUrl(data[4]?.image?.data.attributes)}
                  alt="Benefits of Memory Care"
                  width={data[4]?.image?.data?.attributes.width}
                  height={data[4]?.image?.data?.attributes.height}
                />
              ) : (
                <Image src={Services5img} alt="Services Image" width={500} height={400} />
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data[4]?.Heading}</h2>
              {renderDescription(data[4]?.description || [])}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fifth Section */}
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data[5]?.Heading}</h2>
              {renderDescription(data[5]?.description || [])}
              <Button className="Contactbtn py-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {data[5]?.image?.data ? (
                <img
                  src={getImageUrl(data[5]?.image?.data.attributes)}
                  alt="Contact Us"
                  width={data[5]?.image?.data?.attributes.width}
                  height={data[5]?.image?.data?.attributes.height}
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
