import React, {  useEffect, useState } from 'react'
import { 
  Box, 
  useTheme,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import useDebounce from 'hooks/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { tokens } from 'theme';
import Header from 'components/Header'
import { getHerbals,deleteHerbal } from 'actions/herbal.action';
// import { getHerbalsPage } from 'actions/herbal.pagination.action';
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import Avatar from '@mui/material/Avatar'; 
import AddIcon from '@mui/icons-material/Add';
import { ROLES } from 'constants';
import { Link, useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'
import ExportExcelButton from 'components/ExportExcelButton'

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const HerbalsList = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const navigate = useNavigate()

  
  const [rowId, setRowId] = useState([])
  const [open, setOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const message = 'กรุณายืนยันการลบข้อมูล'

 
  const DeleteFunction = () => {
      dispatch(deleteHerbal(rowId))
      setOpen(false)
  }


  const handleDeleteClick = ({state}) => {
    console.log('row.id',state.row.id)
    setRowId(state.row.id)
    setOpen(true)
}

  const dispatch = useDispatch();

  const { result, isError, isFetching } = useSelector((state) => state.app.herbalReducer)
  const loginReducer = useSelector((state) => state.app.loginReducer)


  
  useEffect(() => {
    dispatch(getHerbals())
    console.log('getHerbals is running in useEffect')
  },[dispatch,paginationModel])

  // if (result) {
  //   console.log('result herbal',result)
  // }


    const ExportExcelButton = () => {
    // console.log('Data to export: ',result)
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(result)

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, "herbals.xlsx")

    };

  // useEffect(() => {
  //   if (selectedResult) {
  //     setOpen(true)
  //   }
  // },[selectedResult])

  const columns = [
    { field: 'id', headerName: 'ลำดับ',
      headerAlign: "center",
      align: "center",      
    },
    {
      field: 'herbalimages',
      headerName: 'รูป',
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const image = params.value?.[0]?.image; // ดึงภาพแรกจาก array
        return (
          image ? (
            <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",  // ให้ครอบเต็ม cell
                height: "100%", // ให้ครอบเต็ม cell
            }}
            >
            <Avatar
              alt="Herbal"
              variant="square"
              src={imagesUrl + image}
              sx={{ height: 40, width: 40 }}
            />
            </Box>
          ) : (
            <Avatar
              variant="square"
              sx={{ height: 40, width: 40 }}
            >
              -
            </Avatar>
          )
        );
      }, 
    }, 
  //   {
  //     field: 'image',
  //     headerName: 'รูป',
  //     headerAlign: "center",
  //     align: "center",
  //     type: "number",
  //     renderCell: (params) => (
  //       <Avatar alt="Image" variant="square" src={imagesUrl+params.value} sx={{ height: 40 }} />
  //     ),
  // },    
    { 
      field: 'herbalname',
      headerName: 'ชื่อสมุนไพร',
      width: 150,
      cellClassName: "name-column--cell"
     },
    {
        field: 'commonname',
        headerName: 'ชื่อสามัญ',
        width: 150,
        cellClassName: "name-column--cell"
    },
    {
        field: 'scientificname',
        headerName: 'ชื่อวิทยาศาสตร์',
        flex: 1,
        width: 300,
        cellClassName: "name-column--cell"
    },              
    {
        field: 'othername',
        headerName: 'ชื่อทั่วไป',
        type: "number",
        flex: 1,
        headerAlign: "left",
        align: "left",
        cellClassName: "name-column--cell"
    },        
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1, renderCell: (params) => {
      return (
        <Box>
          <Button
            // onClick={(e) => onDetailButtonClick(e, params.row)}
            onClick={() => (navigate('/herbals/detail',  { state: { row: params.row }} ))}
            variant="outlined"
            color="success"
            sx={{ ml: 1 }} 
          >
            รายละเอียด
          </Button>

          { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
          ? <Button
            // onClick={(e) => onEditButtonClick(e, params.row)}
            onClick={() => (navigate('/herbals/edit',  { state: { row: params.row }} ))}
            variant="outlined"
            color="info"
            sx={{ ml: 1 }}            
          >
            แก้ไข
            </Button> : undefined }

          { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
          ? <Button
            // onClick={(e) => onDeleteButtonClick(e, params.row)}
            onClick={() => handleDeleteClick({ state: { row: params.row }})}
            variant="outlined"
            color="error"
            sx={{ ml: 1 }} 
          >
            ลบ
            </Button> : undefined }

        </Box>
      );
    } } 
]

  return (
    <Box m="20px" >
      <Header title="ข้อมูลสมุนไพร" subtitle="ตารางข้อมูลสมุนไพร"/>
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
                    // backgroundColor: colors.gray,
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-virtualScroller": {
                    // backgroundColor: colors.gray,
                    // backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    // backgroundColor: colors.gray,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
            <Box display="flex" justifyContent="end">
             { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role)) && result
               ? <Box display="flex" justifyContent="end">
                    <Button  onClick={() => navigate('/herbals/add')}
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

                 {/* { result &&
                <DataGrid
                rows={result}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                /> }                         */}

                  { isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}><CircularProgress /></Box>}
                  { result ?
                  <DataGrid
                      rows={result}
                      columns={columns}
                      slots={{ toolbar: GridToolbar }}
                      // loading={isFetching}
                      // paginationMode="server"
                      // rowCount={pagination?.total}                 
                      // paginationModel={paginationModel}
                      // onPaginationModelChange={setPaginationModel}
                      slotProps={{
                          toolbar: {
                            csvOptions: { disableToolbarButton: true },
                            printOptions: {
                              disableToolbarButton: false,
                              hideFooter: true,
                              hideToolbar: true, // ซ่อน headers column, filters, exports ตอนพิมพ์
                              fields: [
                                'id',
                                'herbalname',
                                'commonname',
                                'scientificname',
                                'othername',
                                'ph',                                    
                                'soil',
                                'disease',
                                'charactername',
                                'propertyname',                                    
                                'benefit',
                                'referencename',
                              ],
                              fileName: 'herbals', 
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
                title={rowId}
            />            
    </Box>
  )
}

export default HerbalsList