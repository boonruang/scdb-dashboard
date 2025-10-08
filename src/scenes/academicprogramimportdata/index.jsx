import React, { useEffect, useRef, useState } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import AddIcon from '@mui/icons-material/Add';
import { addAcademicProgram } from '../../actions/academicProgram.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'
import Avatar from '@mui/material/Avatar'; 
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import UploadProgresBar from 'components/UploadProgresBar'
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const AcademicProgramImportData = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const fileInputRef = useRef(null);

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [rowId, setRowId] = useState(null)

    const [rows, setRows] = useState([]);  // ⬅️ ประกาศตรงนี้

    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false)

    const message = 'กรุณายืนยันการลบข้อมูล'    

    const loginReducer = useSelector((state) => state.app.loginReducer)


    const handleDeleteClick = ({state}) => {
        setRowId(state.row.staff_id)
        setOpen(true)
    }

  const [data, setData] = useState([])


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  const handleProcessClick = () => {
    console.log('processing import data')
  };

  const handleClearData = () => {
    setData([]);
    setShowProgress(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

const handleImportAllData = () => {
  if (!data || data.length === 0) {
    alert('ไม่มีข้อมูลให้นำเข้า');
    return;
  }

  // ตัด id ออก (ให้ backend generate เอง)
  const dataToImport = data.map(({ program_id, id, ...rest }) => rest);

  // debug preview ก่อนส่ง
  const confirmImport = window.confirm(
    `คุณต้องการนำเข้าข้อมูลจำนวน ${dataToImport.length} รายการหรือไม่?\n\nตัวอย่างข้อมูล:\n${JSON.stringify(dataToImport.slice(0, 3), null, 2)}`
  );
  if (!confirmImport) return;

  dataToImport.forEach((row, index) => {
    const formData = new FormData();
    Object.entries(row).forEach(([key, value]) => {
      formData.append(key, value);
    });

    dispatch(addAcademicProgram(() => {}, formData));

    // ลบแถวที่นำเข้าแล้วออกจาก dataGrid เพื่อให้เห็นผลแบบเรียลไทม์
    setData(prev => prev.filter((_, i) => i !== index));
  });
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // เริ่ม progress
    setShowProgress(true);
    setProgress(0);

    // จำลอง progress animation ระหว่างอ่านไฟล์
    let fakeProgress = 0;
    const interval = setInterval(() => {
      fakeProgress += 10;
      setProgress(prev => (fakeProgress < 90 ? fakeProgress : 90));
    }, 100);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const dataArray = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(dataArray, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      setData(parsedData);

      // โหลดเสร็จ → progress = 100%
      clearInterval(interval);
      setProgress(100);

      // หน่วงเวลานิดหน่อยก่อนซ่อน progress bar
      setTimeout(() => {
        setShowProgress(false);
        setProgress(0);
      }, 500);

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    };

    reader.onerror = (error) => {
      clearInterval(interval);
      console.error("Error reading file:", error);
      setShowProgress(false);
      setProgress(0);
    };
  };

    const columns = [
    { field: 'id', 
        headerName: 'ลำดับ',  
        headerAlign: 'center', 
        flex: 0.5,
        align: 'center'},
    {
        field: 'program_name',
        headerName: 'หลักสูตร',
        flex: 1,
        cellClassName: "name-column--cell"
    },
    { field: 'degree_level', 
        headerName: 'ปริญญา', 
        flex: 1, 
        cellClassName: "name-column--cell"
    },
    {
        field: 'department_id',
        headerName: 'ภาควิชา',
        flex: 1,
        cellClassName: "name-column--cell"
    },
        
    ]

    return (
        <Box m="20px">
            <Header title="นำเข้าผลงานวิจัยตีพิมพ์" subtitle="รายการนำเข้าผลงานวิจัยตีพิมพ์" />
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border: 1,
                    borderColor: colors.greenAccent[500]
                },
                "& .MuiDataGrid-cell": {
                    boderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeader": {
                    borderBottom: "none",
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-virtualScroller": {
                    // backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    // backgroundColor: colors.yellowAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
                <Box display="flex" justifyContent="end">
                  <form>
                    <input
                      type="file"
                      name="file"
                      accept=".xlsx,.xls"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />  
                  </form>                
                    { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                    ? <Box display="flex" justifyContent="end" onClick={handleButtonClick}>
                        <Button  
                            sx={{
                                // backgroundColor: colors.blueAccent[600],
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "10px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.greenAccent[800]}
                            }}
                        >
                            <SpellcheckIcon sx={{ mr: "10px" }} />
                            เลือกไฟล์
                        </Button>
                    </Box> : undefined }

                    { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                    ? <Box display="flex" justifyContent="end" onClick={handleImportAllData}>
                        <Button  
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
                            <BrowserUpdatedIcon sx={{ mr: "10px" }} />
                            นำเข้าทั้งหมด
                        </Button>
                    </Box> : undefined }     

                    { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                    ? <Box display="flex" justifyContent="end" onClick={handleClearData}>
                        <Button  
                            sx={{
                                backgroundColor: colors.redAccent[700],
                                // backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "10px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.redAccent[800]}
                            }}
                        >
                            <HighlightOffIcon sx={{ mr: "10px" }} />
                            ล้างข้อมูลทั้งหมด
                        </Button>
                    </Box> : undefined } 
                </Box>
                { showProgress ? <UploadProgresBar /> : undefined }
                
                    <DataGrid
                        // rows={result}
                        rows={data}
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                    />
            </Box>
        </Box>
    )
}

export default AcademicProgramImportData