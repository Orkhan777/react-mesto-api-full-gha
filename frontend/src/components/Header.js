import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/logo.svg";

function Header(props) {
  const { email, loggedIn, currentRoute, handleExitProfile } = props;

  const [headerData, setHeaderData] = React.useState({});

  React.useEffect(() => {
    switch (currentRoute) {
      case "/":
        setHeaderData({
          name: "Выход",
          link: "/sign-in",
        });
        break
      case "/sign-up":
        setHeaderData({
          name: "Войти",
          link: "/sign-in",
        });
        break
      case "/sign-in":
        setHeaderData({
          name: "Регистрация",
          link: "/sign-up",
        });
        break
      default:
        setHeaderData({
          name: "На главную",
          link: "/",
        });
        break
    }
  }, [currentRoute]);

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место" className="logo" />
      <nav className="header__menu">
        {loggedIn ? <p className="header__email">{email}</p> : ""}
        <Link
          className="header__link"
          to={headerData.link || ""}
          onClick={headerData.name === "Выход" ? handleExitProfile : null}
        >
          {headerData.name}
        </Link>
      </nav>
    </header>
  );
}

export default Header;