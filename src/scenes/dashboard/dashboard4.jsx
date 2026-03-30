import React, { useEffect, useState, useCallback } from 'react'
import {
    Box, Typography, useTheme, useMediaQuery, CircularProgress,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField, InputAdornment,
    MenuItem, Select, FormControl, InputLabel, Pagination
} from '@mui/material'
import { tokens } from "../../theme"
import Header from '../../components/Header'
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import { getResearchSummary, getResearchPublications } from '../../actions/dashboardResearch.action'
import BarChartResearchScopusYear from '../../components/BarChartResearchScopusYear'
import BarChartResearchQuartile from '../../components/BarChartResearchQuartile'
import PieChartResearchDept from '../../components/PieChartResearchDept'
import BarChartResearchType from '../../components/BarChartResearchType'

// ── ปีงบประมาณ options ───────────────────────────────────────────────
const currentBE = new Date().getFullYear() + 543
const fiscalYearOptions = [currentBE, currentBE - 1, currentBE - 2, currentBE - 3]

// ── แปลง field EN → TH สำหรับ Nivo chart ───────────────────────────
const transformScopusYear = (data = []) =>
    data.map(d => ({ year: d.year, 'Scopus': d.publications, 'ISI': d.isi }))

const transformQuartile = (data = []) =>
    data.map(d => ({ quartile: d.quartile, 'จำนวน': d.count }))

const transformCollabType = (data = []) =>
    data.map(d => ({ type: d.type, 'ปีปัจจุบัน': d.currentYear, 'ปีก่อนหน้า': d.prevYear }))

// ── KPI Card ─────────────────────────────────────────────────────────
const KpiCard = ({ icon, value, label, color, colSpan }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Box
            gridColumn={`span ${colSpan || 3}`}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box width="100%" m="0 24px">
                <Box display="flex" alignItems="center" gap="10px" mb="4px">
                    <Box sx={{ color: color || colors.greenAccent[500] }}>{icon}</Box>
                    <Typography variant="h2" fontWeight="bold" sx={{ color: colors.grey[100] }}>
                        {value}
                    </Typography>
                </Box>
                <Typography variant="h5" sx={{ color: colors.greenAccent[400] }}>
                    {label}
                </Typography>
            </Box>
        </Box>
    )
}

