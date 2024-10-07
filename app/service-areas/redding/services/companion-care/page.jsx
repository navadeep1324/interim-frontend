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

export default function CompanionCareComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/companion-care-service?populate[maincontent][populate]=*')
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);
        setData(data.data.attributes);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const getImageUrl = (imageData) => {
    const url = `https://admin.interimhc.com${imageData.url}`;
    console.log('Image URL:', url); // Log the URL for debugging
    return url;
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
    return null;
  };

  return (
    <div>
            <ReddingNavbarComponent />
            <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data.maincontent[0].Heading}</h1>
              <p className="paragram py-2">{data.maincontent[0].subHeading}</p>
              {/* <p className="py-4">
                In the journey of life, everyone deserves a loyal friend and a helping hand. At Interim Healthcare we not only provide support, but genuine companionship, enriching the lives of seniors with warmth and empathy. From daily assistance to heartfelt conversations, we’re here to ensure your loved ones thrive in the comfort of their own home.
                <br></br>Reach us today at +1 408-286-6888 to learn how we can assist your aging adults!
              </p> */}
            </Col>
            <Col md="7">
              {renderImage(data.maincontent[0].bannerimg.data.attributes, "Companion care Services", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregivertodayComponent />
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
            <Col md="4">
              {renderImage(data.maincontent[1].img.data.attributes, "Exceptional Elderly companion care", 595, 780)}
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
      <div className="sectionbg" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[2].Heading}</h2>
              {data.maincontent[2].description.map((desc, index) => (
                <p key={index} className="py-2">{desc.children[0].text}</p>
              ))}
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                {data.maincontent[2].description[1].children.map((item, index) => (
                  <li key={index}>{item.children[0].text}</li>
                ))}
              </ul>
            </Col>
            <Col md="6">
              {renderImage(data.maincontent[2].img.data.attributes, "Who can benefit from companion home care", 625, 400)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section3" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              {renderImage(data.maincontent[3].img.data.attributes, "Experience Our Superior companion home care services", 550, 520)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3].Heading}</h2>
              {data.maincontent[3].description.map((desc, index) => (
                <p key={index} className="py-2">{desc.children[0].text}</p>
              ))}
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                {data.maincontent[3].description[1].children.map((item, index) => (
                  <li key={index}>{item.children[0].text}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: '#ffff', borderRadius: '20px' }}>
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
              {renderImage(data.maincontent[4]?.image?.data?.attributes, "Caring for Seniors is an Honor for us", 550, 520)}
            </Col>
          </Row>
        </Container>
      </div>
      <ServicepageFooter />
    </div>
  );
}
