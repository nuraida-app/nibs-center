import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";

const Indentity = () => {
  return (
    <Box
      sx={{
        bgcolor: "whitesmoke",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 2,
        flexWrap: "wrap",
        p: 2,
        borderRadius: "5px",
      }}
    >
      <Table sx={{ width: "45%" }}>
        <TableBody>
          <TableRow>
            <TableCell>Classroom</TableCell>
            <TableCell>:</TableCell>
            <TableCell>PTS BAHASA ARAB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Classroom</TableCell>
            <TableCell>:</TableCell>
            <TableCell>PTS BAHASA ARAB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Classroom</TableCell>
            <TableCell>:</TableCell>
            <TableCell>PTS BAHASA ARAB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Classroom</TableCell>
            <TableCell>:</TableCell>
            <TableCell>PTS BAHASA ARAB</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table sx={{ width: "45%" }}>
        <TableBody>
          <TableRow>
            <TableCell>Classroom</TableCell>
            <TableCell>:</TableCell>
            <TableCell>PTS BAHASA ARAB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Classroom</TableCell>
            <TableCell>:</TableCell>
            <TableCell>PTS BAHASA ARAB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Classroom</TableCell>
            <TableCell>:</TableCell>
            <TableCell>PTS BAHASA ARAB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Classroom</TableCell>
            <TableCell>:</TableCell>
            <TableCell>PTS BAHASA ARAB</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default Indentity;
