import React, { useEffect } from 'react';
import s from "./EditUsersTable.module.scss";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { UserWithId } from "../../interfaces/User";
import {getUsersWithId, USERS} from "../../data/users";
import {localstorageUsers} from "../../utils/localstorage/localstorage";

const EditUsersTable = () => {
    const [users, setUsers] = React.useState<UserWithId[]>([]);
    const [selectedUser, setSelectedUser] = React.useState<UserWithId | undefined>(undefined);
    const uniqueStatuses = Array.from(new Set(users.map(user => user.status.name)));

    useEffect(() => {
        const storedUsers = localstorageUsers.getUsers();
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            setUsers(getUsersWithId);
        }
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        const user = users.find(user => user.name === event.target.value);
        setSelectedUser(user);
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSelectedUser(prev => (prev ? { ...prev, name: value } : undefined));
    };

    const handleSelectChange = (event: SelectChangeEvent, field: 'status' | 'department' | 'country') => {
        const value = event.target.value;
        setSelectedUser(prev => (prev ? { ...prev, [field]: { value, name: value } } : undefined));
    };


    const handleSave = () => {
        const updatedUsers = users.map(user => user.id === selectedUser?.id ? selectedUser : user);
        setUsers(updatedUsers);
        localstorageUsers.addUsers(updatedUsers);
    };

    const undo = () => {
       setSelectedUser(undefined)
    };

    return (
        <div className={s.editTable}>
            <h1 className={s.header}>EDIT USER</h1>
            {users.length > 0 && (
                <div className={s.middleContent}>
                    <FormControl fullWidth>
                        <div className={s.fullNameSelect}>
                            <InputLabel id="username-id">User</InputLabel>
                            <Select
                                labelId="username-id"
                                value={selectedUser?.name || ''}
                                label="User"
                                onChange={handleChange}
                                sx={{ width: "500px" }}
                                variant="outlined"
                            >
                                {users.map(user => (
                                    <MenuItem key={user.id} value={user.name}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <h2 className={s.userInfo}>User Information</h2>
                        <div className={s.formGrid}>
                            <TextField
                                id="fullname-id"
                                label="Full Name"
                                variant="outlined"
                                value={selectedUser?.name || ''}
                                onChange={handleTextFieldChange}
                                disabled={!selectedUser}
                                name="name"
                            />
                            <FormControl fullWidth disabled={!selectedUser}>
                                <InputLabel id="department-label">Department</InputLabel>
                                <Select
                                    labelId="department-label"
                                    value={selectedUser?.department?.name || ''}
                                    label="Department"
                                    onChange={(event) => handleSelectChange(event, 'department')}
                                >
                                    {users.map(user => (
                                        <MenuItem key={user.department.value} value={user.department.name}>
                                            {user.department.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth disabled={!selectedUser}>
                                <InputLabel id="country-label">Country</InputLabel>
                                <Select
                                    labelId="country-label"
                                    value={selectedUser?.country?.name || ''}
                                    label="Country"
                                    onChange={(event) => handleSelectChange(event, 'country')}
                                >
                                    {users.map(user => (
                                        <MenuItem key={user.country.value} value={user.country.name}>
                                            {user.country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth disabled={!selectedUser}>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    value={selectedUser?.status?.name || ''}
                                    label="Status"
                                    onChange={(event) => handleSelectChange(event, 'status')}
                                >
                                    {uniqueStatuses.map(status => (
                                        <MenuItem key={status} value={status}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={s.buttons}>
                            <Button variant="contained" sx={{ backgroundColor: '#b6b6b6', color: 'black' }} onClick={undo}>
                                Undo
                            </Button>
                            <Button variant="contained" sx={{ backgroundColor: '#ffffff', color: 'black' }} disabled={!selectedUser} onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </FormControl>
                </div>
            )}
        </div>
    );
};

export default EditUsersTable;
