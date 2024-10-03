"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Button from 'react-bootstrap/Button';
import SanjoseNavbarComponent from "../../../sanjosenavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import SanJoseservicesComponent from "../../../sanjoseservicecomponent";
import SanJoseFooter from "../../../footersanjose";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";

export default function SanJoseCupertinoComponent() {
    const [saratogaData, setSaratogaData] = useState(null);

    useEffect(() => {
        const fetchSaratogaData = async () => {
            try {
                const response = await fetch('https://api.interimhc.com/api/saratoga-cas?populate[maincontent][populate]=*');
                const data = await response.json();
                setSaratogaData(data.data[0].attributes);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchSaratogaData();
    }, []);

    if (!saratogaData) {
        return <div>Loading...</div>;
    }

    // Extract data for different sections based on component type
    const bannerHero = saratogaData.maincontent.find(content => content.__component === "components.banner-hero");
    const leftImgRightContent = saratogaData.maincontent.filter(content => content.__component === "components.left-img-right-content");
    const middleHedDecLeftImgRightContent = saratogaData.maincontent.find(content => content.__component === "components.middle-heddec-left-img-right-content");
    const middleHedDec = saratogaData.maincontent.find(content => content.__component === "components.middle-hed-dec");

    // Function to render unique content
    const renderUniqueContent = (description) => {
        if (!Array.isArray(description)) return null;
        return description.map((desc, idx) => (
            desc.children.map((child, childIdx) => (
                child.text ? (
                    <p key={`${idx}-${childIdx}`} className="py-3">
                        {child.text}
                    </p>
                ) : null
            ))
        ));
    };
    const renderRichText = (content) => {
        if (!Array.isArray(content)) {
          return null;
        }
      
        return content.map((item, idx) => {
          switch (item.type) {
            case 'link':
              return (
                <a
                  key={idx}
                  href={item.url}
                  className="phone-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.children[0]?.text}
                </a>
              );
            case 'text':
              return item.text ? <span key={idx}>{item.text}</span> : null;
            case 'paragraph':
              return (
                <p key={idx} className="py-3">
                  {renderRichText(item.children)}
                </p>
              );
            case 'list':
              return (
                <ul key={idx} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  {item.children?.map((listItem, index) => (
                    <li key={index}>{renderRichText(listItem.children)}</li>
                  ))}
                </ul>
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
                            <h2 className="subcityheading">{bannerHero.Heading}</h2>
                            <p className="py-3">{bannerHero.subHeading}</p>
                            <p> Contact us today at <a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a> to schedule a free home assessment, and we will help you decide the right care plan your seniors need! 
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
            <SanJoseservicesComponent />
            <CaregiverCityComponent />

            {/* First Image and Text Section */}
            <Container fluid>
                <Row className="py-5">
                    <Col md={6} style={{ paddingRight: '25px' }} className="px-0">
                        {leftImgRightContent[0]?.image?.data ? (
                            <Image
                                src={`https://api.interimhc.com${leftImgRightContent[0].image.data.attributes.url}`}
                                alt={leftImgRightContent[0].image.data.attributes.alternativeText || ""}
                                width={leftImgRightContent[0].image.data.attributes.width}
                                height={leftImgRightContent[0].image.data.attributes.height}
                            />
                        ) : (
                            <Image src={Saratoga1} alt="Default Image" />
                        )}
                    </Col>
                    <Col md={6} style={{ paddingLeft: '25px' }}>
  <h2 className="heading2">{leftImgRightContent[0].Heading}</h2>
  {renderRichText(leftImgRightContent[0].description)}
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
                                    src={`https://api.interimhc.com${middleHedDecLeftImgRightContent.img.data.attributes.url}`}
                                    alt={middleHedDecLeftImgRightContent.img.data.attributes.alternativeText || ""}
                                    width={middleHedDecLeftImgRightContent.img.data.attributes.width}
                                    height={middleHedDecLeftImgRightContent.img.data.attributes.height}
                                />
                            ) : (
                                <Image src={Saratoga2} alt="Default Image" />
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
                                    src={`https://api.interimhc.com${leftImgRightContent[1].image.data.attributes.url}`}
                                    alt={leftImgRightContent[1].image.data.attributes.alternativeText || ""}
                                    width={leftImgRightContent[1].image.data.attributes.width}
                                    height={leftImgRightContent[1].image.data.attributes.height}
                                />
                            ) : (
                                <Image src={Saratoga3} alt="Default Image" />
                            )}
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{leftImgRightContent[1].Heading}</h2>
                            <p style={{ paddingTop: '20px' }}>{leftImgRightContent[1].description[0].children[0].text}</p>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                {leftImgRightContent[1].description
                                    .filter(desc => desc.type === "list")
                                    .flatMap(desc => desc.children)
                                    .map((listItem, listIndex) => (
                                        <li key={listIndex}><p>{listItem.children[0].text}</p></li>
                                    ))}
                            </ul>
                            <br />
                            <p>{leftImgRightContent[1].description
                                .filter(desc => desc.type === "paragraph")
                                .map(paragraph => paragraph.children[0].text)
                                .join(' ')
                            }</p>
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
                            {middleHedDec.description.map((desc, descIndex) => (
                                <p key={descIndex} style={{ textAlign: 'center' }}>
                                    {desc.children[0].text}
                                </p>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>

            <SanJoseFooter />
        </div>
    );
}
