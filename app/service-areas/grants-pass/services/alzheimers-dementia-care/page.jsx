"use client";
import React, { useEffect, useState } from "react";
import YubaNavbarComponent from "../../../../yubanavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import YubaserviceFooter from "../../../../footerserviceyuba";
import GrantspassNavbarComponent from "../../../../grantspassnavcomponent";
import GrantsPassFooter from "../../../../footerservicegreantspass";

export default function AlzheimerMainComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://admin.interimhc.com/api/grant-pass-alzheimer-s-and-dementia-cares?populate[maincontent][populate]=*');
        const result = await res.json();
        setData(result.data[0].attributes.maincontent);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : '';
  };

  const renderDescription = (descriptions) => {
    return descriptions.map((para, index) => (
      <p className="py-4" key={index}>
        {para?.children[0]?.text || ""}
      </p>
    ));
  };

  return (
    <div>
      <GrantspassNavbarComponent/>
      
      {/* Section 1: Banner */}
      <div className="sectionbg">
        <Container>
          <Row className="align-items-center g-5 py-5">
            <Col md="6">
              <h1 className="heading1">{data[0].Heading}</h1>
              <p className="paragram py-2">{data[0].subHeading.split('\n')[0]}</p>
              <p className="py-4">{data[0].subHeading.split('\n')[1]}</p>
              {/* Commented out as per user request */}
              {/* <Button className="buttonhome" href={data[0].btn.url}> */}
              {/* {data[0].btn.text} */}
              {/* </Button> */}
            </Col>
            <Col md="6" className="d-flex justify-content-center">
              {data[0].bannerimg && data[0].bannerimg.data && (
                <Image
                  src={getImageUrl(data[0].bannerimg.data.attributes)}
                  alt="Alzheimer’s and Dementia Home care Services"
                  width={1034}
                  height={688}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Caregiver Component */}
      <CaregiverCityComponent />
      {/* Section 2: Choose Interim Healthcare */}
      <div className="section3bg">
        <Container>
          <Row className="align-items-center g-5 row3bg py-4">
            <Col md="4">
              {data[1].img && data[1].img.data && (
                <Image
                  src={getImageUrl(data[1].img.data.attributes)}
                  alt="Choose Interim Healthcare for a Happier Tomorrow"
                  width={562}
                  height={802}
                />
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data[1].Heading}</h2>
              {data[1].description.map((para, index) => (
                <p className="py-4" key={index}>
                  {para.bold ? <b>{para.children[0].text}</b> : para.children[0].text}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 3: When is the right time */}
      <div className="sectionbg">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              <h2 className="heading2">{data[2].Heading}</h2>
              {data[2].description.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
            </Col>
            <Col md="6">
              {data[2].img && data[2].img.data && (
                <Image
                  src={getImageUrl(data[2].img.data.attributes)}
                  alt="When is the right time"
                  width={626}
                  height={525}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4: Benefits of Memory Care */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {data[3].image && data[3].image.data && (
                <Image
                  src={getImageUrl(data[3].image.data.attributes)}
                  alt="Benefits of Memory Care Services"
                  width={data[3].image.data.attributes.width}
                  height={data[3].image.data.attributes.height}
                />
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data[3].Heading}</h2>
              {data[3].description.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5: Exceptional Memory Care */}
      <div className="section4">
        <Container>
          <Row className="align-items-center g-5 px-5" style={{ background: '#ffff', borderRadius: '20px', padding: '3%' }}>
            <Col md={6}>
              <h2 className="heading2">{data[4].Heading}</h2>
              {data[4].description.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
              <Button className="Contactbtn py-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {data[4].image && data[4].image.data && (
                <Image
                  src={getImageUrl(data[4].image.data.attributes)}
                  alt="Contact Us"
                  width={589}
                  height={422}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Component */}
      <GrantsPassFooter />
    </div>
  );
}
