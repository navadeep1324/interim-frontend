"use client";
import React, { useEffect, useState } from "react";
import MedfordNavbarComponent from "../../../../medfordnavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import FooterSanjose from "../../../../footerservicesanjose";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import SanjoseNavbarComponent from "../../../../sanjosenavcomponent";
export default function PersonalCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://admin.interimhc.com/api/sanjose-personal-cares?populate[maincontent][populate]=*"
        );
        const result = await res.json();

        // Handling collection type or single type response
        if (result.data) {
          // If it's a collection type, data will be an array
          if (Array.isArray(result.data)) {
            setData(result.data[0].attributes); // Take the first item in the array (for collection types)
          } else {
            setData(result.data.attributes); // If it's a single type
          }
        } else {
          throw new Error("Invalid API structure");
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
          onError={(e) => console.error("Error loading image:", e)}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <SanjoseNavbarComponent/>
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data.maincontent[0].Heading}</h1>
              <p className="paragrambold py-2">{data.maincontent[0].subHeading.split("\n\n")[0]}</p>
              <p className="py-4">
                {data.maincontent[0].subHeading.split("\n\n")[1]}
                <br />
                Reach us today at <a href="tel:+1 408-286-6888" className="phone-link">+1 408-286-6888</a> to learn how we can assist your aging adults!
              </p>
            </Col>
            <Col md="6">
              {renderImage(
                data.maincontent[0].bannerimg.data.attributes,
                "Compassionate Personal Care Services",
                1034,
                688
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregiverCityComponent/>
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign ">
            <Col md="4">
              {renderImage(
                data.maincontent[1].img.data.attributes,
                "Uplifting the Hope to Stay Happy with Quality Personal Care",
                595,
                780
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data.maincontent[1].Heading}</h2>
              {data.maincontent[1].description.map((desc, index) => (
                <p key={index} className="py-3">{desc.children[0].text}</p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sectionbg">
  <Container>
    <Row className="middlealign g-5 row-reverse-mobile">
      <Col md="6">
        <h2 className="heading2">{data.maincontent[2].Heading}</h2>
        {data.maincontent[2].description.map((desc, index) => (
          <p key={index} className="py-2">{desc.children[0].text}</p>
        ))}
        <ul className="custom-list" style={{ paddingLeft: "20px" }}>
          {data.maincontent[2].description[2].children.map((item, index) => (
            <li className="custom-list-item" key={index} >{item.children[0].text}</li>
          ))}
        </ul>
        <p>{data.maincontent[2].description[3].children[0].text}</p>
      </Col>
      <Col md="6">
        {renderImage(
          data.maincontent[2].img.data.attributes,
          "Who Can Benefit from Our Personal Care Services?",
          626,
          525
        )}
      </Col>
    </Row>
  </Container>
</div>

<div className="section3">
  <Container>
    <Row className="align-items-center g-5">
      <Col md="6">
        {renderImage(
          data.maincontent[3].img.data.attributes,
          "Get Care from Personal Care Experts with Over 50 Years of Experience",
          595,
          780
        )}
      </Col>
      <Col md="6">
        <h2 className="heading2">{data.maincontent[3].Heading}</h2>
        {data.maincontent[3].description.map((desc, index) => (
          <p key={index} className="py-2">{desc.children[0].text}</p>
        ))}
        <ul className="custom-list" style={{ paddingLeft: "20px" }}>
          {data.maincontent[3].description[1].children.map((item, index) => (
            <li key={index} className="custom-list-item">
              <b>{item.children[0].text}</b>
              {item.children[1] && item.children[1].text}
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  </Container>
</div>

      <div className="section4">
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
              {renderImage(
                data.maincontent[4].image.data.attributes,
                "You Are Just a Few Steps Away from Personalized Care",
                595,
                780
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <FooterSanjose/>
    </div>
  );
}
