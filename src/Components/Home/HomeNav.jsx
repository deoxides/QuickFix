import styles from "./HomeNav.module.css";

import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  DropdownItem,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

export default function Navigation() {
  const [isOpen, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleLogin = () => {
    window.location = "/Auth/Login";
  };

  const changeNav = () => {
    if (window.scrollY > 10) setShow(true);
    else setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  }, []);

  const toggle = () => {
    setOpen(!isOpen);
  };
  return (
    <Navbar light expand="lg" className={`${styles.topbar} sticky-top ${show ? "bgLight" : ""}`}>
      <NavbarBrand className={`${styles.brand} ${styles.navBrand} ms-auto me-auto`}>
        <h3 className={styles.landie}>QuickFix</h3>
      </NavbarBrand>
      <Container fluid>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-lg-between">
          <div>
            <Nav className={styles.navLinks}>
              <NavItem className={styles.link}>
                <Link to="">Inicio</Link>
              </NavItem>
              <NavItem className={styles.link}>
                <Link to="/servicios">Servicios</Link>
              </NavItem>
              <NavItem className={styles.link}>
                <Link to="/contacto">Contacto</Link>
              </NavItem>
            </Nav>
          </div>
          <DropdownItem divider className={styles.divider} />
          <div >
            <Nav className= {`justify-content-lg-end ${styles.navAuth}`}>
            <Route>
                <Link to='/contacto' className={`${styles.btn} ${styles.btnSm} ${styles.btnPrimary}`}>
                    Registrarse
                </Link>
              </Route>
              <Route>
                <button
                  onClick={handleLogin}
                  className={`mt-2 mt-sm-0 ${styles.btn} ${styles.btnSm} ${styles.btnSecondary}`}
                >
                  Ingresar
                </button>
              </Route>
            </Nav>
          </div>
        </Collapse>
      </Container>
    </Navbar>
  );
}
