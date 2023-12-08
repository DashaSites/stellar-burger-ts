import headerStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, NavLink, useMatch, useLocation } from "react-router-dom";

const AppHeader = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = useMatch("/");
  const isIngredients = location.pathname.includes("ingredients");  
  const isProfile = useMatch("/profile/*");
  const isFeed = useMatch("/feed");
  //const currentPath = useResolvedPath("").pathname; // получаю путь, который сейчас есть в адресной строке
  //const currentPathHome = currentPath.includes("ingredients");


  return (
    <header className={headerStyles.appHeader}>
      <nav className={headerStyles.headerNavbar}>
        <ul className={`${headerStyles.headerTabMenu} mt-4 mb-4`}>
          <li>
            {
              isHome || isIngredients ? (
                <NavLink
                  to="/"
                  className={`${headerStyles.headerLinkActive} pt-4 pr-5 pb-4 pl-5`}
                >
                  <BurgerIcon type="primary" />
                  <p className={"text text_type_main-default"}>Конструктор</p>
                 </NavLink>
              ) : (
                <NavLink
                  to="/"
                  className={`${headerStyles.headerLink} pt-4 pr-5 pb-4 pl-5`}
                >
                  <BurgerIcon type="secondary" />
                  <p className={"text text_type_main-default"}>Конструктор</p>
                </NavLink>
              )
            }
          </li>
          <li>
            {
              isFeed ? (
                <NavLink
                  to="/feed"
                  className={`${headerStyles.headerLinkActive} pt-4 pr-5 pb-4 pl-5`}
                >
                  <ListIcon type="primary" />
                  <p className={"text text_type_main-default"}>
                    Лента заказов
                  </p>
                </NavLink>
              ) : (
                <NavLink
                  to="/feed"
                  className={`${headerStyles.headerLink} pt-4 pr-5 pb-4 pl-5`}
                >
                  <ListIcon type="secondary" />
                  <p className={"text text_type_main-default text_color_inactive"}>
                    Лента заказов
                  </p>
                </NavLink>
              )
            }
          </li>
        </ul>
        <div className={headerStyles.headerLogo}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        {
          isProfile ? (
            <NavLink
              to="/profile"
              className={`${headerStyles.headerLinkActive} pt-4 pr-5 pb-4 pl-5`}
            >
              <ProfileIcon type="primary" />
              <p className={"text text_type_main-default"}>
                Личный кабинет
              </p>
            </NavLink>
          ) : (
            <NavLink
              to="/profile"
              className={`${headerStyles.headerLink} pt-4 pr-5 pb-4 pl-5`}
            >
              <ProfileIcon type="secondary" />
              <p className={"text text_type_main-default text_color_inactive"}>
                Личный кабинет
              </p>
            </NavLink>
          )
        }
      </nav>
    </header>
  );
};

export default AppHeader;