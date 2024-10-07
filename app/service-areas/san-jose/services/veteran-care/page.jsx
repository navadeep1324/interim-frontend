"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import ServicepageFooter from "../../../../servicepageFooter";
import SanJoseFooter from "../../../../footersanjose";
import SanjoseNavbarComponent from "../../../../sanjosenavcomponent";
import SanJoseserviceFooter from "../../../../footerservicesanjose";
export default function VeteranCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/sanjose-veteran-cares?populate[maincontent][populate]=*')
      .then(response => response.json())
      .then(responseData => {
        // Log the API response to debug structure
        console.log('API Response:', responseData);

        // Adjusting for different possible API structures
        if (responseData?.data?.attributes?.maincontent) {
          // For expected structure: data -> attributes -> maincontent
          setData(responseData.data.attributes.maincontent);
        } else if (Array.isArray(responseData.data) && responseData.data.length > 0) {
          // If data is an array, use the first item
          setData(responseData.data[0].attributes.maincontent);
        } else {
          throw new Error("Invalid data structure received");
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getImageUrl = (imageData) => {
    return `https://admin.interimhc.com${imageData?.url || ''}`;
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

  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null;
    return description.map((desc, index) => {
      if (desc.type === "paragraph") {
        return <p key={index} className="py-3">{desc.children[0]?.text || ""}</p>;
      } else if (desc.type === "list") {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
            {desc.children.map((item, i) => (
              <li key={i}>{item.children[0]?.text || ""}</li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <SanjoseNavbarComponent/>
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data?.[0]?.Heading || ""}</h1>
              <p className="paragram py-2">
                {data?.[0]?.subHeading?.split('\n').map((str, index) => <span key={index}>{str}<br /></span>)}
              </p>
            </Col>
            <Col md="7">
              {renderImage(data?.[0]?.bannerimg?.data?.attributes, "Veteran Home Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>
      <CaregivertodayComponent />
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-4">
            <Col md="4">
              {renderImage(data?.[1]?.img?.data?.attributes, "Veteran Care Service", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data?.[1]?.Heading || ""}</h2>
              {renderDescription(data?.[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sectionbg" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">{data?.[2]?.Heading || ""}</h2>
              {renderDescription(data?.[2]?.description)}
            </Col>
            <Col md="6">
              {renderImage(data?.[2]?.img?.data?.attributes, "Respite Care Service", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section3" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              {renderImage(data?.[3].img?.data?.attributes, "Respite Care Service", 595, 780)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data?.[3]?.Heading || ""}</h2>
              {renderDescription(data?.[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section4" style={{ padding: '50px 0px' }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: '#ffff', borderRadius: '20px' }}>
            <Col md={6}>
              <h2 className="heading2">{data?.[4]?.Heading || ""}</h2>
              {renderDescription(data?.[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="tel:+1 408-286-6888">
                Contact Us
              </Button>
            </Col>
            <Col md={6}>
              {renderImage(data?.[4]?.image?.data?.attributes, "Respite Care Contact", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>
      <SanJoseserviceFooter  />
    </div>
  );
}
