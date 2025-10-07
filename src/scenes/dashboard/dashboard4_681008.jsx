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
import BarChartStudent from "../../components/BarChartStudent"
import BarChartStaff from "../../components/BarChartStaff"
import BarChartTeacher from "../../components/BarChartTeacher"
import StatBox from "../../components/StatBox"
import ProgressCircle from "../../components/ProgressCircle"
import { useDispatch, useSelector } from 'react-redux'
import { getDashboard } from 'actions/dashboard4.action'
import ProgressCircleCal from 'components/ProgressCircleCal'

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

    const dashboard4Reducer = useSelector((state) => state.app.dashboard4Reducer)

    return (
        <Box m="20px">
            <Box
                display="flex" justifyContent="space-between"
                alignItems="center"
            >
                <Header title="แดชบอร์ดข้อมูลด้านวิจัย" subtitle=""/>

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
                        title={dashboard4Reducer.result && dashboard4Reducer.result.student}
                        subtitle="จำนวนนิสิต"
                        progress={dashboard4Reducer.result && dashboard4Reducer.result.studentPercent}
                        increase={dashboard4Reducer.result && (dashboard4Reducer.result.studentPercent*100).toFixed(0) + '%'}
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
                        title={dashboard4Reducer.result && dashboard4Reducer.result.staff}
                        subtitle="จำนวนบุคลากร"
                        progress={dashboard4Reducer.result && dashboard4Reducer.result.staffPercent}
                        increase={dashboard4Reducer.result && (dashboard4Reducer.result.staffPercent*100).toFixed(0) + '%'}
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
                        title={dashboard4Reducer.result && dashboard4Reducer.result.user}
                        subtitle="จำนวนผู้ใช้"
                        progress={dashboard4Reducer.result && dashboard4Reducer.result.userPercent}
                        increase={dashboard4Reducer.result && (dashboard4Reducer.result.userPercent*100).toFixed(0) + '%'}
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
                        title={dashboard4Reducer.result && dashboard4Reducer.result.log}
                        subtitle="จำนวน Log"
                        progress={dashboard4Reducer.result && dashboard4Reducer.result.logPercent}
                        increase={dashboard4Reducer.result && (dashboard4Reducer.result.logPercent*100).toFixed(0) + '%'}
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
                            {dashboard4Reducer?.result?.publicationScopus && <BarChartPublicationScopus isDashboard={true} data={dashboard4Reducer?.result?.publicationScopus} />}
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
                            {dashboard4Reducer?.result?.publicationISI && <BarChartPublicationIsi isDashboard={true} data={dashboard4Reducer?.result?.publicationISI} />}
                        </Box>
                    </Box>                     
                </Box>
                {/* <Box
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
                            {dashboard4Reducer?.result?.academicWork && <BarChartPublishedInter isDashboard={true} data={dashboard4Reducer?.result?.academicWork} />}
                        </Box>
                    </Box>                     
                </Box> */}

                {/* END ROW 2 */}

                START TABLE1
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`2px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography
                            color={colors.grey[100]}
                            variant='h5'
                            fontWeight="600"
                        >
                            ปี 2025
                        </Typography>
                    </Box>
                        {dashboard4Reducer?.result?.publicationTable &&
                        Object.values(dashboard4Reducer?.result?.publicationTable).map((item, key) => (
                            <Box
                            key={key}
                            display="flex"
                            sx={{ m: 1 }}
                            >
                            {/* description */}
                            <Box sx={{ width: "220px" }}>
                                <Typography
                                color={colors.greenAccent[500]}
                                variant="h5"
                                fontWeight="600"
                                >
                                {item.description}
                                </Typography>
                            </Box>

                            {/* amount */}
                            <Box sx={{ width: "100px" }} color={colors.grey[100]}>
                                {item.amount}
                            </Box>

                            {/* target */}
                            <Box sx={{ width: "200px" }} color={colors.grey[100]}>
                                (เป้าหมาย {item.target})
                            </Box>

                            {/* remark */}
                            <Box sx={{ flex: 1 }} color={colors.grey[100]}>
                                {item.remark}
                            </Box>
                            </Box>
                        ))}
                </Box>

                {/* END TABLE1 */}                

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
                            จำนวนผลงานวิชาการ
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboard4Reducer?.result?.academicWork && <BarChartAcademic isDashboard={true} data={dashboard4Reducer?.result?.academicWork} />}
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
                            {dashboard4Reducer?.result?.academicWork && <BarChartPublishedDomestic isDashboard={true} data={dashboard4Reducer?.result?.academicWork} />}
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
                            {dashboard4Reducer?.result?.academicWork && <BarChartPublishedInter isDashboard={true} data={dashboard4Reducer?.result?.academicWork} />}
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