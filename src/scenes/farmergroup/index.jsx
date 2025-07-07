import { useEffect, useState } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import AddIcon from '@mui/icons-material/Add';
import { getAllFarmergroup, deleteFarmergroup } from '../../actions/farmergroup.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from "components/ConfirmBox";
import { getHerbals } from "actions/herbal.action";
import ExportExcelButton from 'components/ExportExcelButton'

const Farmergroup = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [farmergroupId, setFarmergroupId] = useState([])
    const [open, setOpen] = useState(false)

    const message = 'กรุณายืนยันการลบข้อมูล'


    useEffect(() => {
        dispatch(getAllFarmergroup())
    },[dispatch])


    const { result, isFetching } = useSelector((state) => state.app.farmergroupReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)

    const handleAddButton = () => {
        navigate('/farmergroup/add')
      };


    const DeleteFunction = () => {
        dispatch(deleteFarmergroup(farmergroupId))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        // console.log('state',state)
        console.log('row.id',state.row.id)
        setFarmergroupId(state.row.id)
        setOpen(true)
        // dispatch(deleteFarmer(state.row.id))
    }

    const rows = result?.map((item) => ({
    ...item,
    herbalNames: Array.isArray(item.herbals) && item.herbals.length > 0
        ? item.herbals.map(h => h.herbalname).join(', ')
        : 'ไม่ได้ระบุ',
    }));        

    // const ExportExcelButton = () => {
    // // console.log('Data to export: ',result)
    // var wb = XLSX.utils.book_new(),
    // ws = XLSX.utils.json_to_sheet(rows)

    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    // XLSX.writeFile(wb, "farmergroup.xlsx")

    // };

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
            field: 'farmergroupname',
            headerName: 'ชื่อกลุ่ม',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: 'leader',
            headerName: 'ผู้นำกลุ่ม',
            flex: 0.6,
            cellClassName: "name-column--cell"
        },                   
        // {
        //     field: 'hno',
        //     headerName: 'เลขที่',
        //     flex: 0.5,
        //     cellClassName: "name-column--cell"
        // },  
        {
            field: 'moo',
            headerName: 'หมู่',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },  
        {
            field: 'tambon',
            headerName: 'ตำบล',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },  
        {
            field: 'amphoe',
            headerName: 'อำเภอ',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },          
        {
            field: 'province',
            headerName: 'จังหวัด',
            flex: 0.5,
            cellClassName: "name-column--cell"
        }, 
        {
            field: 'herbalNames',
            headerName: 'สมุนไพร',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            cellClassName: "name-column--cell",            
            filterable: true,
            renderCell: (params) => (
            <Box>{params.value}</Box>
            ),
        },                         
        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
            return (
              <Box>
                <Button
                  onClick={() => (navigate('/farmergroup/detail',  { state: { row: params.row }} ))}
                  variant="outlined"
                  color="success"
                >
                  รายละเอียด
                </Button>

            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
            ? <Button
                onClick={() => (navigate('/farmergroup/edit',  { state: { row: params.row }} ))}
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
            <Header title="ข้อมูลกลุ่มเกษตรกร" subtitle="รายการข้อมูลกลุ่มเกษตรกร" />
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

                    {/* { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) && result
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
                    </Box> : undefined }                 */}

                    {loginReducer?.result?.roles?.find((role) =>
                    [ROLES.Admin, ROLES.Editor].includes(role)
                    ) && result?.length > 0 && (
                    <Box display="flex" justifyContent="end">
                        <ExportExcelButton
                        action={() => getAllFarmergroup({ all: true })}
                        selector={(state) => state.app.farmergroupReducer.result}
                        fileName="farmergroups.xlsx"
                        mapRow={(item) => ({
                            ...item,
                            herbalNames: Array.isArray(item.herbals) && item.herbals.length > 0
                            ? item.herbals.map(h => h.herbalname).join(', ')
                            : 'ไม่ได้ระบุ',
                        })}
                        />
                    </Box>
                    )}    

                </Box>
                
                    { isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}><CircularProgress /></Box>}
                    { result ?
                    <DataGrid
                        rows={rows}
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
                                    'farmergroupname',
                                    'hno',                                    
                                    'village',
                                    'moo',
                                    'tambon',
                                    'amphoe',
                                    'province',
                                    'postcode',
                                    'leader',
                                    'herbalNames',
                                ],
                            },
                            },
                          }} 
                    /> : undefined}
            </Box>
            <ConfirmBox 
                open={open}
                closeDialog={() => setOpen(false)}
                deleteFunction={() => DeleteFunction()}
                message={message}
                title={farmergroupId}
            />            
        </Box>
    )
}

export default Farmergroup