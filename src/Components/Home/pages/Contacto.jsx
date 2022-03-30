import "./Contacto.css";
import styles from '../Root.module.css';
import {useState} from 'react'
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Jumbotron,
  Label,
  Row,
} from "reactstrap";
import Icon from '@mui/material/Icon';
import emailjs from 'emailjs-com';
import { LoadingScreen } from "../../Common/Loading";
import Rubros from './../../../Rubros.json';

export default function Contacto (){
  const [isSending,setIsSending] = useState(false)
  const [status,setStatus] = useState(null)

  const rubros = Rubros.map((elemnt,index)=> {
    return (
      <option key={index}>{elemnt}</option>
    )
  })

  const handleSubmit = (e) =>{
    e.preventDefault()
    setIsSending(true)
    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID,process.env.REACT_APP_TEMPLATE_ID,e.target,process.env.REACT_APP_USER_ID)
    .then((response) => {
      if(response.text === 'OK'){
        const success = {status:'success',title:'Solicitud enviada',body:'Su solicitud fue enviada exitosamente'}
        setStatus(success)
      }
    })
    .catch(() =>{
      const error = {status:'danger',title:'Error',body:'Hubo un problema al procesar su solicitud'}
      setStatus(error)
    })

  }
  return (
    <Container fluid className={styles.containerFluid}>
      <header>
        <div id="header-background">
          <Jumbotron fluid className="pt-5">
            <Container
              fluid
              className="d-flex flex-column justify-content-center bg-body bg-opacity-75"
            >
              <Container className="d-flex justify-content-center">
                <CardTitle tag="h1">Tu seguridad en nuestras manos</CardTitle>
              </Container>
              <Container className="d-flex justify-content-center text-center width-100px">
                <CardText tag="p" className="text-blue">
                  Con nuestro servicio podras despreocuparte de los accidentes
                  laborales y tendras la seguridad de contar con un equipo de
                  profesionales a tu asistencia en todo momento
                </CardText>
              </Container>
            </Container>
          </Jumbotron>
          </div>
      </header>
      <Card className='d-flex'>
        <Row className="align-items-center justify-items-around">
          <Col xs={12} sm={12} md={4} lg={4} className="ms-auto me-auto">
            <Card className="d-flex flex-row align-items-center">
                <Icon style={{ color: '#929ECC' }} fontSize='large'>phone</Icon>
              <CardBody>
                <CardSubtitle tag="h5">Contactanos</CardSubtitle>
                <CardTitle tag="h3" className="text-muted">
                  +569 1234 5678
                </CardTitle>
                <CardText tag="p" className="text-light-blue">
                  De lunes a viernes de 8:00 a 18:00
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={{size:6,offset:-1}} className="ms-auto me-auto">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input type="text" id="name"name="name" required></Input>
                  </FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup>
                    <Label for="lastname">Apellido</Label>
                    <Input type="text" id="lastname" name="lastname" required></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@example.com"
                      required
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label for="phone">Telefono</Label>
                    <Input type="text" maxLength="12" id="phone" name="phone"></Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="company">Compañia</Label>
                <Input type="text" id="company" name="company" required></Input>
              </FormGroup>
              <FormGroup>
                <Label for="rubro">Rubro</Label>
                <Input type="select" id="rubro" name="rubro" defaultValue={'Seleccione una opcion'} required>
                  <option name='Seleccione una opcion' disabled>Seleccione una opcion</option>
                  {rubros}
                </Input>
              </FormGroup>
              <FormGroup className=''>
                <Input className='btn btnPrimary mx-auto' type="submit"></Input>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Card>
      <LoadingScreen
      isOpen={isSending}
      setIsOpen={(state) => setIsSending(state)}
      message
      result={status}/>
    </Container>
  );
};
