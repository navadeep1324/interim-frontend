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
              <h2 className="subcityheading">Senior In Home Care in Cohasset, California   </h2>
              <p className="py-3">
              At Interim Healthcare we empower seniors to live their best lives through personalized support and care. With our in home care services, elders living in Cohasset, CA can enjoy a higher quality of life in their own homes.  
              </p>
              <p>For further details, reach us at <a href="tel:530-899-9777" className="phone-link">+1 530-899-9777</a>  </p>
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
              <h2 className="heading2">Personalized Support for Cohasset’s Aging Population    </h2>
              <p className="py-3">
              Cohasset is a census-designated placed located in Butte County, US. It has a minor population of 392 people out of which 25% are seniors. With 3.6% of residents facing hearing difficulties, it’s important to provide the right support to aging adults. Interim Healthcare is here to make a big difference for seniors in Cohasset by offering personalized care.      
              </p>
              <p className="py-3">Our caregivers assist your loved ones with daily activities, such as cooking, cleaning, and personal care, while also ensuring that seniors feel connected and engaged. We believe that social interaction is crucial for their well-being, so we actively promote engaging activities that to stimulate the mind and also cultivate meaningful relationships. Whether it’s sharing stories over a home-cooked meal, participating in fun games, or enjoying hobbies together, we create an enriching environment where seniors can thrive and feel valued.   </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>We Are Here to Make a Meaningful Difference    </h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>Interim Healthcare recognizes the challenges that come with aging! Our team is dedicated to delivering premier in home care services for seniors for truly make a meaningful difference in their lives. With our dedicated team by their side, seniors can continue to enjoy life to the fullest.   </p>
            </Col>
          </Row>
        </Container>
        
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">Our caregivers help seniors in various aspect of living through:    </h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li className="py-2" >Personal Care </li>
                <li className="py-2" >Companionship   </li>
                <li className="py-2" >Meal Preparation  </li>
                <li className="py-2" >Medication Management   </li>
                <li className="py-2" >Light Housekeeping   </li>
                <li className="py-2" >24/7 support   </li>
              
              </ul>
              <p>We strong believe that every senior deserves to feel supported, valued, and connected in their own home. </p>
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
