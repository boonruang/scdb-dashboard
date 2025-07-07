import * as XLSX from 'xlsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, useTheme } from '@mui/material'; // ใช้ปุ่มจาก MUI ได้
import { tokens } from "../theme"
import IosShareIcon from '@mui/icons-material/IosShare';

const ExportExcelButton = ({ action, selector, fileName = 'data.xlsx', mapRow }) => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch();
  const data = useSelector(selector);
  const [isExporting, setIsExporting] = useState(false);
  const [shouldExport, setShouldExport] = useState(false);

  // คลิกปุ่ม -> สั่งโหลดข้อมูล
const handleExport = () => {
  if (data && data.length > 0) {
    const rows = mapRow ? data.map(mapRow) : data;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  } else {
    setIsExporting(true);
    setShouldExport(true);
    dispatch(action());
  }
};

  useEffect(() => {
    if (shouldExport && data && data.length > 0) {
      const rows = mapRow ? data.map(mapRow) : data;
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, fileName);

      // reset flags
      setShouldExport(false);
      setIsExporting(false);
    }
  }, [data, shouldExport, mapRow, fileName]);

  return (
    <Button  
        onClick={handleExport}
        disabled={isExporting}
        sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            mr: "10px",
            mb: "10px",
            '&:hover': {backgroundColor: colors.blueAccent[800]}
        }}
    >
        <IosShareIcon sx={{ mr: "10px" }} />
        ส่งออกไฟล์ Excel
    </Button>    
  );
};

export default ExportExcelButton;
