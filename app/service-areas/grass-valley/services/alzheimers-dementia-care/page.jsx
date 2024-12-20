"use client";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregiverCityComponent from "../../../../caregiversComponentMainCity";

// // Default Images for fallback
// import Alzheimersimg from "/public/images/Alzheimersimg.png";
// import Happier from "/public/images/Happier.png";
// import Services5img from "/public/images/Services5img.png";
// import servicesimg from "/public/images/servicesimg.png";
import GrassValleyNavbarComponent from "../../../../grassvalleynavcomponent";
import GrassValleyFooter from "../../../../footerservicegrssvalley";
import Head from "next/head";

export default function AlzheimerMainComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const API_URL = 'https://admin.interimhc.com';

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/api/grass-valley-alzheimer-s-and-dementia-cares?populate[maincontent][populate]=*&populate[seo]=*`);
        const result = await res.json();

        if (result?.data[0]?.attributes?.maincontent) {
          setData(result.data[0].attributes.maincontent);
          setSeoData(result.data[0]?.attributes?.seo);
        } else {
          throw new Error("Main content not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
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
    return // //<div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  // Helper function to get image URL safely
  const getImageUrl = (imageData) => {
    if (imageData && imageData.url && imageData.width && imageData.height) {
      return {
        src: `${API_URL}${imageData.url}`, // Full image URL
        width: imageData.width, // Original width
        height: imageData.height, // Original height
      };
    }
    return null; // Return null if image data is missing
  };
  // Render descriptions with safety checks
  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null;
  
    return description.map((desc, index) => {
      // Handle paragraphs
      if (desc.type === 'paragraph') {
        const hasValidContent = desc?.children?.some((child) => {
          if (child.type === 'text' && child.text.trim() !== '') return true;
          if (child.type === 'link' && child.url) return true;
          return false;
        });
  
        if (!hasValidContent) return null;
  
        return (
          <p key={index} className="py-2">
            {desc?.children?.map((child, idx) => {
              if (child.type === 'text') {
                return (
                  <span key={idx} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                    {child.text}
                  </span>
                );
              }
              if (child.type === 'link') {
                const isExternalLink = child.url.startsWith('http');
                return (
                  <a
                    key={idx}
                    href={child.url}
                    className="phone-link"
                    target={isExternalLink ? "_blank" : "_self"}
                    rel={isExternalLink ? "noopener noreferrer" : ""}
                    style={{ fontWeight: child.bold ? 'bold' : 'normal' }}
                  >
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
                {item?.children?.map((child, idx) => {
                  if (child.type === 'text') {
                    return (
                      <span key={idx} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                        {child.text}
                      </span>
                    );
                  }
                  if (child.type === 'link') {
                    const isExternalLink = child.url.startsWith('http');
                    return (
                      <a
                        key={idx}
                        href={child.url}
                        className="phone-link"
                        target={isExternalLink ? "_blank" : "_self"}
                        rel={isExternalLink ? "noopener noreferrer" : ""}
                        style={{ fontWeight: child.bold ? 'bold' : 'normal' }}
                      >
                        {child.children?.[0]?.text || 'Link'}
                      </a>
                    );
                  }
                  return null;
                })}
              </li>
            ))}
          </ul>
        );
      }
  
      // Handle headings (Assuming heading level comes from 'level' property in your JSON)
      if (desc.type === 'heading') {
        const HeadingTag = `h${desc.level}`;
        return (
          <HeadingTag key={index} className="section4-heading">
            {desc?.children?.map((child, idx) => (
              <span key={idx} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                {child.text || ""}
              </span>
            ))}
          </HeadingTag>
        );
      }
  
      return null;
    });
  };
  
  return (
    <div>
      <GrassValleyNavbarComponent />

      {/* First Section */}
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data[0]?.Heading || "Default Heading"}</h1>
              <p className="paragrambold py-2">{data[0]?.subHeading?.split("\n")[0]}</p>
              <p className="py-2">{data[0]?.subHeading?.split("\n")[1]}</p>
              {/* Commented out button as per user request */}
              {/* <Button className={styles.buttonhome} href="tel:+1 530-899-9777"> */}
              {/* +1 530-899-9777 */}
              {/* </Button> */}
              <p>Reach us today at <a href="tel:+1 530-272-0300" className="phone-link">+1 530-272-0300</a> to learn how we can assist your aging adults!</p>

            </Col>
            <Col md="6" className="d-flex justify-content-center">
              {data[0]?.bannerimg?.data ? (
                <Image
                  src={getImageUrl(data[0].bannerimg.data.attributes)}
                  alt="Alzheimer’s and Dementia Home care Services"
                  width={626}
                  height={525}
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
          <Row className="row3bg py-5 middlealign">
            <Col md="4">
              {data[1]?.img?.data ? (
                <Image
                  src={getImageUrl(data[1].img.data.attributes)}
                  alt="Choose Interim Healthcare for a Happier Tomorrow"
                  width={data[1].img.data.attributes.width}
                  height={data[1].img.data.attributes.height}
                />
              ) : (
                <Image src={Happier} alt="Happier Image" width={400} height={400} />
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data[1]?.Heading}</h2>
              {data[1]?.description ? renderDescription(data[1].description) : <p>No description available</p>}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Third Section */}
      <div className="servicessectionbg">
        <Container>
          <Row className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data[2]?.Heading}</h2>
              {/* {data[2]?.description ? renderDescription(data[2].description) : <p>No description available</p>} */}
              <p className="py-2">Choosing Memory care services for your loved ones can be challenging, but here are some signs that they may require professional care to manage this condition.
              <ul className="px-3 py-3">
              <li>Safety concerns</li>
<li>Risk of falls</li>
<li>Noticeable weight loss</li>
<li>Forgetfulness</li>
<li>Social isolation</li>
<li>Depression</li>
<li>Persistent sadness</li>
<li>Decline in personal hygiene</li>
<li>Agitation or aggression</li>
<li>Confusion about time or place</li>
              </ul>
              
If you notice any of these signs in your beloved elders, then it might be the right time to choose our in home memory care services. Our caregivers provide the best care possible to prevent worsening of the condition.</p>
           
            </Col>
            <Col md="6">
              {data[2]?.img?.data ? (
                <Image
                  src={getImageUrl(data[2].img.data.attributes)}
                  alt="When is the right time to choose Memory Care"
                  width={data[2].img.data.attributes.width}
                  height={data[2].img.data.attributes.height}
                />
              ) : (
                <Image src={servicesimg} alt="Default Service Image" width={500} height={400} />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fourth Section */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="6">
              {data[3]?.image?.data ? (
                <Image
                  src={getImageUrl(data[3].image.data.attributes)}
                  alt="Benefits of Memory Care"
                  width={data[3].image.data.attributes.width}
                  height={data[3].image.data.attributes.height}
                />
              ) : (
                <Image src={Services5img} alt="Services Image" width={500} height={400} />
              )}
            </Col>
            <Col md="6">
              <h2 className="heading2">{data[3]?.Heading}</h2>
              {data[3]?.description ? renderDescription(data[3].description) : <p>No description available</p>}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Fifth Section */}
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6}  className="section4sub-sanjose-col1">
              <h2 className="heading2">{data[4]?.Heading}</h2>
              {data[4]?.description ? renderDescription(data[4].description) : <p>No description available</p>}
              <Button className="Contactbtn py-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6}  className="section4sub-sanjose-col2">
              {data[4]?.image?.data ? (
                <Image
                  src={getImageUrl(data[4].image.data.attributes)}
                  alt="Contact Us"
                  width={data[4].image.data.attributes.width}
                  height={data[4].image.data.attributes.height}
                />
              ) : (
                <Image src={Services5img} alt="Contact Us Image" width={500} height={400} />
              )}
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
