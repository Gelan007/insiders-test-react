import {User} from "../../interfaces/User";

const LOCAL_STORAGE_KEY = "usersData";

export const localstorageUsers = {
    addUsers(updatedUsers: User[]) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
    },
    getUsers() {
        return localStorage.getItem(LOCAL_STORAGE_KEY);
    }
}