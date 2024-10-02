import React, {useEffect, useState} from 'react';
import {
    Modal,
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem, SelectChangeEvent,
} from '@mui/material';
import {UserWithId} from "../../../interfaces/User";
import {Filters} from "../../../interfaces/Filters";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '720px',
    height: '444px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface AddUserModalProps {
    open: boolean;
    users: UserWithId[];
    newUser: UserWithId | undefined;
    setNewUser: (newUser: UserWithId) => void;
    availableFilters: Filters;
    onClose: () => void;
    onAddUser: () => void;
    handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleSelectChange: (event: SelectChangeEvent, field: 'status' | 'department' | 'country') => void
}

const UserModal: React.FC<AddUserModalProps> = (
    { open,
        onClose,
        onAddUser,
        users,
        availableFilters,
        newUser,
        setNewUser,
        handleTextFieldChange,
        handleSelectChange
    }) => {
    const [isAvailableToAdd, setIsAvailableToAdd] = useState<boolean>(false);

    useEffect(() => {
        setIsAvailableToAdd(checkIsAvailableToAdd)
    }, [newUser]);



    const checkIsAvailableToAdd = (): boolean => !!(newUser?.status && newUser?.country && newUser?.name && newUser?.department);


    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box sx={{fontSize: "20px", fontFamily:"inherit", textAlign: "center", marginBottom: "40px"}}>ADD USER</Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        value={newUser}
                        onChange={handleTextFieldChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="department-label">Department</InputLabel>
                        <Select
                            labelId="department-label"
                            value={newUser?.department?.name}
                            onChange={(e) => handleSelectChange(e, 'department')}
                        >
                            {availableFilters.departments.map(department => (
                                <MenuItem key={department} value={department}>
                                    {department}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
                            value={newUser?.country?.name}
                            onChange={(e) => handleSelectChange(e, 'country')}
                        >
                            {availableFilters.countries.map(country => (
                                <MenuItem key={country} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            value={newUser?.status?.name}
                            onChange={(e) => handleSelectChange(e, 'status')}
                        >
                            {availableFilters.statuses.map(status => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button onClick={onClose} sx={{ mr: 2 }}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={onAddUser} disabled={isAvailableToAdd}>Add</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserModal;
