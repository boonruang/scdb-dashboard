import React, { useEffect, useState } from 'react'
import { Box, Typography, useTheme, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboard } from 'actions/dashboard1.action'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import SchoolIcon from '@mui/icons-material/School'
import BadgeIcon from '@mui/icons-material/Badge'
import ApartmentIcon from '@mui/icons-material/Apartment'

var fmt = function(n) { return (n || 0).toLocaleString('th-TH') }

// ── KPI Card ──────────────────────────────────────────────────────────
var KpiCard = function(props) {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  return (
    <Box
      style={{
        backgroundColor: colors.primary[400],
        borderRadius: '8px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flex: 1,
        minHeight: '100px',
      }}
    >
      <Box style={{
        width: 48, height: 48, borderRadius: '50%',
        backgroundColor: props.accent + '30',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {props.icon}
      </Box>
      <Box>
        <Typography style={{ fontSize: '2rem', fontWeight: 'bold', color: props.accent, lineHeight: 1.2 }}>
          {fmt(props.value)}
        </Typography>
        <Typography style={{ fontSize: '0.85rem', color: colors.grey[300], marginTop: '4px' }}>
          {props.label}
        </Typography>
      </Box>
    </Box>
  )
}

// ── Dashboard1 ────────────────────────────────────────────────────────
var Dashboard1 = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var dispatch = useDispatch()
  var dashboard1Reducer = useSelector(function(s) { return s.app.dashboard1Reducer })
  var isFetching = dashboard1Reducer.isFetching
  var result = (dashboard1Reducer.result || {})
  var kpi = result.kpi || {}
  var staffByDept = result.staffByDept || []
  var staffList = result.staffList || []
  var leaveStats = result.leaveStats || []
  var leaveByType = result.leaveByType || []

  var [activeDept, setActiveDept] = useState('')

  useEffect(function() { dispatch(getDashboard()) }, [])

  // distinct dept tabs จาก staffList
  var deptTabs = []
  staffList.forEach(function(s) {
    if (s.dept && deptTabs.indexOf(s.dept) === -1) deptTabs.push(s.dept)
  })

  // set default tab เมื่อข้อมูลมาแล้ว
  useEffect(function() {
    if (deptTabs.length > 0 && !activeDept) setActiveDept(deptTabs[0])
  }, [staffList.length])

  var filteredStaff = activeDept ? staffList.filter(function(s) { return s.dept === activeDept }) : staffList
  var filteredLeave = []
  filteredStaff.forEach(function(s) {
    s.leaveList.forEach(function(l) {
      filteredLeave.push(Object.assign({}, l, { position_no: s.position_no, fullname_th: s.fullname_th }))
    })
  })

  var border = '1px solid ' + colors.primary[300]
  var bg = colors.primary[400]
  var thStyle = { color: colors.greenAccent[400], fontWeight: 'bold', fontSize: '13px', backgroundColor: bg, borderBottom: border }
  var tdStyle = function(extra) { return Object.assign({ color: colors.grey[100], fontSize: '13px', backgroundColor: bg, borderBottom: border }, extra || {}) }

  // Bar chart data สำหรับ leaveStats
  var leaveBarData = leaveStats.map(function(l) { return { type: l.type, จำนวน: l.count } })

  // Pie chart สีต่างๆ
  var pieColors = ['#60a5fa', '#4ade80', '#c084fc', '#fbbf24', '#f87171', '#34d399']

  return (
    <Box m="20px">
      <Header title="ด้านบุคลากร" subtitle="ข้อมูลบุคลากรและสถิติการลา" />

      {isFetching ? (
        <Box display="flex" justifyContent="center" mt="60px">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {/* Row 1 — KPI */}
          <Box display="flex" gap="16px" mb="20px" flexWrap="wrap">
            <KpiCard label="อาจารย์" value={kpi.teacher} accent="#4ade80" icon={<SchoolIcon style={{ color: '#4ade80' }} />} />
            <KpiCard label="สายสนับสนุน" value={kpi.support} accent="#60a5fa" icon={<BadgeIcon style={{ color: '#60a5fa' }} />} />
            <KpiCard label="บุคลากรทั้งหมด" value={kpi.total} accent="#c084fc" icon={<PeopleOutlinedIcon style={{ color: '#c084fc' }} />} />
            <KpiCard label="ภาควิชา/สังกัด" value={deptTabs.length} accent="#fbbf24" icon={<ApartmentIcon style={{ color: '#fbbf24' }} />} />
          </Box>

          {/* Row 2 — Tab bar */}
          <Box display="flex" gap="8px" mb="16px" flexWrap="wrap">
            {deptTabs.map(function(dept) {
              var active = activeDept === dept
              return (
                <Box
                  key={dept}
                  onClick={function() { setActiveDept(dept) }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    backgroundColor: active ? colors.greenAccent[600] : colors.primary[400],
                    color: active ? colors.grey[100] : colors.grey[300],
                    fontWeight: active ? 'bold' : 'normal',
                    fontSize: '13px',
                    borderBottom: active ? '3px solid ' + colors.greenAccent[400] : '3px solid transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  {dept}
                </Box>
              )
            })}
          </Box>

          {/* Row 3 — 2 ตาราง */}
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap="16px" mb="20px">
            {/* ตารางบุคลากร */}
            <Box>
              <Typography style={{ color: colors.grey[300], fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
                ข้อมูลบุคลากร ({filteredStaff.length} คน)
              </Typography>
              <TableContainer component={Paper} style={{ backgroundColor: bg, maxHeight: 320, borderRadius: '8px' }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell style={thStyle}>เลขประจำตำแหน่ง</TableCell>
                      <TableCell style={thStyle}>สถานะ</TableCell>
                      <TableCell style={thStyle}>ชื่อ-สกุล</TableCell>
                      <TableCell style={thStyle}>ตำแหน่ง</TableCell>
                      <TableCell style={thStyle}>วุฒิ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStaff.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} style={tdStyle({ textAlign: 'center', color: colors.grey[400] })}>ยังไม่มีข้อมูล</TableCell>
                      </TableRow>
                    ) : filteredStaff.map(function(s, i) {
                      return (
                        <TableRow key={i} style={{ backgroundColor: bg }}>
                          <TableCell style={tdStyle({ color: colors.grey[400] })}>{s.position_no}</TableCell>
                          <TableCell style={tdStyle({ color: s.status === 'อาจารย์' ? colors.greenAccent[400] : colors.blueAccent[400] })}>{s.status}</TableCell>
                          <TableCell style={tdStyle()}>{s.fullname_th}</TableCell>
                          <TableCell style={tdStyle({ color: colors.grey[300] })}>{s.position}</TableCell>
                          <TableCell style={tdStyle({ color: colors.grey[400] })}>{s.education}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* ตารางประวัติการลา */}
            <Box>
              <Typography style={{ color: colors.grey[300], fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
                ประวัติการลา ({filteredLeave.length} รายการ)
              </Typography>
              <TableContainer component={Paper} style={{ backgroundColor: bg, maxHeight: 320, borderRadius: '8px' }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell style={thStyle}>ชื่อ-สกุล</TableCell>
                      <TableCell style={thStyle}>ประเภทการลา</TableCell>
                      <TableCell style={thStyle}>วันเริ่ม</TableCell>
                      <TableCell style={thStyle}>วันสิ้นสุด</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredLeave.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} style={tdStyle({ textAlign: 'center', color: colors.grey[400] })}>ยังไม่มีข้อมูล</TableCell>
                      </TableRow>
                    ) : filteredLeave.map(function(l, i) {
                      return (
                        <TableRow key={i} style={{ backgroundColor: bg }}>
                          <TableCell style={tdStyle()}>{l.fullname_th}</TableCell>
                          <TableCell style={tdStyle({ color: colors.blueAccent[300] })}>{l.leave_type}</TableCell>
                          <TableCell style={tdStyle({ color: colors.grey[400] })}>{l.start_date ? String(l.start_date).split('T')[0] : '-'}</TableCell>
                          <TableCell style={tdStyle({ color: colors.grey[400] })}>{l.end_date ? String(l.end_date).split('T')[0] : '-'}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          {/* Row 4 — Pie chart บุคลากรตามสังกัด */}
          <Box style={{ backgroundColor: bg, borderRadius: '8px', padding: '20px', marginBottom: '20px', height: '340px' }}>
            <Typography style={{ color: colors.grey[100], fontWeight: 'bold', marginBottom: '8px', fontSize: '15px' }}>
              บุคลากรตามสังกัด
            </Typography>
            {staffByDept.length === 0 ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="80%">
                <Typography style={{ color: colors.grey[400] }}>ยังไม่มีข้อมูล</Typography>
              </Box>
            ) : (
              <Box height="270px">
                <ResponsivePie
                  data={staffByDept.map(function(d, i) {
                    return { id: d.dept, label: d.dept, value: d.total, color: pieColors[i % pieColors.length] }
                  })}
                  colors={function(d) { return d.data.color }}
                  margin={{ top: 20, right: 160, bottom: 20, left: 20 }}
                  innerRadius={0.4}
                  padAngle={1}
                  arcLabel={function(d) { return d.value + ' คน' }}
                  arcLabelsTextColor="#ffffff"
                  arcLabelsSkipAngle={10}
                  legends={[{
                    anchor: 'right', direction: 'column', translateX: 150, itemWidth: 140, itemHeight: 22,
                    itemTextColor: colors.grey[300], symbolSize: 14, symbolShape: 'circle',
                  }]}
                  theme={{
                    legends: { text: { fontSize: 13 } },
                    labels: { text: { fontSize: 13 } },
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Row 5 — Bar + Donut */}
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap="16px" mb="20px">
            {/* Bar chart สถิติการลา */}
            <Box style={{ backgroundColor: bg, borderRadius: '8px', padding: '20px', height: '300px' }}>
              <Typography style={{ color: colors.grey[100], fontWeight: 'bold', marginBottom: '8px', fontSize: '15px' }}>
                สถิติการลา (จำนวนครั้ง)
              </Typography>
              {leaveBarData.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="80%">
                  <Typography style={{ color: colors.grey[400] }}>ยังไม่มีข้อมูล</Typography>
                </Box>
              ) : (
                <Box height="220px">
                  <ResponsiveBar
                    data={leaveBarData}
                    keys={['จำนวน']}
                    indexBy="type"
                    margin={{ top: 10, right: 20, bottom: 60, left: 40 }}
                    padding={0.35}
                    colors={['#60a5fa']}
                    axisBottom={{ tickRotation: -20, tickSize: 5, legend: '', legendOffset: 50 }}
                    axisLeft={{ tickSize: 5, tickValues: 5 }}
                    labelSkipHeight={12}
                    theme={{
                      axis: { ticks: { text: { fontSize: 13, fill: colors.grey[300] } } },
                      labels: { text: { fontSize: 13, fill: '#ffffff' } },
                    }}
                  />
                </Box>
              )}
            </Box>

            {/* Donut สัดส่วนการลา */}
            <Box style={{ backgroundColor: bg, borderRadius: '8px', padding: '20px', height: '300px' }}>
              <Typography style={{ color: colors.grey[100], fontWeight: 'bold', marginBottom: '8px', fontSize: '15px' }}>
                สัดส่วนประเภทการลา
              </Typography>
              {leaveByType.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="80%">
                  <Typography style={{ color: colors.grey[400] }}>ยังไม่มีข้อมูล</Typography>
                </Box>
              ) : (
                <Box height="230px">
                  <ResponsivePie
                    data={leaveByType}
                    colors={pieColors}
                    margin={{ top: 10, right: 130, bottom: 10, left: 10 }}
                    innerRadius={0.5}
                    padAngle={1}
                    arcLabel={function(d) { return d.value }}
                    arcLabelsTextColor="#ffffff"
                    arcLabelsSkipAngle={15}
                    legends={[{
                      anchor: 'right', direction: 'column', translateX: 120, itemWidth: 110, itemHeight: 20,
                      itemTextColor: colors.grey[300], symbolSize: 12, symbolShape: 'circle',
                    }]}
                    theme={{
                      legends: { text: { fontSize: 12 } },
                      labels: { text: { fontSize: 12 } },
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Dashboard1
