import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import { mockDataBusiness } from "../../data/mockDataBusiness"
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from '../../constants'
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'

const BusinessGroup = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const loginReducer = useSelector((state) => state.app.loginReducer)    

    const handleAddButton = () => {
        navigate('/farmers/add')
        };

    const ExportExcelButton = () => {
    // console.log('Data to export: ',result)
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(mockDataBusiness)

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, "businessgroup.xlsx")

    };    

    const columns = [
        { field: 'id', headerName: 'ลำดับ',  headerAlign: 'center', align: 'center'},
        {
            field: 'aeng',
            headerName: 'บริษัท',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        { field: 'tthai', headerName: 'ตำบล', flex: 1, cellClassName: "name-column--cell" },
        {
            field: 'athai',
            headerName: 'อำเภอ',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: 'pthai',
            headerName: 'จังหวัด',
            flex: 1,
            cellClassName: "name-column--cell"
        },              
        {
            field: 'lat',
            headerName: 'Latitude',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: 'long',
            headerName: 'Longitude',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
            return (
                <Box>
                <Button
                  onClick={{}}
                  variant="outlined"
                  color="success"
                >
                  รายละเอียด
                </Button>
            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                  onClick={{}}
                  variant="outlined"
                  color="info"
                  sx={{ ml: 1 }}            
                >
                  แก้ไข
                </Button> : undefined  }  

            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                  onClick={{}}
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
            <Header title="ข้อมูลกลุ่มบริษัทและธุรกิจ" subtitle="รายการข้อมูลกลุ่มบริษัทและธุรกิจ" />
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
                {/* { isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}><CircularProgress /></Box>} */}
                    <DataGrid
                        rows={mockDataBusiness}
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
                                    'aeng',
                                    'tthai',
                                    'athai',
                                    'pthai',
                                    'lat',
                                    'long'
                                ],
                                fileName: 'businessgroup', // not work!
                                },
                            },
                          }} 
                    />                                
                {/* <DataGrid
                    rows={mockDataBusiness}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                /> */}
            </Box>
        </Box>
    )
}

export default BusinessGroup