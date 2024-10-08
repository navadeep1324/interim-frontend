"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import SanjoseNavbarComponent from "../../../sanjosenavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import SanJoseservicesComponent from "../../../sanjoseservicecomponent";
import SanJoseFooter from "../../../footersanjose";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";

export default function SanJoseCupertinoComponent() {
    const [santaClaraData, setSantaClaraData] = useState(null);

    useEffect(() => {
        const fetchSantaClaraData = async () => {
            try {
                const response = await fetch('https://admin.interimhc.com/api/santa-clara-cas?populate[maincontent][populate]=*');
                const data = await response.json();
                setSantaClaraData(data.data[0].attributes);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchSantaClaraData();
    }, []);

    if (!santaClaraData) {
        return <div>Loading...</div>;
    }

    // Extract data for different sections based on component type
    const bannerHero = santaClaraData.maincontent.find(content => content.__component === "components.banner-hero");
    const leftImgRightContent = santaClaraData.maincontent.filter(content => content.__component === "components.left-img-right-content");
    const middleHedDecLeftImgRightContent = santaClaraData.maincontent.find(content => content.__component === "components.middle-heddec-left-img-right-content");
    const middleHedDec = santaClaraData.maincontent.find(content => content.__component === "components.middle-hed-dec");

    // Function to render all types of rich text content including paragraphs, links, lists, and more
    const renderTextContent = (description) => {
        if (!Array.isArray(description)) return null;

        return description.map((desc, index) => {
            switch (desc.type) {
                case 'text':
                    return <span key={index}>{desc.text}</span>;

                case 'link':
                    return (
                        <a key={index} href={desc.url} target="_blank" className="phone-link" rel="noopener noreferrer">
                            {desc.children[0].text}
                        </a>
                    );

                case 'paragraph':
                    return <p key={index}>{renderTextContent(desc.children)}</p>;

                case 'list':
                    return (
                        <ul key={index} style={{ listStyleType: desc.format === 'unordered' ? 'disc' : 'decimal', paddingLeft: '20px' }}>
                            {desc.children.map((listItem, idx) => (
                                <li key={idx}>{renderTextContent(listItem.children)}</li>
                            ))}
                        </ul>
                    );

                case 'list-item':
                    return <li key={index}>{renderTextContent(desc.children)}</li>;

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
                            <h2 className="subcityheading">{bannerHero.Heading}</h2>
                            <p className="py-3">{bannerHero.subHeading}</p>
                            <p>Call us today at <a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a> for a free consultation for your loved one.</p>
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

            {/* First Image and Text Section */}
            <Container fluid>
                <Row className="py-5">
                    <Col md={6} style={{ paddingRight: '25px' }} className="px-0">
                        {leftImgRightContent[0]?.image?.data ? (
                            <Image
                                src={`https://admin.interimhc.com${leftImgRightContent[0].image.data.attributes.url}`}
                                alt={leftImgRightContent[0].image.data.attributes.alternativeText || ""}
                                width={leftImgRightContent[0].image.data.attributes.width}
                                height={leftImgRightContent[0].image.data.attributes.height}
                            />
                        ) : (
                            <Image src={SantaClara1} alt="Default Image" />
                        )}
                    </Col>
                    <Col md={6} style={{ paddingLeft: '25px' }}>
                        <h2 className="heading2">{leftImgRightContent[0].Heading}</h2>
                        {renderTextContent(leftImgRightContent[0].description)}
                    </Col>
                </Row>
            </Container>

            {/* Section with Bullet Points and Image */}
            <div className="section3subcity py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>
                                {middleHedDecLeftImgRightContent.Heading}
                            </h2>
                            <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                                {middleHedDecLeftImgRightContent.subHeading}
                            </p>
                        </Col>
                    </Row>
                </Container>
                <Container className="section4subcity py-5">
                    <Row>
                        <Col md={6} className="px-5">
                            <h5 className="head5evergreen">{middleHedDecLeftImgRightContent.description[0].children[0].text}</h5>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', paddingTop: '20px' }}>
                                {middleHedDecLeftImgRightContent.description
                                    .filter(desc => desc.type === "list")
                                    .flatMap(desc => desc.children)
                                    .map((listItem, listIndex) => (
                                        <li key={listIndex}><p>{listItem.children[0].text}</p></li>
                                    ))}
                            </ul>
                            <br />
                            <p>{middleHedDecLeftImgRightContent.description
                                .filter(desc => desc.type === "paragraph")
                                .map(paragraph => paragraph.children[0].text)
                                .join(' ')
                            }</p>
                        </Col>
                        <Col md={6} className="px-0">
                            {middleHedDecLeftImgRightContent.img?.data ? (
                                <Image
                                    src={`https://admin.interimhc.com${middleHedDecLeftImgRightContent.img.data.attributes.url}`}
                                    alt={middleHedDecLeftImgRightContent.img.data.attributes.alternativeText || ""}
                                    width={middleHedDecLeftImgRightContent.img.data.attributes.width}
                                    height={middleHedDecLeftImgRightContent.img.data.attributes.height}
                                />
                            ) : (
                                <Image src={SantaClara2} alt="Default Image" />
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Another Image and Text Section */}
            <div className="py-5">
                <Container>
                    <Row>
                        <Col md={6} style={{ paddingRight: '25px' }}>
                            {leftImgRightContent[1]?.image?.data ? (
                                <Image
                                    src={`https://admin.interimhc.com${leftImgRightContent[1].image.data.attributes.url}`}
                                    alt={leftImgRightContent[1].image.data.attributes.alternativeText || ""}
                                    width={leftImgRightContent[1].image.data.attributes.width}
                                    height={leftImgRightContent[1].image.data.attributes.height}
                                />
                            ) : (
                                <Image src={SantaClara3} alt="Default Image" />
                            )}
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2 py-3">{leftImgRightContent[1].Heading}</h2>
                            {/* {renderTextContent(leftImgRightContent[1].description)} */}
                            <p>Choosing a suitable home care plan for your loved one can be such a critical decision for your family. At Interim Healthcare, we enable you to make the right choices by offering you our competent assistance throughout the decision-making process. Here are the benefits of choosing us for your senior home care needs: </p>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li>
                <p>A comprehensive and personalized care approach for your loved one. </p></li>
                <li>
                <p>A flexible care model that is based on our HomeLife Enrichment Standard of Care.   </p>
                </li>
                <li>
                <p>Assistance from experienced home care and medical care professionals. </p>
                </li>
                <li>
                <p>Support for Medicare insurance application.  </p>
                </li>
                <li>
                <p>Specialized assistance for Veteran Care.   </p>
                </li>
                </ul>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Final Section with Centered Heading and Paragraphs */}
            <div className="section5city py-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="heading2city py-3">{middleHedDec.Heading}</h2>
                            {/* {middleHedDec.description.map((desc, descIndex) => (
                                <p key={descIndex} style={{ textAlign: 'center' }}>
                                    {desc.children[0].text}
                                </p>
                            ))} */}
                            <p style={{textAlign:'center'}}>Being a pioneer of home care services in the nation, we pride ourselves on our long and successful journey in home care.  At Interim Healthcare, every team member resonates the values of care, dedication and integrity. We are willing to go above and beyond to ensure their utmost comfort. Do you have a senior requiring home care in Santa Clara? Contact us immediately at <a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a>. Your loved ones’ happy aging is just a call away.  </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <SanJoseFooter />
        </div>
    );
}
