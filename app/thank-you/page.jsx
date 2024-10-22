"use client";
import React from "react";
import NavbarComponent from "../navcomponent";
import Footer from "../Footer";
import SanjoseNavbarComponent from "../sanjosenavcomponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css"

export default function ThankyouComponent() {
    return (
<div>
<NavbarComponent/>
<div className="thankpagesec1">
<Container>
    <Row className="py-5">
        <Col>
        <p style={{textAlign:'center',color:'#ffff',fontSize:'30px',fontWeight:'600'}}>Thank you for submitting the form</p>
        <p style={{textAlign:'center',fontSize:'20px',color:'#ffff'}}>Our team will be in touch with you shortly.<br></br>
        To know more about us, please visit here.</p>
        </Col>
    </Row>
</Container>
</div>
<Footer/>
</div>
);
}