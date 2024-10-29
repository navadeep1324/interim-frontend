"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReddingNavbarComponent from "../../../carsonnavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import Button from "react-bootstrap/Button";
import CitypageFooter from "../../../footercarson";
import ReddingservicesComponent from "../../../carsonservicecomponent";
import Accordion from "react-bootstrap/Accordion";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";
import Head from "next/head";
import Image from "next/image";

const BASE_URL = "https://admin.interimhc.com";

export default function MoundHouseComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    fetch(
      "https://admin.interimhc.com/api/reno-midens?populate[maincontent][populate]=*&populate[seo]=*"
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log("API Response:", responseData);

        const isDataArray = Array.isArray(responseData.data);
        const mainData = isDataArray
          ? responseData.data[0]?.attributes?.maincontent
          : responseData.data?.attributes?.maincontent;
        const seoData = isDataArray
          ? responseData.data[0]?.attributes?.seo
          : responseData.data?.attributes?.seo;

        if (mainData) {
          setData(mainData); // Set main content data
          setSeoData(seoData); // Set SEO data
        } else {
          throw new Error("Invalid data structure received");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (seoData && Array.isArray(seoData) && seoData.length > 0) {
      const seo = seoData[0]; // Access the first element of the seoData array
      console.log("SEO Data received:", seo); // Log seoData for debugging
      document.title = seo.metaTitle || "Default Title";

      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          seo.metaDescription || "Default Description"
        );
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seo.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    } else {
      console.log("No SEO Data received");
    }
  }, [seoData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const renderImage = (imageData, alt) => {
    if (imageData && imageData.attributes) {
      // Extract formats (medium, large, etc.)
      const formats = imageData.attributes.formats;
  
      // Choose the appropriate format (fallback to original if needed)
      const selectedImage = formats?.medium || formats?.large || formats?.small || imageData.attributes;
  
      const { url, width, height } = selectedImage; // Extract URL, width, and height
  
      if (!url || !width || !height) {
        console.error("Invalid image data:", imageData);
        return null; // Return null if necessary data is missing
      }
  
      return (
        <Image
          src={`https://admin.interimhc.com${url}`} // Full image URL
          alt={alt} // Alt text
          width={width} // Extracted width
          height={height} // Extracted height
          onError={(e) => console.error("Error loading image:", e)} // Error handling
        />
      );
    }
  
    console.error("Image data is missing or invalid:", imageData);
    return null; // Return null if no image data
  };
    
  

  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null;
  
    const renderedText = new Set(); // Track rendered text to avoid duplicates
  
    return description.map((desc, index) => {
      // Handle paragraphs, ensuring no duplicates or empty paragraphs
      if (desc.type === "paragraph") {
        const paragraphContent = desc?.children
          ?.map((child) => (child.type === "text" ? child.text.trim() : ""))
          .join("");
  
        if (!paragraphContent || renderedText.has(paragraphContent)) return null; // Skip empty or duplicate paragraphs
        renderedText.add(paragraphContent); // Track rendered paragraph text
  
        return (
          <p key={index} className="py-2">
            {desc?.children?.map((child, idx) => {
              if (child.type === "text") {
                return child.bold ? <b key={idx}>{child.text}</b> : child.text;
              }
              if (child.type === "link") {
                return (
                  <a key={idx} href={child.url} className="phone-link">
                    {child.children?.[0]?.text || "Link"}
                  </a>
                );
              }
              return null;
            })}
          </p>
        );
      }
  
      // Handle unordered lists (bullet points)
      if (desc.type === "list" && desc.format === "unordered") {
        return (
          <ul key={index} style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            {desc.children?.map((item, itemIndex) => {
              const listItemContent = item?.children
                ?.map((child) => (child.type === "text" ? child.text.trim() : ""))
                .join("");
  
              if (!listItemContent && !item.children?.some(child => child.type === "link")) return null; // Skip empty list items with no links
  
              return (
                <li key={itemIndex}>
                  {item?.children?.map((child, idx) => {
                    if (child.type === "text") {
                      return child.bold ? <b key={idx}>{child.text}</b> : child.text;
                    }
                    if (child.type === "link") {
                      return (
                        <a key={idx} href={child.url} className="phone-link">
                          {child.children?.[0]?.text || "Link"}
                        </a>
                      );
                    }
                    return null;
                  })}
                </li>
              );
            })}
          </ul>
        );
      }
  
      // Handle headings, ensuring no duplicates
      if (desc.type === "heading") {
        const headingContent = desc?.children?.[0]?.text.trim() || "";
        if (!headingContent || renderedText.has(headingContent)) return null; // Skip empty or duplicate headings
        renderedText.add(headingContent); // Track rendered heading text
  
        const HeadingTag = `h${desc.level}`;
        return (
          <HeadingTag key={index} className="section4-heading">
            {headingContent}
          </HeadingTag>
        );
      }
  
      return null;
    });
  };
  
  const renderList = (listData) => {
    if (!listData || !Array.isArray(listData)) return null;

    return (
      <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-4">
        {listData.map((item, index) => (
          <li key={index}>
            {/* Check if the item has a link or a text node */}
            {item.children?.map((child, childIndex) => {
              if (child.type === "link") {
                return (
                  <a href={child.url} key={childIndex} className="phone-link">
                    {child.children?.[0]?.text || "Link"}
                  </a>
                );
              }
              if (child.type === "text") {
                return <span key={childIndex}>{child.text}</span>;
              }
              return null;
            })}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <ReddingNavbarComponent />

      <div className="section1subcity">
        <Container fluid>
          <Row>
            <Col md={7} className="reddingsubcity-banner">
              <h2 className="subcityheading">{data[0]?.Heading}</h2>
              <p className="py-3">{data[0]?.subHeading}</p>
              <p>
                To know more about our personalized in-home care plans, Call{" "}
                <a href="tel:+1 775-883-4455" className="phone-link">
                  +1 775-883-4455
                </a>
              </p>
              <SubcityCaregiversComponent />
            </Col>
            <Col md={4} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>

      <ReddingservicesComponent />

      <div>
        <Container fluid>
          <Row className="py-5 middlealign">
            <Col md={6}>
            {renderImage(data?.[1]?.image?.data?.attributes, "Veteran Home Care")}      
            </Col>      <Col md={6} className="redding-col2 px-5">
              <h2 className="heading2">{data[1]?.Heading}</h2>
              <p className="py-2">{renderDescription(data[1]?.description)}</p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: "#ffff", textAlign: "center" }}>
                {data[2]?.Heading || "Fallback Heading"}
              </h2>
              <p className="py-3" style={{ color: "#ffff", textAlign: "center" }}>
                {data[2]?.subHeading || "Fallback Subheading"}
              </p>
            </Col>
          </Row>
        </Container>

        <Container className="section4subcity py-5">
          <Row>
            <Col md={9} className="px-5">
              <h5 className="heading5subcity">
                {data[2]?.description[0]?.children[0]?.text ||
                  "Our primary in-home care services include:"}
              </h5>
              {renderList(data[2]?.description[1]?.children)}
              <p>
                {data[2]?.description[2]?.children?.[0]?.text ||
                  "Fallback description about care services."}
              </p>
            </Col>

            <Col md={3}>
              {renderImage(data[2]?.img?.data, "Caregiver Image 1")} {/* Render Strapi image */}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <Row>
            <Col md={4} style={{ paddingRight: "25px" }}>
              {renderImage(data[3]?.image?.data, "Quality Care Image")} {/* Render Strapi image */}
            </Col>
            <Col md={8}>
              <h2 className="heading2">{data[3]?.Heading || "Quality Care from Our Expert Team"}</h2>
              {renderDescription(data[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">
                {data[4]?.Heading || "Your Comfort is Our Priority!"}
              </h2>
              <div style={{ textAlign: "center" }}>{renderDescription(data[4]?.description)}</div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: "center" }}>
            Frequently Asked Questions
          </h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
              How do you support families in the caregiving process?
              </Accordion.Header>
              <Accordion.Body>
              We provide resources, training, and respite care options for family members, allowing them to take necessary breaks while ensuring their loved ones receive quality care. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
              What is the process for starting in home care services? 
              </Accordion.Header>
              <Accordion.Body>
              To begin, simply contact us at <a href="tel:+1 775-883-4455" className="phone-link">+1 775-883-4455</a> for a consultation. We’ll discuss your needs, conduct an assessment, and create a personalized care plan that meets your specific requirements. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
              What measures do you take to ensure caregiver consistency? 
              </Accordion.Header>
              <Accordion.Body>
              We strive to provide consistency by assigning caregivers who are best suited to each client’s needs. Whenever possible, we aim to keep the same caregiver for each client to foster trust and familiarity. 
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>

      <CitypageFooter />
    </div>
  );
}
