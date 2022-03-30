import styles from"./Root.module.css";
import {useState, useEffect} from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./UserNav.jsx";

import Home from "./pages/Home";
import { Solicitudes } from "./pages/Solicitudes";
import { Historial } from "./pages/Historial";
import { Reportes } from "./pages/Reportes";

import {InactiveAccount} from './Components';
import { useDispatch } from "react-redux";
import {fetchSolicitudes,fetchTareas,fetchCobros} from "../../Requests"
import { LoadingScreen } from "../Common/Loading";
import { useSelector } from "react-redux";



const solicitudes = (access_token,id) => fetchSolicitudes(access_token,id)
const actividades = (access_token,id) => fetchTareas(access_token,id)
const cobros = (access_token,id) => fetchCobros(access_token,id)

const Root = (props) => {
  const [isOpen,setIsOpen] = useState(false);
  const [isFetched,setFetched] = useState(false);

  const account = useSelector((state) => state.auth.account)
  const dispatch = useDispatch();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const fetchData = async() =>{
    dispatch({type:'user/setSolicitudes',payload: await solicitudes(account.access_token,account.id_cliente)})
    dispatch({type:'user/setActividades',payload: await actividades(account.access_token,account.id_cliente)})
    dispatch({type:'user/setCobros',payload: await cobros(account.access_token,account.id_cliente)})
    setFetched(true)
  }

  useEffect(() => {
    fetchData()
  })
    return (
      <Router>
        <div className={styles.wrapper}>
          <Navigation
            user={account}
            display={isOpen}
            toggle={toggleNav}
          ></Navigation>
          <main className={`${styles.w100} ${styles.h100} ${styles.main}`}>
            {account.estado !=='activo' && <InactiveAccount close/>}
            {isFetched !==true ? <LoadingScreen isOpen={!isFetched}/> :
            <Switch>
              <Route exact path="/Reportes" component={Reportes}></Route>
              <Route exact path="/Solicitudes/:emergency?/:type?" component={Solicitudes}></Route>
              <Route exact path="/Historial" component={Historial}></Route>
              <Route  path="/" component={Home}></Route>
            </Switch>
}
          </main>
        </div>
      </Router>

    );
}


export default Root
