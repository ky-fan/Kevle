import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ConnectionsIndex from '../components/ConnectionComponents/ConnectionsIndex/ConnectionsIndex';
import { ConnectionDetailsPage } from '../components/ConnectionComponents/ConnectionDetailsPage/ConnectionDetailsPage';
import { ConnectionForPage } from '../components/ConnectionComponents/ConnectionFormPage/ConnectionFormPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "connections",
        element: <ConnectionsIndex />
      },
      {
        path: "connections/:connectionId",
        element: <ConnectionDetailsPage />
      },
      {
        path: "connections/new",
        element: <ConnectionForPage />
      }
    ],
  },
]);
