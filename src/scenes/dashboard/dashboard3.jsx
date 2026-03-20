import React, { useState, useEffect } from 'react'
import {
    Box, Typography, useTheme, useMediaQuery,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TableSortLabel, Paper,
    MenuItem, Select, FormControl, InputLabel,
    Chip, Button, CircularProgress
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import BarChartAcademicPosition from '../../components/BarChartAcademicPosition'
import BarChartTecherDept from '../../components/BarChartTecherDept'
import { useDispatch, useSelector } from 'react-redux'
import { getAcademicPositionList } from '../../actions/dashboardAcademicPosition.action'

// ── position chip color (ชื่อเต็มจากฐานข้อมูล) ──────────────────────
const positionColor = {
    'ศาสตราจารย์':         '#c62828',
    'รองศาสตราจารย์':      '#7b1fa2',
    'ผู้ช่วยศาสตราจารย์':  '#1976d2',
    'อาจารย์':             '#388e3c',
}

const POSITION_OPTIONS = ['ศาสตราจารย์', 'รองศาสตราจารย์', 'ผู้ช่วยศาสตราจารย์', 'อาจารย์']

const ROW_PER_PAGE = 10

const DashboardAcademicPosition = () => {
    const theme  = useTheme()
    const colors = tokens(theme.palette.mode)
    const dispatch = useDispatch()

    const isTablet  = useMediaQuery(theme.breakpoints.down('lg'))
    const isMobile  = useMediaQuery(theme.breakpoints.down('sm'))
    const chartSpan = isMobile ? 12 : isTablet ? 12 : null

    const [deptFilter, setDeptFilter] = useState('')
    const [posFilter,  setPosFilter]  = useState('')
    const [page, setPage] = useState(1)

    const { result, isFetching } = useSelector((state) => state.app.dashboardAcademicPositionReducer)

    useEffect(() => {
        dispatch(getAcademicPositionList({ position: posFilter, dept: deptFilter, page, limit: ROW_PER_PAGE }))
    }, [posFilter, deptFilter, page])

    const handleRefresh = () => {
        dispatch(getAcademicPositionList({ position: posFilter, dept: deptFilter, page, limit: ROW_PER_PAGE }))
    }

    // ── ดึงข้อมูลจาก redux ──────────────────────────────────────────
    const listResult   = result?.list    || {}
    const summary      = result?.summary || {}
    const staffList    = listResult.staff        || []
    const total        = listResult.total        || 0
    const totalPages   = Math.ceil(total / ROW_PER_PAGE)

    const positionData = summary.byPosition     || []   // [{position, count}]
    const deptData     = summary.byPositionDept || []   // [{department, [pos]: count}]

    // แปลง byPosition → format สำหรับ BarChartAcademicPosition (ต้องการ {position, amount})
    const chartPositionData = positionData.map(d => ({ position: d.position, amount: d.count }))

    // byPositionDept มี field department อยู่แล้ว ใช้ได้เลย
    const chartDeptData = deptData
    const positionKeys  = listResult.positionKeys || []

    // departments สำหรับ dropdown
    const departments = [...new Set(deptData.map(d => d.department).filter(Boolean))]

    // คำนวณ % ผู้มีตำแหน่ง (ไม่รวม อาจารย์)
    const totalCount   = positionData.reduce((s, d) => s + d.count, 0)
    const withPosCount = positionData
        .filter(d => d.position !== 'อาจารย์')
        .reduce((s, d) => s + d.count, 0)
    const pct = totalCount > 0 ? ((withPosCount / totalCount) * 100).toFixed(2) : '-'

    return (
        <Box m="20px">
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="4px">
                <Header
                    title="ตำแหน่งทางวิชาการ"
                    subtitle="ข้อมูลบุคลากรสายวิชาการ คณะวิทยาศาสตร์ มหาวิทยาลัยมหาสารคาม"
                />
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    disabled={isFetching}
                >
                    Refresh
                </Button>
            </Box>

            {/* % KPI */}
            <Box mb="8px">
                <Typography variant="h5" sx={{ color: colors.grey[300] }}>
                    บุคลากรที่มีตำแหน่งทางวิชาการ
                </Typography>
                <Typography variant="h2" fontWeight="bold" sx={{ color: colors.greenAccent[400] }}>
                    ร้อยละ {pct}
                    <Typography component="span" variant="h5" sx={{ color: colors.grey[400], ml: 1 }}>
                        ({withPosCount} / {totalCount} คน)
                    </Typography>
                </Typography>
            </Box>

            {/* GRID */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1-2 : BAR charts */}
                <Box
                    gridColumn={`span ${chartSpan || 4}`}
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                >
                    <Typography variant="h5" fontWeight="600" mb="10px">
                        ตำแหน่งทางวิชาการ
                    </Typography>
                    <Box height="230px" mt="-10px">
                        <BarChartAcademicPosition isDashboard={true} data={chartPositionData} />
                    </Box>
                </Box>

                <Box
                    gridColumn={`span ${chartSpan || 8}`}
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                >
                    <Typography variant="h5" fontWeight="600" mb="10px">
                        ตำแหน่งทางวิชาการตามสาขา
                    </Typography>
                    <Box height="230px" mt="-10px">
                        <BarChartTecherDept isDashboard={true} data={chartDeptData} keys={positionKeys} />
                    </Box>
                </Box>

                {/* ROW 3+ : ตารางรายชื่ออาจารย์ */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 6"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                >
                    {/* Filter bar */}
                    <Box display="flex" gap="12px" mb="12px" alignItems="center" flexWrap="wrap">
                        <Typography variant="h5" fontWeight="600" sx={{ flexGrow: 1 }}>
                            รายชื่ออาจารย์ ({total} คน)
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 160 }}>
                            <InputLabel sx={{ color: colors.grey[300] }}>ตำแหน่งทางวิชาการ</InputLabel>
                            <Select
                                value={posFilter}
                                label="ตำแหน่งทางวิชาการ"
                                onChange={(e) => { setPosFilter(e.target.value); setPage(1) }}
                                sx={{ color: colors.grey[100] }}
                            >
                                <MenuItem value="">ทั้งหมด</MenuItem>
                                {POSITION_OPTIONS.map(p => (
                                    <MenuItem key={p} value={p}>{p}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 160 }}>
                            <InputLabel sx={{ color: colors.grey[300] }}>ภาควิชา</InputLabel>
                            <Select
                                value={deptFilter}
                                label="ภาควิชา"
                                onChange={(e) => { setDeptFilter(e.target.value); setPage(1) }}
                                sx={{ color: colors.grey[100] }}
                            >
                                <MenuItem value="">ทั้งหมด</MenuItem>
                                {departments.map(d => (
                                    <MenuItem key={d} value={d}>{d}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Table */}
                    {isFetching ? (
                        <Box display="flex" justifyContent="center" py={4}>
                            <CircularProgress color="success" />
                        </Box>
                    ) : (
                    <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400] }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ color: colors.greenAccent[400], fontWeight: 'bold', width: '5%' }}>#</TableCell>
                                    <TableCell align="center" sx={{ color: colors.greenAccent[400], fontWeight: 'bold', width: '15%' }}>ตำแหน่งทางวิชาการ</TableCell>
                                    <TableCell align="left"   sx={{ color: colors.greenAccent[400], fontWeight: 'bold', width: '22%' }}>ชื่อ-นามสกุล (ไทย)</TableCell>
                                    <TableCell align="left"   sx={{ color: colors.greenAccent[400], fontWeight: 'bold', width: '20%' }}>ชื่อ-นามสกุล (อังกฤษ)</TableCell>
                                    <TableCell align="center" sx={{ color: colors.greenAccent[400], fontWeight: 'bold', width: '10%' }}>วุฒิการศึกษา</TableCell>
                                    <TableCell align="center" sx={{ color: colors.greenAccent[400], fontWeight: 'bold', width: '16%' }}>ภาควิชา</TableCell>
                                    <TableCell align="center" sx={{ color: colors.greenAccent[400], fontWeight: 'bold', width: '12%' }}>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {staffList.map((row, idx) => (
                                    <TableRow key={row.staffId || idx} hover>
                                        <TableCell align="center" sx={{ color: colors.grey[400] }}>
                                            {(page - 1) * ROW_PER_PAGE + idx + 1}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={row.position}
                                                size="small"
                                                sx={{
                                                    backgroundColor: positionColor[row.position] || colors.primary[300],
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.70rem'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="left" sx={{ color: colors.grey[100] }}>
                                            {row.name_th || '-'}
                                        </TableCell>
                                        <TableCell align="left" sx={{ color: colors.grey[300] }}>
                                            {row.name_en || '-'}
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: colors.grey[300] }}>
                                            {row.education || '-'}
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: colors.grey[300] }}>
                                            {row.dept || '-'}
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: colors.grey[400], fontSize: '0.75rem' }}>
                                            {row.email || '-'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {staffList.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ color: colors.grey[400], py: 3 }}>
                                            ไม่พบข้อมูล
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    )}

                    {/* Pagination */}
                    <Box display="flex" justifyContent="flex-end" alignItems="center" mt="8px" gap="12px">
                        <Typography variant="body2" sx={{ color: colors.grey[400] }}>
                            {total === 0 ? '0' : (page - 1) * ROW_PER_PAGE + 1} - {Math.min(page * ROW_PER_PAGE, total)} / {total}
                        </Typography>
                        <Button
                            size="small"
                            disabled={page <= 1 || isFetching}
                            onClick={() => setPage(p => p - 1)}
                            sx={{ color: colors.grey[200], minWidth: 32 }}
                        >{'<'}</Button>
                        <Button
                            size="small"
                            disabled={page >= totalPages || isFetching}
                            onClick={() => setPage(p => p + 1)}
                            sx={{ color: colors.grey[200], minWidth: 32 }}
                        >{'>'}</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default DashboardAcademicPosition
