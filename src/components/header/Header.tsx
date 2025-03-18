import React from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
const Header: React.FC = () => {
  return (
    <Navbar expand="lg" className={styles.header}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Cyber Forum
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav 
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            <Nav.Link as={Link} to="/questions">Вопросы</Nav.Link>
            
          </Nav>
          
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">Войти</Nav.Link>
            <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;