"use client";
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
  const [homeData, setHomeData] = useState(null);
  const [seoData, setSeoData] = useState(null); // SEO state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/homes?populate[maincontent][populate]=*&populate[seo]=*`
        );
        console.log("Full Response Data:", response.data); // Log the full response for debugging
        setHomeData(response.data.data[0].attributes.maincontent);
        setSeoData(response.data.data[0].attributes.seo); // Assuming seoData is in response.data.data[0].attributes.seo
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
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
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h2>Error Loading Data</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!homeData) {
    return null;
  }

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
                <Image src={imageUrl} alt="Banner Image" width={800} height={383} />
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
          <Row className="g-4">
            {cities.cardiconbox.map((card, index) => (
              <Col md={6} lg={4} key={card.id} className="d-flex align-items-stretch px-5">
                <Card className="flex-fill text-center card-container" style={{ border: "none" }}>
                  <Card.Header style={{ backgroundColor: "#d81c3f" }} className="py-3">
                    <p className="text2city">{card.card_hed}</p>
                  </Card.Header>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-start">
                      <div style={{ color: "#d81c3f", fontSize: "20px" }}>
                        <i className="bi bi-geo-alt-fill"></i>
                      </div>
                      <div style={{ paddingLeft: "10px", textAlign: "left" }}>
                        <p
                          style={{ fontWeight: "500", fontSize: "16px", whiteSpace: "pre-line" }}
                          dangerouslySetInnerHTML={{ __html: card.cardaddress.replace(",", ",<br />") }}
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start py-3">
                      <div style={{ color: "#d81c3f", fontSize: "20px" }}>
                        <i className="bi bi-telephone-fill"></i>
                      </div>
                      <div style={{ paddingLeft: "10px", textAlign: "left" }}>
                        <p style={{ fontWeight: "500", fontSize: "16px" }}>{card.cardphone}</p>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-muted" style={{ background: "#cae4f9", borderTop: "0px" }}>
                    <a href={knowMoreLinks[index] || "#"} style={{ fontWeight: "500", color: "#004b66" }}>
                      {card.button?.text || "Know More"}{" "}
                      <span style={{ color: "#d81c3f", fontWeight: "500" }}>
                        <i className="bi bi-chevron-right"></i>
                      </span>
                    </a>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  };

  const renderServices = () => {
    const services = homeData.filter((item) => item.__component === "components.services-home-list-all");
    if (!services.length) return null;

    return (
      <div style={{ background: "#fef8f3" }}>
        <Container>
          <Row className="py-5">
            <Col md={12}>
              <h2 className="heading2" style={{ color: "#003c52", textAlign: "center" }}>
                Care Plans for your Senior’s Regular and Future Needs
              </h2>
              <p className="py-3" style={{ textAlign: "center" }}>
                At Interim Healthcare, in-home care plans are tailored to meet both the immediate and long-term needs of
                your seniors. Choose from the range of our home care services.
              </p>
            </Col>
          </Row>
          <Row>
            {services.map((service, index) => {
              const serviceImageUrl = service.image?.data?.attributes?.url
                ? `${BASE_URL}${service.image.data.attributes.url}`
                : "";
              return (
                <Col md={4} key={index}>
                  {serviceImageUrl && (
                    <Image
                      src={serviceImageUrl}
                      alt={service.Heading}
                      width={380}
                      height={service.image.data.attributes.height}
                    />
                  )}
                  <p style={{ textAlign: "center", fontWeight: "500", color: "#d81c3f" }} className="py-3">
                    {service.Heading}
                  </p>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
        
      </Head>
      <NavbarComponent />
      <HeaderComponent />
      {renderBanner()}
      {renderCities()}
      {renderServices()}
      <Footer />
    </div>
  );
}