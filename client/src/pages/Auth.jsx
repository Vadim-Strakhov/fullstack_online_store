import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../context";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuth = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      history.push(SHOP_ROUTE);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 px-3" xs="auto">
            {isLogin ? (
              <div className="p-0">
                Нет аккаунта?{" "}
                <NavLink
                  to={REGISTRATION_ROUTE}
                  className="text-decoration-none "
                >
                  Зарегистрируйтесь!
                </NavLink>
              </div>
            ) : (
              <div className="p-0">
                Есть аккаунт?{" "}
                <NavLink to={LOGIN_ROUTE} className="text-decoration-none ">
                  Войдите!
                </NavLink>
              </div>
            )}

            <Button variant={"outline-success"} onClick={isAuth}>
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});
export default Auth;
