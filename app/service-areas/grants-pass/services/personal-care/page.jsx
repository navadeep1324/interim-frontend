"use client";
import React, { useEffect, useState } from "react";
import GrantsPassNavbarComponent from "../../../../grantspassnavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import FooterGrantsPass from "../../../../footerservicegreantspass";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import Head from "next/head";
export default function PersonalCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://admin.interimhc.com/api/grant-pass-personal-cares?populate[maincontent][populate]=*&populate[seo]=*"
        );
        const result = await res.json();

        // Handling collection type or single type response
        if (result.data) {
          // If it's a collection type, data will be an array
          if (Array.isArray(result.data)) {
            setData(result.data[0].attributes); // Take the first item in the array (for collection types)
            setSeoData(result.data[0]?.attributes?.seo);
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
      <GrantsPassNavbarComponent/>
      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="5">
              <h1 className="heading1">{data.maincontent[0].Heading}</h1>
              <p className="paragram py-2">{data.maincontent[0].subHeading.split("\n\n")[0]}</p>
              <p className="py-4">
                {data.maincontent[0].subHeading.split("\n\n")[1]}
                <br />
                Reach us today at <a href="tel:+1 541-787-3140" className="phone-link">+1 541-787-3140</a> to learn how we can assist your aging adults!
              </p>
            </Col>
            <Col md="7">
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
          <Row className="row3bg py-5 px-5 d-flex align-items-center">
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
      <div className="sectionbg" style={{ padding: "50px 0px" }}>
  <Container>
    <Row>
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

<div className="section3" style={{ padding: "50px 0px" }}>
  <Container>
    <Row>
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

      <div className="section4" style={{ padding: "50px 0px" }}>
        <Container>
          <Row className="py-5 px-5" style={{ background: "#ffff", borderRadius: "20px" }}>
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
      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
      <FooterGrantsPass/>
    </div>
  );
}
