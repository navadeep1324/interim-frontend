"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormComponent from "../../homeformcomponent";
import Image from "next/image";
import CitypageFooter from "../../CitypageFooter";
import SanJoseservicesComponent from "../../sanjoseservicecomponent";
import CaregiverCityComponent from "../../caregiversComponentMainCity";
import SanJose4 from "/public/images/Enhance-Senior-Health.webp";
import YubaNavbarComponent from "../../yubanavcomponent";
import YubaservicesComponent from "../../yubaservicecomponent";
import YubaFooter from "../../footeryuba";
import Head from "next/head";

export default function YubaComponent() {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const API_URL = "https://admin.interimhc.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/yubas?populate[maincontent][populate]=*&populate[seo]=*`
        );
        setData(response.data.data[0].attributes);
        setSeoData(response.data.data[0]?.attributes?.seo);
      } catch (error) {
        console.error("Error fetching data from Strapi", error);
      }
    };
    fetchData();
  }, []);

  // Dynamically set the meta title and description once the seoData is fetched
  useEffect(() => {
    if (seoData && Array.isArray(seoData) && seoData.length > 0) {
      const seo = seoData[0]; // Access the first element of the seoData array
      console.log("SEO Data received:", seo); // Log seoData for debugging
      document.title = seo.metaTitle || "Default Title";
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seo.metaDescription || "Default Description");
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = seo.metaDescription || "Default Description";
        document.head.appendChild(newMetaDescription);
      }
    } else {
      console.log("No SEO Data received"); // Log if seoData is not available
    }
  }, [seoData]);

  if (!data) {
      return //<p>Loading...</p>;
 // Loading state while data is being fetched
  }

  // Helper function to render text content
  const renderTextContent = (content) => {
    return content?.children?.map((item, idx) => {
      if (item.bold) {
        return <b key={idx}>{item.text}</b>;
      } else {
        return <span key={idx}>{item.text}</span>;
      }
    });
  };

  return (
    <div>
      <YubaNavbarComponent />

      {/* Section 1 - Banner */}
      <div className="section1banner">
        <Container>
          <Row className="py-3">
            <Col md={7} className="py-5" style={{paddingRight:"4%"}}>
              <h1>{data.maincontent[0]?.Heading}</h1>
              <p className="py-3">{data.maincontent[0]?.subHeading}</p>
              <p>
                For a quick consultation, give us a call at <a href="tel:530-673-0300" className="phone-link">+1 530-673-0300</a> and
                let us help you with the right care plan!
              </p>
              <div className="flex py-3" style={{paddingRight:"8%"}}>
                <div className="iconhome">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="icontext px-2">
                  <b>Serving:</b>
                </div>
                <div className="citynames">
                Marysville | Olivehurst | Plumas Lake | Loma Rica | Live Oak |
                Colusa | Williams | Maxwell 
                </div>
              </div>
            </Col>
            <Col md={5} className="formcoloumcity">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 2 - Services */}
      {/* <div style={{ backgroundColor: '#015979', height: '145px' }}></div> */}
      <div>
        <YubaservicesComponent />
      </div>

      {/* Section 3 - Caregivers */}
      <div className="sectioncaregiversbg">
        {/* <CaregiverCityComponent /> */}
      </div>

      {/* Section 4 - Growing Need of Home Care */}
      <div className="section2city">
        <Container fluid>
          <Row className="py-4">
            <Col md={6} className="px-0">
              {data.maincontent[1]?.image?.data && (
                <Image
                  src={`${API_URL}${data.maincontent[1].image.data.attributes.url}`}
                  alt={
                    data.maincontent[1].image.data.attributes.alternativeText ||
                    "San Jose"
                  }
                  width={data.maincontent[1].image.data.attributes.width}
                  height={data.maincontent[1].image.data.attributes.height}
                />
              )}
            </Col>
            <Col md={6} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
              <h2 className="heading2 py-4">{data.maincontent[1]?.Heading}</h2>
              <p className="py-2">
                {data.maincontent[1]?.description?.[0]?.children?.[0]?.text}
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 5 - Quality Senior Care */}
      <div className="section3city py-5">
        <Container fluid>
          <Row>
            <Col
              md={6}
              style={{ paddingRight: "3em", paddingLeft: "3em" }}
            >
              <h2 className="heading2 py-4">
                {data.maincontent[2]?.Heading}
              </h2>
              <p>
                {data.maincontent[2]?.description?.[0]?.children?.[0]?.text}
              </p>
            </Col>
            <Col md={6}>
              {data.maincontent[2]?.image?.data && (
                <Image
                  src={`${API_URL}${data.maincontent[2].image.data.attributes.url}`}
                  alt={
                    data.maincontent[2].image.data.attributes.alternativeText ||
                    "San Jose"
                  }
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
                  alt={
                    data.maincontent[3].image.data.attributes.alternativeText ||
                    "San Jose"
                  }
                  width={data.maincontent[3].image.data.attributes.width}
                  height={data.maincontent[3].image.data.attributes.height}
                />
              )}
            </Col>
            <Col md={8} style={{ paddingLeft: "3em" }}>
              <h2 className="heading2">
                {data.maincontent[3]?.Heading}
              </h2>
              <p>
                {data.maincontent[3]?.description?.[0]?.children?.[0]?.text}
              </p>
              {/* <ul
                style={{ listStyleType: "disc", paddingLeft: "20px" }}
                className="py-2"
              >
                {data.maincontent[3]?.description?.[1]?.children?.map(
                  (item, index) => (
                    <li key={index}>{item?.children?.[0]?.text}</li>
                  )
                )}
              </ul> */}
              {/* <p>{data.maincontent[3]?.description?.[2]?.children?.[0]?.text}</p> */}
              
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li><p><b>Promoting Independence </b></p> 
                <p>Our caregivers assist with daily tasks while fostering seniors’ independence and self-esteem.</p>
                </li>
                <li><p><b>Emotional and Social Well-Being </b></p> 
                <p> Through meaningful companionship, we help combat loneliness and enhance emotional health.</p>
                </li>
                <li><p><b>Flexible and Convenient Care </b></p> 
                <p> From part-time visits to 24/7 care, our services are adapted to fit your family’s unique needs. </p>
                </li>
                <li><p><b>Safe and Familiar Environment  </b></p> 
                <p>Staying at home keeps seniors in a comfortable, known space, reducing stress and ensuring safety.  </p>
                </li> </ul>

            </Col>
          </Row>
        </Container>
      </div>

            {/* Section 7 - Affordable Home Care */}
            <div className="section4city py-5">
    <Container>
        <Row className="py-3">
            <Col md={2}></Col>
            <Col md={8}><h2 className="heading2" style={{textAlign:'center'}}>Enhancing Lives with In-Home Care Services  </h2>
            <p style={{textAlign:'center'}} className="py-2">We recognize that each senior has unique needs, and our dedicated team adapts our services to provide the most suitable support. 
