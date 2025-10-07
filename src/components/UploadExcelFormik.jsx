import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme, Box, Button, CircularProgress, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { tokens } from "../theme";
import { uploadFile } from '../actions/staffuploadfile.action'

// ✅ กำหนด schema สำหรับ validate
const UploadSchema = Yup.object().shape({
  file: Yup.mixed()
    .required("กรุณาเลือกไฟล์")
    .test(
      "fileFormat",
      "รองรับเฉพาะไฟล์ .xlsx หรือ .xls เท่านั้น",
      (value) => value && (value.name.endsWith(".xlsx") || value.name.endsWith(".xls"))
    ),
});

const UploadExcelFormik = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  // const { isFetching, result, isError } = useSelector((state) => state.staffuploadfileReducer);
  let isFetching = false
  let result = null
  let  isError = false

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        backgroundColor: colors.primary[400],
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" color={colors.greenAccent[400]} mb={2}>
        📤 อัปโหลดไฟล์ Excel
      </Typography>

      <Formik
        initialValues={{ file: null }}
        validationSchema={UploadSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(uploadFile(values.file))
            .unwrap()
            .then(() => {
              resetForm();
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ setFieldValue, errors, touched, isSubmitting }) => (
          <Form>
            <Box>
              <input
                id="file"
                name="file"
                type="file"
                accept=".xlsx,.xls"
                style={{ display: "none" }}
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
              <label htmlFor="file">
                <Button
                  component="span"
                  variant="contained"
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    "&:hover": { backgroundColor: colors.blueAccent[800] },
                    mb: 1,
                  }}
                >
                  เลือกไฟล์ Excel
                </Button>
              </label>

              {touched.file && errors.file && (
                <Typography variant="body2" color="error" mb={1}>
                  {errors.file}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isSubmitting || isFetching}
              fullWidth
              sx={{ mt: 2 }}
            >
              {isFetching || isSubmitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: "#fff" }} /> กำลังอัปโหลด...
                </>
              ) : (
                "อัปโหลด"
              )}
            </Button>
          </Form>
        )}
      </Formik>

      {/* ✅ แสดงผลลัพธ์ */}
      {result && (
        <Typography variant="body1" color={colors.greenAccent[400]} mt={2}>
          ✅ อัปโหลดสำเร็จ: {result.originalName || "Excel file"}
        </Typography>
      )}
      {isError && (
        <Typography variant="body1" color="error" mt={2}>
          ❌ {isError}
        </Typography>
      )}
    </Box>
  );
};

export default UploadExcelFormik;
