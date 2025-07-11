import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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

const herbals = ['มะระขี้นก', 'ฟ้าทะลายโจร', 'สะเดา', 'ข่า', 'ตะไตร้', 'หัวหอม', 'ขิง', 'กระเพรา'];
const randomRole = () => {
  return randomArrayItem(herbals);
};

const initialRows = [
  {
    id: randomId(),
    herbal: randomRole(),
    area: 25,
    date: randomCreatedDate(),
    output: 20.5,
  },
  {
    id: randomId(),
    herbal: randomRole(),
    area: 36,
    date: randomCreatedDate(),
    output: 12,
  },
  {
    id: randomId(),
    herbal: randomRole(),
    area: 19,
    date: randomCreatedDate(),
    output: 2,
  },
  {
    id: randomId(),
    herbal: randomRole(),
    area: 28,
    date: randomCreatedDate(),
    output: 0.2,
  },
  {
    id: randomId(),
    herbal: randomRole(),
    area: 23,
    date: randomCreatedDate(),
    output: 500,
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
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
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        เพิ่มข้อมูล
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
    {
      field: 'herbal',
      headerName: 'สมุนไพร',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['มะระขี้นก', 'ฟ้าทะลายโจร', 'สะเดา', 'ข่า', 'ตะไตร้', 'หัวหอม', 'ขิง', 'กระเพรา'],
    },
    {
      field: 'area',
      headerName: 'พื้นที่',
      type: 'number',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    // {
    //   field: 'date',
    //   headerName: 'วันที่บันทึก',
    //   type: 'date',
    //   width: 180,
    //   editable: true,
    // },

    { field: 'output', headerName: 'ผลผลิต', width: 180, editable: true },    
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ดำเนินการ',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
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
