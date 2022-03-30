import styles from './Root.module.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./HomeNav";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import {Footer} from './Components'


const Root = () => {
  return (
    <Router>
      <div id={styles.page}>
      <Navigation />
      <main className={styles.main}>
      <Switch>
        <Route exact path="/servicios" component={Servicios} />
        <Route exact path="/contacto" component={Contacto} />
        <Route exact path="/" component={Home} />
      </Switch>
      </main>
      <Footer/>
      </div>
    </Router>
  );
};

export default Root;
