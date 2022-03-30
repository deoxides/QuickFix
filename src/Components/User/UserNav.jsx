import styles from "./UserNav.module.css";
import React from "react";
import { Nav, NavbarToggler, NavItem } from "reactstrap";
import { Button, LogoutButton, Profile } from "./Components.jsx";

export default function Navigation(props) {
  return (
    <div
      className={`${styles.navbar} navbar-light d-flex align-items-start ${
        props.display ? `${styles.active}` : ""
      }`}
    >
      <div
      id={styles.sidebar}
        className={`d-flex flex-column flex-shrink-0 align-items-center bgLight`}
      >
        <div className="navbar-brand">
          <h3>QuickFix</h3>
        </div>
        <Profile user={props.user} />
        <hr />
        <Nav vertical className="align-items-start w-100 h-100">
          <NavItem className={styles.navItem}>
            <Button link="/" exact={true} icon="home" name="Inicio"></Button>
          </NavItem>
          <NavItem className={styles.navItem}>
            <Button link="/Solicitudes" icon="assignment" name="Solicitudes"></Button>
          </NavItem>
          <NavItem className={styles.navItem}>
            <Button link="/Historial" icon="history" name="Historial"></Button>
          </NavItem>
          <NavItem className={styles.navItem}>
            <Button link="/Reportes" icon="assessment" name="Reportes"></Button>
          </NavItem>
          <NavItem className={`mt-auto ${styles.navItem}`}>
            <LogoutButton />
          </NavItem>
        </Nav>
      </div>
      <NavbarToggler
        className={`${styles.toggler} bgLight`}
        onClick={(e) => {
          props.toggle();
        }}
      ></NavbarToggler>
    </div>
  );
}
