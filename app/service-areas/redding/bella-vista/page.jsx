"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Accordion from 'react-bootstrap/Accordion';
import ReddingNavbarComponent from "../../../reddingnavcomponent";
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import CitypageFooter from "../../../CitypageFooter";
import ReddingservicesComponent from "../../../reddingservicesComponent";
import CaregiverCityComponent from "../../../caregiversComponentMainCity";
import Cupertinomain from "/public/images/Cupertinomain.png";
import Cupertino1 from "/public/images/Cupertino1.png";
import Cupertino2 from "/public/images/Cupertino2.png";
import Head from "next/head";

const API_URL = "https://admin.interimhc.com";

export default function BellaVistaComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  // Fetch SEO and content data from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/bella-vistas?populate[maincontent][populate]=*&populate[seo]=*`
        );
        setData(response.data.data[0].attributes); // Fetch content data
        setSeoData(response.data.data[0].attributes.seo); // Fetch SEO data
      } catch (error) {
        console.error("Error fetching data from Strapi", error);
      }
    };
    fetchData();
  }, []);

  // Set meta title and description dynamically
  useEffect(() => {
    if (seoData) {
      document.title = seoData?.metaTitle || "Default Title";

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seoData?.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seoData?.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    }
  }, [seoData]);

  if (!data) {
    return <p>Loading...</p>;
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
        <Container fluid className="">
          <Row>
            <Col md={7} className="reddingsubcity-banner">
              <h2 className="subcityheading">Senior In-Home Care in Bella Vista, CA</h2>
              <p className="py-3">
                Seniors are cherished members of any family, deserving of the best care to ensure they age gracefully and happily. As a leading provider of home care in the country, Interim Healthcare is dedicated to meeting the unique needs of your seniors in Bella Vista, CA.
              </p>
              <p>
                Contact us at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to schedule a complimentary assessment for your aging loved ones.
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

      <CaregiverCityComponent />

      {/* Section 3 - Growing Demand */}
      <div>
        <Container fluid>
          <Row className="py-5">
            <Col md={6}>
              <Image src={Cupertinomain} alt="Main Image" />
            </Col>
            <Col md={6} className="redding-col2">
              <h2 className="heading2">Growing Demand for Home Care in Bella Vista, California</h2>
              <p className="py-3">
                <a href="https://en.wikipedia.org/wiki/Bella_Vista,_California" className="phone-link" target="_blank">Bella Vista</a> is a small, rural town in the Shasta county of California. Lying 8 miles northeast of Redding, it has a population of 3,641, 20% of which is comprised of seniors. With its mild climate, natural beauty and good healthcare facilities, it has become a retirement abode for seniors. However, older adults in Bella Vista encounter challenges with <a href="https://data.census.gov/profile/Bella_Vista_CDP,_California?g=160XX00US0604926#health" className="phone-link" target="_blank">self-care and ambulation</a>, which necessitate the need for quality in-home care services.
                <br /><br />
                Interim Healthcare has been providing exceptional home healthcare in Bella Vista for over the last two decades. Being pioneers of the home care industry across the nation, we deeply understand the various concerns of aging individuals. Our team of experts have crafted our HomeLife Enrichment holistic model of care which sets us apart from the rest in the market. We ensure your senior’s well-being by focusing on mind, body, spirit, and family. Call us at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> for more info on home healthcare plans in Bella Vista.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 4 - Health Care Plans */}
      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>
                Array of Home Health Care Plans for Seniors in Bella Vista, CA
              </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>
                At Interim Healthcare, we provide a range of personalized care plans for your seniors’ unique needs. Whether you require skilled nursing for your seniors with a chronic illness, or compassionate assistance for homemaking, our team is here to help!
              </p>
            </Col>
          </Row>
        </Container>

        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">Some of our specialized home healthcare plans include:</h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li><p><b>24-Hour Home Care</b> for seniors who require continuous monitoring and help.</p></li>
                <li><p><b>Palliative Care</b> for pain management of seniors, ensuring quicker recovery.</p></li>
                <li><p><b>Hospice Care</b> for a smooth and less traumatic transition to end-of-life.</p></li>
              </ul>
              <p>For a comprehensive care plan for your loved one, choose our tailor-made services.</p>
            </Col>
            <Col md={4}>
              <Image src={Cupertino1} alt="Cupertino Image 1" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 - Benefits of Home Care */}
      <div className="py-5">
        <Container>
          <Row>
            <Col md={6} style={{ paddingRight: '25px' }}>
              <Image src={Cupertino2} alt="Cupertino Image 2" />
            </Col>
            <Col md={6}>
              <h2 className="heading2">How our Home Healthcare Benefits Seniors in Bella Vista, CA</h2>
              <p className="py-3">Besides promoting your aging loved ones overall health and well-being, we also offer the following unique benefits:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li><p>Caregiver support and guidance to manage chronic diseases</p></li>
                <li><p>Flexible scheduling and personalized support to sync with family routine</p></li>
                <li><p>Medicaid assistance for home care and home healthcare services</p></li>
                <li><p>Veteran Benefits assistance for eligible veterans or their surviving spouses</p></li>
              </ul>
              <p className="py-4">We understand that caring for seniors requires time, dedication, and resources. We offer flexible payment options that enable comfort and peace of mind for the entire family.</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 6 - Golden Years */}
      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Enhance Your Seniors’ Golden Years with Interim Healthcare</h2>
              <p style={{ textAlign: 'center' }}>
                Your seniors are at a pivotal stage of their lives. For them to age with grace and a happy face, they require compassionate assistance during every step of their journey. Let Interim Healthcare guide the way to help overcome your seniors’ daily obstacles. Choose from our range of reliable in-home care services to make life easier for your seniors. Call us today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to begin your journey with us.
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
              <Accordion.Header>How can caregivers improve my senior’s physical and mental health?</Accordion.Header>
              <Accordion.Body>
                Our caregivers are experienced in senior care. They form meaningful bonds with your seniors to uplift their life with positive reinforcement and meaningful assistance.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How does Interim Healthcare improve the social life of my senior?</Accordion.Header>
              <Accordion.Body>
                Interim Healthcare offers Companion Care which enhances your loved one’s life with the warmth of companionship. Our caregivers engage them in meaningful activities that foster social wellness.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Why should I choose Interim Healthcare for my loved one?</Accordion.Header>
              <Accordion.Body>
                At Interim Healthcare, we offer personalized care plans with the option of flexible scheduling and payment options to make life easier for you and your elderly.
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
