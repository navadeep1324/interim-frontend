"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SanjoseNavbarComponent from "../../../sanjosenavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import SanJoseservicesComponent from "../../../sanjoseservicecomponent";
import SanJoseFooter from "../../../footersanjose";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";

export default function EvergreenComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://127.0.0.1:1337/api/evergreen-cas?populate[maincontent][populate]=*');
                const json = await res.json();
                setData(json.data[0].attributes.maincontent);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) return <div>Loading...</div>;

    const getImageUrl = (imageData) => {
        return imageData?.formats?.large?.url
            ? `http://127.0.0.1:1337${imageData.formats.large.url}`
            : imageData?.url
            ? `http://127.0.0.1:1337${imageData.url}`
            : '/fallback-image.jpg'; // Fallback image
    };

    const renderTextContent = (content) => {
        return content?.children?.map((item, idx) => {
            if (item.type === "link") {
                const isExternalLink = item.url.startsWith("http");
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
                return <span key={idx}>{item.text}</span>; // Render text as a span for inline text rendering
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
                            <h2 className="subcityheading">{data[0]?.Heading}</h2>
                            <p className="py-3">{data[0]?.subHeading}</p>
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

            <div>
                <Container fluid>
                    <Row className="py-5">
                        <Col md={6} style={{ paddingRight: '25px' }} className="px-0">
                            {data[1]?.image?.data && (
                                <img 
                                    src={getImageUrl(data[1].image.data.attributes)} 
                                    alt={data[1]?.Heading || "Default Alt Text"} 
                                    width="100%" 
                                    height="auto"
                                />
                            )}
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{data[1]?.Heading}</h2>
                            {data[1]?.description.map((desc, index) => (
                                <p key={index} className="py-3">{renderTextContent(desc)}</p>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="section3subcity py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>
                                {data[2]?.Heading}
                            </h2>
                            <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>{data[2]?.subHeading}</p>
                        </Col>
                    </Row>
                </Container>
                <Container className="section4subcity py-5">
                    <Row>
                        <Col md={6} className="px-5">
                            <h5 className="head5evergreen">{data[2]?.description[0]?.children[0]?.text}</h5>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', paddingTop: '20px' }}>
                                {data[2]?.description[1]?.children.map((desc, index) => (
                                    <li key={index} className="py-2">
                                        {renderTextContent(desc)}
                                    </li>
                                ))}
                            </ul>
                            <p>
                                Contact us today at <a href="tel:+1 408-286-6888" className="phone-link">+1 408-286-6888</a> to learn more about our comprehensive senior care services in Evergreen, Ca.
                            </p>
                        </Col>
                        <Col md={6} className="px-0">
                            {data[2]?.img?.data && (
                                <img 
                                    src={getImageUrl(data[2].img.data.attributes)} 
                                    alt={data[2]?.Heading || "Default Alt Text"} 
                                    width="100%" 
                                    height="auto"
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
                            {data[3]?.image?.data && (
                                <img 
                                    src={getImageUrl(data[3].image.data.attributes)} 
                                    alt={data[3]?.Heading || "Default Alt Text"} 
                                    width="100%" 
                                    height="auto"
                                />
                            )}
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{data[3]?.Heading}</h2>
                            {data[3]?.description.map((desc, index) => (
                                <p key={index} className="py-3">{renderTextContent(desc)}</p>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{data[4]?.Heading}</h2>
                            <p style={{ textAlign: 'center' }}>{data[4]?.description[0]?.children[0]?.text}</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <SanJoseFooter />
        </div>
    );
}
