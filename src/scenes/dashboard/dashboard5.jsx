import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from "../../theme"
import Header from '../../components/Header'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import ParkIcon from '@mui/icons-material/Park';
import GrassIcon from '@mui/icons-material/Grass';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import PointOfSaleIcon from "@mui/icons-material/PointOfSale"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import TrafficIcon from "@mui/icons-material/Traffic"
import BarChartAcademic from "../../components/BarChartAcademic"
import BarChartPublicationScopus from "../../components/BarChartPublicationScopus"
import BarChartPublicationIsi from "../../components/BarChartPublicationIsi"
import BarChartPublishedDomestic from "../../components/BarChartPublishedDomestic"
import BarChartPublishedInter from "../../components/BarChartPublishedInter"
import BarChartPlanProject from "../../components/BarChartPlanProject"
import BarChartProjectDept from "../../components/BarChartProjectDept"
import BarChartPlanBudget from "../../components/BarChartPlanBudget"
import BarChartStudent from "../../components/BarChartStudent"
import BarChartStaff from "../../components/BarChartStaff"
import BarChartTeacher from "../../components/BarChartTeacher"
import StatBox from "../../components/StatBox"
import ProgressCircle from "../../components/ProgressCircle"
import { useDispatch, useSelector } from 'react-redux'
import { getDashboard } from 'actions/dashboard5.action'
import ProgressCircleCal from 'components/ProgressCircleCal'

let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth()+1;
let year = newDate.getFullYear();


const currentYear = new Date().getFullYear();

const Dashbaord = () => {

    const dispatch = useDispatch()

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    useEffect(() => {
        dispatch(getDashboard())
    },[dispatch])

    const dashboard5Reducer = useSelector((state) => state.app.dashboard5Reducer)

    return (
        <Box m="20px">
            <Box
                display="flex" justifyContent="space-between"
                alignItems="center"
            >
                <Header title="แดชบอร์ดข้อมูลด้านแผนและงบประมาณ" subtitle=""/>

            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >


                <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="30px"
                >
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                    >
                        <Typography
                            variant='h5'
                            fontWeight="600"
                            sx={{ p: "30px 30px 0 30px" }}
                        >
                            จำนวนโครงการปี {currentYear}
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboard5Reducer?.result?.planProject && <BarChartPlanProject isDashboard={true} data={dashboard5Reducer?.result?.planProject} />}
                        </Box>
                    </Box>                     
                </Box>

                <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="30px"
                >
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                    >
                        <Typography
                            variant='h5'
                            fontWeight="600"
                            sx={{ p: "30px 30px 0 30px" }}
                        >
                            การใช้งบประมาณปี {currentYear}
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboard5Reducer?.result?.planBudget && <BarChartPlanBudget isDashboard={true} data={dashboard5Reducer?.result?.planBudget} />}
                        </Box>
                    </Box>                     
                </Box>

 
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant='h5'
                        fontWeight="600"
                        sx={{ p: "30px 30px 0 30px" }}
                    >
                        โครงการแต่ละสาขาตามไตรมาศปี {currentYear}
                    </Typography>
                    <Box
                        height="250px"
                        mt="-25px"
                    >
                        {dashboard5Reducer?.result?.projectDeptbyQuater && <BarChartProjectDept isDashboard={true} data={dashboard5Reducer?.result?.projectDeptbyQuater} />}
                    </Box>
                </Box>                


            </Box>
        </Box >
    )
}

export default Dashbaord