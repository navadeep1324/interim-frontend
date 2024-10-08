"use client";
import React, { useEffect, useState } from "react";
import ReddingNavbarComponent from "../../../../reddingnavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import styles from "../../../../page.module.css";
import Image from "next/image";
import Alzheimersimg from "/public/images/Alzheimersimg.png";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import Happier from "/public/images/Happier.png";
import servicesimg from "/public/images/servicesimg.png";
import Services5img from "/public/images/Services5img.png";
import ServicepageFooter from "../../../../servicepageFooter";

export default function AlzheimerMainComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://admin.interimhc.com/api/alzheimer-s-and-dementia?populate[maincontent][populate]=*');
        const result = await res.json();
        setData(result.data.attributes.maincontent);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Extract the correct section for Caregiver CTA
  const caregiverCTA = data.find(section => section.__component === "components.cargiver-cta");

  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : null;
  };

  return (
    <div>
      <ReddingNavbarComponent />

      {/* First Section */}
      <div className="sectionbg">
        <Container>
          <Row className="align-items-center g-5 py-5">
            <Col md="6">
              <h1 className="heading1">{data[0].Heading}</h1>
              <p className="paragram py-2">{data[0].subHeading.split('\n')[0]}</p>
              <p className="py-4">{data[0].subHeading.split('\n')[1]}</p>
              {/* <Button className={styles.buttonhome} href="tel:+1 408-286-6888">
                +1 408-286-6888
              </Button> */}
            </Col>
            <Col md="6" className="d-flex justify-content-center">
              <Image
                src={Alzheimersimg}
                alt="Alzheimer’s and Dementia Home care Services"
                width={626}
                height={525}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <CaregiverCityComponent />
      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="align-items-center g-5 row3bg py-4">
            <Col md="4">
              <Image src={Happier} alt="Happier" width={400} height={400} />
            </Col>
            <Col md="8">
              <h2 className="heading2">{data[2].Heading}</h2>
              {data[2].description.map((para, index) => (
                <p className="py-4" key={index}>
                  {para.bold ? <b>{para.children[0].text}</b> : para.children[0].text}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="sectionbg" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              <h2 className="heading2">{data[3].Heading}</h2>
              {data[3].description.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
            </Col>
            <Col md="6">
              <Image src={servicesimg} width={500} height={400} alt="Services Image" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              <Image src={Services5img} alt="Services Image" width={500} height={400} />
            </Col>
            <Col md="6">
              <h2 className="heading2">{data[4].Heading}</h2>
              {data[4].description.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fifth Section */}
      <div className="section4">
        <Container>
          <Row className="align-items-center g-5 px-5" style={{ background: '#ffff', borderRadius: '20px', padding: '3%' }}>
            <Col md={6}>
              <h2 className="heading2">{data[5].Heading}</h2>
              {data[5].description.map((para, index) => (
                <p className="py-3" key={index}>
                  {para.children[0].text}
                </p>
              ))}
              <Button className="Contactbtn py-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {data[5]?.image?.data ? (
                <Image
                  src={getImageUrl(data[5].image.data.attributes)}
                  alt="Contact Us"
                  width={data[5].image.data.attributes.width}
                  height={data[5].image.data.attributes.height}
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
