import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import UserTable from "../components/UserTable";
import Add from "../page/Add";
import Edit from "../page/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <UserTable /> },
      { path: "add", element: <Add /> },
      { path: "edit/:code", element: <Edit /> },
    ],
  },
]);

export default router;
