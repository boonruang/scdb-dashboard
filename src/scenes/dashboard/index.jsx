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
import { getHerbalPrice } from 'actions/herbalprice.action';
import { getHerbalsPricelist } from 'actions/herbal.action';
import { getHerbalPriceyear } from 'actions/herbalpriceyear.action';
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

    const [years, setYears] = useState('2015-2025')
    const [hearbals, setHerbals] = useState('กระเทียมแห้ง มัดจุก หัวใหญ่,หอมแดงศรีสะเกษ มัดจุก หัวใหญ่,กระเจี๊ยบแห้ง,พริกไทยดำ อย่างดี')

    useEffect(() => {
        dispatch(getDashboard())
    },[dispatch])

    useEffect(() => {
        dispatch(getHerbalPrice())
    },[dispatch])

    useEffect(() => {
        dispatch(getHerbalsPricelist())
    },[dispatch])

    useEffect(() => {
        dispatch(getHerbalPriceyear(years,hearbals))
    },[dispatch,years,hearbals])

    const { result } = useSelector((state) => state.app.herbalpriceReducer)
    const herbalReducer = useSelector((state) => state.app.herbalReducer)
    const herbalpriceyearReducer = useSelector((state) => state.app.herbalpriceyearReducer)
    const dashboardReducer = useSelector((state) => state.app.dashboardReducer)

    // if (result) {
    //     console.log('herbalPrice', result)
    // }

    // useEffect(() => {
    //     setHerbalPriceData(result)
    // },[result])

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
                        title={dashboardReducer.result && dashboardReducer.result.herbal}
                        subtitle="จำนวนสมุนไพร"
                        progress={dashboardReducer.result && dashboardReducer.result.herbalpercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.herbalpercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.farmer}
                        subtitle="จำนวนเกษตรกร"
                        progress={dashboardReducer.result && dashboardReducer.result.farmerpercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.farmerpercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.farmergroup}
                        subtitle="จำนวนกลุ่มเกษตรกร"
                        progress={dashboardReducer.result && dashboardReducer.result.farmergrouppercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.farmergrouppercent*100).toFixed(0) + '%'}
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
                        title={dashboardReducer.result && dashboardReducer.result.collaborativefarm}
                        subtitle="จำนวนกลุ่มเกษตรกรแปลงใหญ่"
                        progress={dashboardReducer.result && dashboardReducer.result.collaborativefarmpercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.collaborativefarmpercent*100).toFixed(0) + '%'}
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

                {/* ROW 2 */}
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
                            จำนวนเกษตรกร กลุ่มเกษตรกร และเกษตรกรแปลงใหญ่
                        </Typography>
                        <Box
                            height="250px"
                            mt="-25px"
                        >
                            {dashboardReducer?.result?.farmersummary && <BarChartAllFarmer isDashboard={true} data={dashboardReducer?.result?.farmersummary} />}
                        </Box>
                    </Box>                     

                </Box> */}
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
                            จำนวนเกษตรกร
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
                            จำนวนกลุ่มเกษตรกร
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
                            จำนวนกลุ่มเกษตรกรแปลงใหญ่
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
                        <Box>
                            <Typography
                                color={colors.grey[100]}
                                variant='h5'
                                fontWeight="600"
                            >
                                ราคาขายปลีกเฉลี่ย(ตลาดศรีเมือง ตลาดสี่มุมเมือง ตลาดไทย) 
                            </Typography>
                            <Typography
                                color={colors.grey[100]}
                                variant='h5'
                                fontWeight="600"
                            >
                                ประจำวันที่ {result && result[0].date}
                            </Typography>                            
                            {/* <Typography
                                        color={colors.greenAccent[500]}
                                        variant='h6'
                                        fontWeight="500"
                                    >
                                        {result && result[0].date}
                            </Typography>                         */}
                        </Box>
                    </Box>
                    <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`2px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography
                                    color={colors.greenAccent[500]}
                                    variant='h5'
                                    fontWeight="600"
                                >
                                    สมุนไพร
                                </Typography>
                            </Box>
                            {/* <Box color={colors.grey[100]}>{item.date}</Box> */}
                            <Box display="flex" flexDirection="row">
                            <Typography
                                    color={colors.greenAccent[500]}
                                    variant='h5'
                                    fontWeight="600"
                                >
                                    {result && result[0].unit}
                                </Typography>
                             </Box>                             
                    </Box>                    
                    {result && Object.values(result).map(item => (
                        <Box
                            key={item.id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`2px solid ${colors.primary[500]}`}
                            p="10px"
                            pl="30px"
                            pr="30px"
                        >
                            <Box>
                                <Typography
                                     color={colors.grey[100]}
                                    variant='h5'
                                    fontWeight="500"
                                >
                                    {item.name}
                                </Typography>
                                {/* <Typography
                                    color={colors.grey[100]}
                                >
                                    {item.unit}
                                </Typography> */}
                            </Box>
                            {/* <Box color={colors.grey[100]}>{item.date}</Box> */}
                            <Box display="flex" flexDirection="row">
                                <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                                    {item.price}
                                </Box>
                                {/* <Box>
                                    <IconButton>
                                        {transaction.cost > 80 ? <UploadOutlinedIcon /> : <DownloadOutlinedIcon />}
                                    </IconButton>
                                </Box> */}
                             </Box>                             
                        </Box>
                    ))}
                </Box>

                {/* TRANSACTION2 โดย สสจ */}
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
                        <Box>
                            <Typography
                                color={colors.grey[100]}
                                variant='h5'
                                fontWeight="600"
                            >
                                ราคาสมุนไพร(ข้อมูล สสจ.) 
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`2px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography
                                    color={colors.greenAccent[500]}
                                    variant='h5'
                                    fontWeight="600"
                                >
                                    สมุนไพร
                                </Typography>
                            </Box>
                            {/* <Box color={colors.grey[100]}>{item.date}</Box> */}
                            <Box display="flex" flexDirection="column" textAlign="center">
                                <Box>
                                    <Typography
                                        color={colors.greenAccent[500]}
                                        variant='h5'
                                        fontWeight="600"
                                    >
                                        ราคา/กิโลกรัม
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box>
                                        <Typography
                                            color={colors.greenAccent[500]}
                                            variant='h6'
                                            fontWeight="400"
                                        >
                                            ราคาวัดถุดิบ  ราคาแปรรูป
                                        </Typography>
                                    </Box>
                                    {/* <Box>
                                        <Typography
                                            color={colors.greenAccent[500]}
                                            variant='h6'
                                            fontWeight="400"
                                            MuiTypography-alignCenter
                                        >
                                            ราคาแปรรูปเบื้องต้น
                                        </Typography>
                                    </Box> */}
                                </Box>
                            </Box>                             
                    </Box>                    
                    {herbalReducer.result && Object.values(herbalReducer.result).map(item => (
                        <Box
                            key={item.id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`2px solid ${colors.primary[500]}`}
                            p="10px"
                            pl="30px"
                            pr="30px"
                        >
                            <Box>
                                <Typography
                                     color={colors.grey[100]}
                                    variant='h5'
                                    fontWeight="500"
                                >
                                    {item.herbalname}
                                </Typography>
                            </Box>
                            <Box display="flex" flexDirection="row">
                                <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                                    {item.rawprice}
                                </Box>
                                <Box backgroundColor={colors.blueAccent[500]} p="5px 10px" ml="10px" borderRadius="4px">
                                    {item.productprice}
                                </Box>
                             </Box>                             
                        </Box>
                    ))}
                </Box>
               
                <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="30px"
                >
                <Typography variant="h5" fontWeight="600">
                ปราชญ์สมุนไพร
                </Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt="25px"
                >
                    <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.philosopherpercent}/>
                    <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    sx={{ mt: "15px" }}
                    >
                    {dashboardReducer.result && dashboardReducer.result.philosopher}
                    </Typography>
                    <Typography>{dashboardReducer.result && (dashboardReducer.result.philosopherpercent*100).toFixed(0) + '%'}</Typography>
                </Box>
                </Box>
                <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="30px"
                >
                <Typography variant="h5" fontWeight="600">
                องค์ความรู้การแพทย์แผนไทย
                </Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt="25px"
                >
                    <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.researchinnovationpercent}/>
                    <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    sx={{ mt: "15px" }}
                    >
                    {dashboardReducer.result && dashboardReducer.result.knowledgebase}
                    </Typography>
                    <Typography>{dashboardReducer.result && (dashboardReducer.result.researchinnovationpercent*100).toFixed(0) + '%'}</Typography>
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
                        <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.userpercent}/>
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {dashboardReducer.result && dashboardReducer.result.user}
                        </Typography>
                        <Typography>{dashboardReducer.result && (dashboardReducer.result.userpercent*100).toFixed(0) + '%'}</Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant='h5' fontWeight="600">
                        ตลาดสมุนไพร
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.marketplacepercent}/>
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {dashboardReducer.result && dashboardReducer.result.marketplace}
                        </Typography>
                        <Typography>{dashboardReducer.result && (dashboardReducer.result.marketplacepercent*100).toFixed(0) + '%'}</Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant='h5' fontWeight="600">
                        งานวิจัยและนวัตกรรม
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.researchinnovationpercent}/>
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {dashboardReducer.result && dashboardReducer.result.researchinnovation}
                        </Typography>
                        <Typography>{dashboardReducer.result && (dashboardReducer.result.researchinnovationpercent*100).toFixed(0) + '%'}</Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant='h5' fontWeight="600">
                        แหล่งแปรรูป
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.outsourcepercent}/>
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {dashboardReducer.result && dashboardReducer.result.outsource}
                        </Typography>
                        <Typography>{dashboardReducer.result && (dashboardReducer.result.outsourcepercent*100).toFixed(0) + '%'}</Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant='h5' fontWeight="600">
                        ผู้ประกอบการผลิตภัณฑ์สมุนไพร
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.entrepreneurherbalpercent}/>
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {dashboardReducer.result && dashboardReducer.result.entrepreneurherbal}
                        </Typography>
                        <Typography>{dashboardReducer.result && (dashboardReducer.result.entrepreneurherbalpercent*100).toFixed(0) + '%'}</Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant='h5' fontWeight="600">
                        ผู้ประกอบการด้านการแพทย์แผนไทย/สมุนไพร
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.entrepreneurmedicalpercent}/>
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {dashboardReducer.result && dashboardReducer.result.entrepreneurmedical}
                        </Typography>
                        <Typography>{dashboardReducer.result && (dashboardReducer.result.entrepreneurmedicalpercent*100).toFixed(0) + '%'}</Typography>
                    </Box>
                </Box>
           
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant='h5' fontWeight="600">
                    โรงงานผู้ผลิตผลิตภัณฑ์สมุนไพร
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircleCal size="125" progress={dashboardReducer.result && dashboardReducer.result.manufacturerpercent}/>
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {dashboardReducer.result && dashboardReducer.result.nanufacturer}
                        </Typography>
                        <Typography>{dashboardReducer.result && (dashboardReducer.result.manufacturerpercent*100).toFixed(0) + '%'}</Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant='h5' fontWeight="600">
                        การเข้าใช้งาน
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircleCal size="125" progress="0"/>
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {dashboardReducer.result && dashboardReducer.result.log}
                        </Typography>
                    </Box>
                </Box>

                {/* <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant='h5'
                        fontWeight="600"
                        sx={{ p: "30px 30px 0 30px" }}
                    >
                        ยอดขาย
                    </Typography>
                    <Box
                        height="250px"
                        mt="-25px"
                    >
                        <BarChart isDashboard={true} />
                    </Box>
                </Box> */}

                {/* <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography
                        variant='h5'
                        fontWeight="600"
                        sx={{ mb: "15px" }}
                    >
                        ยอดขายตามภูมิศาสตร์
                    </Typography>
                    <Box height="200px" >
                        <GeographyChart isDashboard={true} />
                    </Box>
                </Box> */}

                {/*  */}
            </Box>
        </Box >
    )
}

export default Dashbaord