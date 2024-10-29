"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReddingNavbarComponent from "../../../chiconavcomponent"
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import Cupertinomain from "/public/images/Healthcare-in-Anderson-ca.webp";
import Image from "next/image";
import Cupertino1 from "/public/images/In-Homecare-Services-in-Anderson.webp";
import Cupertino2 from "/public/images/Interim-Healthcare-in-Anderson.webp";
import Button from 'react-bootstrap/Button';
import CitypageFooter from "../../../footerchico";
import ReddingservicesComponent from "../../../chicoservicecomponent";
import Accordion from 'react-bootstrap/Accordion';
import CaregiverCityComponent from "../../../caregiversComponentMainCity";
import Head from "next/head";

const BASE_URL = "https://admin.interimhc.com";

export default function SanJoseCupertinoComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/redding-anderson?populate[maincontent][populate]=*&populate[seo]=*`
        );
        setData(response.data.data?.attributes);
        // Since `seo` is an array, access the first element of the array
        if (response.data.data?.attributes.seo && response.data.data?.attributes.seo.length > 0) {
          setSeoData(response.data.data?.attributes.seo[0]); // Access the first element of the seo array
        }
      } catch (error) {
        console.error("Error fetching data from Strapi", error);
      }
    };
    fetchData();
  }, []);

  // Dynamically set the meta title and description once the seoData is fetched
  useEffect(() => {
    if (seoData) {
      console.log("SEO Data received:", seoData); // Log seoData for debugging
      document.title = seoData.metaTitle || "Default Title";
     
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seoData.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seoData.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    } else {
      console.log("No SEO Data received"); // Log if seoData is not available
    }
  }, [seoData]);

  return (
    <div>
      <ReddingNavbarComponent />
      <div className="section1subcity">
        <Container fluid className="">
          <Row>
            <Col md={7} className="reddingsubcity-banner">
              <h2 className="subcityheading">Senior In-Home Care in Nevada City, CA </h2>
              <p className="py-3">
              Aging parents can be a source of joy, warmth and affection when they grow older with good health. At Interim Healthcare in Nevada City, we support your seniors to overcome their challenges and age in place healthily. 
              </p>
              <p>Give us a call at <a href="tel:530-272-0300" className="phone-link">+1 530-272-0300</a> to learn more about our in-home care.  </p>
              <SubcityCaregiversComponent />
            </Col>
            <Col md={4} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>
      
      <ReddingservicesComponent />
      
      <div>
        {/* <CaregiverCityComponent /> */}
        <Container fluid>
          <Row className="py-5 middlealign">
            <Col md={6}>
              <Image src={Cupertinomain} />
            </Col>
            <Col md={6} className="redding-col2 px-5">
              <h2 className="heading2">Greater Need of In-Home Care for Seniors in Nevada City, CA </h2>
              <p className="py-3">
              Nevada City is the county seat of Nevada County in California. Known for its well-preserved Gold Rush downtown, it’s a beautiful place to live in, inhabited by around 42% of seniors. The most common issues faced by seniors here include difficulties with ambulation and independent living. This is why Interim Healthcare works diligently to serve seniors living in the area with reliable and professional in-home care services to enhance their daily lives with comfort. 
              </p>
              <p className="py-3">Our care plans are designed to be fully adaptable, addressing both the physical and emotional needs of seniors. Whether they need short-term recovery care or long-term support, our approach is tailored to provide the most suitable assistance for their evolving situation.  </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Our Promise- Caring with Sincerity </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>Caring for others is at the heart of what we do. Every member of our caregiving team is deeply committed to helping seniors live fuller and happier lives. Our caregivers bring empathy, respect, and a family-like approach to every interaction.  </p>
            </Col>
          </Row>
        </Container>
        
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">We provide a variety of in-home care services, including: </h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li>Personal Care</li>
                <li>Companion Care </li>
                <li>Respite Care </li>
                <li>Veteran Care </li>
                <li>24 Hour Home Care </li>
              </ul>
              <p>Our goal is to meet the unique needs of each senior we serve, ensuring their utmost comfort and peace of mind. </p>
            </Col>
            <Col md={4}>
              <Image src={Cupertino1} alt="Caregiver Image 1" />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <Row>
            <Col md={6} style={{ paddingRight: '25px' }}>
              <Image src={Cupertino2} />
            </Col>
            <Col md={6}>
              <h2 className="heading2">How do we make a true difference? </h2>
              <p className="py-3">Whether your loved one needs support with daily activities or guidance to live safely with Alzheimer’s, our team is here to adapt to their evolving needs. Our care plans are designed with flexibility, making the experience stress-free for families. Key benefits of our services include: </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-3">
                <li className="py-2" >Improved management for seniors with chronic conditions like diabetes and Alzheimer’s. </li>
                <li className="py-2">Specialized in-home care for eligible Veterans and surviving spouses.  </li>
                <li className="py-2">Assistance with applying for Medicaid to access in-home care benefits.  </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Give your Senior the Choice to Age with Confidence </h2>
              <p style={{ textAlign: 'center' }}>Your senior loved ones deserve to age confidently, and reliable in-home care is key to uplifting their self-esteem. Our services are designed to seamlessly fit into your home routine, ensuring a smooth, hassle-free experience. </p>
              <p style={{ textAlign: 'center' }}>Take the first step today by choosing Interim Healthcare as your trusted partner for senior in-home care. Call us at <a href="tel:530-272-0300" className="phone-link">+1 530-272-0300</a> to learn more about our senior care services in Nevada City, California.</p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How does Interim Healthcare create a personalized care plan for my loved one? </Accordion.Header>
              <Accordion.Body>
              At Interim Healthcare, we assess your senior's health and lifestyle to gain a clear understanding of their needs. Based on this evaluation, we design a care plan that is flexible and adaptable. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How do you manage loneliness amongst seniors who are socially isolated? </Accordion.Header>
              <Accordion.Body>
              We provide Companion Care, which pairs your senior with a compatible caregiver who engages them in friendly conversations and social activities, fostering their emotional well-being.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How do I know if my senior needs long-term care? </Accordion.Header>
              <Accordion.Body>
              If your loved one frequently requires help with tasks like housekeeping, meal preparation, personal care, or transportation, it might be time to consider long-term care.  
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      {/* Correct SEO Data Access */}
      <Head>
        <title>{seoData?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.metaDescription || "Default Description"} />
      </Head>

      <CitypageFooter />
    </div>
  );
}
