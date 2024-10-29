"use client";
import React, { useEffect, useState } from "react";
import CityNavbarComponent from "../../citynavcomponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormComponent from "../../homeformcomponent";
import Image from "next/image";
import SanJose1 from "/public/images/SanJose1.png";
import SanJose2 from "/public/images/SanJose2.png";
import SanJose3 from "/public/images/SanJose3.png";
import Button from 'react-bootstrap/Button';
import CitypageFooter from "../../CitypageFooter";
import SanJoseservicesComponent from "../../sanjoseservicecomponent";
import CaregiverCityComponent from "../../caregiversComponentMainCity";
import MedfordservicesComponent from "../../medfordservicecomponent";
import MedfordNavComponent from "../../medfordnavcomponent";
import MedfordFooterComponent from "../../footermedford";
import Head from "next/head";
import SanJose4 from "/public/images/Interim-Healthcare-at-Lake-Shastina.webp";

export default function MedfordComponent() {
  const [data, setData] = useState(null); // State for API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    fetch("https://admin.interimhc.com/api/medfords?populate[maincontent][populate]=*&populate[seo]=*")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData?.data?.[0]?.attributes?.maincontent) {
          setData(responseData.data[0].attributes.maincontent);
          setSeoData(responseData.data[0].attributes.seo); 
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

  useEffect(() => {
    if (seoData && Array.isArray(seoData) && seoData.length > 0) {
      const seo = seoData[0];
      document.title = seo.metaTitle || "Default Title";
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seo.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seo.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    }
  }, [seoData]);

  if (loading) {
    return // <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getImageUrl = (imageData) => {
    return imageData ? `https://admin.interimhc.com${imageData.url}` : "";
  };

  const renderListItems = (list) => {
    return list.map((listItem, index) => (
      <li key={index}>
        <b>{listItem.children[0].text}</b>{listItem.children[1].text}
      </li>
    ));
  };

  const renderDescription = (description) => {
    if (!description || !Array.isArray(description)) return null;
  
    return description.map((desc, index) => {
      if (desc.type === 'paragraph') {
        return (
          <p key={index} className="py-2">
            {desc?.children?.map((child, idx) => {
              if (child.type === 'text') {
                return child.bold ? <b key={idx}>{child.text}</b> : child.text;
              }
              if (child.type === 'link') {
                const isExternalLink = child.url.startsWith('http');
                return (
                  <a
                    key={idx}
                    href={child.url}
                    className="phone-link"
                    target={isExternalLink ? "_blank" : "_self"}
                    rel={isExternalLink ? "noopener noreferrer" : ""}
                  >
                    {child.children?.[0]?.bold ? <b>{child.children[0].text}</b> : child.children?.[0]?.text || 'Link'}
                  </a>
                );
              }
              return null;
            })}
          </p>
        );
      }
      if (desc.type === 'list' && desc.format === 'unordered') {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {desc.children?.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item?.children?.map((child, idx) => {
                  if (child.type === 'text') {
                    return child.bold ? <b key={idx}>{child.text}</b> : child.text;
                  }
                  if (child.type === 'link') {
                    const isExternalLink = child.url.startsWith('http');
                    return (
                      <a
                        key={idx}
                        href={child.url}
                        className="phone-link"
                        target={isExternalLink ? "_blank" : "_self"}
                        rel={isExternalLink ? "noopener noreferrer" : ""}
                      >
                        {child.children?.[0]?.bold ? <b>{child.children[0].text}</b> : child.children?.[0]?.text || 'Link'}
                      </a>
                    );
                  }
                  return null;
                })}
              </li>
            ))}
          </ul>
        );
      }
      if (desc.type === 'heading') {
        const HeadingTag = `h${desc.level}`;
        return (
          <h5 key={index} className="section4-heading">
            {desc?.children?.[0]?.bold ? <b>{desc.children[0].text}</b> : desc?.children?.[0]?.text || ""}
          </h5>
        );
      }
      return null;
    });
  };
  

  return (
    <div>
      <MedfordNavComponent />
      <div className="section1banner">
        <Container>
          <Row className="py-3">
            <Col md={7} className="py-5" style={{ paddingRight: "4%" }}>
              <h1>{data[0]?.Heading || "Default Heading"}</h1>
             <p className="py-3">{data[0]?.subHeading}</p>
              <p>
                Call us today at <a href="tel:541-779-0054" className="phone-link">+1 541-779-0054</a> and let us help you with the right care plan!
              </p>
              <div className="flex py-3" style={{ paddingRight: "8%" }}>
                <div className="iconhome">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="icontext px-2">
                  <b>Serving:</b>
                </div>
                <div className="citynames">
                <a href="/service-areas/medford/ashland">Ashland</a> |<a href="/service-areas/medford/talent"> Talent</a> | <a href="/service-areas/medford/phoenix">Phoenix</a> | <a href="/service-areas/medford/central-point">Central Point</a> | <a href="/service-areas/medford/white-city">White City</a> | <a href="/service-areas/medford/eagle-point">Eagle Point</a> |  <a href="/service-areas/medford/shady-cove">Shady Cove</a> | <a href="/service-areas/medford/gold-hill">Gold Hill</a> | <a href="/service-areas/medford/rouge-river">Rogue River</a> | <a href="/service-areas/medford/hugo">Hugo</a> | <a href="/service-areas/medford/merlin">Merlin</a>
                </div>
              </div>
            </Col>
            <Col md={5} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>

      <MedfordservicesComponent />
      <CaregiverCityComponent/>

      <div className="section2city">
        <Container fluid>
          <Row className="py-4">
            <Col md={6} className="px-0">
              <Image
                src={getImageUrl(data[1]?.image?.data?.attributes)}
                alt="City Image"
                width={data[1]?.image?.data?.attributes?.width}
                height={data[1]?.image?.data?.attributes?.height}
              />
            </Col>
            <Col md={6} style={{ paddingLeft: '3em', paddingRight: '3em' }}>
              <h2 className="heading2 py-4">{data[1]?.Heading}</h2>
              {renderDescription(data[1]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section3city py-5">
        <Container fluid>
          <Row>
            <Col md={6} style={{ paddingRight: '3em', paddingLeft: '3em' }}>
              <h2 className="heading2 py-4">{data[2]?.Heading}</h2>
              {renderDescription(data[2]?.description)}
            </Col>
            <Col md={6}>
              <Image
                src={getImageUrl(data[2]?.image?.data?.attributes)}
                alt="City Image"
                width={data[2]?.image?.data?.attributes?.width}
                height={data[2]?.image?.data?.attributes?.height}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <Row>
            <Col md={4}>
              <Image
                src={getImageUrl(data[3]?.img?.data?.attributes)}
                alt="City Image"
                width={data[3]?.img?.data?.attributes?.width}
                height={data[3]?.img?.data?.attributes?.height}
              />
            </Col>
            <Col md={8} style={{ paddingLeft: '3em' }}>
              <h2 className="heading2">{data[3]?.Heading}</h2>
              {renderDescription(data[3]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section4city py-5">
        <Container>
          <Row className="py-3">
            <Col md={5}>
            <Image
                src={getImageUrl(data[3]?.img?.data?.attributes)}
                alt="City Image"
                width={data[3]?.img?.data?.attributes?.width}
                height={data[3]?.img?.data?.attributes?.height}
              />
            </Col>
            <Col md={7}>
              <h2 className="heading2">{data[4]?.Heading}</h2>
              {renderDescription(data[4]?.description)}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">{data[5]?.Heading || "Interim HealthCare: Where Compassion Meets Care for a Brighter Tomorrow"}</h2>
              {renderDescription(data[5]?.description)}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section6city py-5">
        <Container>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <h2 className="heading2citysub">Interim Health Care Services in Medford, CA</h2>
              <p style={{ color: "#ffff", textAlign: "center" }} className="py-2">
                If planning to look for senior in home care services for your loved ones in Medford, feel free to reach us. We serve in several cities, listed below are few of them:
              </p>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row className="subcitysec my-4">
            <Col md={4}>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/ashland" className="city-link">
                      Ashland
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/talent" className="city-link">
                      Talent
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/phoenix" className="city-link">
                      Phoenix
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/gold-hill" className="city-link">
                      Gold Hill
                      </a>
                    </b>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/hugo" className="city-link">
                      Hugo                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/central-point" className="city-link">
                      Central Point
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/white-city" className="city-link">
                      White City
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/rouge-river" className="city-link">
                      Rogue River
                      </a>
                    </b>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/eagle-point" className="city-link">
                      Eagle Point
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/merlin" className="city-link">
                      Merlin
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/medford/shady-cove" className="city-link">
                      Shady Cove
                      </a>
                    </b>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>


      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
      <MedfordFooterComponent />
    </div>
  );
}
