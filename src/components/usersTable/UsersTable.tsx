import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { UserWithId } from '../../interfaces/User';
import { getUsersWithId } from "../../data/users";
import { localstorageUsers } from "../../utils/localstorage/localstorage";
import UserModal from "./userModal/UserModal";
import { v4 as uuidv4 } from 'uuid';



const UsersTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        departments: [] as string[],
        countries: [] as string[],
        statuses: [] as string[],
    });
    const [availableFilters, setAvailableFilters] = useState({
        departments: [] as string[],
        countries: [] as string[],
        statuses: [] as string[],
    });
    const [users, setUsers] = useState<UserWithId[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserWithId[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const emptyUser = {
        id: uuidv4(),
        name: '',
        department: { name: '', value: '' },
        country: { name: '', value: '' },
        status: { name: '', value: '' }
    }
    const [newUser, setNewUser] = useState<UserWithId>(emptyUser);

    useEffect(() => {
        const storedUsers = localstorageUsers.getUsers();
        const loadedUsers: UserWithId[] = storedUsers ? JSON.parse(storedUsers) : getUsersWithId();
        setUsers(loadedUsers);

        const departments = Array.from(new Set(loadedUsers.map((user: UserWithId) => user.department.name)));
        const countries = Array.from(new Set(loadedUsers.map((user: UserWithId) => user.country.name)));
        const statuses = Array.from(new Set(loadedUsers.map((user: UserWithId) => user.status.name)));

        setAvailableFilters({
            departments,
            countries,
            statuses,
        });
    }, []);


    useEffect(() => {
        const filtered = users.filter((user) => {
            const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesDepartment = selectedFilters.departments.length === 0 ||
                selectedFilters.departments.includes(user.department.name);

            const matchesCountry = selectedFilters.countries.length === 0 ||
                selectedFilters.countries.includes(user.country.name);

            const matchesStatus = selectedFilters.statuses.length === 0 ||
                selectedFilters.statuses.includes(user.status.name);

            return matchesSearchTerm && matchesDepartment && matchesCountry && matchesStatus;
        });

        setFilteredUsers(filtered);
    }, [users, searchTerm, selectedFilters]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleMultiSelectChange = (event: SelectChangeEvent<string[]>, filterType: keyof typeof selectedFilters) => {
        const value = event.target.value as string[];
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const handleAddUser = () => {
        setIsModalOpen(true);
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUser(prev => ({
            ...prev,
            name: value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent, field: 'status' | 'department' | 'country') => {
        const value = event.target.value;
        setNewUser(prev => ({
            ...prev,
            [field]: { value, name: value },
        }));
    };


    const handleAddNewUser = () => {
        if (newUser) {
            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);
            localstorageUsers.addUsers(updatedUsers);
        }
        setNewUser(emptyUser)
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteUser = (userId: string) => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);

        localstorageUsers.addUsers(updatedUsers);
    };


    const isCountryStatusDisabled = selectedFilters.departments.length < 3;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                User Management
            </Typography>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginBottom: 2, width: '100%' }}
            />
            <Box mb={2}>
                <Box display="flex" gap={2}>
                    <FormControl fullWidth>
                        <InputLabel id="department-label">Department</InputLabel>
                        <Select
                            labelId="department-label"
                            multiple
                            value={selectedFilters.departments}
                            onChange={(e) => handleMultiSelectChange(e, 'departments')}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {availableFilters.departments.map((department) => (
                                <MenuItem key={department} value={department}>
                                    <Checkbox checked={selectedFilters.departments.includes(department)} />
                                    {department}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
                            multiple
                            value={selectedFilters.countries}
                            onChange={(e) => handleMultiSelectChange(e, 'countries')}
                            renderValue={(selected) => selected.join(', ')}
                            disabled={isCountryStatusDisabled}
                        >
                            {availableFilters.countries.map((country) => (
                                <MenuItem key={country} value={country}>
                                    <Checkbox checked={selectedFilters.countries.includes(country)} />
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            multiple
                            value={selectedFilters.statuses}
                            onChange={(e) => handleMultiSelectChange(e, 'statuses')}
                            renderValue={(selected) => selected.join(', ')}
                            disabled={isCountryStatusDisabled}
                        >
                            {availableFilters.statuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                    <Checkbox checked={selectedFilters.statuses.includes(status)} />
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddUser}
                        sx={{ backgroundColor: '#ffffff', color: 'black', width: '400px' }}
                    >
                        Add User
                    </Button>
                </Box>
            </Box>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: "bold"}}>Full Name</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Department</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Country</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Status</TableCell>
                            <TableCell sx={{fontWeight: "bold"}} align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.department.name}</TableCell>
                                <TableCell>{user.country.name}</TableCell>
                                <TableCell>{user.status.name}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={() => handleDeleteUser(user.id)}
                                        startIcon={<DeleteIcon />}
                                        color="secondary"
                                    >
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onAddUser={handleAddNewUser}
                users={users}
                availableFilters={availableFilters}
                handleTextFieldChange={handleTextFieldChange}
                handleSelectChange={handleSelectChange}
                newUser={newUser}
                setNewUser={setNewUser}
            />
        </Box>
    );
};

export default UsersTable;
