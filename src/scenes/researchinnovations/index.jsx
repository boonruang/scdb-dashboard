import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getResearchinnovations, deleteResearchinnovation } from "../../actions/researchinnovations.action";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from "../../constants";
import CircularProgress from "@mui/material/CircularProgress";
import * as XLSX from "xlsx";
import IosShareIcon from "@mui/icons-material/IosShare";
import ConfirmBox from "components/ConfirmBox";

const ResearchInnovations = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [rowId, setRowId] = useState(null);


    useEffect(() => {
        dispatch(getResearchinnovations());
    }, [dispatch]);

    const { result, isFetching } = useSelector(
        (state) => state.app.researchinnovationReducer
    );

    const loginReducer = useSelector((state) => state.app.loginReducer);


    const DeleteFunction = () => {
        dispatch(deleteResearchinnovation(rowId))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        // console.log('state',state)
        // console.log('row.id',state.row.id)
        setRowId(state.row.id)
        setOpen(true)
        // dispatch(deleteFarmer(state.row.id))
    }

    const handleAddButton = () => {
        navigate("/researchinnovations/add");
    };

    const ExportExcelButton = () => {
        // console.log('Data to export: ',result)
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(result);

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "researchinnovation.xlsx");
    };

    const columns = [
        {
            field: "id",
            headerName: "ลำดับ",
            headerAlign: "center",
            flex: 0.2,
            align: "center",
        },
        {
            field: "researchname",
            headerName: "ผลงานวิจัย",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "researcher",
            headerName: "ผู้วิจัย",
            flex: 0.3,
            cellClassName: "name-column--cell",
        },
        {
            field: "position",
            headerName: "ตำแหน่งทางวิชาการ",
            flex: 0.5,
            cellClassName: "name-column--cell",
        },
        {
            field: "organization",
            headerName: "หน่วยงาน",
            flex: 0.5,
            cellClassName: "name-column--cell",
        },
        {
            field: "herbal",
            headerName: "ชื่อสมุนไพรที่วิจัย",
            flex: 0.5,
            cellClassName: "name-column--cell",
        },
        {
            field: "researchtype",
            headerName: "ประเภทการตีพิมพ์",
            flex: 0.5,
            cellClassName: "name-column--cell",
        },
        {
            field: "journal",
            headerName: "วารสาร",
            flex: 0.5,
            cellClassName: "name-column--cell",
        },
        {
            field: "publishyear",
            headerName: "เผยแพร่",
            flex: 0.4,
            cellClassName: "name-column--cell",
        },
        {
            field: "actions",
            headerName: "ดำเนินการ",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box>
                    <Button
                        //   onClick={handleButtonDetail(params.row.id)}
                        //   onClick={() => (navigate('/farmers/detail/'+params.row.id))}
                        //   onClick={() => (navigate('/farmers/detail',  { state: { id: params.row.id }} ))}
                        onClick={() => navigate("/researchinnovations/detail", { state: { row: params.row } })}
                        variant="outlined"
                        color="success"
                    >
                        รายละเอียด
                    </Button>
                    {/* <Link to={"/farmers/detail/" + params.row.id}>
                                <button className="viewButton">View</button>
                    </Link> */}

                    {loginReducer?.result?.roles?.find((role) =>
                    [ROLES.Admin, ROLES.Editor].includes(role)
                    ) ? (
                    <Button
                    onClick={() => navigate("/researchinnovations/edit", { state: { row: params.row } })}
                        variant="outlined"
                        color="info"
                        sx={{ ml: 1 }}
                    >
                        แก้ไข
                    </Button>
                    ) : undefined}

                    {loginReducer?.result?.roles?.find((role) =>
                        [ROLES.Admin, ROLES.Editor].includes(role)
                        ) ? (
                        <Button
                        onClick={() => handleDeleteClick({ state: { row: params.row }})}
                            variant="outlined"
                        color="error"
                        sx={{ ml: 1 }}
                        >
                            ลบ
                        </Button>
                        ) : undefined}
            </Box>
            );
            },
        },
    ];

    return (
        <Box m="20px">
        <Header title="งานวิจัยและนวัตกรรม" />
        <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
            "& .MuiDataGrid-root": {
                // border: "none"
                border: 1,
                borderColor: colors.greenAccent[500],
            },
            "& .MuiDataGrid-cell": {
                boderBottom: "none",
            },
            "& .name-column--cell": {
                color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeader": {
                borderBottom: "none",
                backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-virtualScroller": {
                // backgroundColor: colors.primary[400]
            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                // backgroundColor: colors.yellowAccent[700],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
            },
            }}
        >
            <Box display="flex" justifyContent="end">
            {loginReducer?.result?.roles?.find((role) =>
                [ROLES.Admin, ROLES.Editor].includes(role)
            ) ? (
                <Box display="flex" justifyContent="end" onClick={handleAddButton}>
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
                    "&:hover": { backgroundColor: colors.greenAccent[800] },
                    }}
                >
                    <AddIcon sx={{ mr: "10px" }} />
                    เพิ่มข้อมูล
                </Button>
                </Box>
            ) : undefined}

            {loginReducer?.result?.roles?.find((role) =>
                [ROLES.Admin, ROLES.Editor].includes(role)
            ) ? (
                <Box
                display="flex"
                justifyContent="end"
                onClick={ExportExcelButton}
                >
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
                    "&:hover": { backgroundColor: colors.blueAccent[800] },
                    }}
                >
                    <IosShareIcon sx={{ mr: "10px" }} />
                    ส่งออกไฟล์ Excel
                </Button>
                </Box>
            ) : undefined}
            </Box>

            {isFetching && (
            <Box
                height="65vh"
                sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
            )}
            { result ?
            <DataGrid
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        csvOptions: { disableToolbarButton: true },
                        printOptions: {
                            disableToolbarButton: false,
                            hideFooter: true,
                            hideToolbar: true,
                            fields: [
                                "id",
                                "researcher",
                                "organization",
                                "herbal",
                                "journal",
                                "publishyear",
                            ],
                            fileName: "researchinnovation",
                        },
                    },
                }}
                rows={result}
                loading={isFetching}
                columns={columns}
                autoPageSize
            /> : undefined }
        </Box>
        <ConfirmBox
            open={open}
            closeDialog={() => setOpen(false)}
            deleteFunction={() => DeleteFunction()}
            message={"กรุณายืนยันการลบข้อมูล"}
            title={rowId}
        />
        </Box>
    );
};

export default ResearchInnovations;
