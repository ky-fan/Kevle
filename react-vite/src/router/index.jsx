import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ConnectionsIndex from '../components/ConnectionComponents/ConnectionsIndex/ConnectionsIndex';
import { ConnectionDetailsPage } from '../components/ConnectionComponents/ConnectionDetailsPage/ConnectionDetailsPage';
import { ConnectionFormPage } from '../components/ConnectionComponents/ConnectionFormPage/ConnectionFormPage';
import UserDetailsPage from '../components/UserDetailsPage/UserDetailsPage';
import SplashPage from '../components/SplashPage/SplashPage';
import UserConnectionsIndexPage from '../components/UserGameComponents/UserConnectionsIndexPage/UserConnectionsIndexPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
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
        path: "users/:userId",
        element: <UserDetailsPage />
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
        element: <ConnectionFormPage />
      },
      {
        path: "connections/:connectionId/update",
        element: <ConnectionFormPage />
      },
      {
        path: "connections/users/:userId",
        element: <UserConnectionsIndexPage />
      }
    ],
  },
]);
