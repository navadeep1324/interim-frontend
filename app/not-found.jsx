"use client";
import React from "react";
import NavbarComponent from "./navcomponent";
import Footer from "./Footer";
import SanjoseNavbarComponent from "./sanjosenavcomponent";
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
    <Row className="">
        <Col>
        <h1 style={{textAlign:'center',color:'#ffff !important',fontSize:'50px',fontWeight:'600'}}>404
        </h1>
        <h2 style={{textAlign:'center',fontSize:'20px',color:'#ffff',lineHeight:'1.6em'}}>We are sorry but the page you requested was not found
        <br></br>
        To know more about us, please visit <a href="/" className="thankyou">here.</a></h2>
        </Col>
    </Row>
</Container>
</div>
<Footer/>
</div>
);
}