import React, { useState, useEffect } from 'react'
import {
  Box, Typography, useTheme, MenuItem, Select, FormControl,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress
} from '@mui/material'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { httpClient } from '../../utils/HttpClient'
import { server } from '../../constants'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SchoolIcon from '@mui/icons-material/School'

var fmt = function(n) { return (n || 0).toLocaleString('th-TH') }

var KpiCard = function(props) {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  return (
    <Box
      flex="1" minWidth="180px"
      backgroundColor={colors.primary[400]}
      borderRadius="12px" p="20px"
      display="flex" alignItems="center" gap="16px"
    >
      <Box display="flex" alignItems="center" justifyContent="center"
        sx={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: props.iconBg || '#1976d230', flexShrink: 0 }}>
        {props.icon}
      </Box>
      <Box>
        <Typography variant="h3" fontWeight="bold" sx={{ color: colors.grey[100], lineHeight: 1.1 }}>
          {props.value}
          {props.unit && <Typography component="span" variant="h5" sx={{ color: colors.grey[300], ml: '4px' }}>{props.unit}</Typography>}
        </Typography>
        <Typography variant="h6" sx={{ color: colors.greenAccent[400], mt: '4px' }}>{props.label}</Typography>
      </Box>
    </Box>
  )
}

var Dashboard3 = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)

  var [year, setYear] = useState(2567)
  var [years, setYears] = useState([2567])
  var [data, setData] = useState(null)
  var [loading, setLoading] = useState(true)

  var fetchYears = async function() {
    try {
      var res = await httpClient.get(server.DASHBOARD3_URL + '/years')
      if (res.data && res.data.result && res.data.result.length > 0) {
        setYears(res.data.result)
        setYear(res.data.result[0])
      }
    } catch (e) {}
  }

  var fetchData = async function(y) {
    setLoading(true)
    try {
      var res = await httpClient.get(server.DASHBOARD3_URL + '/summary', { params: { year: y } })
      if (res.data && res.data.status === 'ok') setData(res.data.result)
    } catch (e) {}
    setLoading(false)
  }

  useEffect(function() { fetchYears() }, [])
  useEffect(function() { fetchData(year) }, [year])

  var kpi = (data && data.kpi) || {}
  var admissionByDept = (data && data.admissionByDept) || []
  var admissionTrend  = (data && data.admissionTrend) || []
  var studentByDept   = (data && data.studentByDept) || []
  var grantByType     = (data && data.grantByType) || []
  var topDepts        = (data && data.topDepts) || []
  var recentGrantList = (data && data.recentGrantList) || []

  var cardBg = colors.primary[400]
  var thStyle = { backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontWeight: 'bold', fontSize: 13, padding: '8px 12px' }
  var tdStyle = { color: colors.grey[200], fontSize: 13, padding: '8px 12px', borderColor: colors.primary[300] }

  // Nivo bar data
  var barData = admissionByDept.map(function(d) {
    return { dept: d.dept.replace('ภาควิชา', ''), แผนรับ: d.plan, รายงานตัว: d.reported }
  })

  // Nivo line data (mock trend for display)
  var mockTrend = [
    { x: '2562', y: 142 },
    { x: '2563', y: 198 },
    { x: '2564', y: 265 },
    { x: '2565', y: 310 },
    { x: '2566', y: 378 },
    { x: '2567', y: 450 },
  ]
  var lineData = [{
    id: 'งานวิจัย',
    data: admissionTrend.length >= 3
      ? admissionTrend.map(function(d) { return { x: String(d.year), y: d.total } })
      : mockTrend
  }]

  // Pie colors
  var pieColors1 = ['#2196f3', '#ff9800']
  var pieColors2 = ['#4caf50', '#ff9800', '#2196f3', '#f44336']

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Header title="ด้านวิชาการ" subtitle="แผนการรับนิสิต ผลงานวิจัย และทุนนำเสนอ" />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <Select value={year} onChange={function(e) { setYear(e.target.value) }}
            sx={{ color: colors.grey[100], backgroundColor: colors.primary[400] }}>
            {years.map(function(y) { return <MenuItem key={y} value={y}>ปีการศึกษา {y}</MenuItem> })}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt="60px"><CircularProgress /></Box>
      ) : (
        <Box display="flex" flexDirection="column" gap="20px">

          {/* KPI Row */}
          <Box display="flex" gap="16px" flexWrap="wrap">
            <KpiCard icon={<PeopleAltIcon sx={{ color: '#60a5fa', fontSize: 28 }} />} iconBg="#1976d230"
              value={fmt(kpi.totalAdmit)} label="นิสิตรับเข้า" />
            <KpiCard icon={<CheckCircleIcon sx={{ color: '#4ade80', fontSize: 28 }} />} iconBg="#16a34a30"
              value={fmt(kpi.reportPct)} unit="%" label="รายงานตัวแล้ว" />
            <KpiCard icon={<MenuBookIcon sx={{ color: '#f59e0b', fontSize: 28 }} />} iconBg="#d9770630"
              value={fmt(kpi.totalPublication)} label="ผลงานตีพิมพ์" />
            <KpiCard icon={<SchoolIcon sx={{ color: '#c084fc', fontSize: 28 }} />} iconBg="#7e22ce30"
              value={fmt(kpi.totalGrant)} label="คู่ได้รับทุน" />
          </Box>

          {/* Row 2: Bar + Line + Pie วิจัย */}
          <Box display="flex" gap="20px" flexWrap="wrap">

            {/* Bar: แผนรับ vs รายงานตัว */}
            <Box flex="2" minWidth="320px" backgroundColor={cardBg} borderRadius="12px" p="20px">
              <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100], mb: '4px' }}>
                แผนการรับนิสิต vs รายงานตัว
              </Typography>
              <Box height="280px">
                {barData.length > 0 ? (
                  <ResponsiveBar
                    data={barData} keys={['แผนรับ', 'รายงานตัว']} indexBy="dept"
                    margin={{ top: 10, right: 20, bottom: 60, left: 50 }}
                    padding={0.3} groupMode="grouped"
                    colors={['#2196f3', '#4caf50']}
                    axisBottom={{ tickRotation: -20, tickSize: 5, legendOffset: 50,
                      tickTextStyle: { fontSize: 12, fill: colors.grey[300] } }}
                    axisLeft={{ tickSize: 5, tickTextStyle: { fill: colors.grey[300] } }}
                    labelSkipHeight={12} labelTextColor="#fff"
                    legends={[{ dataFrom: 'keys', anchor: 'top-left', direction: 'row',
                      translateY: -10, itemWidth: 80, itemHeight: 18,
                      symbolSize: 12, itemTextColor: colors.grey[200] }]}
                    theme={{ axis: { ticks: { text: { fill: colors.grey[300], fontSize: 12 } } },
                      grid: { line: { stroke: colors.primary[300] } },
                      legends: { text: { fill: colors.grey[200] } } }}
                  />
                ) : (
                  <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Typography sx={{ color: colors.grey[400] }}>ไม่พบข้อมูล</Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Line: แนวโน้มการรับนิสิต — ซ่อนไว้ก่อน รอข้อมูลหลายปี
            <Box flex="2" minWidth="280px" backgroundColor={cardBg} borderRadius="12px" p="20px">
              <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100], mb: '4px' }}>
                แนวโน้มการรับนิสิต
              </Typography>
              <Box height="280px">
                {admissionTrend.length > 0 ? (
                  <ResponsiveLine
                    data={lineData}
                    margin={{ top: 10, right: 20, bottom: 50, left: 50 }}
                    xScale={{ type: 'point' }} yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                    curve="monotoneX" enableArea={true} areaOpacity={0.15}
                    colors={['#2196f3']}
                    pointSize={8} pointColor="#fff" pointBorderWidth={2} pointBorderColor={{ from: 'serieColor' }}
                    axisBottom={{ tickRotation: 0, tickTextStyle: { fill: colors.grey[300] } }}
                    axisLeft={{ tickTextStyle: { fill: colors.grey[300] } }}
                    theme={{ axis: { ticks: { text: { fill: colors.grey[300], fontSize: 12 } } },
                      grid: { line: { stroke: colors.primary[300] } } }}
                  />
                ) : (
                  <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Typography sx={{ color: colors.grey[400] }}>ไม่พบข้อมูล</Typography>
                  </Box>
                )}
              </Box>
            </Box>
            */}

            {/* Pie: ผลงานวิจัย ป.โท/ป.เอก */}
            <Box flex="1" minWidth="220px" backgroundColor={cardBg} borderRadius="12px" p="20px">
              <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100], mb: '4px', textAlign: 'center' }}>
                ผลงานวิจัย
              </Typography>
              <Box height="300px">
                <ResponsivePie
                  data={studentByDept.length > 0 ? studentByDept : [{ id: 'ไม่มีข้อมูล', label: 'ไม่มีข้อมูล', value: 1 }]}
                  margin={{ top: 20, right: 20, bottom: 70, left: 20 }}
                  innerRadius={0.55} padAngle={2} cornerRadius={3}
                  colors={pieColors1}
                  arcLabel={function(d) { return d.id + ' ' + d.value + '%' }}
                  arcLabelsTextColor="#fff"
                  arcLabelsRadiusOffset={0.6}
                  arcLabelsSkipAngle={5}
                  enableArcLinkLabels={false}
                  legends={[{ anchor: 'bottom', direction: 'row', translateY: 60,
                    itemWidth: 100, itemHeight: 20, symbolSize: 14,
                    itemTextColor: colors.grey[200],
                    effects: [{ on: 'hover', style: { itemTextColor: '#fff' } }] }]}
                  theme={{
                    legends: { text: { fill: colors.grey[200], fontSize: 13 } },
                    labels: { text: { fontSize: 12, fontWeight: 'bold' } }
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Row 3: Top ภาควิชา + รายชื่อทุน + Pie ทุน */}
          <Box display="flex" gap="20px" flexWrap="wrap">

            {/* Top ภาควิชา */}
            <Box flex="1" minWidth="260px" backgroundColor={cardBg} borderRadius="12px" p="20px">
              <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100], mb: '12px', textAlign: 'center' }}>
                ผลงานวิจัยสูงสุด
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={thStyle}>ลำดับ</TableCell>
                      <TableCell sx={thStyle}>สาขา</TableCell>
                      <TableCell sx={{ ...thStyle, textAlign: 'right' }}>จำนวน</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topDepts.length > 0 ? topDepts.map(function(r) {
                      return (
                        <TableRow key={r.rank}>
                          <TableCell sx={tdStyle}>{r.rank}</TableCell>
                          <TableCell sx={tdStyle}>{r.dept}</TableCell>
                          <TableCell sx={{ ...tdStyle, textAlign: 'right', fontWeight: 'bold' }}>{fmt(r.count)}</TableCell>
                        </TableRow>
                      )
                    }) : (
                      <TableRow><TableCell colSpan={3} sx={{ ...tdStyle, textAlign: 'center', color: colors.grey[400] }}>ไม่พบข้อมูล</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* รายชื่อนิสิตได้รับทุนล่าสุด */}
            <Box flex="2" minWidth="300px" backgroundColor={cardBg} borderRadius="12px" p="20px">
              <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100], mb: '12px', textAlign: 'center' }}>
                รายชื่อนิสิตที่ได้รับทุนล่าสุด
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={thStyle}>ชื่อ-สกุล</TableCell>
                      <TableCell sx={thStyle}>สาขา</TableCell>
                      <TableCell sx={thStyle}>ทุน</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentGrantList.length > 0 ? recentGrantList.map(function(r, i) {
                      return (
                        <TableRow key={i}>
                          <TableCell sx={tdStyle}>{r.name}</TableCell>
                          <TableCell sx={tdStyle}>{r.major}</TableCell>
                          <TableCell sx={tdStyle}>{r.grant}</TableCell>
                        </TableRow>
                      )
                    }) : (
                      <TableRow><TableCell colSpan={3} sx={{ ...tdStyle, textAlign: 'center', color: colors.grey[400] }}>ไม่พบข้อมูล</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Pie: ทุนแยกประเภท */}
            <Box flex="1" minWidth="220px" backgroundColor={cardBg} borderRadius="12px" p="20px">
              <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100], mb: '4px', textAlign: 'center' }}>
                ทุนการนำเสนอ
              </Typography>
              <Box height="260px">
                <ResponsivePie
                  data={grantByType.length > 0 ? grantByType : [{ id: 'ไม่มีข้อมูล', label: 'ไม่มีข้อมูล', value: 1 }]}
                  margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                  innerRadius={0.5} padAngle={1} cornerRadius={3}
                  colors={pieColors2}
                  arcLabel={function(d) { return d.value + '%' }}
                  arcLabelsTextColor="#fff"
                  legends={[{ anchor: 'bottom', direction: 'row', translateY: 56,
                    itemWidth: 90, itemHeight: 18, symbolSize: 12,
                    itemTextColor: colors.grey[300] }]}
                  theme={{ legends: { text: { fill: colors.grey[300] } } }}
                />
              </Box>
            </Box>
          </Box>

        </Box>
      )}
    </Box>
  )
}

export default Dashboard3
