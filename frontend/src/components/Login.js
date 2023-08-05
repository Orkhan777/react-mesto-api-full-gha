import React from 'react';
import Authorization from './Authorization'

function Login (props) {
  const {handleDataForm, setCurrentRoute } = props;

  React.useEffect(() => {
    setCurrentRoute("/sign-in");
  }, [setCurrentRoute]);

  return (
    <Authorization
      title="Вход"
      name="login"
      button="Войти"
      handleDataForm={handleDataForm}>
    </Authorization>
  )
}

export default Login;