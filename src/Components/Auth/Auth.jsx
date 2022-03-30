import "./Auth.css";

import React from "react";
import { Container, Form, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LoadingScreen } from "../Common/Loading";
import {Authenticate} from '../../Requests'

class LogIn extends React.Component {
  constructor(props) {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      loading: false,
      message: null,
      email: undefined,
      password: undefined,
    };
  }

 async handleSubmit(e) {
    e.preventDefault();
    this.setState(() => ({
      loading: true,
      message:null
    }));
    const formData = new FormData(e.target)
    const response = await Authenticate(formData.get('email'), formData.get('password'), (response) => {
      this.setState(() => ({
        message: response,
      }));
    });
    if(response.data){
      this.props.login(response.data)
      this.setState(()=>({
        loading:false
      }))
    }
  }
  goBack = () => {
    window.location = "/";
  };
  render() {
    return (
      <Container fluid className="auth">
        <Container className="mt-2">
          <button onClick={this.goBack} className="btn btn-white">
            <ArrowBackIosIcon/>
            Volver
          </button>
        </Container>
        <div id="content">
          <Container fluid className="form-container">
            <Form
              id="login"
              onSubmit={this.handleSubmit}
              onChange={this.handleFormChange}
            >
              <FormGroup>
                <Label for="email" className="input-label">
                  Nombre de usuario
                </Label>
                <Input type="text" id="email" name="email" required></Input>
              </FormGroup>
              <FormGroup>
                <Label for="password" className="input-label">
                  Contraseña
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  required
                ></Input>
              </FormGroup>
              <FormGroup className="d-block"></FormGroup>
              <FormGroup>
                <Input type="submit" value="Ingresar" className="btn btnSm btnSecondary"/>
              </FormGroup>
            </Form>
          </Container>
          <img
          className="form-background"
          src="/img/Background.png"
          alt="waves"
        />
        </div>
        <LoadingScreen
          isOpen={this.state.loading}
          setIsOpen={(state) => {
            this.setState(() => ({ loading: state }));
          }}
          message
          result={this.state.message}
        />
      </Container>
    );
  }
}

const mapDispatchToPropsLogin = (dispatch) => {
  return {
    login: (account) => {
      dispatch({type:'auth/login',payload:account})
      dispatch(push('/'))
    },
  };
};

const Login = connect(null, mapDispatchToPropsLogin)(LogIn);

export { Login };
