import React, { useEffect, useState } from 'react'
import { 
  Box, 
  useTheme,
  Button
} from '@mui/material'
import useDebounce from 'hooks/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { tokens } from 'theme';
import Header from 'components/Header'
import { getHerbals,setStateHerbalSelectedToFetching } from 'actions/herbal.action';
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import Avatar from '@mui/material/Avatar'; 
import AddIcon from '@mui/icons-material/Add';

const imagesUrl = process.env.REACT_APP_IMAGES_URL





const HerbalsList = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)  

  // const [searchValue, setSearchValue] = useState('')
  // const debouncedSearchValue = useDebounce(searchValue, 1000)

  // const [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  //   dispatch(setStateHerbalSelectedToFetching())
  // };

  const onButtonClick = () => {
    //
  };


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHerbals())
    console.log('getHerbals is running in useEffect')
  },[dispatch])

  // const { isSidebar} = useSelector((state) => state.app.appReducer)

  const { result, isError, isFetching } = useSelector((state) => state.app.herbalReducer)

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
      field: 'cover',
      headerName: 'รูป',
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => (
        <Avatar alt="Image" variant="square" src={imagesUrl+params.value} sx={{ height: 40 }} />
      ),
  },    
    { field: 'herbalname', headerName: 'ชื่อสมุนไพร', width: 150 },
    {
        field: 'commonname',
        headerName: 'ชื่อสามัญ',
        // flex: 1,
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
        headerName: 'ชื้อทั่วไป',
        type: "number",
        flex: 1,
        headerAlign: "left",
        align: "left",
    },        
    { field: 'actions', headerName: 'Actions', headerAlign: 'center', align: 'center', flex: 1, renderCell: (params) => {
      return (
        <Box>
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="outlined"
            color="success"
          >
            Edit
          </Button>
          <Button
            sx={{ ml: 1 }}
            onClick={(e) => onButtonClick(e, params.row)}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </Box>
      );
    } } 
]
  
  return (
    <Box m="20px">
      <Header title="ข้อมูลสุมนไพร" subtitle="ตารางข้อมูลสุมนไพร"/>
      <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    boderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeader": {
                    borderBottom: "none",
                    // backgroundColor: colors.yellowAccent[700],
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400]
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
                    <Button  
                        sx={{
                            // backgroundColor: colors.blueAccent[600],
                            backgroundColor: colors.greenAccent[600],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            mr: "8px",
                            '&:hover': {backgroundColor: colors.blueAccent[700]}
                        }}
                    >
                        <AddIcon sx={{ mr: "10px" }} />
                        เพิ่มข้อมูล
                    </Button>
                </Box>
                {
                  result &&
                 <DataGrid
                    rows={result}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />                 
                }

            </Box>
    </Box>
  )
}

export default HerbalsList