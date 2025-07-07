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
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { getFarmerById } from 'actions/farmer.action';
import { Search } from '@mui/icons-material';

const groups = ['กลุ่มสมุนไพรบ้านโคกกลาง1', 'กลุ่มสมุนไพรบ้านโคกกลาง2', 'กลุ่มอนุรักษ์และเกษตรอินทรีย์ทฤษฎีพ่อฟ้าหลวงครบวงจร'];
const groups1 = [{value: 1, label: 'กลุ่มสมุนไพรบ้านโคกกลาง1'}, {value: 2, label: 'กลุ่มสมุนไพรบ้านโคกกลาง2'}, {value: 3, label: 'กลุ่มอนุรักษ์และเกษตรอินทรีย์ทฤษฎีพ่อฟ้าหลวงครบวงจร'}];
const randomRole = () => {
  return randomArrayItem(groups);
};

const initialRows = [
  {
    id: randomId(),
    farmerId: 101,
    farmergroupId: 6,
  },
  {
    id: randomId(),
    farmerId: 101,
    farmergroupId: 7,
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
      { id, farmergroupId: '', farmerId: 101, isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'farmergroupId' },
    }));
  };

  return (
    <GridToolbarContainer>
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
  const dispatch = useDispatch() 

  const [rows, setRows] =  useState(initialRows);
  const [lists, setLists] =  useState([]);
  const [rowModesModel, setRowModesModel] =  useState({});
  const [farmerdata, setFarmerdata] =  useState();

  const { result } = useSelector((state) => state.app.farmergroupReducer)

  useEffect(() => {
    setLists(result)
    // setRows(farmergroupfarmerReducer.result)
    console.log('Table Form Group Result ',result)
  },[])

  // const objArr = farmerReducer?.result.map((item) => {
  //   if ( item.id == '5') {
  //     return item.farmergroups
  //   }
  // })

  // if (objArr) {
  //   console.log('objArr',objArr)
  // }

  // const ColData = lists.map(option => option.farmergroupname);

  const ColDataId = lists.map(option => option.id);
  const ColDataName = lists.map(option => option.farmergroupname);

  const ColData = lists.map((option) => {
    return {
        value: option.id,
        label: option.farmergroupname
    }
  })


  // if (ColData ) {
  //   console.log('ColData ',ColData)
  // }


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    console.log('saved a id ',id)
    console.log('rowModesModel ',rowModesModel)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log('rowModesModel after ',rowModesModel)
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
    console.log('newRow',newRow)
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    console.log('updatedRow',updatedRow)
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const sendToServer = async(data) => {
    // send to server logic
    console.log('send to server ......',data)
  }

  const columns = [
    // {
    //   field: 'id',
    //   headerName: 'รหัส',
    //   headerAlign: 'center',
    //   align: 'left',      
    //   flex: 0.6,
    //   editable: true,
    //   type: 'singleSelect',
    // },
    // {
    //   field: 'farmerId',
    //   headerName: 'เกษตรกร',
    //   headerAlign: 'center',
    //   align: 'center',      
    //   flex: 0.6,
    //   editable: true,
    //   type: 'singleSelect',
    // },    
    {
      field: 'farmergroupId',
      headerName: 'กลุ่มเกษตรกร',
      headerAlign: 'center',
      align: 'left',      
      flex: 0.6,
      editable: true,
      type: 'singleSelect',
      getOptionValue: (value) => value.id,
      getOptionLabel: (value) => value.farmergroupname,   
      valueOptions: lists,
      Search
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ดำเนินการ',
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
    // <Box
    //   sx={{
    //     height: 400,
    //     width: '100%',
    //     '& .actions': {
    //       color: 'text.secondary',
    //     },
    //     '& .textPrimary': {
    //       color: 'text.primary',
    //     },
    //   }}
    // >
    <Box  
      sx={{
       height: 400,
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
        // onCellEditCommit={sendToServer}
        // onRowEditCommit={sendToServer}
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
