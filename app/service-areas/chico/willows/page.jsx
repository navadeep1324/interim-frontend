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
              <h2 className="subcityheading">Senior In-Home Care in Willows, CA  </h2>
              <p className="py-3">
              Every senior deserves care that brings comfort and meaning to their lives during their golden years. At Interim Healthcare in Willows, CA, we deliver well-meaning, compassionate support that uplifts and brings hope to your elderly.  
              </p>
              <p>Reach out to us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> to learn more about our senior in-home care solutions.  </p>
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
              <h2 className="heading2">Closing the Care Gap for Seniors in Willows, CA  </h2>
              <p className="py-3">
              Willows is a small town in Northern California. It is the county seat of Glenn County and is home to a tight-knit community of 6,293 people. Around 13.6% of its population is composed of seniors, and 10% of its households report a senior living alone. While family members are fulfilling their professional and personal obligations, seniors are often left behind without care and support. Interim Healthcare is amongst the reliable home care partners in Willows which focuses on lending a helping hand to seniors aging in place. 
              </p>
              <p className="py-3">At Interim Healthcare, we proudly support families by providing compassionate care for their loved ones. Our senior in-home care services are carefully designed to foster well-being throughout the aging journey. Whether it's helping a senior with daily activities or specialized support, our services aim to make aging in place a fulfilling experience.   </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Helping Your Seniors Age with Confidence and Dignity  </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>At Interim Healthcare, our goal is to improve the lives of seniors living with age-related or chronic conditions through personalized care.    </p>
            </Col>
          </Row>
        </Container>
        
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">Some of our comprehensive in-home care plans include:  </h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li><b>Alzheimer’s and Dementia Care: </b><p>Specialized support for a secure and caring environment.</p></li>
                <li><b>24 Hour Home Care: </b><p>Around-the-clock assistance to promote health and longevity.</p></li>
                <li><b>Personal Care:  </b><p>Support with daily activities like bathing, dressing, and meal preparation.</p></li>
                <li><b>Companion Care: </b><p>Providing companionship to boost emotional well-being and reduce isolation.</p></li>
                
              </ul>
              <p>The best feature of our care solutions is that they are completely flexible and modified to incorporate the changing needs of your senior.  </p>
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
              <h2 className="heading2">Delivering Expert Caregiving at Your Doorstep  </h2>
              <p className="py-3">We are proud to pair our quality services with a highly skilled team. Besides extensively screening our candidates and choosing only the best, we also train them rigorously to help them imbibe the following qualities that are essential for caregiving:   </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-3">
                <li className="py-2" ><b>Compassionate: </b> Prioritizing kindness and respect for every individual.</li>
                <li className="py-2" ><b>Flexible:  </b> Tailoring care to fit each client’s unique needs. </li>
                <li className="py-2" ><b>Reliable:  </b> Committed to providing consistent, dependable support.</li>
                <li className="py-2" ><b>Client-Centered: </b>  Focused on personalized care that maintains dignity and enhances well-being.</li>
              </ul>
              <p className="py-3">Inherently, our team is genuinely passionate about senior care. They go out of the way to ensure your loved one receives the highest standard of care at home.  </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Make Aging a Beautiful Experience for Your Loved One </h2>
              <p style={{ textAlign: 'center' }}>Aging is inevitable and this is why we believe that it is essential to embrace it with positivity. Empower your senior loved ones to age with confidence through our reliable in-home care. At Interim Healthcare, we provide care that integrates seamlessly with your home life, ensuring a stress-free experience </p>
              <p style={{ textAlign: 'center' }}>Choose us to enhance your loved one’s aging years, call us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> to learn more about our in-home care services in Willows, California. </p>
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
              Interim Healthcare begins by conducting a thorough assessment of your senior’s health, daily routines, and preferences. We then create a tailored care plan that prioritizes their comfort and well-being.  
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How do I know if my senior needs long-term care?  </Accordion.Header>
              <Accordion.Body>
              Long-term care may be necessary if your loved one frequently requires assistance with daily activities, impacting their ability to live independently. To improve their quality of life, you can consider reliable support. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What are the payment options for home care services? </Accordion.Header>
              <Accordion.Body>
              We offer flexible payment plans and can assist with navigating Medicare, Medicaid, and 	Veteran benefits to cover care costs.
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
