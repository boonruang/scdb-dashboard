import React, { useEffect, useState, useCallback } from 'react'
import {
    Box, Typography, useTheme, useMediaQuery, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel,
    Pagination, Chip
} from '@mui/material'
import { tokens } from "../../theme"
import Header from '../../components/Header'
import SearchIcon from '@mui/icons-material/Search'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PaymentsIcon from '@mui/icons-material/Payments'
import HandshakeIcon from '@mui/icons-material/Handshake'
import { useDispatch, useSelector } from 'react-redux'
import { getBudgetSummary, getBudgetProjects } from '../../actions/dashboardBudget.action'

// ── ปีงบประมาณ options ───────────────────────────────────────────────
const currentBE = new Date().getFullYear() + 543
const fiscalYearOptions = [currentBE - 1, currentBE, currentBE - 2, currentBE - 3]

// ── Format Number ────────────────────────────────────────────────────
const fmt = (n) => (n ?? 0).toLocaleString('th-TH')

// ── KPI Card ─────────────────────────────────────────────────────────
const KpiCard = ({ icon, value, unit, label, iconBg, colSpan }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Box
            gridColumn={`span ${colSpan || 3}`}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ borderRadius: '8px' }}
        >
            <Box width="100%" mx="20px">
                <Box display="flex" alignItems="center" gap="12px">
                    <Box
                        display="flex" alignItems="center" justifyContent="center"
                        sx={{
                            width: 48, height: 48, borderRadius: '50%',
                            backgroundColor: iconBg || '#1976d230',
                            flexShrink: 0
                        }}
                    >
                        {icon}
                    </Box>
                    <Box>
                        <Typography variant="h3" fontWeight="bold" sx={{ color: colors.grey[100], lineHeight: 1.2 }}>
                            {value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: colors.grey[400] }}>
                            {unit}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h6" sx={{ color: colors.greenAccent[400], mt: '6px' }}>
                    {label}
                </Typography>
            </Box>
        </Box>
    )
}

