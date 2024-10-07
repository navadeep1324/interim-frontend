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

export default function MountainViewComponent() {
    const [mountainViewData, setMountainViewData] = useState(null);

    useEffect(() => {
        const fetchMountainViewData = async () => {
            try {
                const response = await fetch('https://admin.interimhc.com/api/mountain-view-californias?populate[maincontent][populate]=*');
                const data = await response.json();
                setMountainViewData(data.data[0].attributes);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchMountainViewData();
    }, []);

    if (!mountainViewData) {
        return <div>Loading...</div>;
    }

    // Extract data for different sections based on component type
    const bannerHero = mountainViewData.maincontent.find(content => content.__component === "components.banner-hero");
    const leftImgRightContent = mountainViewData.maincontent.filter(content => content.__component === "components.left-img-right-content");
    const middleHedDecLeftImgRightContent = mountainViewData.maincontent.find(content => content.__component === "components.middle-heddec-left-img-right-content");
    const middleHedDec = mountainViewData.maincontent.find(content => content.__component === "components.middle-hed-dec");

    const renderTextContent = (content) => {
        if (!Array.isArray(content)) {
            return null; // Return null if content is not an array
        }
    
        return content.map((item, idx) => {
            switch (item.type) {
                case "link": {
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
                }
                case "text": {
                    return item.text.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i < item.text.split("\n").length - 1 && <br />}
                        </React.Fragment>
                    ));
                }
                case "paragraph": {
                    return (
                        <p key={idx} className="py-3">
                            {renderTextContent(item.children)}
                        </p>
                    );
                }
                case "list": {
                    const listStyle = item.format === 'unordered' ? 'disc' : 'decimal';
                    return (
                        <ul key={idx} style={{ listStyleType: listStyle, paddingLeft: '20px' }}>
                            {item.children?.map((listItem, index) => (
                                <li key={index}>
                                    {renderTextContent(listItem.children)}
                                </li>
                            ))}
                        </ul>
                    );
                }
                case "bold": {
                    return (
                        <strong key={idx}>
                            {renderTextContent(item.children)}
                        </strong>
                    );
                }
                case "heading": {
                    const HeadingTag = `h${item.level}`;
                    return (
                        <HeadingTag key={idx} className="py-3">
                            {renderTextContent(item.children)}
                        </HeadingTag>
                    );
                }
                default:
                    return null;
            }
        });
    };
        

    

    // Function to render SubHeading with line breaks
    const renderSubHeading = (subHeading) => {
        return subHeading ? subHeading.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index < subHeading.split("\n").length - 1 && <br />}
            </React.Fragment>
        )) : null;
    };

    return (
        <div>
            <SanjoseNavbarComponent />
            <div className="section1subcity py-5">
                <Container fluid className="px-5">
                    <Row>
                        <Col md={8} className="sanjose-banner">
                            <h2 className="subcityheading">{bannerHero.Heading}</h2>
                            <p className="py-3">{renderSubHeading(bannerHero.subHeading)}</p>
                            <p>
                                For detailed information, reach us today at
                                <a href="tel:4082866888" className="phone-link"> +1 (408) 286-6888</a> 
                                to find out how we can help.
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
                                src={`https://admin.interimhc.com${leftImgRightContent[0].image.data.attributes.url}`}
                                alt={leftImgRightContent[0].image.data.attributes.alternativeText || ""}
                                width={leftImgRightContent[0].image.data.attributes.width}
                                height={leftImgRightContent[0].image.data.attributes.height}
                            />
                        ) : (
                            <Image src={MountainView1} alt="Default Image" />
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
                    {middleHedDecLeftImgRightContent?.Heading}
                </h2>
                <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                    {renderSubHeading(middleHedDecLeftImgRightContent?.subHeading)}
                </p>
            </Col>
        </Row>
    </Container>

    <Container className="section4subcity py-5">
        <Row>
            <Col md={6} className="px-5">
                {/* Render the first paragraph */}
                {middleHedDecLeftImgRightContent?.description?.[0] && (
                    <h5 className="head5evergreen">
                        {middleHedDecLeftImgRightContent.description[0].children[0]?.text}
                    </h5>
                )}

                {/* Render the list of items */}
                {/* {middleHedDecLeftImgRightContent?.description?.some(desc => desc.type === "list") && (
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        {middleHedDecLeftImgRightContent?.description
                            ?.filter(desc => desc.type === "list")
                            ?.flatMap(desc => desc.children)
                            ?.map((listItem, listIndex) => (
                                <li key={listIndex}>
                                    {listItem.children[0]?.text}
                                </li>
                            ))}
                    </ul>
                )} */}

<ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li>
                <p>Delivering Quality Senior Care with Interim  </p></li>
                <li>
                <p>Empowering Elders with Our Exceptional Care   </p>
                </li>
                <li>
                <p>Elevating Senior Care with Interim  </p>
                </li>
                </ul>
                {/* Render additional paragraphs if present */}
                {middleHedDecLeftImgRightContent?.description?.slice(2).map((desc, idx) => (
                    <p key={idx} >
                        {desc.children?.[0]?.text}
                    </p>
                ))}
            </Col>

            <Col md={6} className="px-0">
                {middleHedDecLeftImgRightContent?.img?.data ? (
                    <Image
                        src={`https://admin.interimhc.com${middleHedDecLeftImgRightContent.img.data.attributes.url}`}
                        alt={middleHedDecLeftImgRightContent.img.data.attributes.alternativeText || ""}
                        width={middleHedDecLeftImgRightContent.img.data.attributes.width}
                        height={middleHedDecLeftImgRightContent.img.data.attributes.height}
                    />
                ) : (
                    <Image src={MountainView2} alt="Default Image" />
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
                                <Image src={MountainView3} alt="Default Image" />
                            )}
                        </Col>
                        <Col md={6} style={{ paddingLeft: '25px' }}>
                            <h2 className="heading2">{leftImgRightContent[1].Heading}</h2>
                            {/* {renderTextContent(leftImgRightContent[1].description)} */}
                            <p>We follow a holistic model of HomeLife Enrichment (HLE). This model is designed to elevate the quality of life for both elders and their families. Our focus is on improving the mind, body, spirit, and family components. Here's how each component enriches the lives of those we serve in Cupertino, CA: </p>
                        <p><b>Mind </b></p>
                        <p>We recognize that understanding is key to effective care. Through proper education, safety practices, and self-care, we empower your loved ones to overcome barriers and achieve their goals. </p>
                       <p><b>Body </b></p>
                       <p>Physical well-being is paramount to overall health. Our approach to body care encompasses a range of services, including exercise, medical care, therapy, and nutrition, for strengthening the body. </p>
                        <p><b>Spirit </b></p>
                        <p>Nurturing the spirit is essential for holistic well-being. We incorporate activities that bring joy, alleviate anxiety and depression, to enhance spiritual lives of your seniors. </p>
                        <p><b>Family </b></p>
                        <p>We recognize the vital role of family in providing support and understanding. Our care extends to the entire support system, providing instruction to family members on their loved one's condition. </p>
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
                                    {desc.children[0]?.text}
                                </p>
                            ))}
                            {/* Fix for the link visibility issue */}
                <p style={{ textAlign: 'center' }}>
                    Contact us today at 
                    <a href="tel:+14082866888" className="phone-link"> +1 408-286-6888</a> 
                    {" to learn more about our home care services and how we can help your seniors. "}
                    Visit our How to Pay page to explore the various payment options available and find the right plan for you.
                </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <SanJoseFooter />
        </div>
    );
}
