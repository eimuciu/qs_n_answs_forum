import { useState } from 'react';
import css from './NavBar.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import Modal from '../atoms/Modal/Modal';
import Login from '../pages/Login/Login';
import { useAuthCtx } from '../../store/AuthProvider';

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const { isUserLoggedIn, logout } = useAuthCtx();

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <>
      <Modal show={showModal} closeModal={closeModal}>
        <Login closeModal={closeModal} />
      </Modal>
      <div className={css.main}>
        <Link to="/">
          <img alt="logo" src={logo} />
        </Link>
        {!isUserLoggedIn && (
          <div onClick={handleLoginClick} role="button" className={css.navlink}>
            Login
          </div>
        )}
        {isUserLoggedIn && (
          <div
            onClick={handleLogoutClick}
            role="button"
            className={css.navlink}
          >
            Logout
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
