"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import FooterServiceCarsonComponent from "../../../../footerservicemedford";
import CarsonNavbarComponent from "../../../../medfordnavcomponent";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import Head from "next/head";

export default function RespiteCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://admin.interimhc.com/api/medford-respite-cares?populate[maincontent][populate]=*&populate[seo]=*"
        );
        const result = await response.json();

        if (result.data) {
          if (Array.isArray(result.data)) {
            setData(result.data[0].attributes); // Collection type, pick the first entry
            setSeoData(result.data[0]?.attributes?.seo);
          } else {
            setData(result.data.attributes); // Single type
          }
        } else {
          throw new Error("Invalid data structure from API");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
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
    return null; // //<div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : '';
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
      if (desc.type === 'paragraph') {
        return (
          <p key={index} className="py-3">
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

  const renderList = (listItems) => {
    if (listItems && listItems.length > 0) {
      return (
        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
          {listItems.map((item, index) => (
            <li key={index}>
              {item.children && item.children.map((child, i) => (
                <span key={i}>{child.text}</span>
              ))}
            </li>
          ))}
        </ul>
      );
    }
    return null;
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
              <p className="paragrambold py-2">{data?.maincontent?.[0]?.subHeading?.split("\n")[0] || ""}</p>
              <p className="py-2">
                {data?.maincontent?.[0]?.subHeading?.split("\n")[1] || ""}</p>
                <p>
                Reach us today at <a href="+1 541-779-0054" className="phone-link">+1 541-779-0054</a> to learn how we can assist your aging adults!
              </p>
            </Col>
            <Col md="6">
              {renderImage(
                data?.maincontent?.[0]?.bannerimg?.data?.attributes,
                "Compassionate Respite Care",
                3102,
                2064
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregiverCityComponent />

      {/* Section 2 */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {renderImage(
                data?.maincontent?.[1]?.img?.data?.attributes,
                "Extending your Caregiving Warmth Even During Your Absence",
                1785,
                2340
              )}
            </Col>
            <Col md="8">
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
            <Col md="6">
              <h2 className="heading2">{data?.maincontent?.[2]?.Heading || ""}</h2>
              {renderDescription(data?.maincontent?.[2]?.description)}
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-2">
                {data?.maincontent?.[2]?.description?.[1]?.children?.map((item, index) => (
                  <li key={index}>{item?.children?.[0]?.text || ""}</li>
                ))}
              </ul>
            </Col>
            <Col md="6">
              {renderImage(
                data?.maincontent?.[2]?.img?.data?.attributes,
                "Our Commitments as Your Respite Caregiver",
                1878,
                1575
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="5">
            {renderImage(
   data?.maincontent?.[3]?.img?.data?.attributes,
   "Interim: Providing Help, When You Need It!"
)}
            </Col>
            <Col md="7">
              <h2 className="heading2">{data?.maincontent?.[3]?.Heading || ""}</h2>
              {renderDescription(data?.maincontent?.[3]?.description)}
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-2">
                {data?.maincontent?.[3]?.description?.[1]?.children?.map((item, index) => (
                  item?.children?.[0]?.text ? (
                    <li key={index}>{item?.children?.[0]?.text}</li>
                  ) : null
                ))}
              </ul>
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
              {renderImage(
                data?.maincontent?.[4]?.image?.data?.attributes,
                "Interim: Providing Help, When You Need It!",
                2408,
                1784
              )}
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
