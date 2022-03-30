import "./Servicios.css";
import { Theme } from "../../../Theme.js";
import React from "react";

import {
  Card,
  CardTitle,
  Container,
  Jumbotron,
} from "reactstrap";
import { Assignment, CorporateFare, Engineering, Feedback } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";

export default function Servicios() {
  return (
    <Container fluid>
      <header>
        <Jumbotron fluid className="d-flex justify-content-center pt-2">
          <CardTitle tag="h2"> Nuestros Servicios</CardTitle>
        </Jumbotron>
      </header>
      <div className="services">
        <ThemeProvider theme={Theme}>
        <Card className="service">
          <span>
            <CorporateFare color="primary"/>
          </span>
          <span>
            <h3 className='bubbleTitle'>Visitas a terreno</h3>
          </span>
        </Card>
        {/* <Card hidden>
            <CardHeader>
              <CardTitle tag='h4'>Visitas a terreno</CardTitle>
            </CardHeader>
            <CardBody>
              <p>Nuestros mejores tecnicos evaluaran tu negocio para verificar que cumplas con todos los requisitos necesarios, y tu puedes modificar hasta 2 veces al año lo que sera evaluado para validar lo que necesites</p>
              </CardBody>
          </Card> */}
        <Card className="service">
          <span>
          <Engineering color="primary"/>
          </span>
          <span>
            <h3  className='bubbleTitle'>Capacitaciones</h3>
          </span>
        </Card>
        <Card className="service">
          <span>
            <Feedback color="primary"/>
          </span>
          <span>
            <h3  className='bubbleTitle'>Asesorias</h3>
          </span>
        </Card>
        <Card className="service">
          <span>
            <Assignment color="primary"/>
          </span>
          <span>
            <h3  className='bubbleTitle'>Mejora continua</h3>
          </span>
        </Card>
        </ThemeProvider>
      </div>
    </Container>
  );
}
