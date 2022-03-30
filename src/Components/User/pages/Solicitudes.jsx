import "./Solicitudes.css";
import React, { useState} from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { LoadingScreen } from "../../Common/Loading";
import {InactiveAccount} from './../Components'
import {sendSolicitud} from '../../../Requests'

export const Solicitudes = (props) => {
  const account = useSelector((state) => state.auth.account);
  const solicitudes = useSelector((state) => state.user.solicitudes);

  const [form, setForm] = useState(props.match.params.type);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);


  const handleChangeForm = (e) => {
    if (props.match.params.type === undefined) {
      setForm(e.target.value);
    }
  };

  const handleRenderForm = (formName) => {
    switch (formName) {
      case "Visita a terreno":
        return <VisitaTerreno />;
      case "Capacitacion":
        return <Capacitacion />;
      case "CheckList":
        return <CheckList />;
      case "Asesoria":
        return <Asesoria/>;
      case "Emergencia":
        return <Emergencia />;
      default:
        return null;
    }
  };

  const transformObjectToText = (obj) => {
    let str = '';
    for (const [p, val] of Object.entries(obj)) {
        str += `${p} ${val} \n`;
    }
    return str;
  }

  const formValidation = (data) => {
    let dataValidated = Object.fromEntries(
      Object.entries(data).filter(
        ([key]) => key === "tipo" || key === 'es_emergencia'
      )
    );
    dataValidated["id_cliente"] = account.id_cliente
    dataValidated["descripcion"] = transformObjectToText(Object.fromEntries(
      Object.entries(data).filter(
        ([key]) => key!== 'tipo' && key!=='es_emergencia'
      )
    ));
    return JSON.stringify(dataValidated);
  };

  const requestValidation = () =>{
    const available = () =>{
      const tipo = Array.from(new Set(solicitudes.map((elem) => elem.tipo)))
    }
    if(available){

    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (account.estado === 'activo') {
      if (document.getElementById("tipo").value !== "Seleccione una opción") {

        const formData = Object.fromEntries(new FormData(e.target));
        const data = formValidation(formData);
        setLoading(true)
        setResult(await sendSolicitud(account.access_token,data))
      }
    }else{
      return <InactiveAccount />
    }
  };
  return (
    <Container className="justify-content-center align-content-around mt-xs-3 mt-lg-5">
      <Form
        id="form"
        className="d-flex flex-column request-form"
        onSubmit={handleSubmit}
      >
        <FormGroup row className="form-options">
          <Input type="reset" className="ms-2 btn btnSecondary" onClick={handleChangeForm}></Input>
          <Input type="submit" className="ms-2 btn btnPrimary"></Input>
        </FormGroup>
        <FormGroup className="d-flex flex-column bgLight container-bordered ">
          <Label tag="h2" for='tipo'>Tipo</Label>
          <Input
            required
            type="select"
            name="tipo"
            id="tipo"
            onChange={handleChangeForm}
            value={props.match.params.type}
          >
            <option>Seleccione una opción</option>
            <option>Visita a terreno</option>
            <option>Capacitacion</option>
            <option>CheckList</option>
            <option>Asesoria</option>
            {props.match.params.emergency === "1" && <option>Emergencia</option>}
          </Input>
          <Label tag='h2' for='direccion'>Direccion</Label>
          <Input type='text'id='direccion' name="direccion"/>
          <Input type='text' id='es_emergencia'name='es_emergencia' hidden readOnly value={props.match.params.emergency === "1" ? props.match.params.emergency : "0"}></Input>
        </FormGroup>
        {handleRenderForm(form)}
      </Form>
      <LoadingScreen isOpen={loading} message setIsOpen={setLoading} result={result} />
    </Container>
  );
};

class VisitaTerreno extends React.Component {
  render() {
    return (
      <FormGroup row className=" bgLight container-bordered request-details">
        <Col lg={6}>
          <Label tag="h2">Fecha</Label>
          <Input
            required
            type="date"
            name="fecha"
          ></Input>
        </Col>
      </FormGroup>
    );
  }
}

class Capacitacion extends React.Component {
  constructor() {
    super();

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.state = {
      asistentes: [],
    };
  }