</p></Col>
<Col md={2}></Col>
        </Row>
        <Row className="py-4"> 
            <Col md={6}>
<Image src={SanJose4} alt="Yuba City"/>
            </Col>
            <Col md={6} style={{ paddingLeft: '3em' }}>
            <p><b>Alzheimer’s & Dementia Care: </b> Support for cognitive impairments, focusing on enhancing daily living through familiarity and patience. </p>
           <p className="py-2"><b>Veteran’s Care: </b>Comprehensive care tailored to the unique challenges and lifestyles of veterans. </p>
            <p><b>Companion Care: </b>Emotional support and engaging activities that foster friendships and combat loneliness. </p>
            <p><b>Personal Care: </b> Assistance with daily tasks to help seniors maintain independence and hygiene with dignity. </p>
            <p><b>Respite Care:  </b> Temporary support for family caregivers, providing peace of mind while loved ones are in capable hands. </p>
            </Col>
        </Row>
    </Container>
</div>
<div className="section5city py-5">
    <Container>
        <Row>
            <Col>
            <h2 className="heading2city py-3">Give us the Opportunity to Serve Your Loved Ones            </h2>
           <p style={{textAlign:'center'}}>Seniors are the roots of our family tree, and it’s our responsibility to provide them with the best care possible. Even when they insist on managing alone, we must step in and offer support. Interim Healthcare of Yuba City is here to assist! call at <a href="tel:530-673-0300" className="phone-link">+1 530-673-0300</a></p>
            </Col>
        </Row>
    </Container>
</div>
<div className="section6city py-5">
    <Container>
        <Row>
            <Col md={2}></Col>
            <Col md={8}> 
            <h2 className="heading2citysub">Interim Health Care Services in yuba, CA            </h2>
           <p style={{ color: '#ffff',textAlign:'center' }} className="py-2">If planning to look for senior in home care services for your loved ones in Redding, feel free to reach us.
           We serve in several cities, listed below are few of them :</p>
            </Col>
            <Col md={2}></Col>
        </Row>
        <Row className="subcitysec py-5 px-5 my-4">
<Col md={4}>
<div className="flex py-2">
    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
    <div><p style={{color:'#004b66'}}><b>Marysville</b></p></div>
</div>
<div className="flex py-2">
    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
    <div><p style={{color:'#004b66'}}><b>Olivehurst</b></p></div>
</div>
<div className="flex py-2">
    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
    <div><p style={{color:'#004b66'}}><b>Plumas Lake</b></p></div>
</div>
</Col>
<Col md={4}>	
<div className="flex py-2">
    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
    <div><p style={{color:'#004b66'}}><b>Loma Rica </b></p></div>
</div>
<div className="flex py-2">
    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
    <div><p style={{color:'#004b66'}}><b>Live Oak</b></p></div>
</div>
<div className="flex py-2">
    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
    <div><p style={{color:'#004b66'}}><b>Colusa</b></p></div>
</div>
</Col>
<Col md={4}>
<div className="flex py-2">
    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
    <div><p style={{color:'#004b66'}}><b>Williams</b></p></div>
</div>	

<div className="flex py-2">
    <div className="iconcity"><i className="bi bi-chevron-right"></i></div>
    <div><p style={{color:'#004b66'}}><b>Maxwell</b></p></div>
</div>	
</Col>
        </Row>
    </Container>
</div>

<Head>
        <title>{seoData?.[0]?.metaTitle || "Default Title"}</title>
        <meta name="description" content={seoData?.[0]?.metaDescription || "Default Description"} />
      </Head>

      {/* Footer */}
      <YubaFooter />
    </div>
  );
}
