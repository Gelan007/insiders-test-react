import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
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
import {getUsersWithId} from "../../data/users";
import {localstorageUsers} from "../../utils/localstorage/localstorage";

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [users, setUsers] = useState<UserWithId[]>([]);

    useEffect(() => {
        const storedUsers = localstorageUsers.getUsers();
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            setUsers(getUsersWithId);
        }
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleMultiSelectChange = (event: SelectChangeEvent<string[]>, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        const value = event.target.value as string[];
        setter(value);
    };

    const handleAddUser = () => {
    };

    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
                User Management
            </Typography>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginBottom: 2, width: '100%' }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" gap={2}>
                    <FormControl fullWidth>
                        <InputLabel id="department-label">Department</InputLabel>
                        <Select
                            labelId="department-label"
                            multiple
                            value={selectedDepartments}
                            onChange={(e) => handleMultiSelectChange(e, setSelectedDepartments)}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {users.map(user => (
                                <MenuItem key={user.department.value} value={user.department.value}>
                                    {user.department.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
                            multiple
                            value={selectedCountries}
                            onChange={(e) => handleMultiSelectChange(e, setSelectedCountries)}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <MenuItem value="USA">
                                <Checkbox checked={selectedCountries.includes('USA')} />
                                USA
                            </MenuItem>
                            <MenuItem value="Canada">
                                <Checkbox checked={selectedCountries.includes('Canada')} />
                                Canada
                            </MenuItem>
                            <MenuItem value="Germany">
                                <Checkbox checked={selectedCountries.includes('Germany')} />
                                Germany
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            multiple
                            value={selectedStatuses}
                            onChange={(e) => handleMultiSelectChange(e, setSelectedStatuses)}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <MenuItem value="Active">
                                <Checkbox checked={selectedStatuses.includes('Active')} />
                                Active
                            </MenuItem>
                            <MenuItem value="Inactive">
                                <Checkbox checked={selectedStatuses.includes('Inactive')} />
                                Inactive
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddUser}
                >
                    Add User
                </Button>
            </Box>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
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
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserManagement;
