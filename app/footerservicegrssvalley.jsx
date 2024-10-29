    "use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Expect1 from "/public/images/Expect1.webp";
import Expect2 from "/public/images/Expect2.webp"
import Expect3 from "/public/images/Expect3.webp";
import Image from "next/image";
import contactbgimg from "/public/images/contactbgimg.png";
import FormComponent from "./homeformcomponent";
import Inlogo from '../public/images/Inlogo.png';
import { Button } from 'react-bootstrap';

export default function GrassValleyFooter() {
        
    return (

        <div>
               <div className="footersection1 py-5 Awardsec"> 
                <Container>
                    <Row>
                        <Col><h2 className="footerh2 py-3">Begin your Senior’s Journey with us!
                        </h2></Col>
                    </Row>
                    <Row className="footerrow middlealign ">
                        <Col md="4" className="footercol footer-all"><Image className="award-image" src={Expect1}/>
                        <p className="footerp py-4 mx-3">Contact your local Interim Healthcare office to set up a free initial assessment.</p></Col>
                        <Col md="4" className="footercol footer-all"><Image className="award-image" src={Expect2}/>
                        <p className="footerp py-4 mx-3">Our team shall craft a care plan which is best suited to your loved ones’ needs.
                        </p></Col>
                        <Col md="4" className="footercol footer-all"><Image className="award-image" src={Expect3}/>
                        <p className="footerp py-4 mx-3">Our compassionate and trained caregivers shall come to your home to provide the selected services.
                        </p></Col>
                    </Row>
                </Container>
            </div>
            <div className="contactsecbg"></div>
      <div className="footersec py-5">
        <Container>
          <Row className="middlealign">
            <Col md={6}>
              <h2 className="servicefooterh2">Care That’s Focused on What Matters Most
              In Every Step, We're By Your Side</h2>
              <p className="py-4">Interim HealthCare is here for you. We’re ready to listen and help find a personalized solution that meets your needs. Give us a call or send us a message today.</p>
            </Col>
            <Col md={6} className="formcoloum py-5 px-5">
              <FormComponent />
            </Col>
          </Row>
        </Container>
      </div>
            <div className="Footer1 py-5">
                <Container>
                    <Row>
                        <Col md={6}>
                        <Image
              src={Inlogo}
              width={161}
              height={70}
              alt="Picture of the author"
            />
             <Button className="Contactbtn py-3 my-4" href="tel:+1 408-286-6888">Find a Location</Button>

                        </Col>
                        <Col md={6}>
                        <p><b><a href="	+1 530-272-0300">	+1 530-272-0300</a></b></p>
                        <p><b>	406 E Main St Suite A, Grass Valley, CA 95945, USA</b></p>
                       
                        </Col>

                    </Row>
                </Container>
            </div>
            <div className="corprights py-3">
                <Container>
                    <Row>
                        <Col><p style={{color:'#fff', textAlign:'center'}}>Copyright ©2024 | All Rights Reserved</p></Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}