import React, { memo, useContext, useMemo, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../utils/auth';
import SnackBar from '../SnackBar';

export const MenuBar = memo(() => {
  const { user, logout, isSnackBarOpen } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.slice(1);
  const [activeItem, setActiveItem] = useState(path);

  const message = useMemo(
    () =>
      !!user
        ? `Welcome Back. 😄 ${user?.username} `
        : `Will see you next time. 🤗 `,
    [user]
  );
  const severity = useMemo(() => (!!user ? 'success' : 'warning'), [user]);

  const handleItemClick = (event, { name }) => {
    setActiveItem(name);
  };

  function SnackBarAndLogout() {
    logout();
  }

  return (
    <>
      <Menu pointing secondary color='blue' size='massive'>
        {!user ? (
          <>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={handleItemClick}
              as={Link}
              to='/'
            />
            <Menu.Menu position='right'>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to='/login'
              />
            </Menu.Menu>
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to='/register'
            />
          </>
        ) : (
          <>
            <Menu.Item name={user.username} active as={Link} to='/' />
            <Menu.Item
              position='right'
              name='logout'
              active
              onClick={SnackBarAndLogout}
            />
          </>
        )}
      </Menu>
      {isSnackBarOpen ? (
        <SnackBar
          severity={severity}
          message={message}
        />
      ) : null}
    </>
  );
});
