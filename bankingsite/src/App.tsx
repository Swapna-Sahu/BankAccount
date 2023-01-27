import * as React from "react";
import "../src/styles.css";
import { loginform } from "../src/components/LoginForm";
import {
  createBrowserRouter,
  RouterProvider,

  Link,
} from "react-router-dom";
import './App.css';
import Chatbot from "./components/Chatbot/Chatbot";
import { useState } from "react";

const NavBar = React.lazy(() => import('./components/NavBar'));
const Accounts = React.lazy(() => import('./components/Accounts'));
const IPaymentsPage = React.lazy(() => import('./components/IPaymentsPage'));
const Support = React.lazy(() => import('./components/Support'));

const Loading = () => <p>Loading ...</p>;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NavBar/>
      </div>
    ),
  },
  {
    path: "accounts",
    element:<div><NavBar/><Accounts/></div>
  },
  {
    path: "IpaymentsPage",
    element:<div>
      <NavBar/>
      <IPaymentsPage/>
      </div>
  },
  {
    path: "support",
    element:<div><NavBar/><Support/></div>
  }

]);

interface LoginState {
  password: string;
  email: string;
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
}

type LoginAction =
  | { type: "login" | "success" | "error" | "logout" }
  | { type: "field"; fieldName: string; payload: string };

const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload
      };
    }
    case "login": {
      return {
        ...state,
        error: "",
        isLoading: true
      };
    }
    case "success": {
      return { ...state, error: "", isLoading: false, isLoggedIn: true };
    }
    case "error": {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        email: "",
        password: "",
        error: "Incorrect email or password!"
      };
    }
    case "logout": {
      return {
        ...state,
        isLoggedIn: false
      };
    }
    default:
      return state;
  }
};

const initialState: LoginState = {
  password: "",
  email: "",
  isLoading: false,
  error: "",
  isLoggedIn: false
};

export default function App() {
  const [state, dispatch] = React.useReducer(loginReducer, initialState);
  const { email, password, isLoading, error, isLoggedIn } = state;

const [open, setOpen] = useState<boolean>(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "login" });

    try {
      await loginform({ email, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        {isLoggedIn ? (
          <>
          <React.Suspense fallback={<Loading />}>
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
      </React.Suspense>
            <h2>{`${email}`}</h2>
            <button type="button" onClick={() => dispatch({ type: "logout" })}>
              Log out
            </button>

      <div>
      {open && <Chatbot/>}
      {!open && <button onClick={()=>setOpen(true)}>Start Chat</button>}
    </div>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit} >
            {error && <p className="error">{error}</p>}
            <p> Please Login!</p>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "email",
                  payload: e.currentTarget.value
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "password",
                  payload: e.currentTarget.value
                })
              }
            />
            <button type="submit" className="submit" disabled={isLoading}>
              {isLoading ? "Loggin in....." : "Login In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}