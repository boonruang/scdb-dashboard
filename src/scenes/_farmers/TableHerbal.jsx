import React, { useState, useEffect } from 'react';
import { tokens } from '../../theme'
import Header from "../../components/Header"
import { Box,Button, Typography,useTheme } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  useGridApiContext
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';


const herbals = ['มะระขี้นก', 'ฟ้าทะลายโจร', 'สะเดา', 'ข่า', 'ตะไตร้', 'หัวหอม', 'ขิง', 'กระเพรา'];
const randomRole = () => {
  return randomArrayItem(herbals);
};

const initialRows = [
  {
    id: 1,
    herbal: 5,
    area: 25,
    output: 20.5,
  },
  {
    id: 2,
    herbal: 6,
    area: 36,
    output: 12,
  },
  {
    id: 3,
    herbal: 9,
    area: 19,
    output: 2,
  },
  {
    id: 4,
    herbal: 22,
    area: 28,
    output: 0.2,
  },
  {
    id: 5,
    herbal: 33,
    area: 23,
    output: 500,
  },
];

function EditToolbar(props) {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  
  const { setRows, setRowModesModel } = props;
  const handleAddClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, herbal: '', area: '', output: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'herbal' },
    }));
  };

  return (
    <GridToolbarContainer>
      {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        เพิ่มข้อมูล
      </Button> */}
      <Box display="flex" justifyContent="end" onClick={handleAddClick}>
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
      </Box>      
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [rows, setRows] =  useState(initialRows);
  const [lists, setLists] =  useState([]);
  const [rowModesModel, setRowModesModel] =  useState({});
  const [farmerdata, setFarmerdata] =  useState();

  const { result } = useSelector((state) => state.app.herbalReducer)

  useEffect(() => {
    setLists(result)
    console.log('Herbals Result',result)
  },[])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    // {
    //   field: 'herbal',
    //   headerName: 'สมุนไพร',
    //   // width: 250,
    //   headerAlign: 'center',
    //   align: 'center',      
    //   flex: 0.6,
    //   editable: true,
    //   type: 'singleSelect',
    //   // valueOptions: ['มะระขี้นก', 'ฟ้าทะลายโจร', 'สะเดา', 'ข่า', 'ตะไตร้', 'หัวหอม', 'ขิง', 'กระเพรา'],
    //   getOptionValue: (value) => value.id,
    //   getOptionLabel: (value) => value.herbalname,   
    //   valueOptions: lists,  
    // },
    {
      field: 'herbal',
      headerName: 'สมุนไพร',
      // width: 250,
      headerAlign: 'center',
      align: 'center',      
      flex: 0.6,
      editable: true,
      type: 'singleSelect',
      // valueOptions: ['มะระขี้นก', 'ฟ้าทะลายโจร', 'สะเดา', 'ข่า', 'ตะไตร้', 'หัวหอม', 'ขิง', 'กระเพรา'],
      getOptionValue: (value) => value.id,
      getOptionLabel: (value) => value.herbalname,   
      valueOptions: lists,  
    },
    {
      field: 'area',
      headerName: 'พื้นที่(ไร่)',
      type: 'number',
      // width: 200,
      flex: 0.6,
      headerAlign: 'center',
      align: 'center',      
      editable: true,
    },
    // {
    //   field: 'date',
    //   headerName: 'วันที่บันทึก',
    //   type: 'date',
    //   width: 180,
    //   editable: true,
    // },
    {
      field: 'output',
      headerName: 'ผลผลิต(กก./ปี)',
      type: 'number',
      // width: 200,
      headerAlign: 'center',
      align: 'center',      
      flex: 0.6,
      editable: true,
    },
    // { field: 'output', headerName: 'ผลผลิต', width: 200, editable: true },    
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ดำเนินการ',
      // width: 250,
      headerAlign: 'center',
      align: 'center',      
      flex: 0.8,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Button
                onClick={handleSaveClick(id)}
                variant="outlined"
                color="success"
                sx={{ ml: 1 }} 
              >
                บันทึก
            </Button>,
            <Button
              onClick={handleCancelClick(id)}
              variant="outlined"
              color="error"
              sx={{ ml: 1 }} 
            >
              ลบ
          </Button>            
          ];
        }

        return [
          <Button
          onClick={handleEditClick(id)}
          variant="outlined"
          color="info"
          sx={{ ml: 1 }} 
            >
              แก้ไข
          </Button>,
          <Button
            onClick={handleDeleteClick(id)}
            variant="outlined"
            color="error"
            sx={{ ml: 1 }} 
          >
            ลบ
        </Button>  
        ];
      },
    },
  ];

  return (
    <Box  
      sx={{
       height: 500,
       width: '100%',    
      "& .MuiDataGrid-root": {
          fontSize: '14px',
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
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
