"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Accordion from 'react-bootstrap/Accordion';
import ReddingNavbarComponent from "../../../reddingnavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import CitypageFooter from "../../../CitypageFooter";
import ReddingservicesComponent from "../../../reddingservicesComponent";
import Head from "next/head";


const API_URL = "https://admin.interimhc.com";

export default function BellaVistaComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  // Fetch SEO and content data from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/bella-vistas?populate[maincontent][populate]=*&populate[seo][populate]=metaImage,metaSocial.image`
        );
        console.log("API Response:", response.data); // Log the entire response
        if (response.data && response.data.data.length > 0) {
          setData(response.data.data[0]?.attributes || {}); // Fetch content data
          setSeoData(response.data.data[0]?.attributes?.seo || {}); // Fetch SEO data
        } else {
          console.error("No data found in API response");
        }
      } catch (error) {
        console.error("Error fetching data from Strapi", error);
      }
    };
    fetchData();
  }, []);

  // Set meta title and description dynamically
  useEffect(() => {
    if (seoData) {
      document.title = seoData?.metaTitle || "Default Title";

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seoData?.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seoData?.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    }
  }, [seoData]);

  if (!data) {
    return <p>Loading...</p>;
  }

  // Helper function to handle external and internal links
  const handleLinkTarget = (url) => {
    return url.startsWith("http") ? "_blank" : "_self";
  };

  // Helper function to render content based on type
  // Helper function to render content based on type
const renderContent = (content) => {
  return content.map((desc, index) => {
    if (desc.type === "paragraph") {
      return (
        <p key={index}>
          {desc.children.map((child, childIndex) => {
            if (child.type === "text") {
              return <span key={`${index}-${childIndex}`}>{child.text} </span>;
            } else if (child.type === "link") {
              return (
                <a className="phone-link"                     key={`${index}-${childIndex}`}
                    href={child.url}
                    target={handleLinkTarget(child.url)}
                    rel="noopener noreferrer"
                  >
                    {child.children.map((linkChild, linkChildIndex) => (
                      <span key={`${index}-${childIndex}-${linkChildIndex}`}>{linkChild.text}</span>
                    ))}
                  </a>
              );
            } else if (child.type === "bold") {
              return <strong key={`${index}-${childIndex}`}>{child.text}</strong>;
            }
            return null;
          })}
        </p>
      );
    } else if (desc.type === "list" && desc.format === "unordered") {
      return (
        <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {desc.children.map((child, childIndex) => (
            <li key={`${index}-${childIndex}`}>
              {child.children.map((listChild, listChildIndex) => (
                <span key={`${index}-${childIndex}-${listChildIndex}`}>{listChild.text}</span>
              ))}
            </li>
          ))}
        </ul>
      );
    } else if (desc.type === "list" && desc.format === "ordered") {
      return (
        <ol key={index} style={{ paddingLeft: '20px' }}>
          {desc.children.map((child, childIndex) => (
            <li key={`${index}-${childIndex}`}>
              {child.children.map((listChild, listChildIndex) => (
                <span key={`${index}-${childIndex}-${listChildIndex}`}>{listChild.text}</span>
              ))}
            </li>
          ))}
        </ol>
      );
    } else if (desc.type === "heading") {
      return (
        <h2 key={index} className="heading2">
          {desc.children.map((child, childIndex) => (
            <span key={`${index}-${childIndex}`}>{child.text}</span>
          ))}
        </h2>
      );
    }
    return null;
  });
};


  return (
    <div>
      {/* Set SEO meta tags */}
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>

      <ReddingNavbarComponent />

      {/* Section 1 - Banner */}
      <div className="section1subcity">
        <Container fluid>
          <Row>
            <Col md={7} className="reddingsubcity-banner">
              <h2 className="subcityheading">{data?.maincontent?.[0]?.Heading || "Default Banner Title"}</h2>
              <p className="py-3">{data?.maincontent?.[0]?.subHeading || "Default Banner Description"}</p>
              <p>
                Contact us at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to schedule a complimentary assessment for your aging loved ones.
              </p>
              <SubcityCaregiversComponent />
            </Col>
            <Col md={4} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 2 - Services */}
      <div>
        <ReddingservicesComponent />
      </div>

      {/* Section 3 - Growing Demand */}
      <div>
        <Container fluid>
          <Row className="py-5 middlealign">
            <Col md={6}>
              {data?.maincontent?.[1]?.image?.data?.attributes?.url ? (
                <Image src={`${API_URL}${data.maincontent[1].image.data.attributes.url}`} alt="Growing Demand Image" width={1706} height={1052} />
              ) : (
                <p>Image not available</p>
              )}
            </Col>
            <Col md={6} className="redding-col2">
              <h2 className="heading2">{data?.maincontent?.[1]?.Heading || "Default Growing Demand Title"}</h2>
              <div className="py-3">
                {renderContent(data?.maincontent?.[1]?.description || [])}
              </div>
            </Col>
          </Row>
        </Container>
      </div>


      {/* Section 4 - Health Care Plans */}
      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>
                {data?.maincontent?.[2]?.Heading || "Default Health Care Plans Title"}
              </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                {data?.maincontent?.[2]?.subHeading || "Default Health Care Plans Description"}
              </p>
            </Col>
          </Row>
        </Container>

        <Container className="section4subcity py-5">
          <Row className="middlealign">
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">{data?.maincontent?.[2]?.Heading || "Default Specialized Plans Title"}</h5>
              <div className="py-4">
                {renderContent(data?.maincontent?.[2]?.description || [])}
               
              </div>
            </Col>
            <Col md={4}>
              {data?.maincontent?.[2]?.img?.data?.attributes?.url ? (
                <Image src={`${API_URL}${data.maincontent[2].img.data.attributes.url}`} alt="Plan Image" width={400} height={300} />
              ) : (
                <p>Plan image not available</p>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 7 - FAQ */}
      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How can caregivers improve my senior’s physical and mental health?</Accordion.Header>
              <Accordion.Body>
                Our caregivers are experienced in senior care. They form meaningful bonds with your seniors to uplift their life with positive reinforcement and meaningful assistance.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How does Interim Healthcare improve the social life of my senior?</Accordion.Header>
              <Accordion.Body>
                Interim Healthcare offers Companion Care which enhances your loved one’s life with the warmth of companionship. Our caregivers engage them in meaningful activities that foster social wellness.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Why should I choose Interim Healthcare for my loved one?</Accordion.Header>
              <Accordion.Body>
                At Interim Healthcare, we offer personalized care plans with the option of flexible scheduling and payment options to make life easier for you and your elderly.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      {/* Section 6 - Golden Years */}
      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">{data?.maincontent?.[3]?.Heading || "Default Golden Years Title"}</h2>
              <div style={{ textAlign: 'center' }}>
                {renderContent(data?.maincontent?.[3]?.description || [])}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <CitypageFooter />
    </div>
  );
}
