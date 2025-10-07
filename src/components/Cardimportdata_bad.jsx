import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme, CardActionArea, Grid } from "@mui/material";
import { Card, CardMedia, CardContent, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import IosShareIcon from "@mui/icons-material/IosShare";
import { tokens } from "../theme";
import { uploadFile } from '../actions/staff.action'

const imagesUrl = process.env.REACT_APP_IMAGES_URL;

const Item = ({ result }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { loading, error, fileInfo } = useSelector((state) => state.upload);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // ส่งไฟล์เข้า Redux Action เพื่อ upload
    dispatch(uploadFile(file));
  };

  return (
    <Grid item xs={12} sm={4} ms={4}>
      <Card sx={{ maxWidth: 500, backgroundColor: colors.primary[400] }} style={{ marginBottom: "5px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={imagesUrl + result.image}
            alt="scdb"
            style={{ borderRadius: "5px" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color={colors.greenAccent[400]}>
              {result.id} {result.name.substring(0, 50)}
            </Typography>
            <Box>
              <Typography variant="h6" color={colors.greenAccent[600]} display="inline">
                {result.description.substring(0, 70)}
              </Typography>
            </Box>

            {/* Input File Hidden */}
            <input
              type="file"
              accept=".xlsx,.xls"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* ปุ่มอัปโหลด */}
            <Button
              onClick={handleButtonClick}
              disabled={loading}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                mr: "10px",
                mb: "5px",
                "&:hover": { backgroundColor: colors.blueAccent[800] },
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: colors.grey[100], mr: "10px" }} />
              ) : (
                <IosShareIcon sx={{ mr: "10px" }} />
              )}
              {loading ? "กำลังอัปโหลด..." : "นำเข้าไฟล์ Excel"}
            </Button>

            {/* แสดงผลลัพธ์ */}
            {fileInfo && (
              <Typography variant="body2" color={colors.greenAccent[400]} mt={1}>
                ✅ อัปโหลดสำเร็จ: {fileInfo.originalName}
              </Typography>
            )}
            {error && (
              <Typography variant="body2" color="error" mt={1}>
                ❌ {error}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const Cardexportdata = ({ mockImportData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!mockImportData) {
    return <Box>อุ้ย หาไม่เจออ่ะ</Box>;
  }

  return (
    <Grid container spacing={5} style={{ marginTop: "20px" }}>
      {Object.values(mockImportData).map((result) => (
        <Item key={result.id} result={result} />
      ))}
    </Grid>
  );
};

export default Cardexportdata;
