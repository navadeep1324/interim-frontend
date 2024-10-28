"use client";
import React from "react";
import SanjoseNavbarComponent from "../../../sanjosenavcomponent";
import HeaderComponent from "../../../headerpageComponent";
import CitypageFooter from "../../../footersanjose";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import bannerservice from "/public/images/sevices-banner-interim.webp";
import service1 from "/public/images/AlzheimersandDementiaCarecard.webp"; // Replace with actual images
import service2 from "/public/images/Companion care card.webp";
import service3 from "/public/images/Personal-Care-card.webp";
import service4 from "/public/images/Respite care card.webp"; // Replace with actual images
import service5 from "/public/images/Veteran-Care card.webp";
import service6 from "/public/images/24-Hour-Home-Care-card.webp";

export default function ServicesComponent() {
    return (
        <div>
            <SanjoseNavbarComponent />
            <HeaderComponent/>
            <div className="bg-light-peach py-5">
                <Container>
                    <Row className="d-flex align-items-center justify-content-center g-5 py-5">
                        <Col md={6} className="d-flex flex-column align-items-start">
                            <h1 className="homeh1">Services</h1>
                            <p className="homep py-3">
                                Our services are provided by a network of more than 300 independently operated franchise locations throughout the United States.
                            </p>
                            <Button className="homepagebtn py-3" href="tel:+1 408-286-6888">
                                Contact Us
                            </Button>
                        </Col>
                        <Col md={6} className="d-flex justify-content-center">
                            <Image src={bannerservice} alt="Services banner" />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="servicescaregiver">
                <Container fluid>
                    <Row className="middlealign g-1">
                        <Col md={10}>
                        <h2 className="job-opportunity-heading">
                                Looking for a job opportunity? Apply to join the Assured Home Nursing Caregiver team
                            </h2>
                        </Col>
                        <Col md={2} className="middlealign">
                            <Button className="apply-button py-3 px-5" href="https://www.interimhealthcare.com/careers" target="_blank">
                                Click Here
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
    <Container>
        <Row className="d-flex align-items-center justify-content-center">
            <Col className="d-flex flex-column align-items-center text-center">
                <h2 className="range-of-services-heading">
                    Our Range of Services in San Jose, California
                </h2>
                <p className="homep py-3">
                    Our various home care services are tailored to help your loved ones age with confidence and comfort. Be it personal care for better well-being or 24-hour care for continuous assistance, we elevate lives with compassion and positivity.
                </p>
            </Col>
        </Row>
    </Container>
</div>
<div className="bg-light-peach service-section-padding">
                <Container>
                    <Row>
                        {/* First Card */}
                        <Col md={4} >
                        <a href="/service-areas/san-jose/services/alzheimers-dementia-care"><Card className="h-100 cardstyle">
                                <Image
                                    src={service1} // Replace with actual image path
                                    alt="Alzheimer’s & Dementia Care"
                                    className="card-img-top"
                                    layout="responsive"
                                />
                                <Card.Body className="card-body-padding">
                                    <Card.Title className="card-title">Alzheimer’s & Dementia Care</Card.Title>
                                    <div className="divider-line"></div>
                                    <Card.Text className="card-text">
                                        Comprehensive Care that uplifts daily living for seniors with Alzheimer’s.
                                    </Card.Text>
                                </Card.Body>
                            </Card></a>
                        </Col>

                        {/* Second Card */}
                        <Col md={4}>
                        <a href="/service-areas/san-jose/services/companion-care">  <Card className="h-100 cardstyle">
                                <Image
                                    src={service2} // Replace with actual image path
                                    alt="Companion Care"
                                    className="card-img-top"
                                    layout="responsive"
                                />
                                <Card.Body className="card-body-padding">
                                    <Card.Title className="card-title">Companion Care</Card.Title>
                                    <div className="divider-line"></div>

                                    <Card.Text className="card-text">
                                        Extending a helping hand to seniors with a touch of companionship.
                                    </Card.Text>
                                </Card.Body>
                            </Card></a>
                        </Col>

                        {/* Third Card */}
                        <Col md={4}>
                        <a href="/service-areas/san-jose/services/personal-care"> <Card className="h-100 cardstyle">
                                <Image
                                    src={service3} // Replace with actual image path
                                    alt="Personal Care"
                                    className="card-img-top"
                                    layout="responsive"
                                />
                                <Card.Body style={{padding:'25px'}}>
                                    <Card.Title className="card-title">Personal Care</Card.Title>
                                    <div className="divider-line"></div>

                                    <Card.Text className="card-text">
                                        Assistance to maintain your seniors' basic hygiene and well-being.
                                    </Card.Text>
                                </Card.Body>
                            </Card></a>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="bg-light-peach service-section-padding">
                <Container>
                    <Row>
                        {/* fourth Card */}
                        <Col md={4} >
                        <a href="/service-areas/san-jose/services/respite-care">  <Card className="h-100 cardstyle" >
                                <Image
                                    src={service4} // Replace with actual image path
                                    alt="Respite care"
                                    className="card-img-top"
                                    layout="responsive"
                                />
                                <Card.Body style={{padding:'25px'}}>
                                    <Card.Title className="card-title">Respite Care</Card.Title>
                                    <div className="divider-line"></div>
                                    <Card.Text className="card-text">
                                    Purposeful Care which offers a well-deserved break for family Caregivers.                                    </Card.Text>
                                </Card.Body>
                            </Card></a>
                        </Col>

                        {/* fifth Card */}
                        <Col md={4}>
                        <a href="/service-areas/san-jose/services/veteran-care"> <Card className="h-100 cardstyle">
                                <Image
                                    src={service5} // Replace with actual image path
                                    alt="Companion Care"
                                    className="card-img-top"
                                    layout="responsive"
                                />
                                <Card.Body style={{padding:'25px'}}>
                                    <Card.Title className="card-title">Veteran Care</Card.Title>
                                    <div className="divider-line"></div>

                                    <Card.Text className="card-text">
                                    Supporting veterans or surviving spouses with care they truly deserve.                                    </Card.Text>
                                </Card.Body>
                            </Card></a>
                        </Col>

                        {/* sixth Card */}
                        <Col md={4}>
                        <a href="/service-areas/san-jose/services/24-hour-care">  <Card className="h-100 cardstyle">
                                <Image
                                    src={service6} // Replace with actual image path
                                    alt="Personal Care"
                                    className="card-img-top"
                                    layout="responsive"
                                />
                                <Card.Body style={{padding:'25px'}}>
                                    <Card.Title className="card-title">24 Hour Home Care</Card.Title>
                                    <div className="divider-line"></div>

                                    <Card.Text className="card-text">
                                    Personalized care with the help of caregivers assigned round-the-clock.                                    </Card.Text>
                                </Card.Body>
                            </Card></a>
                        </Col>
                    </Row>
                </Container>
            </div>
            <CitypageFooter />
        </div>
        
    );
}
