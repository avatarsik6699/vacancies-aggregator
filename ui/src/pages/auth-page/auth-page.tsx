import { observer } from "mobx-react-lite";
import { useAppStore } from "@app/store/app-store";
import React, { useState } from "react";
import _ from "lodash";

interface IForm {
  login: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const AuthPage: React.FC = props => {
  const { $store } = useAppStore();
  const [pageType, setPageType] = useState<"registration" | "login">("registration");
  const [form, setForm] = useState<IForm>({
    login: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    const isSomeFieldsEmpty = _.some(
      pageType === "login" ? _.pick(form, "login", "password") : form,
      _.isEmpty
    );

    if (isSomeFieldsEmpty) return alert("Одно из полей формы не заполнено.");

    if (pageType === "login") {
      $store.services.auth.signInFx({
        login: form.login,
        password: form.password,
      });
    } else {
      if (form.password !== form.passwordConfirm) return alert("Пароли не совпадают");
      $store.services.auth.signUpFx({
        login: form.login,
        email: form.email,
        password: form.password,
        passwordConfirm: form.passwordConfirm,
      });
    }
  };

  const onChangeFc = (field: keyof IForm) => ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: target.value || "" }));
  };

  return (
    <div>
      <button
        onClick={() =>
          setPageType(prev => (prev === "registration" ? "login" : "registration"))
        }
      >
        вход/регистрация
      </button>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChangeFc("login")}
          type="text"
          name="login"
          id=""
          placeholder={pageType === "login" ? "Логин/емейл" : "Логин"}
        />
        {pageType === "registration" && (
          <input
            onChange={onChangeFc("email")}
            type="email"
            name="login"
            id=""
            placeholder="Емейл"
          />
        )}
        <input
          onChange={onChangeFc("password")}
          type="password"
          name=""
          id=""
          placeholder="Пароль"
        />
        {pageType === "registration" && (
          <input
            onChange={onChangeFc("passwordConfirm")}
            type="password"
            name=""
            id=""
            placeholder="Повторите пароль"
          />
        )}
        <button type="submit">
          {pageType === "login" ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
};

export default observer(AuthPage);
