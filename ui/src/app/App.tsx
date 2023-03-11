import "./app.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useAppStore } from "./store/app-store";

const App: React.FC = () => {
  const navigate = useNavigate();
  const { $store } = useAppStore();

  return (
    <main style={{ display: "flex", flexFlow: "column" }}>
      <button onClick={() => navigate(-1)}>go back</button>
      {$store.services.user.user ? (
        <>
          <button onClick={$store.services.auth.signOutFx}>Выйти</button>

          <div style={{ display: "flex", flexFlow: "column" }}>
            <p>Авторизован:</p>
            <span>email: {$store.services.user.user.email}</span>
            <span>login: {$store.services.user.user.login}</span>
            <span>
              почта:
              {$store.services.user.user.is_verified ? "активирована" : "не активирована"}
            </span>
          </div>
        </>
      ) : (
        <p>Не авторизован</p>
      )}
      {["auth", "vacancies"].map((link, idx) => (
        <Link to={link} key={idx} children={link} />
      ))}
      <Outlet />
    </main>
  );
};

export default observer(App);
