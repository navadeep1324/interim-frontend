"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import styles from "../../../../page.module.css";
import Image from "next/image";
import Alzheimersimg from "/public/images/Alzheimersimg.png";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import Happier from "/public/images/Happier.png";
import servicesimg from "/public/images/servicesimg.png";
import Services5img from "/public/images/Services5img.png";
import ServicepageFooter from "../../../../servicepageFooter";
import SanjoseNavbarComponent from "../../../../sanjosenavcomponent";
import SanJoseserviceFooter from "../../../../footerservicesanjose";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";

export default function AlzheimerMainComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:1337/api/sanjose-alzheimer-s-and-dementia-cares?populate[maincontent][populate]=*');
        const result = await res.json();

        // Check if the maincontent exists in the response
        if (result?.data[0]?.attributes?.maincontent) {
          setData(result.data[0].attributes.maincontent);
        } else {
          throw new Error("Main content not found");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
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

  if (!data) {
    return <div>No data found</div>;
  }

  // Helper function to get image URL safely
  const getImageUrl = (imageData) => {
    return imageData ? `http://localhost:1337${imageData.url}` : null;
  };

  // Render descriptions with safety checks
  const renderDescription = (descriptions) => {
    return descriptions.map((para, index) => (
      <p className="py-4" key={index}>
        {para?.children[0]?.text || ""}
      </p>
    ));
  };

  return (
    <div>
      <SanjoseNavbarComponent />

      {/* First Section */}
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="6">
              <h1 className="heading1">{data[0]?.Heading || "Default Heading"}</h1>
              <p className="paragram py-2">{data[0]?.subHeading?.split('\n')[0]}</p>
              <p className="py-4">{data[0]?.subHeading?.split('\n')[1]}</p>
            </Col>
            <Col md="6">
              {data[0]?.bannerimg?.data ? (
                <img
                  src={getImageUrl(data[0]?.bannerimg?.data?.attributes)}
                  alt="Alzheimer’s and Dementia Home care Services"
                  width={626}
                  height={525}
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <Image
                  src={Alzheimersimg}
                  alt="Default Alzheimer’s Image"
                  width={500}
                  height={400}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregiverCityComponent />

      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 px-5">
            <Col md="4">
              {data[2]?.img?.data ? (
                <img
                  src={getImageUrl(data[2]?.img?.data.attributes)}
                  alt="Choose Interim Healthcare for a Happier Tomorrow"
                  width={data[2].img.data.attributes.width}
                  height={data[2].img.data.attributes.height}
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <Image src={Happier} alt="Happier Image" width={400} height={400} />
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data[2]?.Heading}</h2>
              {data[2]?.description ? renderDescription(data[2].description) : <p>No description available</p>}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="sectionbg" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              <h2 className="heading2">{data[3]?.Heading}</h2>
              {data[3]?.description ? renderDescription(data[3].description) : <p>No description available</p>}
            </Col>
            <Col md="6">
              {data[3]?.img?.data ? (
                <img
                  src={getImageUrl(data[3]?.img.data.attributes)}
                  alt="When is the right time to choose Memory Care"
                  width={data[3].img.data.attributes.width}
                  height={data[3].img.data.attributes.height}
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <Image src={servicesimg} alt="Default Service Image" width={500} height={400} />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {data[4]?.image?.data ? (
                <img
                  src={getImageUrl(data[4].image.data.attributes)}
                  alt="Benefits of Memory Care"
                  width={data[4].image.data.attributes.width}
                  height={data[4].image.data.attributes.height}
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <Image src={Services5img} alt="Services Image" width={500} height={400} />
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2 ">{data[4]?.Heading}</h2>
              {data[4]?.description ? renderDescription(data[4].description) : <p>No description available</p>}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fifth Section */}
      <div className="section4">
        <Container>
          <Row className="px-5 align-items-center g-5" style={{ background: '#fff', borderRadius: '20px', paddingBottom: '3%' }}>
            <Col md={6}>
              <h2 className="heading2">{data[5]?.Heading}</h2>
              {data[5]?.description ? renderDescription(data[5].description) : <p>No description available</p>}
              <Button className="Contactbtn py-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {data[5]?.image?.data ? (
                <img
                  src={getImageUrl(data[5].image.data.attributes)}
                  alt="Contact Us"
                  width={data[5].image.data.attributes.width}
                  height={data[5].image.data.attributes.height}
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <Image src={Services5img} alt="Contact Us Image" width={500} height={400} />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <SanJoseserviceFooter />
    </div>
  );
}
