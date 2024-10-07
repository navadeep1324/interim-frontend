"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import MedfordFooter from "../../../../footermedford";
import MedfordNavComponent from "../../../../medfordnavcomponent";
import MedfordfooterserviceComponent from "../../../../footerservicemedford";
export default function RespiteCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:1337/api/medford-respite-cares?populate[maincontent][populate]=*")
      .then((response) => response.json())
      .then((responseData) => {
        // Adjusted the data access based on the JSON structure
        if (responseData?.data?.[0]?.attributes?.maincontent) {
          setData(responseData.data[0].attributes.maincontent);
        } else {
          throw new Error("Invalid data structure received");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : '';
  };

  const renderImage = (imageData, alt, width, height) => {
    if (imageData) {
      return (
        <Image
          src={getImageUrl(imageData)}
          alt={alt}
          width={width}
          height={height}
          onError={(e) => console.error("Error loading image:", e)}
        />
      );
    }
    return null;
  };

  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null;
    return description.map((desc, index) => (
      <p key={index} className="py-3">
        {desc?.children?.[0]?.text || ""}
      </p>
    ));
  };

  return (
    <div>
      <MedfordNavComponent />

      {/* Section 1: Banner */}
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data?.[0]?.Heading || ""}</h1>
              <p className="paragram py-2">{data?.[0]?.subHeading?.split("\n\n")[0] || ""}</p>
              <p className="py-4">
                {data?.[0]?.subHeading?.split("\n\n")[1] || ""}
                <br />Contact us today to learn how we can assist in caring for your seniors.
              </p>
            </Col>
            <Col md="7">
              {renderImage(
                data?.[0]?.bannerimg?.data?.attributes,
                "Compassionate Respite Care",
                1034,
                688
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      {/* Section 2 */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
            <Col md="4">
              {renderImage(
                data?.[1]?.img?.data?.attributes,
                "Extending your Caregiving Warmth Even During Your Absence",
                595,
                780
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data?.[1]?.Heading || ""}</h2>
              {renderDescription(data?.[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 3 */}
      <div className="sectionbg" style={{ padding: "50px 0px" }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">{data?.[2]?.Heading || ""}</h2>
              {renderDescription(data?.[2]?.description)}
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-2">
                {data?.[2]?.description?.[2]?.children?.map((item, index) => (
                  <li key={index}>{item?.children?.[0]?.text || ""}</li>
                ))}
              </ul>
            </Col>
            <Col md="6">
              {renderImage(
                data?.[2]?.img?.data?.attributes,
                "Our Commitments as Your Respite Caregiver",
                626,
                525
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 */}
      <div className="section3" style={{ padding: "50px 0px" }}>
        <Container>
          <Row>
            <Col md="6">
              {renderImage(
                data?.[3]?.img?.data?.attributes,
                "Benefits of our Respite Caregiving",
                595,
                780
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data?.[3]?.Heading || ""}</h2>
              {renderDescription(data?.[3]?.description)}
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-2">
                {data?.[3]?.description?.[1]?.children?.map((item, index) => (
                  <li key={index}>
                    {item?.children?.[0]?.text && (
                      <>
                        <b>{item?.children?.[0]?.text}</b>
                        {item?.children?.[1]?.text || ""}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 */}
      <div className="section4" style={{ padding: "50px 0px" }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: "#ffff", borderRadius: "20px" }}>
            <Col md={6}>
              <h2 className="heading2">{data?.[4]?.Heading || ""}</h2>
              {renderDescription(data?.[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(
                data?.[4]?.image?.data?.attributes,
                "Interim: Providing Help, When You Need It!",
                595,
                780
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <MedfordfooterserviceComponent />
    </div>
  );
}
