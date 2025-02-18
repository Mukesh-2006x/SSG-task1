import React, { useState } from "react";
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Tables = () => {
  const [studentName, setStudentName] = useState("");
  const [subjects, setSubjects] = useState({ sub1: "", sub2: "", sub3: "", sub4: "", sub5: "" });
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setSubjects({ ...subjects, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const totalMarks = Object.values(subjects).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
    
    if (editIndex !== null) {
      const updatedData = data.map((item, index) => (index === editIndex ? { studentName, totalMarks } : item));
      setData(updatedData);
      setEditIndex(null);
    } else {
      setData([...data, { studentName, totalMarks }]);
    }
    setStudentName("");
    setSubjects({ sub1: "", sub2: "", sub3: "", sub4: "", sub5: "" });
  };

  const handleEdit = (index) => {
    const item = data[index];
    setStudentName(item.studentName);
    setSubjects({ sub1: "", sub2: "", sub3: "", sub4: "", sub5: "" });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Container maxWidth="sm">
        <Typography sx={{ color: 'black', fontFamily: 'fantasy', fontSize: '40px', marginLeft: '59px' }}>STUDENTS MARKS TABLE</Typography>
        <TextField fullWidth label="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} margin="normal" />
        <TextField fullWidth label="English" name="sub1" value={subjects.sub1} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Math" name="sub2" value={subjects.sub2} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Phy" name="sub3" value={subjects.sub3} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Chem" name="sub4" value={subjects.sub4} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Comp" name="sub5" value={subjects.sub5} onChange={handleChange} margin="normal" />
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth style={{ marginTop: "10px" }}>{editIndex !== null ? "Update" : "Submit"}</Button>
        
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Total Marks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.studentName}</TableCell>
                  <TableCell>{row.totalMarks}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Tables;
