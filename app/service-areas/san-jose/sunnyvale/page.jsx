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
import Head from "next/head";
export default function SanJoseCupertinoComponent() {
    const [cityData, setCityData] = useState(null);
    const [seoData, setSeoData] = useState(null);
    useEffect(() => {
        const fetchCityData = async () => {
            const response = await fetch('https://admin.interimhc.com/api/sunnyvale-californias?populate[maincontent][populate]=*&populate[seo]=*');
            const data = await response.json();
            setCityData(data.data ? data.data[0].attributes : null);
            setSeoData(data.data[0]?.attributes?.seo);
        };

        fetchCityData();
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
                        <Col md={7} className="sanjose-banner">
                            <h2 className="subcityheading">{cityData.maincontent[0].Heading}</h2>
                            <p className="py-3">{cityData.maincontent[0].subHeading}</p>
                            <p>To know more about us, call us for a free consultation at <a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a> to schedule a free home assessment, and we will help you decide the right care plan your seniors need! 
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
                        <Col md={5} className="px-0">
                            {cityData.maincontent[1].image?.data && (
                                <Image
                                    src={`https://admin.interimhc.com${cityData.maincontent[1].image.data.attributes.url}`}
                                    alt={cityData.maincontent[1].image.data.attributes.alternativeText || cityData.maincontent[1].image.data.attributes.name}
                                    width={cityData.maincontent[1].image.data.attributes.width}
                                    height={cityData.maincontent[1].image.data.attributes.height}
                                />
                            )}
                        </Col>
                        <Col md={7} className="sanjose-col">
                            <h2 className="heading2">{cityData.maincontent[1].Heading}</h2>
                            <div>
                                {/* {renderDescription(cityData.maincontent[1].description)} */}
                                <p className="py-3">
                                <a href="https://en.wikipedia.org/wiki/Sunnyvale,_California" className="phone-link" target="_blank">Sunnyvale</a> is a city in the northwest region of Santa Clara County. It is home to a vibrant and diverse community. Senior members are an integral component of this community and deserve utmost care and attention to age safely. <a href="https://data.census.gov/vizwidget?g=160XX00US0677000&infoSection=Disability" className="phone-link" target="_blank">According to a nationwide survey, about 3.7% of residents of Sunnyvale experience cognitive difficulties </a>and 3.9% of residents face ambulatory difficulties. Seniors with such disabilities are at higher risk of falls and out-of-hospital cardiac arrests. These issues exacerbate the demand for reliable in-home care for seniors to manage their chronic health conditions and live safely. Interim Healthcare is
                                 a leading home care provider in Sunnyvale, which takes care of crucial aspects of living for seniors who wish to age in place. </p>
               <p>For over 20 years, Interim Healthcare has been offering in-home care services to seniors in Sunnyvale. We improve their lives by ensuring safety and providing companionship with affordable and dependable senior home care services. Don’t wait; contact us at <a href="tel:4082866888" className="phone-link">+1 (408) 286-6888</a> to learn how we can become a home health aide for your senior in Sunnyvale, California.  </p>
               
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
                        <Col md={8} className="px-5">
                            <h5 className="head5evergreen">
                                {cityData.maincontent[2].description[0].children[0].text}
                            </h5>
                            {/* {renderDescription(cityData.maincontent[2].description)} */}
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li><p>Long-Term Home Care </p> </li>
                <li><p>Personal Care </p> </li>
                <li><p>Respite Care </p> </li>
                <li><p>Veteran Care </p> </li> </ul>
                <p>We help your loved ones age with better physical health and mental well-being. Our team of care experts is ready to go the extra mile to ensure your seniors’ comfort and safety.  Our specialized care plans also include 24-hour home care companion care which help your seniors manage their health conditions and live their lives to the fullest. </p>
                        </Col>
                        <Col md={4} className="px-0">
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
                    <Row className="middlealign">
                        <Col md={4} >
                            {cityData.maincontent[3].image?.data && (
                                <Image
                                    src={`https://admin.interimhc.com${cityData.maincontent[3].image.data.attributes.url}`}
                                    alt={cityData.maincontent[3].image.data.attributes.alternativeText || cityData.maincontent[3].image.data.attributes.name}
                                    width={cityData.maincontent[3].image.data.attributes.width}
                                    height={cityData.maincontent[3].image.data.attributes.height}
                                />
                            )}
                        </Col>
                        <Col md={8} className="sanjose-col">
                            <h2 className="heading2">{cityData.maincontent[3].Heading}</h2>
                            <div style={{ paddingTop: '20px' }}>
                                {/* {renderDescription(cityData.maincontent[3].description)} */}
                                <p>Selecting the right home care plan for your loved one is a significant decision for your family. At Interim Healthcare, we help you make the best choices by providing competent assistance throughout the decision-making process. Here are the benefits of choosing us for your senior home care needs: </p>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li>
                <p>A comprehensive and personalized care approach for your loved one.</p>
                </li>
                <li>
                <p>Coverage and assistance for Medicare insurance holders. </p>
                </li>
                <li>
                <p>Assistance with Veteran Affairs Benefits.  </p>
                </li></ul>
                <p>By choosing Interim Healthcare, you ensure that your senior loved ones receive the best possible care, allowing them to enjoy their golden years with dignity and comfort. Contact us today at <a href="tel:408-286-6888 " className="phone-link">+1 408-286-6888 </a> to find out how we can support your family. </p>
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
                                {/* {cityData.maincontent[4].description[0].children[0].text} */}
                                As a leader in home care services nationwide, we take pride in our long-standing success. At Interim Healthcare, our team embodies values of care, dedication, and integrity. We are committed to going the extra mile to ensure your loved ones' comfort. Do you have a senior who needs in-home care in Sunnyvale? Reach out to us now at <a href="tel:408-286-6888 " className="phone-link">+1 408-286-6888 </a>. Comfortable lives and wider smiles are just a call away! 
                            </p>
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
