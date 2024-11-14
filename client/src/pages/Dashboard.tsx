import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

interface Column {
    cid: 'firstName' | 'lastName' | 'email' | 'phone' | 'company' | 'jobTitle';
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

interface IApiResponse {
    contacts: IContact[];
    totalContacts: number;
}

export default function ColumnGroupingTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<IContact[]>([]);
    const [totalContacts, setTotalContacts] = useState(0);

    useEffect(() => {
        async function fetchContacts() {
            const { data } = await axios.get<IApiResponse>(`http://localhost:8000/api/v1/contacts?page=${page+1}&limit=${rowsPerPage}`);
            console.log(data);
            setRows(data.contacts);
            setTotalContacts(data.totalContacts);
        }
        fetchContacts();
    }, [page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log('newPage', newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table>
                    <TableHead>
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
                                        const value = row[column.cid];
                                        return (
                                            <TableCell key={column.cid} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
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
    );
}
