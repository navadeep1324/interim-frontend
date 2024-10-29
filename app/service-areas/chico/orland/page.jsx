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
              <h2 className="subcityheading">Senior In-Home Care in Orland, CA   </h2>
              <p className="py-3">
              Aging parents bring joy and warmth, especially when they can maintain good health as they grow older. At Interim Healthcare in Orland, CA, we assist your seniors to help them overcome their age-related challenges and grow older with self-confidence.  
              </p>
              <p>Call us on <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> to learn more about our in-home care services!  </p>
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
              <h2 className="heading2">Growing Demand of Senior-In Home Care in Orland, CA   </h2>
              <p className="py-3">
              Orland is a rural, agricultural town in Glenn County of California. It is home to 15% of the senior population, some of them facing difficulties with cognitive health, ambulance and independent living. Moreover, about 10% of households in Orland report seniors living alone. To enable these seniors to live with independence and dignity, Interim Healthcare has operated as a trustworthy home care partner in the area for over two decades.  
              </p>
              <p className="py-3">Our care plans are flexible, designed to cater to both the physical and emotional needs of seniors. We start with a thorough assessment of your loved one's health, daily habits, and preferences, allowing us to create a customized plan that evolves as their needs change. Whether it's short-term recovery or ongoing support, our approach is crafted to provide the right level of care for their unique situation.  </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Providing Care with a Meaningful Purpose   </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>Senior care is our passion. Our caregiving team is devoted to enriching the lives of seniors, offering dedicated support to help them live with joy and dignity. With every visit, our caregivers bring warmth, respect, and a family-oriented approach.  </p>
            </Col>
          </Row>
        </Container>
        
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">Our range of in-home care services includes:  </h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li className="py-2">Personal Care </li>
                <li className="py-2">Companion Care  </li>
                <li className="py-2">Respite Care  </li>
                <li className="py-2">Veteran Care  </li>
              
              </ul>
              <p className="py-3">We are committed to tailoring our care to the individual needs of each senior, ensuring their comfort, safety, and well-being. </p>
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
              <h2 className="heading2">How does our in-home care make a difference  </h2>
              <p className="py-3">Whether your loved one needs assistance with daily activities or specialized care for conditions like Alzheimer’s, our team is ready to adapt to their changing needs. Our flexible care plans make the process easier for families, ensuring a stress-free experience. Key advantages of our services include:  </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-3">
                <li className="py-2" >Enhanced care for chronic conditions like diabetes and Alzheimer’s. </li>
                <li className="py-2" >Dedicated in-home support for eligible Veterans and surviving spouses.  </li>
                <li className="py-2" >Guidance with Medicaid applications to access benefits for in-home care.  </li>
                
              </ul>
              <p className="py-2">Our goal is to provide comfort, stability, and peace of mind for both seniors and their families. </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Choose Us We are the Best Choice for Senior Home Care  </h2>
              <p style={{ textAlign: 'center' }}>Our mission is to uplift seniors and their families through personalized care solutions that cater to individual needs, preferences, and goals. We focus on understanding each senior’s unique journey, crafting care plans that align with their lifestyle, interests, and health needs. </p>
              <p style={{ textAlign: 'center' }}> Together, we can improve the lives of seniors. Reach out to us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> to explore how our tailored services can make a positive impact!  </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How does Interim Healthcare support families in the caregiving process?   </Accordion.Header>
              <Accordion.Body>
              Interim Healthcare offers Respite Care services for family caregivers, giving them time to recharge while ensuring their loved ones continue to receive the same high level of care.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What is the process for starting in-home care services?  </Accordion.Header>
              <Accordion.Body>
              Simply reach out to us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> to schedule a consultation. We’ll evaluate your senior to understand their health and care needs and develop a personalized care plan. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Can caregivers manage challenging behaviors related to my senior's Alzheimer's condition?  </Accordion.Header>
              <Accordion.Body>
              Absolutely! Our caregivers are equipped to handle difficult behaviors like confusion, agitation, and wandering. They are trained to create a calm and secure environment to ensure your loved one's safety.  
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
