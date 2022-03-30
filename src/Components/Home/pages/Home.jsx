import "./Home.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

import { Hero, Pricing } from "../Components.jsx";

export default function Home() {
  return (
    <Container fluid>
      <Row className="content">
        <Col
        className=' content-middle'
          xs={{ size: 12 }}
          sm={{ size: 8, offset: 1 }}
          md={{ size: 7, offset: 0 }}
          lg={{ size: 5, offset: 0 }}
        >
          <Hero
            title="Tu empresa a Salvo"
            titleStyle={"title"}
            desc="Contamos con una amplia variedad de profesionales en la prevencion de riesgos capaces de detectar y anticipar accidentes, para que usted solo se preocupe de manejar su negocio."
            descStyle={"text-blue text-break"}
            buttons={[
              { to:'Contacto',desc: "Contratar servicio", type: "btnPrimary" },
              { to:'Servicios',desc: "Nuestro servicio", type: "btnSecondary" },
            ]}
          ></Hero>
        </Col>
        <Col className='img-box'>
        <img className="hero_img" src='/img/Designer.png' alt='hero'></img>
        </Col>
      </Row>
      <Row className="content">
        <Col
          xs={{ size: 12 }}
          sm={{ size: 8 }}
          md={{ size: 8 }}
          lg={{ size: 8 }}
        >
          <Hero
            title="Facil, veloz y eficaz"
            titleStyle={"title"}
            desc="Puedes ver todas tus solicitudes realizadas para una mejor gestion, ademas te ofrecemos la libertad de visualizar toda la documentacion realizada por nuestros profesionales para que exista una transparencia de actividad."
            descStyle={"text-blue text-break"}
          ></Hero>
          <Row>
            <Col
              xs={{ size: 12 }}
              sm={{ size: 8 }}
              md={{ size: 6 }}
              lg={{ size: 6 }}
            >
              <Card className='bg-opacity-80'>
                <CardHeader>
                  <span>Icons</span>
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h5">Visitas mensuales</CardTitle>
                  <CardText className="text-wrap text-muted">
                    Cada cliente puede optar hasta dos visitas mensuales donde
                    nuestros profesionales van a terreno a inspeccionar cada
                    ambito que el cliente considere pertinente. Con la facilidad
                    de que puede modificar hasta dos veces al año la lista de
                    checkeo en caso de requerirlo
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col
              xs={{ size: 12 }}
              sm={{ size: 8 }}
              md={{ size: 6 }}
              lg={{ size: 6 }}
            >
              <Card className='bg-opacity-80'>
                <CardHeader>
                  <span>Icons</span>
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h5">Emergencias</CardTitle>
                  <CardText className="text-wrap text-muted">
                    En caso de accidente o fiscalizacion se ofrecen hasta 10
                    asesorias, las cuales incluyen visita en terreno, la
                    interacción con el fiscalizador, la gestión de los
                    accidentes, las propuestas de mejora y la verificación de la
                    implementación de las mejoras propuestas
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col className='img-box'>
        <img className="designer_img" alt='benefits' src='/Img/Designer-2.png'></img>
        </Col>
      </Row>
      <Row className="content justify-content-center">
        <img className='pricing_img' src="/img/Background.png" alt="wave" />
        <Col className="align-self-center" xs={12} sm={8} md={6} lg={6}>
          <Pricing
            title="Un unico plan para todos"
            titleStyle={"title"}
            desc="Nuestro modelo de negocios contempla un pago mensual, el cual otorga la cobertura basica y en caso de necesitar servicios extra se paga al momento de solicitarlo."
            descStyle={"text-light-blue text-break"}
            price={"40.000 CLP"}
            opt={[
              "Visitas a terreno",
              " Gestion de documentos",
              "Asesorias",
              "Capacitaciónes",
            ]}
          ></Pricing>
        </Col>
      </Row>
    </Container>
  );
}
