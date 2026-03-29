import React, { useEffect, useState } from 'react'
import { Box, Typography, useTheme, Select, MenuItem, FormControl, InputLabel, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, TextField, TableContainer, Paper, Collapse, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboard2Summary } from 'actions/dashboard2.action'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import PublicIcon from '@mui/icons-material/Public'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import EventNoteIcon from '@mui/icons-material/EventNote'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveLine } from '@nivo/line'

// ── Format Number ────────────────────────────────────────────────────
var fmt = function(n) { return (n || 0).toLocaleString('th-TH') }

// ── KPI Card ─────────────────────────────────────────────────────────
var KpiCard = function(props) {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  return (
    <Box
      gridColumn={'span ' + (props.span || 2)}
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ borderRadius: '8px', minHeight: '110px' }}
    >
      <Box width="100%" mx="20px">
        <Box display="flex" alignItems="center" gap="12px">
          <Box
            display="flex" alignItems="center" justifyContent="center"
            sx={{
              width: 48, height: 48, borderRadius: '50%',
              backgroundColor: props.iconBg || '#1976d230',
              flexShrink: 0
            }}
          >
            {props.icon}
          </Box>
          <Box>
            <Typography variant="h3" fontWeight="bold" sx={{ color: colors.grey[100], lineHeight: 1.2 }}>
              {props.value}
            </Typography>
            {props.unit && (
              <Typography variant="caption" sx={{ color: colors.grey[400] }}>
                {props.unit}
              </Typography>
            )}
          </Box>
        </Box>
        <Typography variant="h6" sx={{ color: colors.greenAccent[400], mt: '6px' }}>
          {props.label}
        </Typography>
      </Box>
    </Box>
  )
}

