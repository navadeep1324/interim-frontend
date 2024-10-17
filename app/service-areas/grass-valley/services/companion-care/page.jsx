"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../../navcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import CarsonFooter from "../../../../footercarson";
import FooterServiceCarsonComponent from "../../../../footerservicescarson";
import CarsonNavbarComponent from "../../../../carsonnavcomponent";
import GrantspassNavbarComponent from "../../../../grantspassnavcomponent";
import GrantsPassFooter from "../../../../footerservicegreantspass";
import GrassValleyNavbarComponent from "../../../../grassvalleynavcomponent";
import GrassValleyFooter from "../../../../footerservicegrssvalley";
import Head from "next/head";
export default function CompanionCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    fetch('https://admin.interimhc.com/api/grass-valley-companion-cares?populate[maincontent][populate]=*&populate[seo]=*')
      .then(response => response.json())
      .then(responseData => {
        if (responseData.data && responseData.data.length > 0) {
          console.log("API Response:", responseData.data[0].attributes);
          setData(responseData.data[0].attributes); // Ensure you're accessing the correct path
          setSeoData(responseData.data[0]?.attributes?.seo);
          setLoading(false);
        } else {
          console.error('No data found:', responseData);
          setLoading(false);  // Stop loading when no data is found.
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);  // Stop loading in case of error.
      });
  }, []);
  // Dynamically set the meta title and description once the seoData is fetched
  useEffect(() => {
    if (seoData && Array.isArray(seoData) && seoData.length > 0) {
      const seo = seoData[0]; // Access the first element of the seoData array
      console.log("SEO Data received:", seo); // Log seoData for debugging
      document.title = seo.metaTitle || "Default Title";
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seo.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seo.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    } else {
      console.log("No SEO Data received"); // Log if seoData is not available
    }
  }, [seoData]);

  const getImageUrl = (imageData) => {
    return imageData?.url ? `https://admin.interimhc.com${imageData.url}` : '';
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

  if (loading) {
    return // <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <GrassValleyNavbarComponent/>
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data.maincontent[0]?.Heading}</h1>
              <p className="paragram py-2">{data.maincontent[0]?.subHeading}</p>
              <p>Reach us today at <a href="tel:+1 775-883-4455" className="phone-link">+1 775-883-4455</a> to learn how we can assist your aging adults!</p>

            </Col>
            <Col md="7">
              {renderImage(data.maincontent[0]?.bannerimg?.data?.attributes, "Companion care Services", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 px-5">
            <Col md="4">
              {renderImage(data.maincontent[1]?.img?.data?.attributes, "Exceptional Elderly companion care", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data.maincontent[1]?.Heading}</h2>
              {data.maincontent[1]?.description?.map((desc, index) => (
                <p key={index} className="py-3">{desc?.children[0]?.text}</p>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="sectionbg" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[2]?.Heading}</h2>
              {data.maincontent[2]?.description?.map((desc, index) => (
                <p key={index} className="py-2">{desc?.children[0]?.text}</p>
              ))}
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                {data.maincontent[2]?.description[1]?.children.map((item, index) => (
                  <li key={index}>{item?.children[0]?.text}</li>
                ))}
              </ul>
            </Col>
            <Col md="6">
              {renderImage(data.maincontent[2]?.img?.data?.attributes, "Who can benefit from companion home care", 625, 400)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section3" style={{ padding: '50px 0px' }}>
        <Container>
          <Row>
            <Col md="6">
              {renderImage(data.maincontent[3]?.img?.data?.attributes, "Experience Our Superior companion home care services", 550, 520)}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data.maincontent[3]?.Heading}</h2>
              {data.maincontent[3]?.description?.map((desc, index) => (
                <p key={index} className="py-2">{desc?.children[0]?.text}</p>
              ))}
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                {data.maincontent[3]?.description[1]?.children?.map((item, index) => (
                  <li key={index}>{item?.children[0]?.text}</li>
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
              <h2 className="heading2">{data.maincontent[4]?.Heading}</h2>
              {data.maincontent[4]?.description?.map((desc, index) => (
                <p key={index} className="py-3">{desc?.children[0]?.text}</p>
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
      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
      <GrassValleyFooter />
    </div>
  );
}