// ── Budget Progress Bar ───────────────────────────────────────────────
const BudgetBar = ({ budget, disbursed, committed }) => {
    const pctDisbursed = budget > 0 ? Math.min(100, (disbursed / budget) * 100) : 0
    const pctCommitted = budget > 0 ? Math.min(100 - pctDisbursed, (committed / budget) * 100) : 0
    const pctTotal     = Math.min(100, pctDisbursed + pctCommitted)
    const totalColor   = pctTotal >= 80 ? '#4caf50' : pctTotal >= 50 ? '#ff9800' : '#1976d2'
    return (
        <Box sx={{ width: '100%', minWidth: 160 }}>
            <Box sx={{ height: 8, borderRadius: 4, backgroundColor: '#ffffff15', display: 'flex', overflow: 'hidden', mb: '4px' }}>
                <Box sx={{ width: `${pctDisbursed}%`, height: '100%', backgroundColor: '#4caf50', transition: 'width 0.5s' }} />
                <Box sx={{ width: `${pctCommitted}%`, height: '100%', backgroundColor: '#ff9800', transition: 'width 0.5s' }} />
            </Box>
            <Typography display="block" sx={{ color: '#4caf50', fontSize: '14px', whiteSpace: 'nowrap' }}>
                จ่าย {pctDisbursed.toFixed(1)}%
            </Typography>
            <Typography display="block" sx={{ color: '#ff9800', fontSize: '14px', whiteSpace: 'nowrap' }}>
                ผูกพัน {pctCommitted.toFixed(1)}%
            </Typography>
            <Typography display="block" sx={{ color: totalColor, fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', borderTop: '1px solid rgba(255,255,255,0.1)', mt: '2px', pt: '2px' }}>
                รวม {pctTotal.toFixed(1)}%
            </Typography>
        </Box>
    )
}

// ── Main Dashboard ────────────────────────────────────────────────────
const DashboardBudget = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const { summary, isFetchingSummary, projects, isFetchingProjects } =
        useSelector((state) => state.app.dashboardBudgetReducer)

    const isTablet = useMediaQuery(theme.breakpoints.down('lg'))  // < 1200px
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))  // < 600px
    const kpiSpan  = isMobile ? 12 : isTablet ? 6 : 3

    const [fiscalYear, setFiscalYear]       = useState(currentBE - 1)
    const [search, setSearch]               = useState('')
    const [budgetType, setBudgetType]       = useState('')
    const [page, setPage]                   = useState(1)
    const [hoveredIdx, setHoveredIdx]       = useState(null)
    const limit = 10

    useEffect(() => {
        dispatch(getBudgetSummary(fiscalYear))
    }, [dispatch, fiscalYear])

    const loadProjects = useCallback(() => {
        dispatch(getBudgetProjects({ fiscalYear, search, budgetType, page, limit }))
    }, [dispatch, fiscalYear, search, budgetType, page])

    useEffect(() => {
        loadProjects()
    }, [loadProjects])

    useEffect(() => {
        setPage(1)
    }, [search, budgetType, fiscalYear])

    const kpi         = summary?.kpi       || {}
    const byQuarter   = summary?.byQuarter || {}
    const projectList = projects?.data     || []
    const total       = projects?.total    || 0

    const budgetTypeColor = {
        '1.หมวดงบแผ่นดิน': '#1976d2',
        '2.หมวดงบรายได้':   '#7b1fa2',
    }

    const headerCell = (label, align = 'left') => (
        <TableCell align={align} sx={{
            color: colors.grey[100], fontWeight: 'bold', fontSize: '0.8rem',
            backgroundColor: colors.blueAccent[700], whiteSpace: 'nowrap',
            borderBottom: `2px solid ${colors.blueAccent[500]}`
        }}>
            {label}
        </TableCell>
    )

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="4px">
                <Header
                    title="แดชบอร์ดข้อมูลด้านแผนและงบประมาณ"
                    subtitle="ฝ่ายแผนและงบประมาณ คณะวิทยาศาสตร์ มหาวิทยาลัยมหาสารคาม"
                />
                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel sx={{ color: colors.grey[300] }}>ปีงบประมาณ</InputLabel>
                    <Select
                        value={fiscalYear}
                        label="ปีงบประมาณ"
                        onChange={(e) => { setFiscalYear(e.target.value); setPage(1) }}
                        sx={{ color: colors.grey[100] }}
                    >
                        {fiscalYearOptions.map(y => (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {isFetchingSummary && (
                <Box display="flex" justifyContent="center" my="20px">
                    <CircularProgress size={28} />
                </Box>
            )}

            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">

                {/* ===== ROW 1 : KPI ===== */}
                <KpiCard icon={<AssignmentIcon sx={{ fontSize: 26, color: '#1976d2' }} />} value={kpi.totalProjects != null ? fmt(kpi.totalProjects) : <CircularProgress size={20} />} unit="โครงการ" label="จำนวนโครงการ" iconBg="#1976d220" colSpan={kpiSpan} />
                <KpiCard icon={<AccountBalanceIcon sx={{ fontSize: 26, color: '#4caf50' }} />} value={kpi.totalBudget != null ? fmt(kpi.totalBudget) : <CircularProgress size={20} />} unit="บาท" label="งบประมาณ" iconBg="#4caf5020" colSpan={kpiSpan} />
                <KpiCard icon={<PaymentsIcon sx={{ fontSize: 26, color: '#ff9800' }} />} value={kpi.totalDisbursed != null ? fmt(kpi.totalDisbursed) : <CircularProgress size={20} />} unit="บาท" label="เบิกจ่ายจริง" iconBg="#ff980020" colSpan={kpiSpan} />
                <KpiCard icon={<HandshakeIcon sx={{ fontSize: 26, color: '#e91e63' }} />} value={kpi.totalCommitted != null ? fmt(kpi.totalCommitted) : <CircularProgress size={20} />} unit="บาท" label="ผูกพัน" iconBg="#e91e6320" colSpan={kpiSpan} />

                {/* ===== ROW 2+ : TABLE ===== */}
                <Box
                    gridColumn="span 12" gridRow="span 5"
                    backgroundColor={colors.primary[400]} p="20px"
                    sx={{ borderRadius: '8px', overflow: 'auto' }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb="12px" gap="12px" flexWrap="wrap">
                        <Typography variant="h5" fontWeight="600">
                            รายการโครงการ/กิจกรรม ปีงบประมาณ {fiscalYear}
                        </Typography>
                        <Box display="flex" gap="12px" alignItems="center">
                            <FormControl size="small" sx={{ minWidth: 180 }}>
                                <InputLabel sx={{ color: colors.grey[300] }}>หมวดงบ</InputLabel>
                                <Select
                                    value={budgetType}
                                    label="หมวดงบ"
                                    onChange={(e) => { setBudgetType(e.target.value); setPage(1) }}
                                    sx={{ color: colors.grey[100] }}
                                >
                                    <MenuItem value="">ทั้งหมด</MenuItem>
                                    <MenuItem value="1.หมวดงบแผ่นดิน">งบแผ่นดิน</MenuItem>
                                    <MenuItem value="2.หมวดงบรายได้">งบรายได้</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                size="small" placeholder="ค้นหารหัส / ชื่อโครงการ"
                                value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                                sx={{ width: 260 }}
                                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
                            />
                        </Box>
                    </Box>

                    {isFetchingProjects ? (
                        <Box display="flex" justifyContent="center" mt="40px">
                            <CircularProgress size={28} />
                        </Box>
                    ) : (
                        <>
                            <TableContainer>
                                <Table size="small" sx={{ minWidth: 900 }}>
                                    <TableHead>
                                        <TableRow>
                                            {headerCell('#', 'center')}
                                            {headerCell('รหัสงบประมาณ')}
                                            {headerCell('โครงการ/กิจกรรม')}
                                            {headerCell('หมวดงบ', 'center')}
                                            {headerCell('งบประมาณ (บาท)', 'right')}
                                            {headerCell('ไตรมาส 1', 'center')}
                                            {headerCell('ไตรมาส 2', 'center')}
                                            {headerCell('ไตรมาส 3', 'center')}
                                            {headerCell('ไตรมาส 4', 'center')}
                                            {headerCell('เบิกจ่าย / ผูกพัน', 'center')}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projectList.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={10} align="center" sx={{ color: colors.grey[400], py: 4 }}>
                                                    ไม่พบข้อมูล
                                                </TableCell>
                                            </TableRow>
                                        ) : projectList.map((row, idx) => (
                                            <TableRow
                                                key={row.id}
                                                onMouseEnter={() => setHoveredIdx(idx)}
                                                onMouseLeave={() => setHoveredIdx(null)}
                                                sx={{
                                                    borderTop: idx > 0 ? `1px solid ${colors.primary[300]}` : 'none',
                                                    '& td': {
                                                        backgroundColor: hoveredIdx === idx ? 'rgba(255,255,255,0.05)' : 'transparent',
                                                        transition: 'background-color 0.15s'
                                                    }
                                                }}
                                            >
                                                <TableCell align="center" sx={{ color: colors.grey[400], fontSize: '14px', py: '12px' }}>
                                                    {(page - 1) * limit + idx + 1}
                                                </TableCell>
                                                <TableCell sx={{ color: colors.grey[200], fontWeight: '600', whiteSpace: 'nowrap', fontSize: '16px', py: '12px' }}>
                                                    {row.budgetCode}
                                                </TableCell>
                                                <TableCell sx={{ color: colors.grey[100], maxWidth: 320, fontSize: '16px', py: '12px' }}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center" sx={{ py: '12px' }}>
                                                    <Chip
                                                        label={row.budgetType === '1.หมวดงบแผ่นดิน' ? 'งบแผ่นดิน' : 'งบรายได้'}
                                                        size="small"
                                                        sx={{
                                                            height: 24, fontSize: '13px',
                                                            backgroundColor: budgetTypeColor[row.budgetType] || colors.primary[300],
                                                            color: '#fff', fontWeight: 'bold'
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right" sx={{ color: colors.grey[100], fontWeight: '600', fontSize: '14px', py: '12px', whiteSpace: 'nowrap' }}>
                                                    {fmt(row.budget)}
                                                </TableCell>
                                                                {[1,2,3,4].map(q => {
                                                    const disb = row[`q${q}Disbursed`] || 0
                                                    const comm = row[`q${q}Committed`] || 0
                                                    const total = disb + comm
                                                    return (
                                                    <TableCell key={q} align="right" sx={{ whiteSpace: 'nowrap', py: '12px', minWidth: 160 }}>
                                                        <Box>
                                                            <Typography display="block" sx={{ color: colors.grey[400], fontSize: '14px' }}>
                                                                แผน {row[`q${q}Budget`] > 0 ? fmt(row[`q${q}Budget`]) : '-'}
                                                            </Typography>
                                                            <Typography display="block" sx={{ color: '#4caf50', fontSize: '14px' }}>
                                                                จ่าย {disb > 0 ? fmt(disb) : '-'}
                                                            </Typography>
                                                            <Typography display="block" sx={{ color: '#ff9800', fontSize: '14px' }}>
                                                                ผูกพัน {comm > 0 ? fmt(comm) : '-'}
                                                            </Typography>
                                                            <Typography display="block" sx={{ color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', borderTop: `1px solid ${colors.primary[300]}`, mt: '2px', pt: '2px' }}>
                                                                รวม {total > 0 ? fmt(total) : '-'}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    )
                                                })}
                                                <TableCell align="center">
                                                    <BudgetBar budget={row.budget} disbursed={row.disbursed} committed={row.committed} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {total > limit && (
                                <Box display="flex" justifyContent="space-between" alignItems="center" mt="12px">
                                    <Typography variant="body2" sx={{ color: colors.grey[400] }}>
                                        แสดง {(page - 1) * limit + 1}–{Math.min(page * limit, total)} จาก {total} โครงการ
                                    </Typography>
                                    <Pagination
                                        count={Math.ceil(total / limit)}
                                        page={page}
                                        onChange={(_, val) => setPage(val)}
                                        size="small"
                                        sx={{ '& .MuiPaginationItem-root': { color: colors.grey[100] } }}
                                    />
                                </Box>
                            )}
                        </>
                    )}
                </Box>

            </Box>
        </Box>
    )
}

export default DashboardBudget
