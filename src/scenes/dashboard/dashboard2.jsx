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
import { getDashboard } from 'actions/dashboard2.action'
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

    const dashboard2Reducer = useSelector((state) => state.app.dashboard2Reducer)

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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.amountDept}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.amountBachelor}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.amountMaster}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.amountPhd}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentStat }
                        subtitle="สถิติ"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentStatPercent }
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentStatPercent *100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentMath }
                        subtitle="คณิตศาสตร์"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentMathPercent }
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentMathPercent *100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentChem}
                        subtitle="เคมี"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentChemPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentChemPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentBioChemInno}
                        subtitle="นวัฒกรรมชีวเคมี"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentBioChemInnoPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentBioChemInnoPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentBio}
                        subtitle="ชีววิทยา"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentBioPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentBioPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentMicro}
                        subtitle="จุลชีววิทยา"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentMicroPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentMicroPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentGen}
                        subtitle="พันธุศาสตร์โมเลกุล"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentGenPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentGenPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentPhysic}
                        subtitle="ฟิสิกส์"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentPhysicPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentPhysicPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentApply}
                        subtitle="ประยุกต์"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentApplyPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentApplyPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentApplyEnergy}
                        subtitle="ประยุกต์พลังงาน"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentApplyEnergyPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentApplyEnergyPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentApplyElec}
                        subtitle="ประยุกต์อิเล็กทรอนิกส์"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentApplyElecPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentApplyElecPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentEnergy}
                        subtitle="พลังงาน"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentEnergyPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentEnergyPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentPhysicEdu}
                        subtitle="กศ.บ.ฟิสิกส์"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentPhysicEduPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentPhysicEduPercent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentPhysic21}
                        subtitle="ฟิสิกส์ 2.1"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentPhysic21Percent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentPhysic21Percent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentPhysic22}
                        subtitle="ฟิสิกส์ 2.2"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentPhysic22Percent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentPhysic22Percent*100).toFixed(0) + '%'}
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
                        title={dashboard2Reducer.result && dashboard2Reducer.result.studentTotal}
                        subtitle="รวม"
                        progress={dashboard2Reducer.result && dashboard2Reducer.result.studentTotalPercent}
                        increase={dashboard2Reducer.result && (dashboard2Reducer.result.studentTotalPercent*100).toFixed(0) + '%'}
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