// ── Top Student Row (expandable) ──────────────────────────────────────
var TopStudentRow = function(props) {
  var s = props.s
  var i = props.i
  var colors = props.colors
  var [open, setOpen] = useState(false)
  var awardList = s.awardList || []
  var grantList = s.grantList || []
  var borderColor = colors.primary[300]
  var bg = colors.primary[400]
  var bgSub = colors.primary[400]
  return (
    <>
      <TableRow onClick={function() { setOpen(!open) }} style={{ cursor: 'pointer', backgroundColor: bg }}>
        <TableCell style={{ width: 40, borderBottom: '1px solid ' + borderColor, padding: '4px', backgroundColor: bg }}>
          <IconButton size="small" style={{ color: colors.grey[300] }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ color: colors.grey[400], fontSize: '0.9rem', borderBottom: '1px solid ' + borderColor, width: 40, backgroundColor: bg }}>{i + 1}</TableCell>
        <TableCell style={{ color: colors.grey[300], fontSize: '0.9rem', borderBottom: '1px solid ' + borderColor, backgroundColor: bg }}>{s.student_code}</TableCell>
        <TableCell style={{ color: colors.grey[100], fontSize: '0.9rem', borderBottom: '1px solid ' + borderColor, backgroundColor: bg }}>{s.name}</TableCell>
        <TableCell style={{ color: colors.grey[300], fontSize: '0.9rem', borderBottom: '1px solid ' + borderColor, backgroundColor: bg }}>{s.major}</TableCell>
        <TableCell style={{ color: colors.greenAccent[400], fontWeight: 'bold', fontSize: '0.9rem', borderBottom: '1px solid ' + borderColor, backgroundColor: bg }}>{s.awards} รางวัล</TableCell>
        <TableCell style={{ color: colors.blueAccent[400], fontWeight: 'bold', fontSize: '0.9rem', borderBottom: '1px solid ' + borderColor, backgroundColor: bg }}>{s.grants} ทุน</TableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: bgSub }}>
        <TableCell colSpan={7} style={{ padding: 0, borderBottom: '1px solid ' + borderColor, backgroundColor: bgSub }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box style={{ padding: '8px 32px', backgroundColor: bgSub }}>
              {awardList.length > 0 && (
                <Box mb="8px">
                  <Typography variant="caption" style={{ color: colors.greenAccent[400], fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>รางวัล</Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {['ชื่อรางวัล', 'ระดับ', 'วันที่'].map(function(h) {
                          return <TableCell key={h} style={{ color: colors.grey[400], fontSize: '0.8rem', padding: '2px 8px', borderBottom: 'none', backgroundColor: bgSub }}>{h}</TableCell>
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {awardList.map(function(a, ai) {
                        return (
                          <TableRow key={ai} style={{ backgroundColor: bgSub }}>
                            <TableCell style={{ color: colors.grey[100], fontSize: '0.85rem', borderBottom: 'none', padding: '3px 8px', backgroundColor: bgSub }}>{a.award_name}</TableCell>
                            <TableCell style={{ color: colors.greenAccent[300], fontSize: '0.85rem', borderBottom: 'none', padding: '3px 8px', backgroundColor: bgSub }}>{a.award_level}</TableCell>
                            <TableCell style={{ color: colors.grey[400], fontSize: '0.85rem', borderBottom: 'none', padding: '3px 8px', backgroundColor: bgSub }}>{a.award_date || '-'}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Box>
              )}
              {grantList.length > 0 && (
                <Box mb="8px">
                  <Typography variant="caption" style={{ color: colors.blueAccent[400], fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>ทุนการศึกษา</Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {['ชื่อทุน', 'ประเภท', 'มูลค่า (บาท)'].map(function(h) {
                          return <TableCell key={h} style={{ color: colors.grey[400], fontSize: '0.8rem', padding: '2px 8px', borderBottom: 'none', backgroundColor: bgSub }}>{h}</TableCell>
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {grantList.map(function(g, gi) {
                        return (
                          <TableRow key={gi} style={{ backgroundColor: bgSub }}>
                            <TableCell style={{ color: colors.grey[100], fontSize: '0.85rem', borderBottom: 'none', padding: '3px 8px', backgroundColor: bgSub }}>{g.grant_name}</TableCell>
                            <TableCell style={{ color: colors.blueAccent[300], fontSize: '0.85rem', borderBottom: 'none', padding: '3px 8px', backgroundColor: bgSub }}>{g.grant_type || '-'}</TableCell>
                            <TableCell style={{ color: colors.grey[300], fontSize: '0.85rem', borderBottom: 'none', padding: '3px 8px', backgroundColor: bgSub }}>{(g.amount || 0).toLocaleString('th-TH')}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

// ── Chart Box ─────────────────────────────────────────────────────────
var ChartBox = function(props) {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  return (
    <Box
      gridColumn={'span ' + (props.span || 6)}
      backgroundColor={colors.primary[400]}
      p="20px"
      sx={{ borderRadius: '8px', height: props.height || '300px' }}
    >
      <Typography variant="h5" fontWeight="bold" mb="10px" sx={{ color: colors.grey[100] }}>
        {props.title}
      </Typography>
      <Box height={props.height ? (parseInt(props.height) - 60) + 'px' : '220px'}>
        {props.children}
      </Box>
    </Box>
  )
}

var Dashboard2 = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var dispatch = useDispatch()
  var d2 = useSelector(function(state) { return state.app.dashboard2Reducer })
  var result = (d2 || {}).result || null
  var isFetching = (d2 || {}).isFetching || false

  var [filters, setFilters] = useState({ year: '', grantType: '', activityType: '', dateFrom: '', dateTo: '' })

  useEffect(function() {
    dispatch(getDashboard2Summary(filters))
  }, [dispatch, filters.year, filters.grantType, filters.activityType, filters.dateFrom, filters.dateTo]) // eslint-disable-line react-hooks/exhaustive-deps

  var kpi = (result || {}).kpi || {}
  var studentsByDept = (result || {}).studentsByDepartment || []
  var loanDonut = (result || {}).loanDonut || []
  var awardsByYear = (result || {}).awardsByYear || []
  var grantsByType = (result || {}).grantsByType || []
  var activitiesByMonth = (result || {}).activitiesByMonth || []
  var topStudents = (result || {}).topStudents || []

  // Transform awardsByYear → nivo line format
  var lineData = [
    {
      id: 'ระดับชาติ',
      color: '#3b82f6',
      data: awardsByYear.map(function(r) { return { x: r.year, y: r['ระดับชาติ'] || 0 } }),
    },
    {
      id: 'นานาชาติ',
      color: '#22c55e',
      data: awardsByYear.map(function(r) { return { x: r.year, y: r['นานาชาติ'] || 0 } }),
    },
  ]

  // nivo theme — match dashboard3 components axis/labels style
  var nivoTheme = {
    axis: {
      domain: { line: { stroke: colors.grey[100] } },
      ticks: {
        line: { stroke: colors.grey[100], strokeWidth: 1 },
        text: { fill: colors.grey[100], fontSize: 12, fontFamily: 'Kanit, sans-serif' }
      },
      legend: {
        text: { fill: colors.grey[100], fontSize: 13, fontFamily: 'Kanit, sans-serif' }
      }
    },
    legends: {
      text: { fill: colors.grey[100], fontSize: 12, fontFamily: 'Kanit, sans-serif' }
    },
    labels: {
      text: { fontSize: 12, fontFamily: 'Kanit, sans-serif' }
    },
    tooltip: {
      container: { background: colors.primary[400], color: colors.grey[100], fontSize: 12, fontFamily: 'Kanit, sans-serif' }
    },
  }

  var handleFilter = function(key, value) {
    setFilters(function(prev) { return Object.assign({}, prev, { [key]: value }) })
  }

  return (
    <Box m="20px">
      <Header title="ด้านกิจการนิสิต" subtitle="Executive Dashboard — นิสิต รางวัล ทุน โครงการ" />

      {/* KPI Cards */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(10, 1fr)"
        gridAutoRows="110px"
        gap="20px"
        mt="20px"
      >
        <KpiCard
          span="2"
          iconBg="#1565c030"
          icon={<PeopleOutlinedIcon sx={{ fontSize: 28, color: '#42a5f5' }} />}
          value={fmt(kpi.totalStudents)}
          label="นิสิตทั้งหมด"
        />
        <KpiCard
          span="2"
          iconBg="#f9a82530"
          icon={<EmojiEventsIcon sx={{ fontSize: 28, color: '#ffb74d' }} />}
          value={fmt(kpi.studentsWithAwards)}
          label="นิสิตมีรางวัล"
        />
        <KpiCard
          span="2"
          iconBg="#2e7d3230"
          icon={<PublicIcon sx={{ fontSize: 28, color: '#66bb6a' }} />}
          value={fmt(kpi.internationalAwards)}
          label="รางวัลนานาชาติ"
        />
        <KpiCard
          span="2"
          iconBg="#6a1b9a30"
          icon={<AccountBalanceWalletIcon sx={{ fontSize: 28, color: '#ab47bc' }} />}
          value={'฿ ' + fmt(kpi.totalGrantValue)}
          unit="บาท"
          label="มูลค่าทุนรวม"
        />
        <KpiCard
          span="2"
          iconBg="#b71c1c30"
          icon={<EventNoteIcon sx={{ fontSize: 28, color: '#ef5350' }} />}
          value={fmt(kpi.totalActivities)}
          label="จำนวนโครงการ"
        />
      </Box>

      {/* Filters — 3 ตัว */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="16px"
        mt="20px"
        backgroundColor={colors.primary[400]}
        p="16px"
        sx={{ borderRadius: '8px' }}
      >
        {/* 1. ปีการศึกษา */}
        <FormControl size="small" fullWidth>
          <InputLabel sx={{ color: colors.grey[300] }}>1. ปีการศึกษา</InputLabel>
          <Select
            value={filters.year}
            label="1. ปีการศึกษา"
            onChange={function(e) { return handleFilter('year', e.target.value) }}
            sx={{ color: colors.grey[100] }}
          >
            <MenuItem value="">ทั้งหมด</MenuItem>
            <MenuItem value="2567">2567</MenuItem>
            <MenuItem value="2566">2566</MenuItem>
            <MenuItem value="2565">2565</MenuItem>
            <MenuItem value="2564">2564</MenuItem>
            <MenuItem value="2563">2563</MenuItem>
            <MenuItem value="2562">2562</MenuItem>
          </Select>
        </FormControl>

        {/* 2. ประเภททุน */}
        <FormControl size="small" fullWidth>
          <InputLabel sx={{ color: colors.grey[300] }}>2. ประเภททุน</InputLabel>
          <Select
            value={filters.grantType}
            label="2. ประเภททุน"
            onChange={function(e) { return handleFilter('grantType', e.target.value) }}
            sx={{ color: colors.grey[100] }}
          >
            <MenuItem value="">ทั้งหมด</MenuItem>
            <MenuItem value="ทุนการศึกษา">ทุนการศึกษา</MenuItem>
            <MenuItem value="ทุนวิจัย">ทุนวิจัย</MenuItem>
            <MenuItem value="ทุนความสามารถพิเศษ">ทุนความสามารถพิเศษ</MenuItem>
          </Select>
        </FormControl>

        {/* 3. ช่วงเวลา (date range) */}
        <Box display="flex" gap="8px" alignItems="center">
          <TextField
            size="small"
            type="date"
            label="3. จากวันที่"
            value={filters.dateFrom}
            onChange={function(e) { return handleFilter('dateFrom', e.target.value) }}
            InputLabelProps={{ shrink: true, style: { color: colors.grey[300] } }}
            inputProps={{ style: { color: colors.grey[100] } }}
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            type="date"
            label="ถึง"
            value={filters.dateTo}
            onChange={function(e) { return handleFilter('dateTo', e.target.value) }}
            InputLabelProps={{ shrink: true, style: { color: colors.grey[300] } }}
            inputProps={{ style: { color: colors.grey[100] } }}
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>

      {isFetching && (
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <CircularProgress />
        </Box>
      )}

      {!isFetching && (
        <Box>
          {/* Row 1: Bar chart + Donut */}
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px" mt="20px">
            <ChartBox span="8" title="นิสิตตามภาควิชา" height="340px">
              {studentsByDept.length > 0 ? (
                <ResponsiveBar
                  data={studentsByDept}
                  keys={['count']}
                  indexBy="department"
                  layout="vertical"
                  margin={{ top: 30, right: 20, bottom: 50, left: 50 }}
                  padding={0.3}
                  colors={['#3b82f6', '#a855f7', '#22c55e', '#f59e0b', '#ef4444']}
                  colorBy="indexValue"
                  theme={nivoTheme}
                  axisLeft={{ tickSize: 5, tickPadding: 5 }}
                  axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: -15 }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  borderRadius={4}
                  enableLabel={true}
                />
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <Typography sx={{ color: colors.grey[400] }}>ยังไม่มีข้อมูล</Typography>
                </Box>
              )}
            </ChartBox>

            <ChartBox span="4" title="สัดส่วนนิสิต กยศ." height="340px">
              {loanDonut.length > 0 ? (
                <ResponsivePie
                  data={loanDonut}
                  margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                  innerRadius={0.55}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={['#3b82f6', '#a855f7', '#22c55e', '#f59e0b', '#ef4444']}
                  theme={nivoTheme}
                  arcLinkLabelsTextColor={colors.grey[100]}
                  arcLinkLabelsDiagonalLength={10}
                  arcLinkLabelsStraightLength={10}
                  arcLinkLabelsColor={{ from: 'color' }}
                  arcLinkLabelsTextSize={13}
                  arcLabel={function(d) {
                    var total = loanDonut.reduce(function(acc, item) { return acc + item.value }, 0)
                    return total > 0 ? ((d.value / total) * 100).toFixed(0) + '%' : ''
                  }}
                  arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
                  legends={[{
                    anchor: 'bottom',
                    direction: 'row',
                    itemWidth: 90,
                    itemHeight: 20,
                    itemTextColor: colors.grey[100],
                    symbolSize: 14,
                    translateY: 50,
                  }]}
                />
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <Typography sx={{ color: colors.grey[400] }}>ยังไม่มีข้อมูล</Typography>
                </Box>
              )}
            </ChartBox>
          </Box>

          {/* Row 2: Line chart full width */}
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px" mt="20px">
            <ChartBox span="12" title="รางวัล ระดับชาติ vs นานาชาติ (รายปี)" height="290px">
              {awardsByYear.length > 0 ? (
                <ResponsiveLine
                  data={lineData}
                  margin={{ top: 10, right: 140, bottom: 50, left: 50 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 0, stacked: false }}
                  axisBottom={{ tickSize: 5, tickPadding: 5, legend: 'ปีการศึกษา (พ.ศ.)', legendOffset: 40, legendPosition: 'middle' }}
                  axisLeft={{ tickSize: 5, legend: 'จำนวน (รางวัล)', legendOffset: -40, legendPosition: 'middle' }}
                  colors={{ datum: 'color' }}
                  pointSize={10}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  enablePointLabel={true}
                  pointLabelYOffset={-14}
                  useMesh={true}
                  theme={nivoTheme}
                  legends={[{
                    anchor: 'bottom-right',
                    direction: 'column',
                    itemWidth: 120,
                    itemHeight: 22,
                    itemTextColor: colors.grey[100],
                    symbolSize: 14,
                    translateX: 130,
                  }]}
                />
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <Typography sx={{ color: colors.grey[400] }}>ยังไม่มีข้อมูล — กรุณานำเข้าข้อมูลรางวัล</Typography>
                </Box>
              )}
            </ChartBox>
          </Box>

          {/* Row 3: Grant type + Activities */}
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px" mt="20px">
            <ChartBox span="6" title="ประเภทของทุน" height="310px">
              {grantsByType.length > 0 ? (
                <ResponsiveBar
                  data={grantsByType}
                  keys={['count']}
                  indexBy="type"
                  margin={{ top: 10, right: 20, bottom: 60, left: 50 }}
                  padding={0.35}
                  colors={['#3b82f6', '#a855f7', '#22c55e', '#f59e0b', '#ef4444']}
                  theme={nivoTheme}
                  axisBottom={{ tickSize: 5, tickRotation: -15 }}
                  axisLeft={{ tickSize: 5 }}
                  borderRadius={3}
                />
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <Typography sx={{ color: colors.grey[400] }}>ยังไม่มีข้อมูล</Typography>
                </Box>
              )}
            </ChartBox>

            <ChartBox span="6" title="โครงการและผู้เข้าร่วม (รายเดือน)" height="310px">
              {activitiesByMonth.length > 0 ? (
                <ResponsiveBar
                  data={activitiesByMonth}
                  keys={['projects', 'participants']}
                  indexBy="month"
                  margin={{ top: 10, right: 140, bottom: 50, left: 50 }}
                  padding={0.3}
                  groupMode="grouped"
                  colors={['#3b82f6', '#a855f7', '#22c55e', '#f59e0b', '#ef4444']}
                  theme={nivoTheme}
                  axisBottom={{ tickSize: 5 }}
                  axisLeft={{ tickSize: 5 }}
                  borderRadius={3}
                  legends={[{
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    itemWidth: 120,
                    itemHeight: 22,
                    itemTextColor: colors.grey[100],
                    symbolSize: 14,
                    translateX: 130,
                  }]}
                />
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <Typography sx={{ color: colors.grey[400] }}>ยังไม่มีข้อมูล</Typography>
                </Box>
              )}
            </ChartBox>
          </Box>

          {/* Top Students Table — expandable */}
          <Box mt="20px" p="20px">
            <Typography variant="h5" fontWeight="bold" mb="12px" sx={{ color: colors.grey[100] }}>
              Top นิสิต (รางวัล + ทุน)
            </Typography>
            {topStudents.length === 0 ? (
              <Box backgroundColor={colors.primary[400]} p="20px" sx={{ borderRadius: '8px', textAlign: 'center' }}>
                <Typography sx={{ color: colors.grey[400], py: 4 }}>ยังไม่มีข้อมูล</Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400], borderRadius: '8px' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 40, borderBottom: '2px solid ' + colors.primary[300] }} />
                      {['#', 'รหัสนิสิต', 'ชื่อ-สกุล', 'สาขา', 'รางวัล (จำนวน)', 'ทุน (จำนวน)'].map(function(h) {
                        return (
                          <TableCell key={h} sx={{ color: colors.greenAccent[400], fontWeight: 'bold', fontSize: '0.95rem', borderBottom: '2px solid ' + colors.primary[300], py: '12px' }}>
                            {h}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topStudents.map(function(s, i) {
                      return <TopStudentRow key={i} s={s} i={i} colors={colors} />
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Dashboard2
