"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormComponent from "../../homeformcomponent";
import Image from "next/image";
import CitypageFooter from "../../footersanjose";
import SanJoseservicesComponent from "../../sanjoseservicecomponent";
import CaregiverCityComponent from "../../caregiversComponentMainCity";
import SanJose4 from "/public/images/SanJose4.png";
import SanjoseNavbarComponent from "../../sanjosenavcomponent";
import Head from "next/head";

export default function SanJoseComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const API_URL = "https://admin.interimhc.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/san-jose-californias?populate[maincontent][populate]=*&populate[seo]=*`
        );
        setData(response.data.data[0].attributes);
        setSeoData(response.data.data[0].attributes.seo);
      } catch (error) {
        console.error("Error fetching data from Strapi", error);
      }
    };
    fetchData();
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

  if (!data) {
    return // <p>Loading...</p>; // Ensure the loading state is displayed until data is fetched
  }

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
      } else if (item.type === "ul") {
        return (
          <ul key={idx} style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            {item.children.map((listItem, listIdx) => (
              <li key={listIdx}>{renderTextContent(listItem)}</li>
            ))}
          </ul>
        );
      } else if (item.type === "li") {
        return <li key={idx}>{renderTextContent(item)}</li>;
      } else if (item.bold) {
        return <b key={idx}>{item.text}</b>;
      } else {
        return <span key={idx}>{item.text}</span>;
      }
    });
  };

  return (
    <div>
      <SanjoseNavbarComponent />

      {/* Section 1 - Banner */}
      <div className="section1bannersanjose">
        <Container>
          <Row className="section1row">
            <Col md={7} className="py-5" style={{ paddingRight: "4%" }}>
              <h1>{data.maincontent[0]?.Heading}</h1>
              <p className="py-3">{data.maincontent[0]?.subHeading}</p>
              <p>
                For a quick consultation, give us a call at{" "}
                <a href="tel:4082866888" className="phone-link">
                  +1 408 286-6888
                </a>{" "}
                and let us help you with the right care plan!
              </p>
              <div className="flex py-3" style={{ paddingRight: "8%" }}>
                <div className="iconhome">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="icontext px-2">
                  <b>Serving:</b>
                </div>
                <div className="citynames">
                  <a href="/service-areas/san-jose/cupertino">Cupertino</a>&nbsp;|&nbsp;
                  <a href="/service-areas/san-jose/evergreen">Evergreen</a>&nbsp;|&nbsp;
                  <a href="/service-areas/san-jose/los-altos">Los Altos</a>&nbsp;|&nbsp;
                  <a href="/service-areas/san-jose/los-gatos">Los Gatos</a>&nbsp;|&nbsp;
                  <a href="/service-areas/san-jose/milpitas">Milpitas</a>&nbsp;|&nbsp;
                  <a href="/service-areas/san-jose/mountain-view">Mountain View</a>&nbsp;|&nbsp;
                  <a href="/service-areas/san-jose/santa-clara">Santa Clara</a>&nbsp;|&nbsp;
                  <a href="/service-areas/san-jose/saratoga">Saratoga</a>&nbsp;|&nbsp;
                  <a href="/service-areas/san-jose/sunnyvale">Sunnyvale</a>
                </div>
              </div>
            </Col>
            <Col md={5} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>
      <SanJoseservicesComponent />

      <CaregiverCityComponent />

      {/* Section 4 - Growing Need of Home Care */}
      <div className="section2city">
        <Container fluid>
          <Row className="py-4 middlealign">
            <Col md={6} className="px-0">
              {data.maincontent[1]?.image?.data && (
                <Image
                  src={`${API_URL}${data.maincontent[1].image.data.attributes.url}`}
                  alt={data.maincontent[1].image.data.attributes.alternativeText || "San Jose"}
                  width={data.maincontent[1].image.data.attributes.width}
                  height={data.maincontent[1].image.data.attributes.height}
                />
              )}
            </Col>
            <Col md={6} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
              <h2 className="heading2 py-4">{data.maincontent[1]?.Heading}</h2>
              <p className="py-2">{renderTextContent(data.maincontent[1]?.description[0])}</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 - Quality Senior Care */}
      <div className="section3city py-5">
        <Container fluid>
          <Row className="row-reverse-mobile middlealign">
            <Col md={6} style={{ paddingRight: "3em", paddingLeft: "3em" }}>
              <h2 className="heading2">{data.maincontent[2]?.Heading}</h2><br></br>
              <p>{renderTextContent(data.maincontent[2]?.description?.[0])}</p>
            </Col>
            <Col md={6}>
              {data.maincontent[2]?.image?.data && (
                <Image
                  src={`${API_URL}${data.maincontent[2].image.data.attributes.url}`}
                  alt={data.maincontent[2].image.data.attributes.alternativeText || "San Jose"}
                  width={data.maincontent[2].image.data.attributes.width}
                  height={data.maincontent[2].image.data.attributes.height}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 6 - Home Healthcare Services */}
      <div className="py-5">
        <Container>
          <Row>
            <Col md={4}>
              {data.maincontent[3]?.image?.data && (
                <Image
                  src={`${API_URL}${data.maincontent[3].image.data.attributes.url}`}
                  alt={data.maincontent[3].image.data.attributes.alternativeText || "San Jose"}
                  width={data.maincontent[3].image.data.attributes.width}
                  height={data.maincontent[3].image.data.attributes.height}
                />
              )}
            </Col>
            <Col md={8} style={{ paddingLeft: "3em" }}>
              <h2 className="heading2">{data.maincontent[3]?.Heading}</h2><br></br>
              <p>{renderTextContent(data.maincontent[3]?.description?.[0])}</p>
              <ul className="py-2">
                {data.maincontent[3]?.description?.[1]?.children?.map((item, index) => (
                  <li key={index}>{renderTextContent(item)}</li>
                ))}
              </ul>
              <p>{renderTextContent(data.maincontent[3]?.description?.[2])}</p>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Section 7 - Affordable Home Care */}
      <div className="section4city py-5">
        <Container>
          <Row className="py-3">
            <Col md={2}></Col>
            <Col md={8}>
              <h2 className="heading2" style={{ textAlign: "center" }}>
                Affordable Home Care You Can Trust!
              </h2><br></br>
              <p style={{ textAlign: "center" }} className="py-2">
                Opting for Interim Health Care offers various advantages, particularly in easing the financial burden
                of home care in San Jose, California. Here are the key benefits of choosing us:
              </p>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row className="py-4">
            <Col md={6}>
              <Image src={SanJose4} />
            </Col>
            <Col md={6} style={{ paddingLeft: "3em" }}>
              <p>
                <b>Comprehensive Services –</b> Interim Health Care provides a range of services designed to alleviate the financial stress associated with home care.
              </p>
              <p className="py-2">
                <b>Insurance Navigation – </b>Navigating insurance coverage from Medicaid and Medicare can be overwhelming, but we are here to assist you every step of the way.
              </p>
              <p>
                <b>Expert Guidance – </b>Our experienced team simplifies the complexities of insurance claims, and ensures you receive the maximum benefits available.
              </p>
              <p className="py-2">
                <b>Medicare-Certified Franchises –</b> Many Interim Health Care franchises are Medicare-certified. This means that if your loved ones are eligible for Medicare, its funds can cover specific services provided by our skilled nurses, therapists, or other medical professionals.
              </p>
              <p>
                <b>Focus on Well-Being –</b> We will guide you throughout the insurance process, allowing you to concentrate on what truly matters – the well-being of your loved ones.
              </p>
              <p className="py-2">
                Don’t let confusion about insurance coverage prevent you from accessing the quality care your family deserves. Our experienced team will work diligently to ensure you receive the maximum benefits available to you.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 8 */}
      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">
                Enhance Your Loved One’s Golden Years with Interim Health Care
              </h2>
              <p style={{ textAlign: "center" }}>
                Take the first step towards enhancing your loved one’s quality of life with our senior home care services. Call us at <a href="tel:4082866888" className="phone-link">+1 408 286-6888 </a> to discuss your needs and schedule a consultation with our team. Don’t wait—give your loved ones the quality care they deserve. Contact Interim Health Care in San Jose, California today and let us help you make their golden years truly shine.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 9 */}
      <div className="section6city py-5">
        <Container>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <h2 className="heading2citysub">Interim Health Care Services in Sanjose, CA</h2>
              <p style={{ color: "#ffff", textAlign: "center" }} className="py-2">
                If planning to look for senior in home care services for your loved ones in San Jose, feel free to reach us. We serve in several cities, listed below are few of them:
              </p>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row className="subcitysec my-4">
            <Col md={4}>
              <div className="flex py-2">
                <div className="iconcity">
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/san-jose/cupertino" className="city-link">
                        Cupertino
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/san-jose/evergreen" className="city-link">
                        Evergreen
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/san-jose/los-altos" className="city-link">
                        Los Altos
                      </a>
                    </b>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="flex py-2">
                <div className="iconcity">
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/san-jose/los-gatos" className="city-link">
                        Los Gatos
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/san-jose/milpitas" className="city-link">
                        Milpitas
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/san-jose/mountain-view" className="city-link">
                        Mountain View
                      </a>
                    </b>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="flex py-2">
                <div className="iconcity">
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/san-jose/santa-clara" className="city-link">
                        Santa Clara
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/san-jose/saratoga" className="city-link">
                        Saratoga
                      </a>
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex py-2">
                <div className="iconcity">
                  <i class="bi bi-chevron-right"></i>
                </div>
                <div>
                  <p style={{ color: "#004b66" }}>
                    <b>
                      <a href="/service-areas/san-jose/sunnyvale" className="city-link">
                        Sunnyvale
                      </a>
                    </b>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <CitypageFooter />
      <Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>
    </div>
  );
}
