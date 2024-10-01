"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CompanionCare from "/public/images/CompanionCare.png";
import Image from "next/image";

export default function SanJoseservicesComponent() {
    return (

<div>
<Container fluid>
    <Row className="px-3 py-2" style={{marginTop:'-16%'}}>
<Col md={2} className="servicecoloumcity">
<div style={{textAlign:'center'}}>
<h4 className="titleservice py-2">Companion Care</h4>
<Image src={CompanionCare} className="imagemaincity justify-content-md-center"/>
</div>
</Col>
<Col md={2} className="servicecoloumcity">
<h4 className="titleservice py-2">Personal Care</h4>
<Image src={CompanionCare} className="imagemaincity justify-content-md-center"/>
</Col>
<Col md={2} className="servicecoloumcity">
<h4 className="titleservice py-2">24 Hour Home Care</h4>
<Image src={CompanionCare} className="imagemaincity"/>
</Col>
<Col md={2} className="servicecoloumcity">
<h4 className="titleservice py-2">Veteran Care</h4>
<Image src={CompanionCare} className="imagemaincity"/>
</Col>
<Col md={2} className="servicecoloumcity">
<h4 className="titleservice py-2">Respite Care</h4>
<Image src={CompanionCare} className="imagemaincity"/>
</Col>
</Row>
    </Container>
</div>

);
}