"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import GrassValleyNavbarComponent from "../../../../grassvalleynavcomponent";
import GrassValleyserviceFooter from "../../../../footerservicegrssvalley";

export default function RespiteCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:1337/api/grass-valley-respite-cares?populate[maincontent][populate]=*"
        );
        const result = await response.json();

        console.log(result); // Log the entire result to inspect it

        if (result.data) {
          if (Array.isArray(result.data)) {
            setData(result.data[0].attributes); // Collection type, pick the first entry
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getImageUrl = (imageData) => {
    return `http://127.0.0.1:1337${imageData.url}`;
  };

  const renderImage = (imageData, alt, width, height) => {
    if (imageData && imageData.url) {
      const imageUrl = `http://127.0.0.1:1337${imageData.url}`;
      return (
        <Image
          src={imageUrl}
          alt={alt || "Image"}
          width={width || 600}
          height={height || 400}
          onError={(e) => console.error("Error loading image:", e)}
        />
      );
    } else {
      console.warn("Image data missing or invalid:", imageData);
      return <p>No image available</p>;
    }
  };

  const renderDescription = (desc) => {
    return desc.children.map((child, index) => {
      if (child.bold) {
        return <b key={index}>{child.text}</b>;
      } else if (child.type === "link") {
        return (
          <a key={index} href={child.url} target="_blank" rel="noopener noreferrer">
            {child.text}
          </a>
        );
      } else {
        return <span key={index}>{child.text}</span>;
      }
    });
  };

  const renderList = (listItems) => {
    if (listItems && listItems.length) {
      return (
        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-2">
          {listItems.map((item, index) => (
            <li key={index}>{item.children && item.children[0]?.text}</li>
          ))}
        </ul>
      );
    }
    return null; // Return null if listItems are empty or undefined
  };

  return (
    <div>
      <GrassValleyNavbarComponent  />
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data.maincontent[0]?.Heading}</h1>
              <p className="paragram py-2">
                {data.maincontent[0]?.subHeading.split("\n\n")[0]}
              </p>
              <p className="py-4">
                {data.maincontent[0]?.subHeading.split("\n\n")[1]}
                <br /> Contact us today to learn how we can assist in caring for your seniors.
              </p>
            </Col>
            <Col md="7">
              {renderImage(
                data.maincontent[0]?.bannerimg?.data?.attributes,
                "Compassionate Respite Care",
                1034,
                688
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
            <Col md="4">
              {renderImage(
                data.maincontent[1]?.img?.data?.attributes,
                "Extending your Caregiving Warmth",
                595,
                780
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data.maincontent[1]?.Heading}</h2>
              {data.maincontent[1]?.description.map((desc, index) => (
                <p key={index} className="py-3">
                  {renderDescription(desc)}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="sectionbg" style={{ padding: "50px 0px" }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[2]?.Heading}</h2>
              {data.maincontent[2]?.description.map((desc, index) => (
                <p key={index} className="py-2">
                  {renderDescription(desc)}
                </p>
              ))}
              {renderList(data.maincontent[2]?.description[2]?.children)}
            </Col>
            <Col md="6">
              {renderImage(
                data.maincontent[2]?.img?.data?.attributes,
                "Our Commitments",
                626,
                525
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section3" style={{ padding: "50px 0px" }}>
        <Container>
          <Row>
            <Col md="6">
              {renderImage(
                data.maincontent[3]?.img?.data?.attributes,
                "Benefits of Respite Care",
                595,
                780
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3]?.Heading}</h2>
              {data.maincontent[3]?.description.map((desc, index) => (
                <p key={index} className="py-2">
                  {renderDescription(desc)}
                </p>
              ))}
              {renderList(data.maincontent[3]?.description[1]?.children)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section4" style={{ padding: "50px 0px" }}>
        <Container>
          <Row
            className="py-5 px-5"
            style={{ background: "#ffff", borderRadius: "20px" }}
          >
            <Col md={6}>
              <h2 className="heading2">{data.maincontent[4]?.Heading}</h2>
              {data.maincontent[4]?.description.map((desc, index) => (
                <p key={index} className="py-3">
                  {renderDescription(desc)}
                </p>
              ))}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(
                data.maincontent[4]?.image?.data?.attributes,
                "Providing Help, When You Need It!",
                595,
                780
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <GrassValleyserviceFooter  />
    </div>
  );
}
