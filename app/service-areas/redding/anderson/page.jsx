"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReddingNavbarComponent from "../../../reddingnavcomponent"
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import Cupertinomain from "/public/images/Cupertinomain.png";
import Image from "next/image";
import Cupertino1 from "/public/images/Cupertino1.png";
import Cupertino2 from "/public/images/services5img.png";
import Button from 'react-bootstrap/Button';
import CitypageFooter from "../../../CitypageFooter";
import ReddingservicesComponent from "../../../reddingservicesComponent";
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
              <h2 className="subcityheading">Senior In Home Care in Anderson, California</h2>
              <p className="py-3">
                We understand that aging can bring its own set of challenges, but Interim Healthcare believes that every senior at Anderson, CA deserves to live their life with independence and dignity...
              </p>
              <p>Reach us today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> and learn more about our senior in home care services</p>
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
        <CaregiverCityComponent />
        <Container fluid>
          <Row className="py-5">
            <Col md={6}>
              <Image src={Cupertinomain} />
            </Col>
            <Col md={6} className="redding-col2">
              <h2 className="heading2">Need of Interim Healthcare in Anderson, California</h2>
              <p className="py-3">
                Located in the Shasta County, <a href="https://en.wikipedia.org/wiki/Anderson,_California" className="phone-link" target="_blank">Anderson</a> is a city situated in California. As most of the people in this city are <a href="https://en.wikipedia.org/wiki/Anderson,_California" className="phone-link" target="_blank">working professionals</a>, seniors are often left at home which can lead to concerns about their safety, well-being, and social isolation...
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="reddingsection3subcity py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2" style={{ color: '#ffff', textAlign: 'center' }}>In Homecare Services in Anderson</h2>
              <p className="py-3" style={{ color: '#ffff', textAlign: 'center' }}>Interim HealthCare offers comprehensive home health care services in Anderson, CA...</p>
            </Col>
          </Row>
        </Container>
        
        <Container className="section4subcity py-5">
          <Row>
            <Col md={8} className="px-5">
              <h5 className="heading5subcity">We assist your loved ones with the following care:</h5>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li><b>Bathing, grooming, & hygiene care</b><p>Our caregivers make sure that elders feel clean and refreshed every day with regular grooming.</p></li>
                <li><b>Helping with laundry & light housekeeping</b><p>We take care of the little things so that aging adults can enjoy a tidy and comfortable home.</p></li>
                <li><b>Toileting & Incontinence care</b><p>Our team offers sensitive and respectful support prioritizing the dignity and comfort of seniors.</p></li>
                <li><b>Management of chronic conditions</b><p>We help manage chronic conditions to improve seniors’ overall health and wellness.</p></li>
              </ul>
              <p>By providing care in a familiar environment, we help seniors maintain their independence. This ensures not only continuity of care but also comfort and happiness.</p>
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
              <h2 className="heading2">Quality Care from Our Expert Team</h2>
              <p className="py-3">At Interim Healthcare, we pride ourselves on having a team of exceptional caregivers dedicated to providing the best level of in home care for elderly...</p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section5city py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="heading2city py-3">Your Comfort is Our Priority!</h2>
              <p style={{ textAlign: 'center' }}>Discover the peace of mind that comes with our in-home care services. Our exceptional caregivers are dedicated to helping your loved ones live comfortably and confidently at home...</p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <h2 className="heading2" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <Accordion className="py-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>What services does Interim Healthcare provide in Anderson, CA?</Accordion.Header>
              <Accordion.Body>
                Interim HealthCare offers a range of in-home care services to meet the unique needs of your seniors. These services include companion care, personal care, respite care, 24-hour care, and much more.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How does Interim HealthCare ensure the quality of care?</Accordion.Header>
              <Accordion.Body>
                We focus on creating a supportive environment for each elderly that we serve. Our caregivers maintain the highest standards of care and ensure their comfort and well-being.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Can seniors receive specialized care at home?</Accordion.Header>
              <Accordion.Body>
                Yes, Interim HealthCare offers specialized care services to meet the unique needs of seniors.
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
