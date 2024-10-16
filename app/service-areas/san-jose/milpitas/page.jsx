"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SanjoseNavbarComponent from "../../../sanjosenavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import Image from "next/image";
import Button from 'react-bootstrap/Button';
import SanJoseservicesComponent from "../../../sanjoseservicecomponent";
import SanJoseFooter from "../../../footersanjose";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";
import Head from "next/head";
export default function MilpitasPage() {
    const [content, setContent] = useState([]);
    const [seoData, setSeoData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://admin.interimhc.com/api/milpitas-californias?populate[maincontent][populate]=*&populate[seo]=*");
                const data = await response.json();
                setContent(data?.data?.[0]?.attributes?.maincontent || []);
                setSeoData(data.data[0]?.attributes?.seo);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
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

    if (content.length === 0) {
        return <p>Loading...</p>;
    }

    const renderTextContent = (content) => {
        if (!Array.isArray(content)) {
            return null; // Return null if content is not an array
        }
    
        return content.map((item, idx) => {
            if (item.type === "link") {
                const isExternalLink = item.url.startsWith("http") || item.url.startsWith("tel");
                return (
                    <a
                        key={idx}
                        href={item.url}
                        className="phone-link"
                        target={isExternalLink ? "_blank" : "_self"}
                        rel={isExternalLink ? "noopener noreferrer" : undefined}
                    >
                        {item.children[0]?.text}
                    </a>
                );
            } else if (item.type === "text") {
                // Handle new lines in text by splitting and wrapping in paragraphs
                return item.text.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        {i < item.text.split("\n").length - 1 && <br />}
                    </React.Fragment>
                ));
            } else if (item.type === "paragraph" || item.type === "list-item") {
                return (
                    <p key={idx} className="py-3">
                        {renderTextContent(item.children)}
                    </p>
                );
            } else if (item.type === "list") {
                return (
                    <ul key={idx} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        {item.children?.map((listItem, index) => (
                            <li key={index}>
                                {renderTextContent(listItem.children)}
                            </li>
                        ))}
                    </ul>
                );
            }
        });
    };

    return (
        <div>
            <SanjoseNavbarComponent />
            <div className="section1subcity py-5">
                <Container fluid className="px-5">
                    <Row>
                        <Col md={7} className="sanjose-banner">
                            <h2 className="subcityheading">{content[0]?.Heading || "Default Heading"}</h2>
                            <p className="py-3">{content[0]?.subHeading || "Default Subheading"}</p>
                            <p>Reach out to us at<a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a> to find out how we can help. 
              </p>
                            <SubcityCaregiversComponent />
                        </Col>
                        <Col md={4} className="formcoloumcity">
                            <FormComponent />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                <SanJoseservicesComponent />
            </div>
            {/* <CaregiverCityComponent/> */}
            <div>
                <Container fluid>
                    <Row className="py-5 middlealign">
                        <Col md={6}  className="px-0">
                            {content[1]?.image?.data && (
                                <Image src={`https://admin.interimhc.com${content[1].image.data.attributes.url}`} width={1878} height={1575} alt="Milpitas Image 1"  style={{ transform: "scaleX(-1)" }} />
                            )}
                        </Col>
                        <Col md={6} className="sanjose-col" >
                            <h2 className="heading2">{content[1]?.Heading || "Default Heading"}</h2>
                            {renderTextContent(content[1]?.description)}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="section3subcity py-5">
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>{content[2]?.Heading || "Default Heading"}</h2>
                                <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>{content[2]?.subHeading || "Default Subheading"}</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    <Container className="section4subcity py-5">
                        <Row>
                            <Col md={7} className="px-5">
                                <h5 className="head5evergreen">Here are a few key features of all our Home Healthcare plans for seniors:</h5>
                                {/* {renderTextContent(content[2]?.description)} */}
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li>
                <p>Long-term care support for seniors who face challenges in daily living.  </p></li>
                <li>
                <p>Specialized home healthcare assistance for seniors with chronic diseases.    </p>
                </li>
                <li>
                <p>Veteran Care for our nation’s cherished veterans and their surviving spouses.  </p>
                </li>
                <li>
                <p>Assistance with Medicare claims for home care services.  </p>
                </li>
                </ul>
                <p>If you’d like to know in-depth information about our care plans and need help to decide a suitable service for your senior loved one, just give us a call at <a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a>. </p>
                            </Col>
                            <Col md={5} className="px-0">
                                {content[2]?.img?.data && (
                                    <Image src={`https://admin.interimhc.com${content[2].img.data.attributes.url}`} width={1878} height={1575} alt="Milpitas Image 2" />
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <div className="py-5">
                <Container>
                    <Row>
                        <Col md={5} style={{ paddingRight: '25px' }}>
                            {content[3]?.image?.data && (
                                <Image src={`https://admin.interimhc.com${content[3].image.data.attributes.url}`} width={1785} height={2340} alt="Milpitas Image 3" />
                            )}
                        </Col>
                        <Col md={7} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{content[3]?.Heading || "Default Heading"}</h2>
                            {renderTextContent(content[3]?.description)}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{content[4]?.Heading || "Default Heading"}</h2>
                            <p style={{textAlign:'center'}}>{renderTextContent(content[4]?.description)}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
            <SanJoseFooter/>
        </div>
    );
}
