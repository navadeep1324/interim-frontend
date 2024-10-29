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
              <h2 className="subcityheading">Senior In Home Care in Oroville, California   </h2>
              <p className="py-3">
              At Interim healthcare we believe home is where the heart is—and it is where the best care should be. Our mission is to create meaningful relationships that bring peace of mind to elders and their families in Oroville, CA. 
              </p>
              <p>To learn more, call us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a>  </p>
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
              <h2 className="heading2">Meeting the Rising Demand for Senior Care in Oroville   </h2>
              <p className="py-3">
              Oroville is a city located in California, US. This city has an abundant senior population due to which there is growing need of senior care here. According to a study almost 90% of elders have at least one chronic health condition. At Interim HealthCare, we focus on enhancing the well-being of seniors by offering comprehensive care that addresses their unique challenges.    
              </p>
              <p className="py-3">We improve seniors' lives by providing caring support that helps them stay independent. Our caregivers assist with daily tasks, ensuring seniors can enjoy their favorite activities. We also offer companionship to reduce feelings of loneliness and connect with families to help them manage health challenges. By focusing on both physical and emotional needs, we create a warm and supportive environment where aging adults can thrive and feel valued.   </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>Compassionate Care That Adapts to Seniors’ Needs   </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>Every senior is unique, and their care should reflect that! We design individualized care plans that cater to each elder’s specific needs. We understand the importance of maintaining a sense of purpose and connection, which is why we incorporate meaningful activities into our care plans.   </p>
            </Col>
          </Row>
        </Container>
        
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">The exceptional in home care services we offer are:   </h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li className="py-2" >Alzheimer’s and dementia care </li>
                <li className="py-2" >Companion care  </li>
                <li className="py-2" >Personal care  </li>
                <li className="py-2" >Respite care  </li>
                <li className="py-2" >Veteran care   </li>
                <li className="py-2" >24 hour care  </li>
              
              </ul>
              
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
              <h2 className="heading2">The Ideal Choice for Senior In Home Care   </h2>
              <p className="py-3">The senior in home care services of Interim Healthcare is ideal for those who value the comfort of home while receiving expert, compassionate care.    </p>
              <p><b>Our services cater to: </b> </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-2">
                <li className="py-2" > Seniors Seeking Independence  </li>
                <li className="py-2" > Families Needing Peace of Mind  </li>
                <li className="py-2" > Seniors Seeking Daily Living Assistance  </li>
                <li className="py-2" > Caregivers in Need of Support   </li>
                <li className="py-2" > Seniors Seeking Social Engagement   </li>
                
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Take the First Step Today!  </h2>
              <p style={{ textAlign: 'center' }}>At Interim HealthCare, we understand that the right care makes all the difference. Our dedicated team is here to provide compassionate senior care designed to meet your loved one's unique needs.  </p>
            <p>Don’t navigate this journey alone—let us be your trusted partner in care. Reach out today to discuss how we can create a customized care plan that ensures safety, comfort, and companionship for your loved one. Call us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a> to embark on this path toward exceptional care! </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is senior in-home care?  </Accordion.Header>
              <Accordion.Body>
              Senior in-home care involves providing personalized support and assistance to elderly individuals in the comfort of their own homes.  
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What is the process for starting in-home care services?</Accordion.Header>
              <Accordion.Body>
              To begin, you can contact us to schedule an assessment. Our team will evaluate your loved one's needs and discuss potential care options. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header> What should I do if I have concerns about the care being provided? </Accordion.Header>
              <Accordion.Body>
              If you have any concerns, we encourage you to reach out to our team immediately. We value your feedback and are committed to addressing any issues immediately.  
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
