"use client";
import React, { useEffect, useState } from "react";
import ReddingNavbarComponent from "../../../../reddingnavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiversComponentMainCity";
import ServicepageFooter from "../../../../servicepageFooter";

export default function PalliativeCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://admin.interimhc.com/api/palliative-care?populate[maincontent][populate]=*"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        console.log("Fetched Data: ", json.data.attributes); // Add this line to check fetched data
        setData(json.data.attributes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return // <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getImageUrl = (imageData) => {
    if (imageData && imageData.url) {
      return `https://admin.interimhc.com${imageData.url}`;
    }
    return null;
  };

  const renderImage = (imageData, alt, width, height) => {
    const imageUrl = getImageUrl(imageData);
    if (imageUrl) {
      return (
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          onError={(e) => console.error("Error loading image:", e)}
        />
      );
    }
    return <div>No image available</div>; // Show this if no image is available
  };

   // Enhanced function to render content (paragraphs, lists, and headings)
   const renderDescription = (description) => {
    return description?.map((desc, index) => {
      if (desc.type === "paragraph") {
        return (
          <p key={index} className="py-3">
            {desc.children.map((child, idx) => {
              if (child.type === "text") {
                return child.text;
              } else if (child.type === "link") {
                return (
                  <a key={idx} href={child.url} className="phone-link">
                    {child.children[0]?.text || "Link"}
                  </a>
                );
              }
              return null;
            })}
          </p>
        );
      } else if (desc.type === "list") {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
            {desc.children.map((item, idx) => (
              <li key={idx}>
                {item.children.map((child, childIdx) => {
                  if (child.type === "text") {
                    return child.bold ? <strong key={childIdx}>{child.text}</strong> : child.text;
                  }
                  return null;
                })}
              </li>
            ))}
          </ul>
        );
      } else if (desc.type === "heading") {
        const HeadingTag = `h${desc.level || 2}`;
        return <HeadingTag key={index} className="heading2">{desc.children[0]?.text}</HeadingTag>;
      }
      return null;
    });
  };

  return (
    <div>
            <ReddingNavbarComponent />
            <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data?.maincontent[0]?.Heading || "Default Heading"}</h1>
              <p className="paragram py-2">
                {data?.maincontent[0]?.subHeading?.split("\n").map((str, index) => (
                  <span key={index}>{str}<br /></span>
                ))}
                Contact us today at <a href="tel:+1 530-221-1212" className="phone-link">+1 530-221-1212</a> to speak with our caregiving team.
              </p>
            </Col>
            <Col md="6">
              {renderImage(data?.maincontent[0]?.bannerimg?.data?.attributes, "Palliative Care Banner", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregivertodayComponent />
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign ">
            <Col md="4">
              {renderImage(data?.maincontent[1]?.img?.data?.attributes, "Palliative Care Service", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data?.maincontent[1]?.Heading}</h2>
              {renderDescription(data?.maincontent[1]?.description || [])}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data?.maincontent[2]?.Heading}</h2>
              {renderDescription(data?.maincontent[2]?.description || [])}
            </Col>
            <Col md="6">
              {renderImage(data?.maincontent[2]?.img?.data?.attributes, "Respite Care Service", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {renderImage(data.maincontent[3].image.data.attributes, "Respite Care Service", 595, 780)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data?.maincontent[3]?.Heading}</h2>
              {renderDescription(data?.maincontent[3]?.description || [])}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data?.maincontent[4]?.Heading}</h2>
              {renderDescription(data?.maincontent[4]?.description || [])}
              <Button className="Contactbtn py-3 my-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(data?.maincontent[4]?.image?.data?.attributes, "Contact Banner", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>
      <ServicepageFooter />
    </div>
  );
}
