import { Box, Button, Fade, Input } from "@mui/material";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers, uploadTeacher } from "../../../Redux/user/T_action";
import Loader from "../../component/Loader/Loader";
import { toast } from "react-toastify";
import { UPLOAD_TEACHER_RESET } from "../../../Redux/user/T_const";

const T_Upload = ({ open, close }) => {
  const dispatch = useDispatch();

  const { tUpLoadLoad, tIsUploaded, tUploadSuccess, tUploadError } =
    useSelector((state) => state.t_upload);

  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadData = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          range: 1,
        });

        const result = { data: jsonData };

        dispatch(uploadTeacher(result));
      };

      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    if (tIsUploaded) {
      toast.success(tUploadSuccess);
      setFile(null);
      close();

      dispatch(getTeachers());
    } else {
      toast.error(tUploadError);

      dispatch({ type: UPLOAD_TEACHER_RESET });
    }
  }, [tIsUploaded, tUploadSuccess, tUploadError]);

  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {tUpLoadLoad ? (
            <Loader />
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Input
                required
                fullWidth
                type="file"
                placeholder="Upload file here"
                onChange={handleFile}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <Button variant="contained" color="error" onClick={close}>
                  cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={uploadData}
                >
                  upload
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default T_Upload;
