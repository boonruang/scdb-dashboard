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
import BarChartFarmer from "../../components/BarChartFarmer"
import BarChartFarmergroup from "../../components/BarChartFarmergroup"
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
import BarChartCollaborativefarm from 'components/BarChartCollaborativefarm'

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
                <Box
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
                            จำนวนผลงานวิชาการ
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboardReducer?.result?.farmersummary && <BarChartFarmer isDashboard={true} data={dashboardReducer?.result?.farmersummary} />}
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
                            จำนวนผลงานตีพิมพ์ภายในประเทศ
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboardReducer?.result?.farmersummary && <BarChartFarmergroup isDashboard={true} data={dashboardReducer?.result?.farmersummary} />}
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
                            จำนวนผลงานตีพิมพ์ต่างประเทศ
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboardReducer?.result?.farmersummary && <BarChartCollaborativefarm isDashboard={true} data={dashboardReducer?.result?.farmersummary} />}
                        </Box>
                    </Box>                     
                </Box>

                {/* TRANSACTION */}

                {/* TRANSACTION2 โดย สสจ */}
                    
                <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="30px"
                >
                <Typography variant="h5" fontWeight="600">
                นิสิต
                </Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt="25px"
                >
                    <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.studentPercent}/>
                    <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    sx={{ mt: "15px" }}
                    >
                    {dashboardReducer.result && dashboardReducer.result.student}
                    </Typography>
                    <Typography>{dashboardReducer.result && (dashboardReducer.result.studentPercent*100).toFixed(0) + '%'}</Typography>
                </Box>
                </Box>
                <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="30px"
                >
                <Typography variant="h5" fontWeight="600">
                บุคลากร
                </Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt="25px"
                >
                    <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.staffPercent}/>
                    <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    sx={{ mt: "15px" }}
                    >
                    {dashboardReducer.result && dashboardReducer.result.staff}
                    </Typography>
                    <Typography>{dashboardReducer.result && (dashboardReducer.result.staffPercent*100).toFixed(0) + '%'}</Typography>
                </Box>
                </Box>

                {/* ROW 3 */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant='h5' fontWeight="600">
                        ผู้ใช้งานระบบ
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.userPercent}/>
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {dashboardReducer.result && dashboardReducer.result.user}
                        </Typography>
                        <Typography>{dashboardReducer.result && (dashboardReducer.result.userPercent*100).toFixed(0) + '%'}</Typography>
                    </Box>
                </Box>

            </Box>
        </Box >
    )
}

export default Dashbaord