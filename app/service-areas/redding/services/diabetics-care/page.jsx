"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ReddingNavbarComponent from "../../../../reddingnavcomponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiverstodayComponent";
import ServicepageFooter from "../../../../servicepageFooter";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";
import Head from "next/head";

const BASE_URL = "https://admin.interimhc.com";

export default function DiabetesCareComponent() {
  const [diabetesData, setDiabetesData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/diabetics-care?populate[maincontent][populate]=*&populate[seo]=*`
        );
        console.log("Full API Response:", response.data); // Log full API response for debugging

        if (response.data.data && response.data.data.attributes) {
          setDiabetesData(response.data.data.attributes); // Main data
          // Ensure you're accessing the first element of the SEO array
          if (response.data.data.attributes.seo && response.data.data.attributes.seo.length > 0) {
            setSeoData(response.data.data.attributes.seo[0]); // Access the first element of the SEO array
          }
        }
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching data from Strapi", error);
        setError(error); // Capture any errors
        setLoading(false); // Stop loading in case of error
      }
    };
    fetchData();
  }, []);

  // Dynamically set the meta title and description once the seoData is fetched
  useEffect(() => {
    if (seoData) {
      console.log("SEO Data received:", seoData); // Log seoData for debugging
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
      console.log("No SEO Data received"); // Log if seoData is not available
    }
  }, [seoData]);

  if (loading) {
    return // //<div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Function to get image URL or return a fallback if needed
  const getImageUrl = (imageData) => {
    if (imageData?.formats?.large?.url) {
      return `https://admin.interimhc.com${imageData.formats.large.url}`;
    } else if (imageData?.url) {
      return `https://admin.interimhc.com${imageData.url}`;
    }
    return null;
  };

  // Function to render image with proper error handling and fallback
  const renderImage = (imageData, alt, width, height) => {
    if (!imageData) return null; // Avoid errors when imageData is undefined or null
    const imageUrl = getImageUrl(imageData);
    if (!imageUrl) return null;

    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        onError={(e) => console.error("Error loading image:", e)}
      />
    );
  };

  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null;
    
    return description.map((desc, index) => {
      // Handle paragraphs
      if (desc.type === 'paragraph') {
        return (
          <p key={index} className="py-1">
            {desc?.children?.map((child, idx) => {
              if (child.type === 'text') {
                return child.text;
              }
              if (child.type === 'link') {
                return (
                  <a key={idx} href={child.url} className="phone-link">
                    {child.children?.[0]?.text || 'Link'}
                  </a>
                );
              }
              return null;
            })}
          </p>
        );
      }
  
      // Handle unordered lists (bullet points)
      if (desc.type === 'list' && desc.format === 'unordered') {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {desc.children?.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item?.children?.[0]?.text || ""}
              </li>
            ))}
          </ul>
        );
      }
  
      // Handle headings (Assuming heading level comes from 'level' property in your JSON)
      if (desc.type === 'heading') {
        const HeadingTag = `h${desc.level}`; // Dynamically select heading tag (h2, h3, etc.)
        return (
          <HeadingTag key={index} className="section4-heading">
            {desc?.children?.[0]?.text || ""}
          </HeadingTag>
        );
      }
  
      return null;
    });
  };

  return (
    <div>
      {/* SEO Integration */}
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>

      <ReddingNavbarComponent />

      {/* First Section */}
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{diabetesData?.maincontent[0]?.Heading}</h1>
              <p className="paragram py-2">
                {diabetesData?.maincontent[0]?.subHeading.split('\n').map((str, index) => (
                  <span key={index}>{str}<br /></span>
                  
                ))}
               <br></br> Contact us today at <a href="tel:(530) 221-1212" className="phone-link">(530) 221-1212 </a>to give your loved ones a happier and healthier life! 
              </p>
            </Col>
            <Col md="6">
              {renderImage(diabetesData?.maincontent[0]?.bannerimg?.data?.attributes, "Diabetes Home Care", 1034, 688)}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregiverCityComponent />

      {/* Second Section */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {renderImage(diabetesData?.maincontent[1]?.img?.data?.attributes, "Diabetes Care Service", 595, 780)}
            </Col>
            <Col md="8">
              <h2 className="heading2">{diabetesData?.maincontent[1]?.Heading}</h2>
              {renderDescription(diabetesData?.maincontent[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="7">
              <h2 className="heading2">{diabetesData?.maincontent[2]?.Heading}</h2>
              {renderDescription(diabetesData?.maincontent[2]?.description)}
            </Col>
            <Col md="5">
              {renderImage(diabetesData?.maincontent[2]?.img?.data?.attributes, "Respite Care Service", 626, 525)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="5">
              {renderImage(diabetesData.maincontent[3].image.data.attributes, "Respite Care Service", 595, 780)}
            </Col>
            <Col md="7">
              <h2 className="heading2">{diabetesData?.maincontent[3]?.Heading}</h2>
              {renderDescription(diabetesData?.maincontent[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Final Section with Contact */}
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{diabetesData?.maincontent[4]?.Heading}</h2>
              {renderDescription(diabetesData?.maincontent[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="tel:/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(diabetesData?.maincontent[4]?.image?.data?.attributes, "Respite Care Contact", 589, 422)}
            </Col>
          </Row>
        </Container>
      </div>

      <ServicepageFooter />
    </div>
  );
}
