"use client";
import React, { useEffect, useState } from "react";
import ReddingNavbarComponent from "../../../../reddingnavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
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
    return <div>Loading...</div>;
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

  const renderDescription = (description) => {
    return description.map((desc, index) => {
      if (desc.type === "paragraph") {
        return <p key={index} className="py-3">{desc.children[0]?.text}</p>;
      } else if (desc.type === "list") {
        return (
          <ul key={index} style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-2">
            {desc.children.map((item, idx) => (
              <li key={idx}>{item.children[0]?.text}</li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  return (
    <div>
            <ReddingNavbarComponent />
            <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data?.maincontent[0]?.Heading || "Default Heading"}</h1>
              <p className="paragram py-2">
                {data?.maincontent[0]?.subHeading?.split("\n").map((str, index) => (
                  <span key={index}>{str}<br /></span>
                ))}
              </p>
            </Col>
            <Col md="7">
              {renderImage(data?.maincontent[0]?.bannerimg?.data?.attributes, "Palliative Care Banner", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregivertodayComponent />
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
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
      <div className="sectionbg" style={{ padding: "50px 0px" }}>
        <Container>
          <Row>
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
      <div className="section3" style={{ padding: "50px 0px" }}>
        <Container>
          <Row>
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
      <div className="section4" style={{ padding: "50px 0px" }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: "#ffff", borderRadius: "20px" }}>
            <Col md={6}>
              <h2 className="heading2">{data?.maincontent[4]?.Heading}</h2>
              {renderDescription(data?.maincontent[4]?.description || [])}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(data?.maincontent[4]?.image?.data?.attributes, "Contact Banner", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>
      <ServicepageFooter />
    </div>
  );
}
