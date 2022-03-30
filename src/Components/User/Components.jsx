import "./Components.css";
import React, { useState } from "react";
import {
  Container,
  CardImg,
  CardSubtitle,
  CardText,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Alert,
  CardHeader,
  CardBody,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { push } from "react-router-redux";
import Icon from '@mui/material/Icon';
import { useDispatch } from "react-redux";

const InactiveAccount = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Modal
      color="danger"
      isOpen={isOpen}
      backdrop
      modalTransition={{ timeout: 700 }}
    >
      <ModalHeader className="w-100">
        <Alert color="danger" className="w-100">
          Su cuenta se encuentra inactiva
        </Alert>
      </ModalHeader>
      <ModalBody>
        <CardHeader>
          <strong>Su cuenta presenta una deuda activa.</strong>
        </CardHeader>
        <br />
        <CardBody>
          <CardText>
            Aun podra visualizar su informacion, pero no podra realizar
            solicitudes ni enviar alertas.
          </CardText>
        </CardBody>
        <br />
        <CardText>
          Si ya regularizo su deuda pongase en contacto con un ejecutivo para
          poder activar nuevamente su cuenta
        </CardText>
      </ModalBody>
      {props.close && (
        <ModalFooter>
          <button className="btn btnSecondary" onClick={handleClose}>
            Cerrar
          </button>
        </ModalFooter>
      )}
    </Modal>
  );
};

class Profile extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Container
        id="Profile"
        fluid
        className="mt-lg-5 d-flex flex-column align-items-center"
      >
        <CardImg
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="img_avatar.png"
          width="100%"
          className="profile-avatar"
        ></CardImg>
        <CardSubtitle tag="p" className="profile-name">
          {this.props.user.rut}
        </CardSubtitle>
        <CardText tag="h5" className="profile-enterprise">
          {this.props.user.nombre}
        </CardText>
      </Container>
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <NavLink
        to={this.props.link}
        exact={this.props.exact}
        activeClassName="active"
        className="d-flex align-items-center nav-link"
      >
        <Icon>{this.props.icon}</Icon>
        {this.props.name}
      </NavLink>
    );
  }
}
const LogoutButton = (props) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "auth/logout" });
    dispatch(push('/'))
  };
  return (
    <button
      onClick={logout}
      className="d-flex align-items-center nav-link"
    >
      <Icon>exit_to_app</Icon>
      Salir
    </button>
  );
};

const DetalleActividad = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDetails = () => {
    setIsOpen(!isOpen);
  };
  let Header
  let Body
  if(props.solicitud){
    Header = Object.entries(props.solicitud)
    .filter(
      ([key]) =>
        key.includes("tipo") ||
        key.includes("fecha_creacion") ||
        key.includes("estado")
    )
    .map(([key, value], index) => {
      return (
        <p key={index}>
          <strong>{`${key} : `}</strong>
          {value}
        </p>
      );
    });

    Body = Object.entries(props.solicitud)
    .filter(
      ([key]) =>
        key !== "tipo" &&
        key !== "fecha_creacion" &&
        key !== "estado" &&
        key !== "id_solicitud" &&
        key !== "es_emergencia"
    )
    .map(([key, value], index) => {
      return (
        <p key={index}>
          <strong>{`${key} : `}</strong>
          {value}
        </p>
      );
    });
  }else if(props.actividad){
    Header = Object.entries(props.actividad)
    .filter(
      ([key]) =>
        key.includes("nombre") ||
        key.includes("fecha_acordada") ||
        key.includes("estado_tarea")
    )
    .map(([key, value], index) => {
      return (
        <p key={index}>
          <strong>{`${key} : `}</strong>
          {value}
        </p>
      );
    });

    Body = Object.entries(props.actividad)
    .filter(
      ([key]) =>
        key !== "nombre" &&
        key !== "fecha_acordada" &&
        key !== "estado_tarea" &&
        key !== "id_agenda" &&
        key !== "lc_resultado" &&
        key !== "informeTarea"
    )
    .map(([key, value], index) => {
      return (
        <p key={index}>
          <strong>{`${key} : `}</strong>
          {value}
        </p>
      );
    });
  }
  return (
    <div>
      <button
        className={`btn ${props.sm && "btnSm"} btnPrimary`}
        onClick={handleDetails}
      >
        Detalles
      </button>
      <Modal isOpen={isOpen} returnFocusAfterClose={false}>
        <ModalHeader>
          <p className="text-muted">{`Solicitud N° ${props.numero}`}</p>
        </ModalHeader>
        <ModalBody>
          <div className="description">{Header}</div>
          <hr />
          <div className="details">{Body}</div>
        </ModalBody>
        <ModalFooter>
          {props.anexos ? <a href={props.link} download role='button' className="btn btnPrimary">Descargar anexos</a> : null}
          <button className="btn btnSecondary" onClick={handleDetails}>
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export {
  InactiveAccount,
  Button,
  LogoutButton,
  Profile,
  DetalleActividad,
};
