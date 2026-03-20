import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import AddIcon from '@mui/icons-material/Add';
import { getStudentActivities, deleteStudentActivity } from '../../actions/studentActivity.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'

const StudentActivities = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [rowId, setRowId] = useState(null)

    const message = 'กรุณายืนยันการลบข้อมูล'

    useEffect(() => {
        dispatch(getStudentActivities())
    }, [dispatch])

    const { result, isFetching } = useSelector((state) => state.app.studentActivityReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)

    const DeleteFunction = () => {
        dispatch(deleteStudentActivity(rowId))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        setRowId(state.row.activity_id)
        setOpen(true)
    }

    const handleAddButton = () => {
        navigate('/studentactivity/add')
    };

    const ExportExcelButton = () => {
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(result)
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
        XLSX.writeFile(wb, "studentactivity.xlsx")
    };

    const columns = [
    {
      field: 'activity_code',
      headerName: 'รหัสโครงการ',
      flex: 1,
      cellClassName: "name-column--cell"
    },
    {
      field: 'activity_name',
      headerName: 'ชื่อโครงการ',
      flex: 2,
      cellClassName: "name-column--cell"
    },
    {
      field: 'organizer',
      headerName: 'ผู้จัด/หน่วยงาน',
      flex: 1.5,
    },
    {
      field: 'start_date',
      headerName: 'วันที่เริ่ม',
      flex: 1,
    },
    {
      field: 'participant_count',
      headerName: 'จำนวนผู้เข้าร่วม',
      flex: 1,
      type: 'number'
    },
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
        return (
          <Box>
            <Button
              onClick={() => (navigate('/studentactivity/detail', { state: { row: params.row } }))}
              variant="outlined"
              color="success"
            >
              รายละเอียด
            </Button>

            { loginReducer && loginReducer.result && loginReducer.result.roles && loginReducer.result.roles.find((role) => [ROLES.Admin, ROLES.Editor].includes(role))
                ? <Button
                onClick={() => (navigate('/studentactivity/edit', { state: { row: params.row } }))}
                  variant="outlined"
                  color="info"
                  sx={{ ml: 1 }}
                >
                  แก้ไข
                </Button> : undefined }

            { loginReducer && loginReducer.result && loginReducer.result.roles && loginReducer.result.roles.find((role) => [ROLES.Admin, ROLES.Editor].includes(role))
                ? <Button
                onClick={() => handleDeleteClick({ state: { row: params.row } })}
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
        <Box m="20px">
            <Header title="ข้อมูลโครงการ" subtitle="รายการข้อมูลโครงการกิจการนิสิต" />
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
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
                <Box display="flex" justifyContent="end">
                    { loginReducer && loginReducer.result && loginReducer.result.roles && loginReducer.result.roles.find((role) => [ROLES.Admin, ROLES.Editor].includes(role)) && result
                    ? <Box display="flex" justifyContent="end" onClick={handleAddButton}>
                        <Button
                            sx={{
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

                    { loginReducer && loginReducer.result && loginReducer.result.roles && loginReducer.result.roles.find((role) => [ROLES.Admin, ROLES.Editor].includes(role)) && result
                    ? <Box display="flex" justifyContent="end" onClick={ExportExcelButton}>
                        <Button
                            sx={{
                                backgroundColor: colors.blueAccent[700],
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
                            hideToolbar: true,
                            fields: [
                                'activity_id',
                                'activity_code',
                                'activity_name',
                                'organizer',
                                'start_date',
                                'participant_count',
                            ],
                            fileName: 'studentactivities',
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

export default StudentActivities
