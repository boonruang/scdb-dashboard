import React, { useEffect, useState } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import { getKnowledgebase, deleteKnowledgebase } from '../../actions/knowledgebase.action'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from '../../constants'
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'

const Knowledgebase = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [rowId, setRowId] = useState(null)


    useEffect(() => {
        dispatch(getKnowledgebase())
    },[dispatch])

    const { result, isFetching } = useSelector((state) => state.app.knowledgebaseReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)   
    
    const DeleteFunction = () => {
        dispatch(deleteKnowledgebase(rowId))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        setRowId(state.row.id)
        setOpen(true)
    }

    const handleAddButton = () => {
        navigate('/knowledgebase/add')
        };

    const ExportExcelButton = () => {
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(result)

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, "knowledgebase.xlsx")

    };    

    const columns = [
        { field: 'id', 
            headerName: 'ลำดับ',  
            headerAlign: 'center', 
            flex: 0.3,
            align: 'center'},
        {
            field: 'name',
            headerName: 'เรื่อง',
            flex: 0.8,
            cellClassName: "name-column--cell"
        },
        { field: 'author', 
            headerName: 'ชื่อผู้แต่ง', 
            flex: 0.3, 
            cellClassName: "name-column--cell" },
        { field: 'publishyear', 
            headerName: 'ปีที่ตีพิมพ์', 
            flex: 0.4, 
            cellClassName: "name-column--cell" },
        { field: 'edition', 
            headerName: 'พิมพ์ครั้งที่', 
            flex: 0.4, 
            cellClassName: "name-column--cell" },
        {
            field: 'journal',
            headerName: 'สำนักพิมพ์',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },
        {
            field: 'press',
            headerName: 'สถานที่พิมพ์',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },
        {
            field: 'type',
            headerName: 'ประเภทการตีพิมพ์',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },              
        {
            field: 'reference',
            headerName: 'อ้างอิง',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },              
        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1, renderCell: (params) => {
            return (
              <Box>
                <Button
                  onClick={() => (navigate('/knowledgebase/detail',  { state: { row: params.row }} ))}
                  variant="outlined"
                  color="success"
                >
                  รายละเอียด
                </Button>
                {/* <Link to={"/farmers/detail/" + params.row.id}>
                            <button className="viewButton">View</button>
                </Link> */}
                
            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                onClick={() => (navigate('/knowledgebase/edit',  { state: { row: params.row }} ))}
                  variant="outlined"
                  color="info"
                  sx={{ ml: 1 }}            
                >
                  แก้ไข
                </Button> : undefined  }                  

            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                onClick={() => handleDeleteClick({ state: { row: params.row }})}
                  variant="outlined"
                  color="error"
                  sx={{ ml: 1 }} 
                >
                  ลบ
                </Button> : undefined  } 
                    
              </Box>
            );
          } }         
    ]

    return (
        <Box m="20px">
            <Header title="องค์ความรู้การแพทย์แผนไทย"/>
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    // border: "none"
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
                        { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) 
                        ? <Box display="flex" justifyContent="end" onClick={handleAddButton}>
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
                                <AddIcon sx={{ mr: "10px" }} />
                                เพิ่มข้อมูล
                            </Button>
                        </Box> : undefined }

                        { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) 
                        ? <Box display="flex" justifyContent="end" onClick={ExportExcelButton}>
                            <Button  
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    // backgroundColor: colors.greenAccent[600],
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
                        </Box> : undefined }                
                    </Box>

                { isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}><CircularProgress /></Box>}
                { result ?
                    <DataGrid
                        rows={result}
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                              csvOptions: { disableToolbarButton: true },
                              printOptions: {
                                disableToolbarButton: false,
                                hideFooter: true,
                                hideToolbar: true, // ซ่อน headers column, filters, exports ตอนพิมพ์
                                fields: [
                                    'id',
                                    'name',
                                    'author',
                                    'edition',
                                    'publishyear',
                                    'journal',
                                ],
                                fileName: 'knowledgebase', 
                                },
                            },
                          }} 
                    />   : undefined }                             
            </Box>
            <ConfirmBox
                open={open}
                closeDialog={() => setOpen(false)}
                deleteFunction={() => DeleteFunction()}
                message={"กรุณายืนยันการลบข้อมูล"}
                title={rowId}
            />             
        </Box>
    )
}

export default Knowledgebase