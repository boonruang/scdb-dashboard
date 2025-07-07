import React, { forwardRef, useEffect, useState } from 'react'
import { 
  Box, 
  useTheme,
  Button,
  Snackbar,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import useDebounce from 'hooks/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { tokens } from 'theme';
import Header from 'components/Header'
import { editUser, getUsers, deleteUser } from 'actions/user.action';
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid"
import Avatar from '@mui/material/Avatar'; 
import AddIcon from '@mui/icons-material/Add';
import { alpha, styled } from '@mui/material/styles';
import { useDemoData } from '@mui/x-data-grid-generator';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom'
import { getRoles } from '../../actions/role.action'
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'
const imagesUrl = process.env.REACT_APP_IMAGES_URL

const UsersList = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)  

  const navigate = useNavigate()

  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const [userId, setUserId] = useState([])
  const [open, setOpen] = useState(false)

  const message = 'กรุณายืนยันการลบข้อมูล'

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoles())
    console.log('getRole useEffect is called')
  },[dispatch])

  useEffect(() => {
    dispatch(getUsers())
    console.log('getUsers is running in useEffect')
  },[dispatch])

  // const { isSidebar} = useSelector((state) => state.app.appReducer)

  const { result, isError, isFetching } = useSelector((state) => state.app.userReducer)



  // useEffect(() => {
  //   if (selectedResult) {
  //     setOpen(true)
  //   }
  // },[selectedResult])

  const onButtonClick = (e,r) => {
    setSnackBarOpen(true)
    console.log('record id',r.id)
    console.log('row data',r)
    navigate(`/users/edit/${r.id}`)
  };

  const handleButtonClick = () => {
    navigate('/users/add')
  };

  const handleDeleteClick = ({state}) => {
    console.log('row.id',state.row.id)
    setUserId(state.row.id)
    setOpen(true)
    // dispatch(deleteUser(state.row.id))
}

  const ExportExcelButton = () => {
  // console.log('Data to export: ',result)
  var wb = XLSX.utils.book_new(),
  ws = XLSX.utils.json_to_sheet(result)

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
  XLSX.writeFile(wb, "users.xlsx")

  };

  const DeleteFunction = () => {
      dispatch(deleteUser(userId))
      setOpen(false)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackBarOpen(false)
  }
  const MuiSnackbar = ({message,duration}) => {

    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleSnackbarClose}>
          ปิด
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleSnackbarClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );    

    return (
      <React.Fragment>
      <Snackbar message={message}
        autoHideDuration={duration}
        open={snackBarOpen}
        onClose={handleSnackbarClose}
        severity="success"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        action={action}
      /> 
      </React.Fragment> 
    )
  }

  const columns = [
    { field: 'id', headerName: 'ลำดับ',headerAlign: "center",align: "center", cellClassName: "name-column--cell", flex: 0.3},
    { field: 'username', headerName: 'username', headerAlign: 'center', align: 'center', cellClassName: "name-column--cell",  flex: 0.4},
    { field: 'firstname', headerName: 'firstname', headerAlign: 'center', align: 'center', cellClassName: "name-column--cell",  flex: 0.6},
    { field: 'lastname', headerName: 'lastname', headerAlign: 'center', align: 'center', cellClassName: "name-column--cell",  flex: 0.6},
    { field: 'status', headerName: 'status', headerAlign: 'center', align: 'center', cellClassName: "name-column--cell",  flex: 0.4, renderCell: (params) => {
          // console.log('params',params.row.status);
          if (params.row.status === true ) {
              return (<Box>Active</Box>);
          } else {
              return (<Box>Not Active</Box>);
          }
        }
    }, 
    { field: 'roleArr', headerName: 'roles', headerAlign: 'center', align: 'center', cellClassName: "name-column--cell",  flex: 0.4},
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', cellClassName: "name-column--cell", flex: 1.2, renderCell: (params) => {
      return (
        <Box>
          <Button
            onClick={() => (navigate('/users/detail',  { state: { row: params.row }} ))}
            variant="outlined"
            color="success"
            sx={{ ml: 1 }} 
          >
            รายละเอียด
          </Button>

          <Button
            onClick={() => (navigate('/users/edit',  { state: { row: params.row }} ))}
            variant="outlined"
            color="info"
            sx={{ ml: 1 }}            
          >
            แก้ไข
          </Button>

          <Button
            onClick={() => handleDeleteClick({ state: { row: params.row }})}
            variant="outlined"
            color="error"
            sx={{ ml: 1 }} 
          >
            ลบ
          </Button>

        </Box>
      );
    } } 
]

  return (
    <Box m="20px" >
      <Header title="ข้อมูลผู้ใช้" subtitle="ตารางข้อมูลผู้ใช้"/>
      { result ? <Box m="40px 0 0 0" height="75vh" sx={{
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
                    <Button  onClick={handleButtonClick}
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
                    <Box display="flex" justifyContent="end" onClick={ExportExcelButton}>
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
                    </Box>                    
                    <MuiSnackbar message="ยังไม่เปิดการเพิ่มข้อมูลตอนนี้" duration={4000} />
                </Box>
                {
                  result &&
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
                            'username',
                            'firstname',
                            'lastname',
                            'status',
                        ],
                        fileName: 'users',
                        },
                    },
                  }}                
                />                         
                }

            </Box>  
          : 
          <Box height="60vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}>
            <CircularProgress />
          </Box>
          }
        <ConfirmBox
            open={open}
            closeDialog={() => setOpen(false)}
            deleteFunction={() => DeleteFunction()}
            message={message}
            title={userId}
        />          
    </Box>
  )
}

export default UsersList