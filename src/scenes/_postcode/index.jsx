import { useEffect } from "react";
import { postcodes } from "../../data/thPostcode.js"
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
// import { mockDataFarmers } from "../../data/mockDataFarmers"
import AddIcon from '@mui/icons-material/Add';
import { getFarmers } from '../../actions/farmer.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const Postcode = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getFarmers())
    },[dispatch])


    const { result, isFetching } = useSelector((state) => state.app.farmerReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)

    // if (result) {
    //     console.log('result',result)
    // }

    const handleClick = () => {
        //
    }

    const handleButtonDetail = (p) => {
        // console.log('params',params)
        console.log('params',p)
        // navigate('/farmers/detail')
    };

    const handleRowClick = (params,event,details) => {
        console.log('params',params)
        // console.log('event',event)
        // console.log('details',details)
    };


    const columns = [
        { field: 'id', headerName: 'ลำดับ', headerAlign: 'center', align: 'center'},
        // { field: 'username', headerName: 'Username' },
        {
            field: 'firstname',
            headerName: 'ชื่อ',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: 'lastname',
            headerName: 'นามสกุล',
            flex: 1,
            cellClassName: "name-column--cell"
        },                   
        {
            field: 'tambon',
            headerName: 'ตำบล',
            flex: 1,
            cellClassName: "name-column--cell"
        },  
        {
            field: 'amphoe',
            headerName: 'อำเภอ',
            flex: 1,
            cellClassName: "name-column--cell"
        },          
        {
            field: 'name_th',
            headerName: 'จังหวัด',
            flex: 1,
            cellClassName: "name-column--cell"
        },                  

        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
            return (
              <Box>
                <Button
                  onClick={() => (navigate('/farmers/detail',  { state: { row: params.row }} ))}
                  variant="outlined"
                  color="success"
                >
                  รายละเอียด
                </Button>

            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                  onClick={handleClick}
                  variant="outlined"
                  color="warning"
                  sx={{ ml: 1 }}            
                >
                  แก้ไข
                </Button> : undefined  }                 

            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                  onClick={handleClick}
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
            <Header title="ข้อมูลเกษตรกร" subtitle="รายการข้อมูลเกษตรกร" />
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
                { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Box display="flex" justifyContent="end">
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
                            '&:hover': {backgroundColor: colors.blueAccent[700]}
                        }}
                    >
                        <AddIcon sx={{ mr: "10px" }} />
                        เพิ่มข้อมูล
                    </Button>
                </Box> : undefined }
                
                    { isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}><CircularProgress /></Box>}
                    { result ?
                    <DataGrid
                        rows={postcodes}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        // onSelectionModelChange={(ids) => {
                        //     const selectedIDs = new Set(ids)
                        //     const selectedRowData = result.filter((row) => 
                        //         selectedIDs.has(row.id.toString())
                        //     )
                        //     console.log(selectedRowData)
                        // }}
                        // onRowClick={handleRowClick}
                    /> : undefined}
            </Box>
        </Box>
    )
}

export default Postcode