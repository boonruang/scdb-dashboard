import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from "../../theme"
import Header from '../../components/Header'
import { mockTransactions } from "../../data/mockData"
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
import LineChart from "../../components/LineChart"
// import BarChart from "../../components/BarChart"
import BarChartAllFarmer from "../../components/BarChartAllFarmer"
import BarChartAcademic from "../../components/BarChartAcademic"
import BarChartPublicationScopus from "../../components/BarChartPublicationScopus"
import BarChartPublicationIsi from "../../components/BarChartPublicationIsi"
import BarChartPublishedDomestic from "../../components/BarChartPublishedDomestic"
import BarChartPublishedInter from "../../components/BarChartPublishedInter"
import BarChartStudent from "../../components/BarChartStudent"
import BarChartStaff from "../../components/BarChartStaff"
import BarChartTeacher from "../../components/BarChartTeacher"
import GeographyChart from "../../components/GeographyChart"
import PieChart from "../../components/PieChart"
import StatBox from "../../components/StatBox"
import ProgressCircle from "../../components/ProgressCircle"
import { useDispatch, useSelector } from 'react-redux'
// import { getHerbalPrice } from 'actions/herbalprice.action';
// import { getHerbalsPricelist } from 'actions/herbal.action';
// import { getHerbalPriceyear } from 'actions/herbalpriceyear.action';
import { getDashboard } from 'actions/dashboard.action'
import ProgressCircleCal from 'components/ProgressCircleCal'
// import BarChartCollaborativefarm from 'components/BarChartCollaborativefarm'

let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth()+1;
let year = newDate.getFullYear();

const Dashbaord = () => {

    const dispatch = useDispatch()

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    useEffect(() => {
        dispatch(getDashboard())
    },[dispatch])

    const dashboardReducer = useSelector((state) => state.app.dashboardReducer)

    return (
        <Box m="20px">
            <Box
                display="flex" justifyContent="space-between"
                alignItems="center"
            >
                <Header title="แดชบอร์ด" subtitle="แดชบอร์ดแสดงช้อมูล" />

            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                {/* <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={dashboardReducer.result && dashboardReducer.result.student}
                        subtitle="จำนวนนิสิต"
                        progress={dashboardReducer.result && dashboardReducer.result.studentPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentPercent*100).toFixed(0) + '%'}
                        icon={
                            <GrassIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px"
                                }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={dashboardReducer.result && dashboardReducer.result.staff}
                        subtitle="จำนวนบุคลากร"
                        progress={dashboardReducer.result && dashboardReducer.result.staffPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.staffPercent*100).toFixed(0) + '%'}
                        icon={
                            <PeopleOutlinedIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px"
                                }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={dashboardReducer.result && dashboardReducer.result.user}
                        subtitle="จำนวนผู้ใช้"
                        progress={dashboardReducer.result && dashboardReducer.result.userPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.userPercent*100).toFixed(0) + '%'}
                        icon={
                            <PeopleOutlinedIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px"
                                }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={dashboardReducer.result && dashboardReducer.result.log}
                        subtitle="จำนวน Log"
                        progress={dashboardReducer.result && dashboardReducer.result.logPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.logPercent*100).toFixed(0) + '%'}
                        icon={
                            <WarehouseIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px"
                                }}
                            />
                        }
                    />
                </Box> */}

                {/* END ROW 1 */}

                {/* START ROW 2 */}
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
                            จำนวนผลงานติพิมพ์ฐาน Scopus
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboardReducer?.result?.publicationScopus && <BarChartPublicationScopus isDashboard={true} data={dashboardReducer?.result?.publicationScopus} />}
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
                            จำนวนผลงานติพิมพ์ฐาน ISI(SCIE)
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboardReducer?.result?.publicationISI && <BarChartPublicationIsi isDashboard={true} data={dashboardReducer?.result?.publicationISI} />}
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
                            จำนวนผลงานตีพิมพ์ตามสาขา
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboardReducer?.result?.academicWork && <BarChartPublishedInter isDashboard={true} data={dashboardReducer?.result?.academicWork} />}
                        </Box>
                    </Box>                     
                </Box>

                {/* END ROW 2 */}

                {/* START ROW 3 */}
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
                            จำนวนนิสิต
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboardReducer?.result?.academicWork && <BarChartStudent isDashboard={true} data={dashboardReducer?.result?.academicWork} />}
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
                            จำนวนบุคลากร
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboardReducer?.result?.academicWork && <BarChartStaff isDashboard={true} data={dashboardReducer?.result?.academicWork} />}
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
                            จำนวนอาจารย์
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboardReducer?.result?.academicWork && <BarChartTeacher isDashboard={true} data={dashboardReducer?.result?.academicWork} />}
                        </Box>
                    </Box>                     
                </Box>

                {/* END ROW 3 */}

                {/* START ROW 4 */}
                {/* END ROW 4 */}


            </Box>
        </Box >
    )
}

export default Dashbaord