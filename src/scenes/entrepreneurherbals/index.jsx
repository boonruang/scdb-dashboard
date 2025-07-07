import { useEffect, useState } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import AddIcon from '@mui/icons-material/Add';
import { getEntrepreneurherbals, deleteEntrepreneurherbal } from '../../actions/entrepreneurherbal.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'

const Entrepreneurherbals = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getEntrepreneurherbals())
    },[dispatch])


    
    const [open, setOpen] = useState(false)
    const [rowId, setRowId] = useState(null)


    const { result, isFetching } = useSelector((state) => state.app.entrepreneurherbalReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)


    const handleAddButton = () => {
        navigate('/entrepreneurherbals/add')
        };

    const DeleteFunction = () => {
        dispatch(deleteEntrepreneurherbal(rowId))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        setRowId(state.row.id)
        setOpen(true)
    }


            
    const ExportExcelButton = () => {
    // console.log('Data to export: ',result)
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(result)

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, "entrepreneurherbal.xlsx")

    };
             

    const columns = [
        { field: 'id',
          headerName: 'ลำดับ',
          headerAlign: 'center',
          align: 'center',
          flex: 0.3,
          cellClassName: "name-column--cell"
        },
        {
            field: 'name',
            headerName: 'ชื่อ',
            flex: 1,
            cellClassName: "name-column--cell"
        },           
        {
            field: 'moo',
            headerName: 'หมู่',
            type: "number",
            headerAlign: "left",
            flex: 0.4,
            align: "left",
            cellClassName: "name-column--cell"
        },        
        {
            field: 'tambon',
            headerName: 'ตำบล',
            flex: 0.4,
            cellClassName: "name-column--cell"
        },  
        {
            field: 'amphoe',
            headerName: 'อำเภอ',
            flex: 0.4,
            cellClassName: "name-column--cell"
        },          
        {
            field: 'province',
            headerName: 'จังหวัด',
            flex: 0.4,
            cellClassName: "name-column--cell"
        },                  
        {
            field: 'postcode',
            headerName: 'รหัสไปรษณีย์',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },                  
        {
            field: 'brand',
            headerName: 'ตราผลิตภัณฑ์',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },                  
        // {
        //     field: 'producttypeId',
        //     headerName: 'ประเภทสินค้า',
        //     flex: 0.5,
        //     cellClassName: "name-column--cell",
        // },                  
        // {
        //     field: 'tel',
        //     headerName: 'เบอร์ติดต่อ',
        //     flex: 1,
        // },
        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.3, renderCell: (params) => {
            return (
              <Box>
                <Button
                  onClick={() => (navigate('/entrepreneurherbals/detail',  { state: { row: params.row }} ))}
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
                onClick={() => (navigate('/entrepreneurherbals/edit',  { state: { row: params.row }} ))}
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
            <Header title="ข้อมูลผู้ประกอบการผลิตภัณฑ์สมุนไพร" subtitle="รายการข้อมูลผู้ประกอบการผลิตภัณฑ์สมุนไพร" />
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
                        { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) && result
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

                        { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) && result
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
                                    'service_type',
                                    'name',
                                    'hno',                                    
                                    'moo',
                                    'tambon',
                                    'amphoe',
                                    'province',
                                    'postcode',
                                    'brand',
                                    'source',
                                    'product_type',
                                    'herbals',
                                    'reference'
                                ],
                                fileName: 'farmers', // not work!
                                },
                            },
                          }} 
                    /> : undefined}
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

export default Entrepreneurherbals