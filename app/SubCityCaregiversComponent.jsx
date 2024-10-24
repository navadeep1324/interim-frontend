"use client";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

export default function SubcityCaregiversComponent(){
return(
<div>
<Container fluid>
    <Row className="py-3 my-3 caregiverbg">
        <Col md="9" className="coloum1txt">
        <h3 className="caregivertextcity">Unlock Your Potential: Join our team of caregivers today!</h3>
        </Col>
        <Col md="3" className="numbercol">
        <Button className="caregivercitybtn py-3" href="https://www.interimhealthcare.com/careers" target="_blank">
        Apply Now 
            </Button>
        </Col>
    </Row>
</Container>
</div>
);
}