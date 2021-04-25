import React, { useState, useEffect } from "react";
import RegistrationForm from "../forms/RegistrationForm"
import { CheckAuthorisationUser } from "./AuthorizationTools"

export default function SignIn(props) { //войти
  var checkAuthorisationUser_result;

  //проверка авторизации
  const onClickCheckAuthorisation = async () => {
    checkAuthorisationUser_result = await CheckAuthorisationUser();
    CheckAuthorisationUser_();
  };

  async function CheckAuthorisationUser_() {
    //console.log(checkAuthorisationUser_result);

    if (checkAuthorisationUser_result.error) {
      setErrors(checkAuthorisationUser_result.error);
    }
    if (checkAuthorisationUser_result.result.oki === 1) { //если ВЫХОД ВЫПОЛНЕН
      setOki(1); //1 то есть надо скрываем форму входа и делаем доступным выход
    }
    setAut(checkAuthorisationUser_result.result.message);

    props.setRole(checkAuthorisationUser_result.result.role);
    //console.log(checkAuthorisationUser_result.oki);
  }

  /*
  async function CheckAuthorisationUser() { //проверка авторизации
    let result = await fetch(
      "https://localhost:44332/api/Account/isAuthenticated",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "access-control-expose-headers": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        credentials: "include",
      }
    );

    const status = result.status;
    console.log(status);

    result = await result.json();
    if ("error" in result) {
      setErrors(result.error);
    }
    if (result.oki === 1) { //если ВЫХОД ВЫПОЛНЕН
      setOki(1); //1 то есть надо скрываем форму входа и делаем доступным выход
    }
    setAut(result.message)

    console.log(result);

    return result;
  }
*/

  async function onClickLogoff() { //выйти из аккаунта
    let result = await fetch(
      "https://localhost:44332/api/Account/logoff",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "access-control-expose-headers": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        credentials: "include",
      }
    );
    result = await result.json();
    if ("error" in result) {
      setErrors(result.error);
    }
    setAut(result.message)
    if (result.oki === 1) { //если ВЫХОД ВЫПОЛНЕН
      setOki(2); //2 будет означать, что нужно отобразить форму для входа
    }
    props.setRole("guest");
    return result;
  }

  //ввели что-то в поле для авторизации (входа)
  const handleChangeInputForAuthorisation = (event) => {
    const { value, name } = event.target;
    setInputValuesForAuthorisation((prev) => ({ ...prev, [name]: value }));
  };

  //нажали "закрыть модальное окно"
  const Closing = () => {
    setInputValuesForRegister({ LoginPhoneNumber: "", Password: "", PasswordConfirm: "" });
    setInputValuesForAuthorisation({ LoginPhoneNumber: "", Password: "" });
    setErrors([]);
    setOpen(false);
  };

  //нажали "войти"
  const onClickAuthorisation = () => {
    setErrors([]);
    authorisationUser();
  };

  //нажали "зарегистрироваться"
  const onClickRegistration = () => {
    setErrors([]);
    setOpen(true);
  };

  //нажали создать
  const onClickCreate = () => {
    createUser();
  };

  //вход
  async function authorisationUser() {
    let result = await fetch("https://localhost:44332/api/Account/Login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "access-control-expose-headers": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(inputValuesForAuthorisation),
    });
    result = await result.json();
    if ("error" in result) {
      setErrors(result.error);
    }
    else { setInputValuesForAuthorisation({ LoginPhoneNumber: "", Password: "" }) }
    setAut(result.message)
    if (result.oki === 1) //ВХОД ВЫПОЛНЕН
      setOki(1);
    props.setRole(result.role);
    return result;
  }

  //Авторизация
  const [inputValuesForAuthorisation, setInputValuesForAuthorisation,] = useState({
    LoginPhoneNumber: "",
    Password: "",
  });

  //обработка ответа (1 - ок, 2 - не ок)
  //2 будет означать, что нужно отобразить форму для входа
  //1 - скрыть форму и отобразить кнопкУ ВЫЙТИ (ПРОВЕРИТЬ всегда активна)
  const [oki, setOki] = useState(2);

  //для вывода label (что по входу)
  const [aut, setAut] = useState("");

  //для модалки Регистрация (открыто окно или нет)
  const [open, setOpen] = useState(false);

  //открытие модалки с ошибками
  const [errors, setErrors] = useState([]);

  //поля регистрации
  const [inputValuesForRegister, setInputValuesForRegister] = useState({
    LoginPhoneNumber: "",
    Password: "",
    PasswordConfirm: "", //подтвердить пароль
  });

  //ввели что то в поле регистрации
  const handleChangeInputForRegister = (event) => {
    const { value, name } = event.target;
    setInputValuesForRegister((prev) => ({ ...prev, [name]: value }));
  };

  //зарегистрироваться
  async function createUser() {
    let result = await fetch("https://localhost:44332/api/account/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValuesForRegister),
    });
    result = await result.json();
    if ("error" in result) {
      setErrors(result.error);
    }
    else {
      setInputValuesForRegister({ LoginPhoneNumber: "", Password: "", PasswordConfirm: "" });
      setErrors([]);
      setOpen(false);
    }
    setAut(result.message)
    return result;
  }

  //используем, чтобы сразу было видно: вошли мы или нет
  useEffect(() => {
    CheckAuthorisationUser()
      .then((res) => {
        checkAuthorisationUser_result = res;
        CheckAuthorisationUser_();
      })
  }, []);

  return (
    <RegistrationForm
      aut={aut}
      onClickCheckAuthorisation={onClickCheckAuthorisation}
      oki={oki}
      onClickLogoff={onClickLogoff}
      inputValuesForAuthorisation={inputValuesForAuthorisation}
      handleChangeInputForAuthorisation={handleChangeInputForAuthorisation}
      onClickAuthorisation={onClickAuthorisation}
      onClickRegistration={onClickRegistration}
      inputValuesForRegister={inputValuesForRegister}
      handleChangeInputForRegister={handleChangeInputForRegister}
      errors={errors}
      onClickCreate={onClickCreate}
      open={open}
      Closing={Closing}
      ClickBasketTo={props.ClickBasketTo}
      role = {props.role}
    />
  );
}
