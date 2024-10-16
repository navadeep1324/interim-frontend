"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormComponent from "../../../homeformcomponent";
import CitypageFooter from "../../../CitypageFooter";
import ReddingservicesComponent from "../../../reddingservicesComponent";
import Accordion from "react-bootstrap/Accordion";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import Cupertinomain from "/public/images/Senior-In-HomeCare-in-Hat-Creek-ca.webp";
import Cupertino1 from "/public/images/Travelling-the-Extra-Mile-for-Seniors.webp";
import Cupertino2 from "/public/images/Exceptional-Care.webp";
import ReddingNavbarComponent from "../../../reddingnavcomponent";
import Head from "next/head";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";

const API_URL = "https://admin.interimhc.com";

export default function HatCreekComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  // Fetch SEO and content data from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/hat-creeks?populate[maincontent][populate]=*&populate[seo]=*`
        );
        setData(response.data.data[0].attributes); // Fetch content data
        if (response.data.data[0].attributes.seo.length > 0) {
          setSeoData(response.data.data[0].attributes.seo[0]); // Fetch the first SEO data object
        }
      } catch (error) {
        console.error("Error fetching data from Strapi", error);
      }
    };
    fetchData();
  }, []);

  // Set meta title and description dynamically
  useEffect(() => {
    if (seoData) {
      document.title = seoData.metaTitle || "Default Title";

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seoData.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seoData.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    }
  }, [seoData]);

  if (!data) {
    //     //    // return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Set SEO meta tags */}
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>

      <ReddingNavbarComponent />

      {/* Section 1 - Banner */}
      <div className="section1subcity">
        <Container fluid>
          <Row>
            <Col md={7} className="reddingsubcity-banner">
              <h2 className="subcityheading">In Home Care Services in Hat Creek, California</h2>
              <p className="py-3">
                The senior care services of Interim HealthCare offer a holistic approach of care without compromising on the quality. Whether your loved ones need occasional help or round-the-clock support, our team is here to provide the care they deserve.
              </p>
              <br />
              <p>
                Let your seniors retire with comfort, reach us today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a>
              </p>
              <SubcityCaregiversComponent />
            </Col>
            <Col md={4} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 2 - Services */}
      <div>
        <ReddingservicesComponent />
      </div>
      {/* <CaregiverCityComponent /> */}

      {/* Section 3 - Senior In-Home Care */}
      <div>
        <Container fluid>
          <Row className="py-5">
            <Col md={5} className="px-5">
              <Image src={Cupertinomain} alt="Hat Creek Main Image" />
            </Col>
            <Col md={6} className="redding-col2">
              <h2 className="heading2">Need of Senior In-Home Care in Hat Creek, CA</h2>
              <p className="py-3">
                Situated at 3,422 feet, <a href="https://en.wikipedia.org/wiki/Hat_Creek,_California" className="phone-link" target="_blank">Hat Creek</a> is a city located in Shasta County, California. It has a small community where the aging population may face unique challenges, including limited access to healthcare facilities and social services. The need for home care services in Hat Creek is crucial, as it is a rural area where transportation and access to specialized care can be challenging.
              </p>
              <p>
                At Interim HealthCare, we offer exceptional care for seniors to help them live comfortably in their golden years. With a commitment to providing personalized and compassionate care, we ensure that seniors in Hat Creek receive the support they need right in the comfort of their homes.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 - Services Offered */}
      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Travelling the Extra Mile for Seniors</h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                Choosing Interim HealthCare means choosing a partner in health who will stand by your loved ones.
              </p>
            </Col>
          </Row>
        </Container>
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">The wide range of home care services we offer include:</h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-3">
                <li><p><a href="/service-areas/redding/services/personal-care" className="phone-link">Personal Care and Support</a></p></li>
                <li><p><a href="/service-areas/redding/services/companion-care" className="phone-link">Companion Care</a></p></li>
                <li><p><a href="/service-areas/redding/services/respite-care" className="phone-link">Respite Care</a></p></li>
                <li><p><a href="/service-areas/redding/services/hospice-care" className="phone-link">Hospice Care</a>, and much more</p></li>
                <p className="py-3">
                  At Interim HealthCare, we believe that everyone deserves to live life to the fullest, no matter their age or health condition. Let us be your trusted partner in ensuring the well-being of your loved ones, providing care that you can rely on with confidence and peace of mind.
                </p>
              </ul>
            </Col>
            <Col md={4}>
              <Image src={Cupertino1} alt="Care Image 1" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 - Compassionate Caregivers */}
      <div className="py-5">
        <Container>
          <Row>
            <Col md={6} style={{ paddingRight: '25px' }}>
              <Image src={Cupertino2} alt="Care Image 2" />
            </Col>
            <Col md={6}>
              <h2 className="heading2">Serving Families Since 1966 with Exceptional Care</h2>
              <p className="py-3">
                Interim HealthCare has been a trusted partner in home health care for families across the nation since 1966. With a deep-rooted commitment to providing quality care, we have spent decades perfecting our services to ensure that all elderly receive the personalized attention they deserve.
              </p>
              <p>
                Our core belief is that: everyone deserves to live a life of dignity and independence. This philosophy drives us to offer a wide range of in-home services personalized to meet the unique needs of each senior. Whether it's skilled nursing, physical therapy, or personal care, our team of empathetic caregivers work tirelessly to deliver kind and reliable care.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 6 - Goal to Serve */}
      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Experience the Senior Care with Us</h2>
              <p style={{ textAlign: 'center' }}>
                At Interim HealthCare, our mission has always been to improve seniors' lives. We take pride in our history and are dedicated to continuing our legacy of excellence. Each day, we are driven by the stories of those we've helped and the positive impact we've made in their lives. To receive our home healthcare services, contact us today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a>.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 7 - FAQ */}
      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How does Interim HealthCare support seniors in a rural area like Hat Creek?</Accordion.Header>
              <Accordion.Body>
                We provide in-home care services that bring personalized care directly to seniors at their own home, ensuring they receive the support they need without having to travel long distances.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How long has Interim HealthCare been providing in-home care services?</Accordion.Header>
              <Accordion.Body>
                We have been serving families across the nation since 1966. With decades of experience, we have honed our services to meet the unique needs of seniors, ensuring they live with dignity and independence.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Do you offer 24/7 in-home care services in Hat Creek?</Accordion.Header>
              <Accordion.Body>
                Yes, Interim HealthCare offers both occasional help and round-the-clock support, depending on the needs of your loved one. Our team is here to provide the care they deserve, whenever they need it.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      {/* Footer */}
      <CitypageFooter />
    </div>
  );
}
