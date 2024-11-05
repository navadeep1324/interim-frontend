"use client";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Image from "next/image";
import CaregivertodayComponent from "../../../../caregiversComponentMainCity";
import SanjoseNavbarComponent from "../../../../sanjosenavcomponent";
import SanJoseserviceFooter from "../../../../footerservicesanjose";
import Head from "next/head";
export default function RespiteCareComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    fetch("https://admin.interimhc.com/api/sanjose-respite-cares?populate[maincontent][populate]=*&populate[seo]=*")
      .then((response) => response.json())
      .then((responseData) => {
        // Adjusted the data access based on the JSON structure
        if (responseData?.data?.[0]?.attributes?.maincontent) {
          setData(responseData.data[0].attributes.maincontent);
          setSeoData(responseData.data[0]?.attributes?.seo);
        } else {
          throw new Error("Invalid data structure received");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
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
  if (loading) {
    return // //<div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : '';
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

  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null;
  
    return description.map((desc, index) => {
      // Handle paragraphs
      if (desc.type === 'paragraph') {
        return (
          <p key={index} className="py-3">
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
      <SanjoseNavbarComponent/>

      {/* Section 1: Banner */}
      <div className="section1banner">
        <Container>
          <Row className="py-5 middlealign g-5">
            <Col md="6">
              <h1 className="heading1">{data?.[0]?.Heading || ""}</h1>
              <p className="paragrambold py-2">{data?.[0]?.subHeading?.split("\n")[0] || ""}</p>
              <p className="py-4">
                {data?.[0]?.subHeading?.split("\n")[1] || ""}
                <br></br>
                Reach us today at <a href="tel:+1 408-286-6888" className="phone-link">+1 408-286-6888</a> to learn how we can assist your aging adults!

              </p>
            </Col>
            <Col md="6">
              {renderImage(
                data?.[0]?.bannerimg?.data?.attributes,
                "Compassionate Respite Care",
                3102,
                2064
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <CaregivertodayComponent />

      {/* Section 2 */}
      <div className="section3bg">
        <Container>
          <Row className="row3bg py-5 middlealign ">
            <Col md="4">
              {renderImage(
                data?.[1]?.img?.data?.attributes,
                "Extending your Caregiving Warmth Even During Your Absence",
                1785,
                2340
              )}
            </Col>
            <Col md="8">
              <h2 className="heading2">{data?.[1]?.Heading || ""}</h2>
              {renderDescription(data?.[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 3 */}
      <div className="servicessectionbg">
        <Container>
          <Row  className="middlealign g-5 row-reverse-mobile">
            <Col md="6">
              <h2 className="heading2">{data?.[2]?.Heading || ""}</h2>
              {renderDescription(data?.[2]?.description)}
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-2">
                {data?.[2]?.description?.[1]?.children?.map((item, index) => (
                  <li key={index}>{item?.children?.[0]?.text || ""}</li>
                ))}
              </ul>
            </Col>
            <Col md="6">
              {renderImage(
                data?.[2]?.img?.data?.attributes,
                "Our Commitments as Your Respite Caregiver",
                1878,
                1575
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 */}
      <div className="section3">
        <Container>
          <Row className="align-items-center g-5">
            <Col md="5">
              {renderImage(
                data?.[3]?.img?.data?.attributes,
                "Benefits of our Respite Caregiving",
                1785,
                2340
              )}
            </Col>
            <Col md="7">
              <h2 className="heading2">{data?.[3]?.Heading || ""}</h2>
              {renderDescription(data?.[3]?.description)}
              {/* <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-2">
                {data?.[3]?.description?.[1]?.children?.map((item, index) => (
                  <li key={index}>
                    {item?.children?.[0]?.text && (
                      <>
                        <b>{item?.children?.[0]?.text}</b>
                        {item?.children?.[1]?.text || ""}
                      </>
                    )}
                  </li>
                ))}
              </ul> */}
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="py-2">
  {data?.[3]?.description?.[1]?.children?.map((item, index) => (
    // Check if the list item text exists before rendering
    item?.children?.[0]?.text ? (
      <li key={index}>{item?.children?.[0]?.text}</li>
    ) : null // Do not render empty items
  ))}
</ul>

            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 */}
      <div className="section4">
        <Container>
          <Row className="section4sub middlealign">
            <Col md={6} className="section4sub-sanjose-col1">
              <h2 className="heading2">{data?.[4]?.Heading || ""}</h2>
              {renderDescription(data?.[4]?.description)}
              <Button className="Contactbtn py-3 my-3" href="/contact-us">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="section4sub-sanjose-col2">
              {renderImage(
                data?.[4]?.image?.data?.attributes,
                "Interim: Providing Help, When You Need It!",
                2408,
                1784
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
      <SanJoseserviceFooter  />
    </div>
  );
}
