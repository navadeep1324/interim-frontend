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

export default function SanJoseCupertinoComponent() {
    const [cityData, setCityData] = useState(null);

    useEffect(() => {
        const fetchCityData = async () => {
            const response = await fetch('https://admin.interimhc.com/api/sunnyvale-californias?populate[maincontent][populate]=*');
            const data = await response.json();
            setCityData(data.data ? data.data[0].attributes : null);
        };

        fetchCityData();
    }, []);

    if (!cityData) {
        return <div>Loading...</div>;
    }

    const renderDescription = (description) => {
        return description.map((item, index) => {
            switch (item.type) {
                case "paragraph":
                    return (
                        <p key={index}>
                            {item.children.map((child, i) => (
                                child.bold ? <strong key={i}>{child.text}</strong> : <span key={i}>{child.text}</span>
                            ))}
                        </p>
                    );
                case "list":
                    // Handle both unordered and ordered lists
                    const ListTag = item.format === "unordered" ? "ul" : "ol";
                    return (
                        <ListTag key={index}>
                            {item.children.map((listItem, i) => (
                                <li key={i}>
                                    {listItem.children.map((child, j) => (
                                        <span key={j}>{child.text}</span>
                                    ))}
                                </li>
                            ))}
                        </ListTag>
                    );
                default:
                    return null;
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
                            <h2 className="subcityheading">{cityData.maincontent[0].Heading}</h2>
                            <p className="py-3">{cityData.maincontent[0].subHeading}</p>
                            <p>  To know more about us, call us for a free consultation at <a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a> to schedule a free home assessment, and we will help you decide the right care plan your seniors need! 
              </p>
                            <SubcityCaregiversComponent />
                        </Col>
                        <Col md={4} className="formcoloumcity">
                            <FormComponent />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{ backgroundColor: '#015979', height: '145px' }}></div>
            <div>
                <SanJoseservicesComponent />
            </div>
            <CaregiverCityComponent/>
            <div>
                <Container fluid>
                    <Row className="py-5">
                        <Col md={6} className="px-0">
                            {cityData.maincontent[1].image?.data && (
                                <Image
                                    src={`https://admin.interimhc.com${cityData.maincontent[1].image.data.attributes.url}`}
                                    alt={cityData.maincontent[1].image.data.attributes.alternativeText || cityData.maincontent[1].image.data.attributes.name}
                                    width={cityData.maincontent[1].image.data.attributes.width}
                                    height={cityData.maincontent[1].image.data.attributes.height}
                                />
                            )}
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{cityData.maincontent[1].Heading}</h2>
                            <div className="py-3">
                                {renderDescription(cityData.maincontent[1].description)}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="section3subcity py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2" style={{ color: '#fff', textAlign: 'center' }}>
                                {cityData.maincontent[2].Heading}
                            </h2>
                            <p className="py-3" style={{ color: '#fff', textAlign: 'center' }}>
                                {cityData.maincontent[2].subHeading}
                            </p>
                        </Col>
                    </Row>
                </Container>
                <Container className="section4subcity py-5">
                    <Row>
                        <Col md={6} className="px-5">
                            <h5 className="head5evergreen">
                                {cityData.maincontent[2].description[0].children[0].text}
                            </h5>
                            {renderDescription(cityData.maincontent[2].description)}
                        </Col>
                        <Col md={6} className="px-0">
                            {cityData.maincontent[2].img?.data && (
                                <Image
                                    src={`https://admin.interimhc.com${cityData.maincontent[2].img.data.attributes.url}`}
                                    alt={cityData.maincontent[2].img.data.attributes.alternativeText || cityData.maincontent[2].img.data.attributes.name}
                                    width={cityData.maincontent[2].img.data.attributes.width}
                                    height={cityData.maincontent[2].img.data.attributes.height}
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
                            {cityData.maincontent[3].image?.data && (
                                <Image
                                    src={`https://admin.interimhc.com${cityData.maincontent[3].image.data.attributes.url}`}
                                    alt={cityData.maincontent[3].image.data.attributes.alternativeText || cityData.maincontent[3].image.data.attributes.name}
                                    width={cityData.maincontent[3].image.data.attributes.width}
                                    height={cityData.maincontent[3].image.data.attributes.height}
                                />
                            )}
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{cityData.maincontent[3].Heading}</h2>
                            <div style={{ paddingTop: '20px' }}>
                                {renderDescription(cityData.maincontent[3].description)}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{cityData.maincontent[4].Heading}</h2>
                            <p style={{ textAlign: 'center' }}>
                                {cityData.maincontent[4].description[0].children[0].text}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <SanJoseFooter/>
        </div>
    );
}
