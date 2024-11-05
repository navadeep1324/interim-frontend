"use client";
import React, { useEffect, useState } from "react";
import RenoNavbarComponent from "../../../../renonavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import FooterReno from "../../../../footerservicereno";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import Head from "next/head"; // For SEO

export default function PersonalCareComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null); // For SEO data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://admin.interimhc.com/api/reno-personal-cares?populate[maincontent][populate]=*&populate[seo]=*"
        );
        const result = await res.json();

        // Log the API response for debugging
        console.log("API Response:", result);

        if (result.data && result.data.length > 0) {
          const attributes = result.data[0].attributes; // Fetch the first item's attributes

          setData(attributes); // Set the main content data
          setSeoData(attributes.seo && attributes.seo[0]); // Set the first item in the SEO array
        } else {
          throw new Error("No data found.");
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

  // Dynamically update the title and meta description
  useEffect(() => {
    if (seoData) {
      console.log("SEO Data:", seoData); // Log SEO data for debugging

      // Set document title
      document.title = seoData.metaTitle || "Default Title";

      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seoData.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seoData.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    } else {
      console.log("No SEO Data available");
    }
  }, [seoData]);

  if (loading) {
    return // //<div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
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
      <RenoNavbarComponent />

      {/* SEO Head */}
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>

      <div className="sectionbg">
        <Container>
          <Row className="py-5">
            <Col md="6">
              <h1 className="heading1">{data.maincontent[0]?.Heading}</h1>
              <p className="paragram py-2">{data.maincontent[0]?.subHeading.split("\n\n")[0]}</p>
              <p className="py-4">
                {data.maincontent[0]?.subHeading.split("\n\n")[1]}
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

      <CaregiverCityComponent />

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
                  <li className="custom-list-item" key={index}>{item.children[0].text}</li>
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
              <Button className="Contactbtn py-3 my-3" href="/contact-us">
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
      <FooterReno />
    </div>
  );
}
