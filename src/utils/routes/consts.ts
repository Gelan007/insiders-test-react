import {Routes} from "./routes";
import UsersTable from "../../components/usersTable/UsersTable";
import EditUsersTable from "../../components/editUsersTable/EditUsersTable";
import EditUsersPage from "../../components/editUsersPage/EditUsersPage";
import UsersPage from "../../components/UsersPage/UsersPage";


export const publicRoutes = [
    {
        path: Routes.USERS,
        Component: UsersPage
    },
    {
        path: Routes.EDIT_USERS,
        Component: EditUsersPage
    }
]
