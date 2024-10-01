"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SanjoseNavbarComponent from "../../../sanjosenavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import Image from "next/image";
import SanJoseservicesComponent from "../../../sanjoseservicecomponent";
import SanJoseFooter from "../../../footersanjose";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";

export default function LosAltosComponent() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:1337/api/los-altos-californias?populate[maincontent][populate]=*");
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>No data available</p>;

    const mainContent = data[0]?.attributes?.maincontent || [];

    const getImageUrl = (imageData) => {
        if (!imageData || !imageData.data) return null;
        return `http://127.0.0.1:1337${imageData.data.attributes.url}`;
    };

    const renderTextContent = (content) => {
        return content?.children?.map((item, idx) => {
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
            } else {
                // Handle new lines in text by splitting and wrapping in paragraphs
                return item.text.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        {i < item.text.split("\n").length - 1 && <br />}
                    </React.Fragment>
                ));
            }
        });
    };

    return (
        <div>
            <SanjoseNavbarComponent />
            <div className="section1subcity py-5">
                <Container fluid className="px-5">
                    <Row>
                        <Col md={8} className="sanjose-banner">
                            <h2 className="subcityheading">{mainContent[0]?.Heading}</h2>
                            <p className="py-3">{mainContent[0]?.subHeading}</p>
                            <p>For a quick consultation, give us a call at <a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a> and let us help you with the right care plan!</p>
                            <SubcityCaregiversComponent />
                        </Col>
                        <Col md={4} className="formcoloumcity">
                            <FormComponent />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{ backgroundColor: '#015979', height: '145px' }}></div>

            <SanJoseservicesComponent />
            <CaregiverCityComponent />

            {/* Start of components.left-img-right-content component */}
            <div className="section-left-img-right-content py-5">
                <Container fluid>
                    <Row>
                        <Col md={6} className="px-0">
                            {getImageUrl(mainContent[1]?.image) && (
                                <Image 
                                    src={getImageUrl(mainContent[1].image)} 
                                    alt={mainContent[1]?.image?.data?.attributes?.alternativeText || 'Image'} 
                                    width={mainContent[1]?.image?.data?.attributes?.width || 600} 
                                    height={mainContent[1]?.image?.data?.attributes?.height || 400} 
                                />
                            )}
                        </Col>
                        <Col md={6}>
                            <h2 className="heading2">{mainContent[1]?.Heading}</h2>
                            <div className="py-3">
                                {mainContent[1]?.description?.map((desc, index) => (
                                    <p key={index}>{renderTextContent(desc)}</p>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* End of components.left-img-right-content component */}

            <div className="section3subcity py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>
                                {mainContent[2]?.Heading}
                            </h2>
                            <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                                {mainContent[2]?.subHeading}
                            </p>
                        </Col>
                    </Row>
                </Container>
                <Container className="section4subcity py-5">
                    <Row>
                        <Col md={6} className="px-5">
                            <h5 className="head5evergreen">{mainContent[2]?.description?.[0]?.children[0]?.text}</h5>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', paddingTop: '20px' }}>
                                {mainContent[2]?.description?.[1]?.children?.map((item, index) => (
                                    <li key={index}>
                                        <p>{item?.children[0]?.text}</p>
                                    </li>
                                ))}
                            </ul>
                            <p className="py-4">{mainContent[2]?.description?.[2]?.children[0]?.text}</p>
                        </Col>
                        <Col md={6} className="px-0">
                            {getImageUrl(mainContent[2]?.img) && (
                                <Image 
                                    src={getImageUrl(mainContent[2]?.img)} 
                                    alt={mainContent[2]?.img?.data?.attributes?.alternativeText || 'Image'} 
                                    width={mainContent[2]?.img?.data?.attributes?.width || 600} 
                                    height={mainContent[2]?.img?.data?.attributes?.height || 400} 
                                />
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="py-5">
                <Container>
                    <Row>
                        <Col md={6} style={{ paddingRight: '25px' }}>
                            {getImageUrl(mainContent[3]?.image) && (
                                <Image 
                                    src={getImageUrl(mainContent[3]?.image)} 
                                    alt={mainContent[3]?.image?.data?.attributes?.alternativeText || 'Image'} 
                                    width={mainContent[3]?.image?.data?.attributes?.width || 600} 
                                    height={mainContent[3]?.image?.data?.attributes?.height || 400} 
                                />
                            )}
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{mainContent[3]?.Heading}</h2>
                            {mainContent[3]?.description?.map((desc, index) => (
                                <p key={index}>
                                    {desc.type === "paragraph" && renderTextContent(desc)}
                                </p>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{mainContent[4]?.Heading}</h2>
                            <p style={{ textAlign: 'center' }}>
                                {mainContent[4]?.description?.map((desc, index) => (
                                    <span key={index}>{renderTextContent(desc)}</span>
                                ))}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <SanJoseFooter />
        </div>
    );
}
