import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from "../../theme"
import Header from '../../components/Header'
import BarChartTecherDept from "../../components/BarChartTecherDept"
import BarChartStudent from "../../components/BarChartStudent"
import BarChartStaff from "../../components/BarChartStaff"
import BarChartTeacher from "../../components/BarChartTeacher"
import BarChartAcademicPosition from "../../components/BarChartAcademicPosition" 
import { useDispatch, useSelector } from 'react-redux'
import { getDashboard } from 'actions/dashboard1.action'

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

    const dashboard1Reducer = useSelector((state) => state.app.dashboard1Reducer)

    return (
        <Box m="20px">
            <Box
                display="flex" justifyContent="space-between"
                alignItems="center"
            >
                <Header title="แดชบอร์ดข้อมูลด้านบุคลากร" subtitle="" />

            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >

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
                            บุคลากรรวม
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboard1Reducer?.result?.academicWork && <BarChartStaff isDashboard={true} data={dashboard1Reducer?.result?.academicWork} />}
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
                            อาจารย์
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboard1Reducer?.result?.academicWork && <BarChartTeacher isDashboard={true} data={dashboard1Reducer?.result?.academicWork} />}
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
                            สายสนับสนุน
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboard1Reducer?.result?.academicWork && <BarChartStudent isDashboard={true} data={dashboard1Reducer?.result?.academicWork} />}
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
                            ตำแหน่งทางวิชากร
                        </Typography>
                        <Box
                            height="245px"
                            mt="-25px"
                        >
                            {dashboard1Reducer?.result?.academicPosition && <BarChartAcademicPosition isDashboard={true} data={dashboard1Reducer?.result?.academicPosition} />}
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
                        ตำแหน่งทางวิชากรตามสาขา
                    </Typography>
                    <Box
                        height="250px"
                        mt="-25px"
                    >
                        <BarChartTecherDept isDashboard={true} />
                    </Box>
                </Box>

                {/* END ROW 3 */}

            </Box>
        </Box >
    )
}

export default Dashbaord