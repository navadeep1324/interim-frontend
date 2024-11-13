'use client'; // Add this line at the top of your file to mark it as a Client Component

import { useState, useEffect } from "react";
import axios from "axios";
import HeaderComponent from "./headerpageComponent";
import NavbarComponent from "./navcomponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Footer from "./Footer";
import Head from "next/head";

const BASE_URL = "https://admin.interimhc.com";

export default function Home() {
  const [homeData, setHomeData] = useState([]);
  const [seoData, setSeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resHomeData = await axios.get(`${BASE_URL}/api/home-page?populate=*`);
        setHomeData(resHomeData.data.data);

        const resSeoData = await axios.get(`${BASE_URL}/api/seo?populate=*`);
        setSeoData(resSeoData.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Dynamically set the meta title, description, and images once the seoData is fetched
  useEffect(() => {
    if (seoData && seoData.length > 0) {
      const seo = seoData[0]; // Access the first element of the seoData array
      
      // Set meta title
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
  
      // Set meta image (OpenGraph image)
      if (seo.metaImage?.data?.attributes?.url) {
        const metaImageUrl = `${BASE_URL}${seo.metaImage.data.attributes.url}`;
        let ogImageMeta = document.querySelector('meta[property="og:image"]');
        if (!ogImageMeta) {
          ogImageMeta = document.createElement("meta");
          ogImageMeta.setAttribute("property", "og:image");
          document.head.appendChild(ogImageMeta);
        }
        ogImageMeta.setAttribute("content", metaImageUrl);
        console.log("Featured Image URL:", metaImageUrl);
      }

      // Set meta social (Facebook, Twitter) information
      seo.metaSocial?.forEach(social => {
        const socialImageUrl = `${BASE_URL}${social.image.data.attributes.url}`;
  
        // Facebook meta tags
        if (social.socialNetwork === "Facebook") {
          let fbTitle = document.querySelector('meta[property="og:title"]');
          if (!fbTitle) {
            fbTitle = document.createElement("meta");
            fbTitle.setAttribute("property", "og:title");
            document.head.appendChild(fbTitle);
          }
          fbTitle.setAttribute("content", social.title);
  
          let fbDesc = document.querySelector('meta[property="og:description"]');
          if (!fbDesc) {
            fbDesc = document.createElement("meta");
            fbDesc.setAttribute("property", "og:description");
            document.head.appendChild(fbDesc);
          }
          fbDesc.setAttribute("content", social.description);
  
          let fbImage = document.querySelector('meta[property="og:image"]');
          if (!fbImage) {
            fbImage = document.createElement("meta");
            fbImage.setAttribute("property", "og:image");
            document.head.appendChild(fbImage);
          }
          fbImage.setAttribute("content", socialImageUrl);
        }
  
        // Twitter meta tags
        if (social.socialNetwork === "Twitter") {
          let twTitle = document.querySelector('meta[name="twitter:title"]');
          if (!twTitle) {
            twTitle = document.createElement("meta");
            twTitle.setAttribute("name", "twitter:title");
            document.head.appendChild(twTitle);
          }
          twTitle.setAttribute("content", social.title);
  
          let twDesc = document.querySelector('meta[name="twitter:description"]');
          if (!twDesc) {
            twDesc = document.createElement("meta");
            twDesc.setAttribute("name", "twitter:description");
            document.head.appendChild(twDesc);
          }
          twDesc.setAttribute("content", social.description);
  
          let twImage = document.querySelector('meta[name="twitter:image"]');
          if (!twImage) {
            twImage = document.createElement("meta");
            twImage.setAttribute("name", "twitter:image");
            document.head.appendChild(twImage);
          }
          twImage.setAttribute("content", socialImageUrl);
        }
      });

      return () => {
        // Clean up meta tags when component unmounts (preventing the removeChild issue)
        document.title = "Default Title"; // Reset title
  
        // Clean up dynamically added meta tags
        const ogImageMeta = document.querySelector('meta[property="og:image"]');
        if (ogImageMeta) document.head.removeChild(ogImageMeta);
  
        const fbTitle = document.querySelector('meta[property="og:title"]');
        if (fbTitle) document.head.removeChild(fbTitle);
  
        const fbDesc = document.querySelector('meta[property="og:description"]');
        if (fbDesc) document.head.removeChild(fbDesc);
  
        const twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) document.head.removeChild(twTitle);
  
        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) document.head.removeChild(twDesc);
  
        const twImage = document.querySelector('meta[name="twitter:image"]');
        if (twImage) document.head.removeChild(twImage);
      };
    }
  }, [seoData]);

  const renderBanner = () => {
    const banner = homeData.find((item) => item.__component === "components.banner-hero");
    if (!banner) return null;
    const imageUrl = banner.bannerimg.data?.attributes.url ? `${BASE_URL}${banner.bannerimg.data.attributes.url}` : "";

    return (
      <div style={{ backgroundColor: "#fef9f5" }} className="py-5">
        <Container>
          <Row className="mainbanner">
            <Col md={6}>
              <h1 className="homeh1">{banner.Heading}</h1>
              <p className="homep py-3">{banner.subHeading}</p>
              <Button className="homepagebtn py-3" href={banner.btn.url}>
                {banner.btn.text}
              </Button>
            </Col>
            <Col md={6} className="homebannerimgcol">
              {imageUrl && (
                <Image src={imageUrl} alt="Banner Image" width={3654} height={2796} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  const renderCities = () => {
    const cities = homeData.find((item) => item.__component === "components.middle-hed-cards");
    if (!cities) return null;

    const knowMoreLinks = [
      "/service-areas/redding/",
      "/service-areas/chico/",
      "/service-areas/carson/",
      "/service-areas/grass-valley/",
      "/service-areas/yuba/",
      "/service-areas/medford/",
      "/service-areas/reno/",
      "/service-areas/san-jose/",
      "/service-areas/grants-pass/",
    ];

    return (
      <div className="py-5 HomecitiesBg">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="homeh2">{cities.Heading}</h2>
              <p className="homecitiesp py-3">{cities.description}</p>
            </Col>
          </Row>
          <Row>
            {cities.card?.map((card, index) => (
              <Col md={4} key={index}>
                <Card className="custom-card">
                  <Card.Body>
                    <div className="row">
                      <div
                        className="col-3 d-flex justify-content-center align-items-center"
                        style={{ paddingLeft: "10px", textAlign: "left" }}
                      >
                        <i className={`bi ${card.icon}`} style={{ fontSize: "30px", color: "#9c8c3f" }}></i>
                      </div>
                      <div className="col-9" style={{ paddingLeft: "10px", textAlign: "left" }}>
                        <h5 style={{ fontWeight: "600", fontSize: "18px" }}>{card.city}</h5>
                        <p style={{ fontWeight: "500", fontSize: "16px" }}>{card.phoneno}</p>
                      </div>
                    </div>
                    <div className="py-3">
                      <a href={knowMoreLinks[index]} className="knowmorelink">
                        <u>Know More</u>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HeaderComponent />
      <NavbarComponent />
      {renderBanner()}
      {renderCities()}
      <Footer />
    </>
  );
}
