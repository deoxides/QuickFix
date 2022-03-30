import "./Components.css";
import styles from './Root.module.css'
import React from "react";
import { CardBody, CardTitle, CardText, Row, Col, Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {Facebook,Twitter,Instagram, LinkedIn, YouTube} from '@mui/icons-material';
import { Divider } from "@mui/material";

class Card extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <CardBody color="text-white">
        <CardTitle className={"card-title "+ this.props.props.titleStyle} tag="h1">
          {this.props.props.title}
        </CardTitle>
        <CardText className={this.props.props.descStyle}>{this.props.props.desc}</CardText>
      </CardBody>
    );
  }
}


class Hero extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let component = null;
    let buttons = [];
    if (this.props.buttons ? this.props.buttons : null) {
      buttons = this.props.buttons.map((button, index) => {
        return (
          <Col key={index} md="6" className="d-flex mt-3 justify-content-center">
            <NavLink to={`/${button.to}`} className={`btn ${button.type}`}>{button.desc}</NavLink>
          </Col>
        );
      });
    }
    if (buttons.length > 0) {
      component = <Row>{buttons}</Row>;
    }

    return (
      <Container id='Hero' fluid className={this.props.class}>
            <Card props={this.props}/>
            {component}
      </Container>
    );
  }
}

class Pricing extends React.Component{
  render(){
    const services = this.props.opt.map((opt,i) =>{
      return(
        <li key={i}>
          {opt}
        </li>
      )
    })
    return(
      <Container className='card bg-transparent'>
      <Card props={this.props}>
      </Card>
      <CardTitle tag='h1' className='text-center'>
        {this.props.price}
      </CardTitle>
        <ul className='mx-auto text-center'>
          {services}
        </ul>
      </Container>
  )}
}


class Footer extends React.Component {
  render() {
    return<footer className={styles.footer}>
      <div className="inline reverse">

            <div className="brand">
              <span>©2021 QuickFix ltda.</span>
            </div>
            <Stack direction="row" spacing={2}>
              <IconButton>
              <Facebook/>
              </IconButton>
              <IconButton>
              <LinkedIn/>
              </IconButton>
              <IconButton>
              <Twitter/>
              </IconButton>
              <IconButton>
              <YouTube/>
              </IconButton>
              <IconButton>
              <Instagram/>
              </IconButton>
            </Stack>
      </div>
      <Divider variant="middle" />
      <div className='inline'>

        <NavLink to=''>
          Politicas de privacidad
        </NavLink>
        <NavLink to=''>
          Avisos legales
        </NavLink>
      </div>

    </footer>
  }
}
export { Hero,Pricing, Footer};
