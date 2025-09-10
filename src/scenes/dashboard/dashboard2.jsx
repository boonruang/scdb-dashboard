import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from "../../theme"
import Header from '../../components/Header'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import ParkIcon from '@mui/icons-material/Park';
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
import StatBoxStudent from "../../components/StatBoxStudent"
import ProgressCircle from "../../components/ProgressCircle"
import { useDispatch, useSelector } from 'react-redux'
import { getDashboard } from 'actions/dashboard.action'
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

    const dashboardReducer = useSelector((state) => state.app.dashboardReducer)

    return (
        <Box m="20px">
            <Box
                display="flex" justifyContent="space-between"
                alignItems="center"
            >
                <Header title="แดชบอร์ดข้อมูลด้านนิสิต" subtitle=""/>

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
                    <StatBoxStudent
                        title={dashboardReducer.result && dashboardReducer.result.amountDept}
                        subtitle="ภาควิชา"
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
                    <StatBoxStudent
                        title={dashboardReducer.result && dashboardReducer.result.amountBachelor}
                        subtitle="หลักสูตร ป.ตรี"
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
                    <StatBoxStudent
                        title={dashboardReducer.result && dashboardReducer.result.amountMaster}
                        subtitle="หลักสูตร ป.โท"
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
                    <StatBoxStudent
                        title={dashboardReducer.result && dashboardReducer.result.amountPhd}
                        subtitle="หลักสูตร ป.เอก"
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

                {/* END ROW 1 */}

              {/* ROW 2 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={dashboardReducer.result && dashboardReducer.result.studentStat }
                        subtitle="สถิติ"
                        progress={dashboardReducer.result && dashboardReducer.result.studentStatPercent }
                        increase={dashboardReducer.result && (dashboardReducer.result.studentStatPercent *100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentMath }
                        subtitle="คณิตศาสตร์"
                        progress={dashboardReducer.result && dashboardReducer.result.studentMathPercent }
                        increase={dashboardReducer.result && (dashboardReducer.result.studentMathPercent *100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentChem}
                        subtitle="เคมี"
                        progress={dashboardReducer.result && dashboardReducer.result.studentChemPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentChemPercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentBioChemInno}
                        subtitle="นวัฒกรรมชีวเคมี"
                        progress={dashboardReducer.result && dashboardReducer.result.studentBioChemInnoPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentBioChemInnoPercent*100).toFixed(0) + '%'}
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

                {/* END ROW 2 */}                

                {/* ROW 3 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={dashboardReducer.result && dashboardReducer.result.studentBio}
                        subtitle="ชีววิทยา"
                        progress={dashboardReducer.result && dashboardReducer.result.studentBioPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentBioPercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentMicro}
                        subtitle="จุลชีววิทยา"
                        progress={dashboardReducer.result && dashboardReducer.result.studentMicroPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentMicroPercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentGen}
                        subtitle="พันธุศาสตร์โมเลกุล"
                        progress={dashboardReducer.result && dashboardReducer.result.studentGenPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentGenPercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentPhysic}
                        subtitle="ฟิสิกส์"
                        progress={dashboardReducer.result && dashboardReducer.result.studentPhysicPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentPhysicPercent*100).toFixed(0) + '%'}
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

                {/* END ROW 3 */}

              {/* ROW 4 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={dashboardReducer.result && dashboardReducer.result.studentApply}
                        subtitle="ประยุกต์"
                        progress={dashboardReducer.result && dashboardReducer.result.studentApplyPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentApplyPercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentApplyEnergy}
                        subtitle="ประยุกต์พลังงาน"
                        progress={dashboardReducer.result && dashboardReducer.result.studentApplyEnergyPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentApplyEnergyPercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentApplyElec}
                        subtitle="ประยุกต์อิเล็กทรอนิกส์"
                        progress={dashboardReducer.result && dashboardReducer.result.studentApplyElecPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentApplyElecPercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentEnergy}
                        subtitle="พลังงาน"
                        progress={dashboardReducer.result && dashboardReducer.result.studentEnergyPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentEnergyPercent*100).toFixed(0) + '%'}
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

                {/* END ROW 4 */} 
                
              {/* ROW 5 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={dashboardReducer.result && dashboardReducer.result.studentPhysicEdu}
                        subtitle="กศ.บ.ฟิสิกส์"
                        progress={dashboardReducer.result && dashboardReducer.result.studentPhysicEduPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentPhysicEduPercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentPhysic21}
                        subtitle="ฟิสิกส์ 2.1"
                        progress={dashboardReducer.result && dashboardReducer.result.studentPhysic21Percent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentPhysic21Percent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentPhysic22}
                        subtitle="ฟิสิกส์ 2.2"
                        progress={dashboardReducer.result && dashboardReducer.result.studentPhysic22Percent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentPhysic22Percent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.studentTotal}
                        subtitle="รวม"
                        progress={dashboardReducer.result && dashboardReducer.result.studentTotalPercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.studentTotalPercent*100).toFixed(0) + '%'}
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

                {/* END ROW 5 */} 

            </Box>
        </Box >
    )
}

export default Dashbaord