// ── Main Dashboard ───────────────────────────────────────────────────
const DashboardResearch = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const { summary, isFetchingSummary, publications, isFetchingPub } =
        useSelector((state) => state.app.dashboardResearchReducer)

    const isTablet  = useMediaQuery(theme.breakpoints.down('lg'))  // < 1200px
    const isMobile  = useMediaQuery(theme.breakpoints.down('sm'))  // < 600px
    const kpiSpan   = isMobile ? 12 : isTablet ? 6 : 3
    const chartSpan = isMobile ? 12 : isTablet ? 12 : null        // null = ใช้ค่าเดิม

    const [fiscalYear, setFiscalYear] = useState(currentBE - 1) // ข้อมูลจริงอยู่ที่ 2568
    const [search, setSearch]         = useState('')
    const [dept, setDept]             = useState('')
    const [quartile, setQuartile]     = useState('')
    const [page, setPage]             = useState(1)
    const limit = 10

    useEffect(() => {
        dispatch(getResearchSummary(fiscalYear))
    }, [dispatch, fiscalYear])

    const loadPublications = useCallback(() => {
        dispatch(getResearchPublications({ fiscalYear, search, dept, quartile, page, limit }))
    }, [dispatch, fiscalYear, search, dept, quartile, page])

    useEffect(() => {
        loadPublications()
    }, [loadPublications])

    useEffect(() => {
        setPage(1)
    }, [search, dept, quartile, fiscalYear])

    const kpi = summary?.kpi || {}

    return (
        <Box m="20px">
            {/* Header + Year Filter */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="4px">
                <Header
                    title="แดชบอร์ดข้อมูลด้านการวิจัย"
                    subtitle="ฝ่ายวิจัย คณะวิทยาศาสตร์ มหาวิทยาลัยมหาสารคาม"
                />
                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel sx={{ color: colors.grey[300] }}>ปีงบประมาณ</InputLabel>
                    <Select
                        value={fiscalYear}
                        label="ปีงบประมาณ"
                        onChange={(e) => setFiscalYear(e.target.value)}
                        sx={{ color: colors.grey[100] }}
                    >
                        {fiscalYearOptions.map(y => (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {isFetchingSummary && (
                <Box display="flex" justifyContent="center" my="40px">
                    <CircularProgress />
                </Box>
            )}

            {/* GRID */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ===== ROW 1 : KPI ===== */}
                <KpiCard icon={<PeopleOutlinedIcon sx={{ fontSize: 28 }} />} value={kpi.totalTeachers != null ? kpi.totalTeachers.toLocaleString() : '-'} label="อาจารย์ทั้งหมด" color={colors.greenAccent[500]} colSpan={kpiSpan} />
                <KpiCard icon={<FormatQuoteIcon sx={{ fontSize: 28 }} />} value={kpi.citations > 0 ? kpi.citations.toLocaleString() : '-'} label={`Citations (${fiscalYear})`} color={colors.blueAccent[400]} colSpan={kpiSpan} />
                <KpiCard icon={<StarOutlineIcon sx={{ fontSize: 28 }} />} value={kpi.hIndex > 0 ? kpi.hIndex.toLocaleString() : '-'} label="H-index เฉลี่ย" color="#f0b429" colSpan={kpiSpan} />
                <KpiCard icon={<ArticleOutlinedIcon sx={{ fontSize: 28 }} />} value={kpi.publishingTeachers != null ? kpi.publishingTeachers.toLocaleString() : '-'} label="อาจารย์ที่มีผลงานตีพิมพ์" color={colors.redAccent[400]} colSpan={kpiSpan} />

                {/* ===== ROW 2-3 : SCOPUS YEAR BAR + PIE ===== */}
                <Box gridColumn={`span ${chartSpan || 8}`} gridRow="span 2" backgroundColor={colors.primary[400]} p="20px">
                    <Typography variant="h5" fontWeight="600" mb="10px">ผลงานตีพิมพ์ Scopus และ ISI เปรียบเทียบรายปี</Typography>
                    <Box height="240px">
                        {summary?.scopusByYear ? (
                            <BarChartResearchScopusYear isDashboard={true} data={transformScopusYear(summary.scopusByYear)} />
                        ) : (
                            <Box display="flex" alignItems="center" justifyContent="center" height="100%"><CircularProgress size={28} /></Box>
                        )}
                    </Box>
                </Box>

                <Box gridColumn={`span ${chartSpan || 4}`} gridRow="span 2" backgroundColor={colors.primary[400]} p="20px">
                    <Typography variant="h5" fontWeight="600" mb="10px">สัดส่วนผลงานแยกตามสาขา (%)</Typography>
                    <Box height="240px">
                        {summary?.byDept ? (
                            <PieChartResearchDept data={summary.byDept} />
                        ) : (
                            <Box display="flex" alignItems="center" justifyContent="center" height="100%"><CircularProgress size={28} /></Box>
                        )}
                    </Box>
                </Box>

                {/* ===== ROW 4-5 : QUARTILE BAR + TYPE HORIZONTAL ===== */}
                <Box gridColumn={`span ${chartSpan || 6}`} gridRow="span 2" backgroundColor={colors.primary[400]} p="20px">
                    <Typography variant="h5" fontWeight="600" mb="10px">ผลงานตีพิมพ์ Scopus แยกตาม Quartile</Typography>
                    <Box height="240px">
                        {summary?.byQuartile ? (
                            <BarChartResearchQuartile isDashboard={true} data={transformQuartile(summary.byQuartile)} />
                        ) : (
                            <Box display="flex" alignItems="center" justifyContent="center" height="100%"><CircularProgress size={28} /></Box>
                        )}
                    </Box>
                </Box>

                <Box gridColumn={`span ${chartSpan || 6}`} gridRow="span 2" backgroundColor={colors.primary[400]} p="20px">
                    <Typography variant="h5" fontWeight="600" mb="10px">ผลงานตีพิมพ์ Scopus แยกตามประเภทการร่วมมือ</Typography>
                    <Box height="240px">
                        {summary?.byCollabType ? (
                            <BarChartResearchType isDashboard={true} data={transformCollabType(summary.byCollabType)} />
                        ) : (
                            <Box display="flex" alignItems="center" justifyContent="center" height="100%"><CircularProgress size={28} /></Box>
                        )}
                    </Box>
                </Box>

                {/* ===== ROW 6-8 : AUTHORS TABLE + PUBLICATIONS TABLE ===== */}
                <Box
                    gridColumn={`span ${chartSpan || 4}`}
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    overflow="auto"
                >
                    <Typography variant="h5" fontWeight="600" mb="12px">
                        อันดับผู้แต่งที่มีผลงานสูงสุด
                    </Typography>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }}>#</TableCell>
                                    <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }}>ชื่อ</TableCell>
                                    <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }}>สาขา</TableCell>
                                    <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }} align="center">ผลงาน</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {summary?.topAuthors?.map((row) => (
                                    <TableRow key={row.rank}>
                                        <TableCell sx={{ color: colors.grey[300], fontSize: '14px' }}>{row.rank}</TableCell>
                                        <TableCell sx={{ color: colors.grey[100], fontSize: '14px' }}>{row.name}</TableCell>
                                        <TableCell sx={{ color: colors.grey[300], fontSize: '14px' }}>{row.dept}</TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{ color: colors.greenAccent[400], fontWeight: 'bold', fontSize: '14px' }}>
                                                {row.count}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box
                    gridColumn={`span ${chartSpan || 8}`}
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    overflow="auto"
                >
                    <Typography variant="h5" fontWeight="600" mb="12px">
                        รายการผลงานตีพิมพ์ Scopus
                    </Typography>

                    {/* Filters */}
                    <Box display="flex" gap="10px" mb="10px" flexWrap="wrap">
                        <TextField
                            size="small"
                            placeholder="ค้นหาชื่อเรื่อง / ผู้แต่ง"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ flexGrow: 1 }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>ภาควิชา</InputLabel>
                            <Select value={dept} label="ภาควิชา" onChange={(e) => setDept(e.target.value)}>
                                <MenuItem value="">ทั้งหมด</MenuItem>
                                <MenuItem value="ภาควิชาชีววิทยา">ภาควิชาชีววิทยา</MenuItem>
                                <MenuItem value="ภาควิชาคณิตศาสตร์">ภาควิชาคณิตศาสตร์</MenuItem>
                                <MenuItem value="ภาควิชาเคมี">ภาควิชาเคมี</MenuItem>
                                <MenuItem value="ภาควิชาฟิสิกส์">ภาควิชาฟิสิกส์</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 100 }}>
                            <InputLabel>Q</InputLabel>
                            <Select value={quartile} label="Q" onChange={(e) => setQuartile(e.target.value)}>
                                <MenuItem value="">ทั้งหมด</MenuItem>
                                {['Q1', 'Q2', 'Q3', 'Q4', 'Tier 1'].map(q => (
                                    <MenuItem key={q} value={q}>{q}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {isFetchingPub ? (
                        <Box display="flex" justifyContent="center" mt="20px">
                            <CircularProgress size={28} />
                        </Box>
                    ) : (
                        <>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }}>ผู้แต่ง</TableCell>
                                            <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }}>สาขา</TableCell>
                                            <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }}>ชื่อเรื่อง</TableCell>
                                            <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }} align="center">ปี</TableCell>
                                            <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }} align="center">Q</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {publications?.data?.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell sx={{ color: colors.grey[100], whiteSpace: 'nowrap', fontSize: '14px' }}>{row.author}</TableCell>
                                                <TableCell sx={{ color: colors.grey[300], fontSize: '14px' }}>{row.dept}</TableCell>
                                                <TableCell sx={{ color: colors.grey[200], maxWidth: 260, fontSize: '14px' }}>{row.title}</TableCell>
                                                <TableCell align="center" sx={{ color: colors.grey[300], fontSize: '14px' }}>{row.year}</TableCell>
                                                <TableCell align="center">
                                                    <Typography sx={{
                                                        color: (row.quartile === 'Q1' || row.quartile === 'Tier 1')
                                                            ? colors.greenAccent[400] : colors.grey[300],
                                                        fontWeight: 'bold',
                                                        fontSize: '14px'
                                                    }}>
                                                        {row.quartile}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {publications?.total > limit && (
                                <Box display="flex" justifyContent="center" mt="10px">
                                    <Pagination
                                        count={Math.ceil(publications.total / limit)}
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

export default DashboardResearch
