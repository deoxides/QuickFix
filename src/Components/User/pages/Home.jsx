import "./Home.css";
import RootStyle from './../Root.module.css';
import React,{useEffect,useState} from "react";
import { CardTitle, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { DetalleActividad } from "../Components";
import { useSelector } from "react-redux";
import { fetchChecklist, fecthInformeTarea } from "../../../Requests";

const Home = () => {
  const [checklist,SetChecklist] = useState([]);
  const [anexos,SetAnexos] = useState(undefined);
  const {solicitudes,actividades} = useSelector((state) => state.user);
  const account = useSelector((state) => state.auth.account);

  const getDownloadChecklist = async() => {
    let id_lcr;
    const ultimaActividad = actividades.at(-1);
    if(ultimaActividad?.lc_resultado){
      id_lcr = ultimaActividad.lc_resultado.id_lcr
      const response = await fetchChecklist(account.access_token,id_lcr);
      var bytes = new Buffer.from(response, "base64");
      var blob = new Blob([bytes], { type: "application/pdf" });
      const link = (
        <li>
          <a href={window.URL.createObjectURL(blob)} download>
            Descargar {ultimaActividad.lc_resultado.nombre}
          </a>
        </li>
      );
      SetChecklist(link)
    }
  }

  const getDownloadAnexo = async() =>{
    const ultimaActividad = actividades.at(-1);
    if(ultimaActividad?.informeTarea){
      const id_informe = ultimaActividad.informeTarea.id_informe_tarea
      const response = await fecthInformeTarea(account.access_token,id_informe);
      var bytes = new Buffer.from(response, "base64");
      var blob = new Blob([bytes], { type: "application/pdf" });
      const link = window.URL.createObjectURL(blob)
      SetAnexos(link)
    }
    }

  useEffect(()=> {
    getDownloadChecklist();
    getDownloadAnexo();
  })

      const visita = solicitudes.filter(
        (elem) => elem["tipo"] === "Visita a terreno"
      ).length;
      const ultimaActividad = actividades.at(-1);
      const emergencias = solicitudes.filter(
        (elem) => elem.es_emergencia === '1'
      ).map((elem,key) => {
        return(
          <li key={key}>
            {`N°${elem.id_solicitud} - ${elem.tipo}`}
          </li>
        )
      })
      return (
        <Container fluid className="mt-3">
          <CardTitle tag="h3" className="text-center text-lg-start">
            Bienvenido <strong>{account.nombre}</strong>
          </CardTitle>
          <Container fluid className="mt-3 stats">
            <div id="summary" className="d-flex flex-column">
              <CardTitle tag="h6" className="ms-3 text-muted">
                Resumen Mensual
              </CardTitle>
              <div className="bgLight container-bordered">
                <div className="stats-summary">
                  <span className={RootStyle.textBig}>
                    {solicitudes.length}
                  </span>
                  <span className={RootStyle.textSmall}>Solicitudes</span>
                </div>
                <div className="stats-summary">
                  <span className={RootStyle.textBig}>
                    {2 - visita > 0 ? 2 - visita : 0} / 2
                  </span>
                  <span className={RootStyle.textSmall}>Visitas a terreno</span>
                </div>
                <div className="ms-auto">
                  <Link to="/Solicitudes" className="btn btnPrimary">
                    Ingresar <br />
                    solicitud
                  </Link>
                </div>
              </div>
            </div>
            <div id="last" className="d-flex flex-column">
              <CardTitle tag="h6" className="ms-3 text-muted">
                Ultima Actividad
              </CardTitle>
              <Container className="bgLight container-bordered">
                <ul className="">
                  {ultimaActividad !== undefined ? (
                    Object.entries(ultimaActividad)
                      .filter(
                        ([key]) =>
                          key.includes("nombre") ||
                          key.includes("fecha") ||
                          key.includes("estado")
                      )
                      .sort()
                      .map(([key, value], index) => {
                        return (
                          <li key={index}>
                            <strong>{key} : </strong>
                            {value}
                          </li>
                        );
                      })
                  ) : (
                    <p>No hay actividades</p>
                  )}
                </ul>
                {ultimaActividad !== undefined ? (
                  <div className="ms-auto">
                    <DetalleActividad
                    sm
                      actividad={ultimaActividad}
                      numero={ultimaActividad.id_agenda}
                      anexos
                      link={anexos}
                    ></DetalleActividad>
                  </div>
                ) : null}
              </Container>
            </div>
            <div id="checklist" className="d-flex flex-column">
              <CardTitle tag="h6" className="ms-3 text-muted">
                Check List
              </CardTitle>
              <Container className="bgLight container-bordered">
                <div id="items">
                  <ul className="list-group list-group-numbered">
                    {checklist}
                  </ul>
                </div>
                <div className="ms-auto">
                  <Link to="/Solicitudes/0/CheckList" className="btn btnPrimary">
                    Modificar
                  </Link>
                </div>
              </Container>
            </div>
            <div id="emergency" className="d-flex flex-column">
              <CardTitle tag="h6" className="ms-3 text-muted">
                Comunicaciones
              </CardTitle>
              <Container className="bgLight container-bordered">
                <div id="chat">
                <ul className="list-group list-group-numbered">
                    {emergencias}
                  </ul>
                </div>
                <div className="ms-auto">
                  <Link to="/Solicitudes/1/Emergencia" className="btn btnPrimary">
                    Enviar alerta
                  </Link>
                </div>
              </Container>
            </div>
          </Container>
        </Container>
      );
    }

export default Home;
