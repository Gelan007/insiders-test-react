import {EDIT_USERS_ROUTE, USERS_ROUTE} from "./routes";
import UsersTable from "../../components/usersTable/UsersTable";
import EditUsersTable from "../../components/editUsersTable/EditUsersTable";

export const publicRoutes = [
    {
        path: USERS_ROUTE,
        Component: UsersTable
    },
    {
        path: EDIT_USERS_ROUTE,
        Component: EditUsersTable
    }
]
