"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CityNavbarComponent from "../../citynavcomponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormComponent from "../../homeformcomponent";
import Image from "next/image";
import Button from 'react-bootstrap/Button';
import CitypageFooter from "../../CitypageFooter";
import GratspassNavbarComponent from "../../grantspassnavcomponent";
import SanJoseservicesComponent from "../../sanjoseservicecomponent"; // Don't forget to import this
import GrantspassserviceComponent from "../../grantpassservicecomponent";
import GrantpassFooter from "../../footergrantspass";

export default function GrantspassComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetching data from Strapi
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:1337/api/grant-passes?populate[maincontent][populate]=*"
                );
                setData(response.data.data[0].attributes.maincontent);
            } catch (error) {
                console.error("Error fetching data from Strapi:", error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    // Function to render child elements for paragraphs
    const renderDescription = (description) => {
        return description.map((para, i) => {
            if (para.type === "paragraph") {
                return (
                    <p key={i}>
                        {para.children.map((child, index) => (
                            <span key={index}>
                                {child.bold ? <strong>{child.text}</strong> : child.text}
                            </span>
                        ))}
                    </p>
                );
            }
            return null;
        });
    };

    return (
        <div>
            <GratspassNavbarComponent />
            {data.map((section, index) => {
                // Banner Hero Section
                if (section.__component === "components.banner-hero") {
                    return (
                        <div key={index}>
                            <div className="section1banner">
                                <Container>
                                    <Row className="py-3">
                                        <Col md={7} className="py-5" style={{paddingRight:"8%"}}>
                                            <h1>{section.Heading}</h1>
                                            <p className="py-3">{section.subHeading}</p>
                                        </Col>
                                        <Col md={5} className="formcoloumcity">
                                            <FormComponent />
                                        </Col>
                                    </Row>
                                </Container>
                            </div>

                            {/* Section 2 - Services */}
                            <div style={{ backgroundColor: '#015979', height: '145px' }}></div>
                            <div>
                                <GrantspassserviceComponent />
                            </div>
                        </div>
                    );
                }

                // Left Image, Right Content Section
                if (section.__component === "components.left-img-right-content") {
                    return (
                        <div className="section2city" key={index}>
                            <Container fluid>
                                <Row className="py-4">
                                    <Col md={6} className="px-5">
                                        {section.image?.data ? (
                                            <Image
                                                src={`http://127.0.0.1:1337${section.image.data.attributes.url}`}
                                                alt={section.image.data.attributes.alternativeText || "Section Image"}
                                                width={section.image.data.attributes.width}
                                                height={section.image.data.attributes.height}
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                    </Col>
                                    <Col md={6} style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                                        <h2 className="heading2 py-4">{section.Heading}</h2>
                                        {/* Rendering description */}
                                        {section.description && renderDescription(section.description)}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    );
                }

                // Right Image, Left Content Section
                if (section.__component === "components.right-img-left-content") {
                    return (
                        <div className="section3city py-5" key={index}>
                            <Container fluid>
                                <Row>
                                    <Col md={6} style={{ paddingRight: '3em', paddingLeft: '3em' }}>
                                        <h2 className="heading2 py-4">{section.Heading}</h2>
                                        {section.description && renderDescription(section.description)}
                                    </Col>
                                    <Col md={6} >
                                        {section.image?.data ? (
                                            <Image
                                                src={`http://127.0.0.1:1337${section.image.data.attributes.url}`}
                                                alt={section.image.data.attributes.alternativeText || "Section Image"}
                                                width={section.image.data.attributes.width}
                                                height={section.image.data.attributes.height}
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    );
                }

                // Middle Header and Description Section (with Image)
                if (section.__component === "components.middle-heddec-left-img-right-content") {
                    return (
                        <div className="section4city py-5" key={index}>
                            <Container>
                                <Row className="py-3">
                                    <Col md={2}></Col>
                                    <Col md={8}>
                                        <h2 className="heading2" style={{ textAlign: 'center' }}>{section.Heading}</h2>
                                        <p style={{ textAlign: 'center' }} className="py-2">{section.subHeading}</p>
                                    </Col>
                                    <Col md={2}></Col>
                                </Row>
                                <Row className="py-4">
                                    <Col md={6} >
                                        {section.img?.data ? (
                                            <Image
                                                src={`http://127.0.0.1:1337${section.img.data.attributes.url}`}
                                                alt={section.img.data.attributes.alternativeText || "Section Image"}
                                                width={section.img.data.attributes.width}
                                                height={section.img.data.attributes.height}
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                    </Col>
                                    <Col md={6} style={{ paddingLeft: '3em' }}>
                                        {section.description && renderDescription(section.description)}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    );
                }

                // Middle Header and Description (Without Image)
                if (section.__component === "components.middle-hed-dec") {
                    return (
                        <div className="section5city py-5" key={index}>
                            <Container>
                                <Row>
                                    <Col>
                                        <h2 className="heading2city py-3">{section.Heading}</h2>
                                        <p style={{ textAlign: 'center' }}>{section.description[0]?.children[0]?.text}</p>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    );
                }

                return null;
            })}

            <GrantpassFooter />
        </div>
    );
}