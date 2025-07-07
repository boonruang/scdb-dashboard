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
import BarChart from "../../components/BarChart"
import GeographyChart from "../../components/GeographyChart"
import PieChart from "../../components/PieChart"
import StatBox from "../../components/StatBox"
import ProgressCircle from "../../components/ProgressCircle"
import { useDispatch, useSelector } from 'react-redux'
import { getHerbalPrice } from 'actions/herbalprice.action';
import { getHerbalPriceyear } from 'actions/herbalpriceyear.action';
import { getDashboard } from 'actions/dashboard.action'

let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth()+1;
let year = newDate.getFullYear();

const Dashbaord = () => {

    const dispatch = useDispatch()

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [years, setYears] = useState('2015-2024')
    const [hearbals, setHerbals] = useState('กระเทียมแห้ง มัดจุก หัวใหญ่,หอมแดงศรีสะเกษ มัดจุก หัวใหญ่,กระเจี๊ยบแห้ง,พริกไทยดำ อย่างดี')

    useEffect(() => {
        dispatch(getDashboard())
    },[dispatch])

    useEffect(() => {
        dispatch(getHerbalPrice())
    },[dispatch])

    useEffect(() => {
        dispatch(getHerbalPriceyear(years,hearbals))
    },[dispatch,years,hearbals])

    const { result } = useSelector((state) => state.app.herbalpriceReducer)
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

                {/* <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.greenAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px"
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        ดาวน์โหลด รายงาน
                    </Button>
                </Box> */}
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
                        title={dashboardReducer.result && dashboardReducer.result.marketplace}
                        subtitle="จำนวนตลาดรับซื้อผลผลิต"
                        progress={dashboardReducer.result && dashboardReducer.result.marketplacepercent}
                        increase={dashboardReducer.result && (dashboardReducer.result.marketplacepercent*100).toFixed(0) + '%'}
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
                <Box
                    gridColumn="span 8"
                    gridRow="span 4"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                สถิติราคาสมุนไพร (กรมการค้าภายใน)
                            </Typography>
                        </Box>

                        {/* <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box> */}
                    </Box>

                    {/* <Box height="250px" mt="-20px"> */}
                    <Box height="500px" mt="-20px">
                        {herbalpriceyearReducer.result ? <LineChart isDashboard={true} data={herbalpriceyearReducer.result} />
                        : undefined}
                    </Box>
                </Box>

                {/* TRANSACTION */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 4"
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
                            ราคาขายปลีกเฉลี่ย (ตลาดศรีเมือง ตลาดสี่มุมเมือง ตลาดไทย)
                        </Typography>
                    </Box>
                    {result && Object.values(result).map(item => (
                        <Box
                            key={item.id}
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
                                    {item.name}
                                </Typography>
                                <Typography
                                    color={colors.grey[100]}
                                >
                                    {item.unit}
                                </Typography>
                            </Box>
                            {/* <Box color={colors.grey[100]}>{transaction.date}</Box> */}
                            <Box color={colors.grey[100]}>{item.date}</Box>
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

                {/* ROW 3 */}
                {/* <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant='h5' fontWeight="600">
                        กิจกรรมการตลาด
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" />
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            50,558,352 การสร้างรายได้
                        </Typography>
                        <Typography>รวมค่าดำเนินการและค่าบริหาร</Typography>
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
                        ยอดขาย
                    </Typography>
                    <Box
                        height="250px"
                        mt="-25px"
                    >
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>

                <Box
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