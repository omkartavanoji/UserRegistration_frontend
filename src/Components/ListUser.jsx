import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const columns = [
  { id: 'firstName', label: 'First Name', minWidth: 150, align: 'left' },
  { id: 'lastName', label: 'Last Name', minWidth: 150, align: 'left' },
  { id: 'email', label: 'Email', minWidth: 200, align: 'left' },
  { id: 'userName', label: 'Username', minWidth: 150, align: 'left' },
  { id: 'imageUrl', label: 'Image', minWidth: 100, align: 'center' },
  { id: 'documents', label: 'Documents', minWidth: 100, align: 'center' },
  { id: 'delete', label: 'Delete', minWidth: 100, align: 'center' },
];

const ListUser = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users', {
        auth: {
          username: 'omkar',
          password: 'omkar2531'
        }
      });
      console.log(response.data);
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data.filter((user) =>
      Object.values(user).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(query)
      )
    );
    setFilteredData(filtered);
    setPage(0); // Reset to first page when filtering
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`, {
        auth: {
          username: 'omkar',
          password: 'omkar2531'
        }
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <TextField label="Search Users" variant="outlined" fullWidth sx={{ marginBottom: '20px', marginTop: '20px', }} value={searchQuery} onChange={handleSearch} />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="User Table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                      {columns.map((column) => {
                        const value = user[column.id];
                        if (column.id === 'imageUrl') {
                          return (
                            <TableCell key={column.id} align="center">
                              <a style={{ color: "blue" }} href={value} target="_blank">View Image</a>
                            </TableCell>
                          );
                        } else if (column.id === 'delete') {
                          return (
                            <TableCell key={column.id} align="center">
                              <Button variant="contained" style={{ backgroundColor: "red" }} size="small" onClick={() => handleDelete(user.id)}>Delete</Button>
                            </TableCell>
                          );
                        } else if (column.id === 'documents') {
                          return (
                            <TableCell key={column.id} align="center">
                              {user.documents && user.documents.length > 0 ? (
                                user.documents.map((doc, index) => (
                                  <div key={index}>
                                    <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                                      Document {index + 1}
                                    </a>
                                  </div>
                                ))
                              ) : (
                                <span>No documents</span>
                              )}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ListUser;

