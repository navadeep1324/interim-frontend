"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReddingNavbarComponent from "../../../reddingnavcomponent"
import FormComponent from "../../../homeformcomponent";
import SubcityCaregiversComponent from "../../../SubCityCaregiversComponent";
import Cupertinomain from "/public/images/Senior-Care-in-Rancho-Tehama.webp";
import Image from "next/image";
import Cupertino1 from "/public/images/Home-Health-Care-Services.webp";
import Cupertino2 from "/public/images/Cupertino2.png";
import Sanjoseservice1 from "/public/images/Sanjoseservice1.png";
import Sanjoseservice2 from "/public/images/Sanjoseservice2.png";
import Sanjoseservice3 from "/public/images/Sanjoseservice3.png";
import Button from 'react-bootstrap/Button';
import CitypageFooter from "../../../CitypageFooter";
import ReddingservicesComponent from "../../../reddingservicesComponent";
import Accordion from 'react-bootstrap/Accordion';

export default function SanJoseCupertinoComponent() {
    return (
<div>
<ReddingNavbarComponent />
<div className="section1subcity py-5">
<Container  fluid className="px-5">
<Row>
    <Col md={7} className="sanjose-banner" >
<h2 className="subcityheading">Senior Home Care in Rancho Tehama, California   </h2>
<p className="py-3">
We believe that aging should be a time of dignity, comfort, and cherished moments. The in-home care services of Interim Healthcare are designed to provide seniors with the support they need to continue living independently in Rancho Tehama.     
 </p>
<p>Call us today at  <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> for detailed information </p>
<SubcityCaregiversComponent/>
    </Col>
    <Col md={4} className="formcoloumcity">
    <FormComponent/>
    </Col>
</Row>
</Container>
    </div>
    {/* <div style={{backgroundColor:'#015979',height:'145px'}}>
</div> */}
    <div>
        <ReddingservicesComponent/>
    </div>
    <div>
        <Container fluid>
            <Row className="py-5">
                <Col md={6} className="px-5 ">
                <Image src={Cupertinomain} />
                </Col>
                <Col md={6} style={{paddingLeft:'25px;'}} >
                <h2 className="heading2 ">The Need of Senior Care in Rancho Tehama, CA    </h2>
                <p className="py-3">
                <a href="https://en.wikipedia.org/wiki/Rancho_Tehama,_California" className="phone-link" target="_blank">Rancho Tehama</a> is a small community in Tehama County, California. It is one of the best places to <a href="https://www.niche.com/places-to-live/search/best-places-to-retire/c/tehama-county-ca/" className="phone-link" target="_blank">retire </a>in Tahama County. However, being a small city, Rancho has limited access to senior care services for its <a href="https://data.census.gov/profile/Rancho_Tehama_Reserve_CDP,_California?g=160XX00US0659604" className="phone-link" target="_blank">huge elderly population</a>. This is exactly where Interim Healthcare offer an extra helping hand. 
                </p>
                <p>Interim HealthCare offers tailored care plans to meet the unique needs of each senior. Whether it's assistance with daily activities, personal care, or medical support, our services are designed to enhance the quality of life for older adults. </p>
                </Col>
            </Row>
        </Container>
    </div>
    <div className="section3subcity py-5">
        <div>
        <Container>
            <Row>
                <Col>
                <h2 className="heading2" style={{color:'#ffff',textAlign:'center'} }>In Home Health Care Services in Rancho Tehama   </h2>
                <p className="py-3" style={{color:'#ffff',textAlign:'center'}}>At Interim HealthCare, we understand that the comfort of home can significantly enhance seniors’ quality of life. Our in-home health care services are designed to provide the highest level of care for elders recovering from illness, surgery, or managing chronic conditions, all within the familiar surroundings of their own homes. </p>
                </Col>
            </Row>
        </Container>
        </div>
        <div>
            <Container className="section4subcity py-5">
                <Row>
                    <Col md={8} className="px-5">
                    <h5 className="heading5subcity">Our home health care services include:    </h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className="py-4">
                <li><p> <a href="/service-areas/redding/services/personal-care" className="phone-link">Personal care </a> </p> </li>
                <li><p><a href="/service-areas/redding/services/personal-care"className="phone-link" >Companion care  </a></p>  </li>
                <li><p><a href="/service-areas/redding/services/personal-care"className="phone-link" >Hospice care </a></p>  </li>
                <li><p><a href="/service-areas/redding/services/personal-care" className="phone-link">Veteran care </a></p>  </li>
               </ul>
               <h2 className="heading2">Our Caregivers Travel the Extra Mile   </h2>
<p className="py-3">At Interim HealthCare, our caregivers don't just meet expectations—they exceed them. We believe that exceptional care goes beyond just providing services; it’s about making a meaningful impact in the lives of aging adults.   </p>
<p>Our caregivers are dedicated to offering customized care for every senior, ensuring they receive the right support, assistance, companionship, and specialized attention. They take the time to get to know each elderly and meet their expectations. This level of care fosters trust, comfort, and peace of mind for both the senior and their families.  </p>
               </Col>
                    <Col md={4}>
<Image src={Cupertino1} alt=""/>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
    {/* <div className="py-5">
        <Container>
            <Row>
                <Col md={6} style={{paddingRight:'25px'}}>
<Image src={Cupertino2} />
                </Col>
                <Col md={6} style={{paddingLeft:'25px'}}>
<h2 className="heading2">Our Caregivers Travel the Extra Mile   </h2>
<p className="py-3">At Interim HealthCare, our caregivers don't just meet expectations—they exceed them. We believe that exceptional care goes beyond just providing services; it’s about making a meaningful impact in the lives of aging adults.   </p>
<p>Our caregivers are dedicated to offering customized care for every senior, ensuring they receive the right support, assistance, companionship, and specialized attention. They take the time to get to know each elderly and meet their expectations. This level of care fosters trust, comfort, and peace of mind for both the senior and their families.  </p>
               </Col>
            </Row>
        </Container>
    </div> */}
   
    <div className="py-5">
        <Container>
        <h2 className="heading2" style={{textAlign:'center'}}>Frequently Asked Questions</h2>
    <Accordion className="py-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>What is the difference between personal care and companion care?  </Accordion.Header>
        <Accordion.Body>
        Personal care involves assistance with activities of daily living, including personal hygiene, mobility, and medication management. Whereas companion care focuses on socializing, playing games, offering emotional support, etc. 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>What is respite care and how can it benefit families? </Accordion.Header>
        <Accordion.Body>
        Respite care offers temporary relief for family caregivers, allowing them to take a break while their loved one continues to receive care. This helps reduce caregiver stress and ensures that your loved one receives consistent, quality care.   
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>What should I expect during the first visit from a caregiver?  </Accordion.Header>
        <Accordion.Body>
        During the first visit, our caregiver will review the care plan with you and your loved one. This initial meeting is also an opportunity to establish a comfortable routine with seniors as we move forward. 
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Container>
    </div>
    <div className="section5city py-5">
    <Container>
        <Row>
            <Col>
            <h2 className="heading2city py-3">We Are Proud to Serve Aging Adults  </h2>
          
           <p style={{textAlign:'center'}}>Experience compassionate senior care that enhances the quality of life in the comfort of your own home. At Interim HealthCare in Rancho Tehama, we offer personalized in-home services to support your loved one's independence and well-being. From personal care to skilled healthcare, we're here for you. Call us today at <a href="tel:530-221-1212" className="phone-link">+1 530-221-1212</a> to learn more about our comprehensive services and start your journey toward peace of mind.  </p>
            </Col>
        </Row>
    </Container>
    </div>
<CitypageFooter/>
</div>
    );
}