"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiversComponentMainCity";
import MedfordNavComponent from "../../../../medfordnavcomponent";
import MedfordfooterserviceComponent from "../../../../footerservicemedford";
import Head from "next/head";

const renderDescription = (description) => {
  return description?.map((desc, index) => {
    if (desc.type === "paragraph" && desc?.children?.some((child) => child.type === "text" && child.text.trim() !== "")) {
      return (
        <p key={index} className="py-3">
          {desc?.children?.map((child, idx) => {
            if (child.type === "text") {
              return child.text;
            }
            if (child.type === "link") {
              const isExternalLink = child.url.startsWith("http");
              return (
                <a
                  key={idx}
                  href={child.url}
                  className="phone-link"
                  target={isExternalLink ? "_blank" : "_self"}
                  rel={isExternalLink ? "noopener noreferrer" : ""}
                >
                  {child.children?.[0]?.text || "Link"}
                </a>
              );
            }
            return null;
          })}
        </p>
      );
    }
    if (desc.type === "list" && desc.format === "unordered" && desc.children?.length > 0) {
      return (
        <ul key={index} style={{ listStyleType: "disc", paddingLeft: "20px" }}>
          {desc.children?.map((item, itemIndex) => (
            <li key={itemIndex}>
              {item?.children?.map((child, idx) => {
                if (child.type === "text" && child.text.trim() !== "") {
                  return child.text;
                }
                if (child.type === "link") {
                  const isExternalLink = child.url.startsWith("http");
                  return (
                    <a
                      key={idx}
                      href={child.url}
                      className="phone-link"
                      target={isExternalLink ? "_blank" : "_self"}
                      rel={isExternalLink ? "noopener noreferrer" : ""}
                    >
                      {child.children?.[0]?.text || "Link"}
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
    if (desc.type === "heading") {
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

export default function AlzheimerMainComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://admin.interimhc.com/api/medford-alzheimer-s-and-dementia-cares?populate[maincontent][populate]=*&populate[seo]=*"
        );
        const result = await res.json();
        setData(result.data[0].attributes.maincontent);
        setSeoData(result.data[0]?.attributes?.seo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

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

  if (!data) {
    return <div>Loading...</div>;
  }

  const getImageUrl = (imageData) => imageData ? `https://admin.interimhc.com${imageData.url}` : "";

  return (
    <div>
      <MedfordNavComponent />
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data[0]?.Heading}</h1>
              <p className="paragrambold py-2">{data[0]?.subHeading?.split("\n")[0]}</p>
              <p className="py-3">{data[0]?.subHeading?.split("\n")[1]}</p>
              <p>Contact us today at <a href="tel:+1 541-779-0054" className="phone-link">+1 541-779-0054</a> and let us offer compassionate and personalized care.</p>
            </Col>
            <Col md="6" className="d-flex justify-content-center">
              {data[0]?.bannerimg?.data && (
                <Image
                  src={getImageUrl(data[0].bannerimg.data.attributes)}
                  alt="Alzheimer’s and Dementia Home care Services"
                  width={data[0].bannerimg.data.attributes.width}
                  height={data[0].bannerimg.data.attributes.height}
                />
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
              {data[1]?.img?.data && (
                <Image
                  src={getImageUrl(data[1].img.data.attributes)}
                  alt="Choose Interim Healthcare for a Happier Tomorrow"
                  width={data[1].img.data.attributes.width}
                  height={data[1].img.data.attributes.height}
                />
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data[1]?.Heading}</h2>
              {renderDescription(data[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data[2]?.Heading}</h2>
              {renderDescription(data[2]?.description)}
            </Col>
            <Col md="6">
              {data[2]?.img?.data && (
                <Image
                  src={getImageUrl(data[2].img.data.attributes)}
                  alt="When is the right time"
                  width={data[2].img.data.attributes.width}
                  height={data[2].img.data.attributes.height}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="5">
              {data[3]?.image?.data ? (
                <Image
                  src={getImageUrl(data[3].image.data.attributes)}
                  alt="Benefits of Memory Care Services"
                  width={data[3].image.data.attributes.width}
                  height={data[3].image.data.attributes.height}
                />
              ) : (
                <p>No image available for section 4.</p>
              )}
            </Col>
            <Col md="7">
              <h2 className="heading2">{data[3]?.Heading || "No heading available"}</h2>
              {renderDescription(data[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data[4]?.Heading}</h2>
              {renderDescription(data[4]?.description)}
              <Button className="Contactbtn py-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {data[4]?.image?.data && (
                <Image
                  src={getImageUrl(data[4].image.data.attributes)}
                  alt="Contact Us"
                  width={data[4].image.data.attributes.width}
                  height={data[4].image.data.attributes.height}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
      <MedfordfooterserviceComponent />
    </div>
  );
}
