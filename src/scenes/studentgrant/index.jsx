import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import AddIcon from '@mui/icons-material/Add';
import { getStudentgrant, deleteStudentgrant } from '../../actions/studentgrant.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'

const Studentgrants = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [rowId, setRowId] = useState(null)

    const message = 'กรุณายืนยันการลบข้อมูล'

    useEffect(() => {
        dispatch(getStudentgrant())
    }, [dispatch])

    const { result, isFetching } = useSelector((state) => state.app.studentgrantReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)

    const DeleteFunction = () => {
        dispatch(deleteStudentgrant(rowId))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        setRowId(state.row.grant_id)
        setOpen(true)
    }

    const handleAddButton = () => {
        navigate('/studentgrant/add')
    };

    const ExportExcelButton = () => {
      var rows = (result || []).map(function(r) {
        var s = r.Student || {}
        return {
          'รหัส': r.grant_id,
          'รหัสนิสิต': s.studentOfficial_id || '',
          'ชื่อ-นามสกุล': (s.firstname || '') + ' ' + (s.lastname || ''),
          'ชื่อทุน': r.grant_name,
          'จำนวนเงิน': r.amount,
          'ประเภททุน': r.grant_type,
          'แหล่งทุน': r.grant_source,
          'สถานะกู้ยืม': r.loan_status,
        }
      })
      var wb = XLSX.utils.book_new()
      var ws = XLSX.utils.json_to_sheet(rows)
      XLSX.utils.book_append_sheet(wb, ws, 'StudentGrant')
      XLSX.writeFile(wb, 'student_grant.xlsx')
    };

    const columns = [
    {
      field: 'student_id',
      headerName: 'รหัสนิสิต',
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (value, row) => {
        var s = row.Student || {}
        return s.studentOfficial_id || row.student_id || ''
      }
    },
    {
      field: 'grant_name',
      headerName: 'ชื่อทุน',
      flex: 2,
      cellClassName: "name-column--cell"
    },
    {
      field: 'amount',
      headerName: 'จำนวนเงิน',
      flex: 1,
      type: 'number'
    },
    {
      field: 'grant_type',
      headerName: 'ประเภททุน',
      flex: 1,
    },
    {
      field: 'grant_source',
      headerName: 'แหล่งทุน',
      flex: 1,
    },
    {
      field: 'loan_status',
      headerName: 'การกู้เงิน (กยศ.)',
      flex: 1,
    },
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
        return (
          <Box>
            <Button
              onClick={() => (navigate('/studentgrant/detail', { state: { row: params.row } }))}
              variant="outlined"
              color="success"
            >
              รายละเอียด
            </Button>

            { loginReducer && loginReducer.result && loginReducer.result.roles && loginReducer.result.roles.find((role) => [ROLES.Admin, ROLES.Editor].includes(role))
                ? <Button
                onClick={() => (navigate('/studentgrant/edit', { state: { row: params.row } }))}
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
            <Header title="ข้อมูลทุนการศึกษา" subtitle="รายการข้อมูลทุนการศึกษา" />
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
                                'grant_id',
                                'student_id',
                                'grant_name',
                                'amount',
                                'grant_type',
                                'loan_status',
                            ],
                            fileName: 'studentgrants',
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

export default Studentgrants
