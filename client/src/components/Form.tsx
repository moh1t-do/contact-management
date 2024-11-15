import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

export interface IFormProps {
    isCreate: boolean;
    handleClose: () => void;
    handleSubmit: (payload: any) => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Form({ isCreate, handleSubmit, handleClose }: IFormProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    return (
        <Box sx={style}>
            <TextField
                label="First Name"
                variant="outlined"
                required={isCreate}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Last Name"
                variant="outlined"
                required={isCreate}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Email"
                variant="outlined"
                required={isCreate}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                type="email"
                sx={{ mb: 2 }}
            />
            <TextField
                label="Phone"
                variant="outlined"
                required={isCreate}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                type="tel"
                sx={{ mb: 2 }}
            />
            <TextField
                label="Company"
                variant="outlined"
                required={isCreate}
                onChange={(e) => setCompany(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Job Title"
                variant="outlined"
                required={isCreate}
                onChange={(e) => setJobTitle(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={() => handleSubmit({
                    firstName,
                    lastName,
                    email,
                    phone,
                    company,
                    jobTitle
                })}>
                    Submit
                </Button>
                <Button variant="outlined" color="warning" onClick={handleClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}
