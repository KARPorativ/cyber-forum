import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useAppSelector } from '../../hooks/reduxHooks';
import defaultImage from '../../foto/anonim.jpg';


const Header: React.FC = () => {
  const user = useAppSelector(state => state.user);
  const isAuthenticated = Boolean(user.userName);
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
            {isAuthenticated ? (
              <div className={styles.rightSide}>
                <Nav.Link as={Link} to="/addpost">Написать пост</Nav.Link>{/* Поменять роутер */}
                 <Nav.Link as={Link} to="/questions">Задать вопрос</Nav.Link>{/* Поменять роутер */}
              <Nav.Link as={Link} to="/profile" className={styles.profileLink}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{user.userName}</span>
                  <Image 
                    src={user.avatar ? `http://localhost:5000/${user.avatar}` : defaultImage} 
                    roundedCircle 
                    className={styles.avatar}
                  />
                </div>
              </Nav.Link> 
              </div>
            ) : (
              <>
            <Nav.Link as={Link} to="/login">Войти</Nav.Link>
            <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;