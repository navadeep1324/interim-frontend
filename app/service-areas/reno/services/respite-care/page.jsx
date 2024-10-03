"use client";
import React, { useEffect, useState } from "react";
import RenoNavbarComponent from "../../../../renonavcomponent"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import RenoFooter from "../../../../footerreno";
import RenoFooterServices from "../../../../footerservicereno";

export default function RespiteCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.interimhc.com/api/reno-respite-cares?populate[maincontent][populate]=*"
        );
        const result = await response.json();
        
        console.log("Full API response:", result); // Log the API response
        
        // Check if the data is available in the API response
        if (result?.data?.[0]?.attributes) {
          setData(result.data[0].attributes);  // Set the correct path to the data
        } else {
          throw new Error("No data found in the API response");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getImageUrl = (imageData) => {
    return imageData ? `https://api.interimhc.com${imageData.url}` : '';
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
    return <p>No image available</p>;
  };

  return (
    <div>
<RenoNavbarComponent/>
<div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">
                {data?.maincontent?.[0]?.Heading || "No Heading Available"}
              </h1>
              <p className="paragram py-2">
                {data?.maincontent?.[0]?.subHeading?.split("\n\n")[0] || "No Subheading Available"}
              </p>
              <p className="py-4">
                {data?.maincontent?.[0]?.subHeading?.split("\n\n")[1] || "No Subheading Available"}
                <br /> Contact us today to learn how we can assist in caring for your seniors, ensuring they receive the help they need.
              </p>
            </Col>
            <Col md="7">
              {renderImage(
                data?.maincontent?.[0]?.bannerimg?.data?.attributes,
                "Compassionate Respite Care",
                1034,
                688
              )}
            </Col>
          </Row>
        </Container>
      </div>

      < CaregiverCityComponent/>

      {/* Section 2 */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
            <Col md="4">
              {renderImage(
                data?.maincontent?.[1]?.img?.data?.attributes,
                "Extending your Caregiving Warmth Even During Your Absence",
                595,
                780
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">
                {data?.maincontent?.[1]?.Heading || "No Heading Available"}
              </h2>
              {data?.maincontent?.[1]?.description?.map((desc, index) => (
                <p key={index} className="py-3">
                  {desc?.children?.[0]?.text || "No Description Available"}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 3 */}
      <div className="sectionbg" style={{ padding: "50px 0px" }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">
                {data?.maincontent?.[2]?.Heading || "No Heading Available"}
              </h2>
              {data?.maincontent?.[2]?.description?.map((desc, index) => (
                <p key={index} className="py-2">
                  {desc?.children?.[0]?.text}
                </p>
              ))}
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-2">
                {data?.maincontent?.[2]?.description?.[2]?.children?.map((item, index) => (
                  <li key={index}>
                    {item?.children?.[0]?.text || "No List Item Available"}
                  </li>
                ))}
              </ul>
            </Col>
            <Col md="6">
              {renderImage(
                data?.maincontent?.[2]?.img?.data?.attributes,
                "Our Commitments as Your Respite Caregiver",
                626,
                525
              )}
            </Col>
          </Row>
        </Container>
      </div>

{/* Section 4: Benefits of our Respite Caregiving */}
<div className="section3" style={{ padding: "50px 0px" }}>
  <Container>
    <Row>
      <Col md="6">
        {renderImage(
          data?.maincontent?.[3]?.img?.data?.attributes,
          "Benefits of our Respite Caregiving",
          595,
          780
        )}
      </Col>
      <Col md="6">
        <h2 className="heading2">
          {data?.maincontent?.[3]?.Heading || "No Heading Available"}
        </h2>

        {/* Render the first paragraph */}
        {data?.maincontent?.[3]?.description?.[0]?.children?.map((desc, index) => (
          <p key={index} className="py-2">
            {desc?.text || "No Description Available"}
          </p>
        ))}

        {/* Render the subsequent paragraphs with bold text followed by normal text */}
        {data?.maincontent?.[3]?.description?.slice(1).map((paragraph, index) => (
          <p key={index} className="py-2">
            <strong>{paragraph?.children?.[0]?.text || "No Bold Text Available"}</strong>
            {paragraph?.children?.[1]?.text || "No Description Available"}
          </p>
        ))}
      </Col>
    </Row>
  </Container>
</div>



      {/* Section 5 */}
      <div className="section4" style={{ padding: "50px 0px" }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: "#ffff", borderRadius: "20px" }}>
            <Col md={6}>
              <h2 className="heading2">
                {data?.maincontent?.[4]?.Heading || "No Heading Available"}
              </h2>
              {data?.maincontent?.[4]?.description?.map((desc, index) => (
                <p key={index} className="py-3">
                  {desc?.children?.[0]?.text || "No Description Available"}
                </p>
              ))}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(
                data?.maincontent?.[4]?.image?.data?.attributes,
                "Interim: Providing Help, When You Need It!",
                595,
                780
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <RenoFooterServices  />
    </div>
  );
}