  handleAdd = () => {
    let newAsistentes = this.state.asistentes;
    if (newAsistentes.length <= 9) {
      newAsistentes.push({ name: `Asistente-${newAsistentes.length + 1}` });
    }
    this.setState(() => ({
      asistentes: newAsistentes,
    }));
  };

  handleRemove = (e) => {
    const asistentes = this.state.asistentes;
    const index = Number(e.target.getAttribute("target"));
    asistentes.slice(index, 1);
    document.getElementById(`Asistente${index}`).remove();
    this.setState(() => ({
      asistentes: asistentes,
    }));
  };
  render() {
    return (
      <FormGroup row className=" bgLight container-bordered request-details">
        <Col lg={6}>
          <Label tag="h2">Fecha</Label>
          <Input
            required
            type="date"
            name="fecha"
          ></Input>
        </Col>
        <Col lg={6}>
          <Label tag="h2">Hora</Label>
          <input
            required
            className="form-control"
            type="time"
            name="hora"
            placeholder="Seleccione una Hora"
          ></input>
        </Col>
        <Col id="Asistentes" lg={12}>
          <Row id="Asistente0">
            <Col md={6}>
              <Label tag="h2">Asistentes(s)</Label>
              <Input type="text" name="Asistente-0" required></Input>
            </Col>
            <Col md={3} className="d-flex flex-row align-items-end">
              <Input
                className="btnPrimary"
                type="button"
                value="Añadir"
                onClick={this.handleAdd}
              />
            </Col>
          </Row>
          {this.state.asistentes.map((element, index) => (
            <Row key={index + 1} id={`Asistente${index + 1}`}>
              <Col md={6}>
                <Input type="text" name={element.name} required></Input>
              </Col>
              <Col md={3} className="d-flex flex-row align-items-end">
                <Input
                  className="btnPrimary"
                  type="button"
                  value="Añadir"
                  onClick={this.handleAdd}
                />
              </Col>
              <Col md={3} className="d-flex flex-row align-items-end">
                <Input
                  className="btnSecondary"
                  type="button"
                  value="Remover"
                  target={index + 1}
                  onClick={this.handleRemove}
                />
              </Col>
            </Row>
          ))}
        </Col>
      </FormGroup>
    );
  }
}

class CheckList extends React.Component {
  constructor(){
    super()
    this.state = {
      checklist:['']
    }
  }


  handleAdd = () => {
    this.setState((prevState) => ({
      checklist: [...prevState.checklist,'']
    }))
  };

  handleRemove = (e) => {
    const index = Number(e.target.getAttribute("target"));
    const deleteItem = this.state.checklist
    deleteItem.splice(index,1)
    this.setState(()=>({
      checklist:deleteItem
    }))
  };
  render(){

    return (
      <FormGroup className="bgLight container-bordered request-details">
        {this.state.checklist.map((element, index) => {
          return (
            <Row id={`Element${index}`} key={index}>
              <Col md={6}>
                <Input
                  key={index}
                  type="text"
                  id={index}
                  name={`item${index+1}`}
                  className='item'
                  defaultValue={element}
                  required
                ></Input>
              </Col>
              <Col md={3}>
                <Input
                  className="btn btnSecondary"
                  type="button"
                  value="Remover"
                  target={index}
                  onClick={this.handleRemove}
                />
              </Col>
            </Row>
          );
        })}
        <Row>
          <Col>
            <Input
              className="btn btnPrimary"
              type="button"
              value="Añadir"
              onClick={this.handleAdd}
            />
          </Col>
        </Row>
      </FormGroup>
    );
  };
  }

  class Asesoria extends React.Component{
    render(){
      return(
        <FormGroup className="bgLight container-bordered">
          <Row Form>
            <Col sm={12} md={6}>
          <Label for='fecha' tag='h2'>fecha</Label>
          <Input id="fecha" name="fecha" type="date" required />
            </Col>
            <Col sm={12} md={6}>
          <Label for='hora' tag='h2'>Hora</Label>
          <Input id="hora" name="hora" type="time" required />
            </Col>
          </Row>
        </FormGroup>
      )
    }
  }

class Emergencia extends React.Component{
  render(){
    return(
      <FormGroup className="bgLight container-bordered request-details">
        <Label for='descripcion' tag='h2'>Detalles</Label>
        <Input id="descripcion" name="descripcion" type="textarea" required />
      </FormGroup>
    )
  }
}
