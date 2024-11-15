const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, ButtonGroup } from '@mui/material';
import Modal from '@mui/material/Modal';
import Form from '../components/Form';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Column {
    cid: 'firstName' | 'lastName' | 'email' | 'phone' | 'company' | 'jobTitle' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'left';
}

const columns: Column[] = [
    { cid: 'firstName', label: 'First Name', minWidth: 170, align: 'left' },
    { cid: 'lastName', label: 'Last Name', minWidth: 170, align: 'left' },
    {
        cid: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'left',
    },
    {
        cid: 'phone',
        label: 'Phone',
        minWidth: 170,
        align: 'left',
    },
    {
        cid: 'company',
        label: 'Company',
        minWidth: 170,
        align: 'left',
    },
    {
        cid: 'jobTitle',
        label: 'Job Title',
        minWidth: 170,
        align: 'left',
    },
    {
        cid: 'actions',
        label: 'Actions',
        minWidth: 170,
        align: 'left',
    }
];

interface IContact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
}

type IPayload = Omit<IContact, 'id'>;

interface IApiResponse {
    contacts: IContact[];
    totalContacts: number;
}

export default function ColumnGroupingTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<IContact[]>([]);
    const [totalContacts, setTotalContacts] = useState(0);
    const [open, setOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState<'create' | 'update'>('create');
    const [updateId, setUpdateId] = useState<string>('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchContacts();
    }, [page, rowsPerPage]);

    async function fetchContacts() {
        const { data } = await axios.get<IApiResponse>(`${VITE_SERVER_URL}/contacts?page=${page + 1}&limit=${rowsPerPage}`);
        setRows(data.contacts);
        setTotalContacts(data.totalContacts);
    }

    const handleChangePage = (_: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCreate = async (payload: IPayload) => {
        try {
            await axios.post(`${VITE_SERVER_URL}/contacts`, payload);
            fetchContacts();
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    const handleUpdate = async (payload: IPayload) => {
        try {
            const filteredPayload = Object.fromEntries(
                Object.entries(payload).filter(([_, value]) => value !== '')
            );
            await axios.put(`${VITE_SERVER_URL}/contacts/${updateId}`, filteredPayload);
            fetchContacts();
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${VITE_SERVER_URL}/contacts/${id}`);
            fetchContacts();
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h2" component="h2" gutterBottom>
                    Contact Mangement
                </Typography>
            </Box>
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 540 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>
                                    <Button variant='contained' color='primary' onClick={() => {
                                        setCurrentModal('create');
                                        handleOpen();
                                    }}>Add Contact</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.cid}
                                        align={column.align}
                                        style={{ top: 57, minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: IContact) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            if (column.cid === 'actions') {
                                                return (
                                                    <TableCell key={column.cid} align={column.align}>
                                                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                                                            <Button variant='contained' color='primary' onClick={() => {
                                                                setCurrentModal('update');
                                                                handleOpen();
                                                                setUpdateId(row.id);
                                                            }}>Update</Button>
                                                            <Button variant='outlined' color='warning' onClick={() => handleDelete(row.id)}>Delete</Button>
                                                        </ButtonGroup>
                                                    </TableCell>
                                                );
                                            } else {
                                                const value = row[column.cid];
                                                return (
                                                    <TableCell key={column.cid} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totalContacts}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    {(currentModal === 'update') ? <Form handleClose={handleClose} handleSubmit={handleUpdate} isCreate={false} /> : <Form handleClose={handleClose} handleSubmit={handleCreate} isCreate={true} />}
                </div>
            </Modal>
        </>
    );
}