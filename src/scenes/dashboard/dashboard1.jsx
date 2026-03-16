import React, { useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from "../../theme"
import Header from '../../components/Header'
import BarChartTecherDept from "../../components/BarChartTecherDept"
import BarChartAcademic from "../../components/BarChartAcademic"
import BarChartStaff from "../../components/BarChartStaff"
import BarChartTeacher from "../../components/BarChartTeacher"
import BarChartAcademicPosition from "../../components/BarChartAcademicPosition"
import { useDispatch, useSelector } from 'react-redux'
import { getDashboard } from 'actions/dashboard1.action'

// ── KPI card config ───────────────────────────────────────────────────
const KPI_CONFIG = [
    { label: 'อาจารย์ทั้งหมด', bg: '#1a2d4a', accent: '#60a5fa' },
    { label: 'สายสนับสนุน',    bg: '#142d1e', accent: '#4ade80' },
    { label: 'บุคลากรรวม',     bg: '#2d1640', accent: '#c084fc' },
    { label: 'ภาควิชา',        bg: '#2d200a', accent: '#fbbf24' },
]

const KpiCard = ({ label, value, accent, bg }) => (
    <Box sx={{
        backgroundColor: bg,
        borderLeft: `4px solid ${accent}`,
        borderRadius: '8px',
        p: '20px 24px',
        display: 'flex', flexDirection: 'column', gap: '4px',
        height: '100%', boxSizing: 'border-box',
    }}>
        <Typography variant="h6" sx={{ color: accent, fontWeight: 600 }}>{label}</Typography>
        <Typography variant="h2" fontWeight="bold" sx={{ color: '#fff' }}>{value ?? '-'}</Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>คน</Typography>
    </Box>
)

const ChartCard = ({ title, children, chartHeight = '220px' }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Box sx={{
            backgroundColor: colors.primary[400],
            borderRadius: '8px',
            p: '16px 20px',
            height: '100%', boxSizing: 'border-box',
        }}>
            <Typography variant="h5" fontWeight="600" mb="4px" sx={{ color: colors.grey[100] }}>
                {title}
            </Typography>
            <Box height={chartHeight}>
                {children}
            </Box>
        </Box>
    )
}

const Dashboard1 = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDashboard())
    }, [dispatch])

    const { result } = useSelector((state) => state.app.dashboard1Reducer)

    const academicWork  = result?.academicWork || []
    const totalAcademic = academicWork.reduce((s, d) => s + parseInt(d.academic || 0), 0)
    const totalStaff    = academicWork.reduce((s, d) => s + parseInt(d.staff    || 0), 0)
    const totalAll      = totalAcademic + totalStaff
    const deptCount     = academicWork.length

    const kpiValues = [totalAcademic, totalStaff, totalAll, deptCount]

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="แดชบอร์ดข้อมูลด้านบุคลากร" subtitle="" />
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 — KPI Cards */}
                {KPI_CONFIG.map((c, i) => (
                    <Box key={i} gridColumn="span 3" gridRow="span 1">
                        <KpiCard label={c.label} value={kpiValues[i]} accent={c.accent} bg={c.bg} />
                    </Box>
                ))}

                {/* ROW 2–3 — Charts บุคลากร */}
                <Box gridColumn="span 4" gridRow="span 2">
                    <ChartCard title="บุคลากรรวมตามสาขา">
                        {academicWork.length > 0 && <BarChartAcademic isDashboard={true} data={academicWork} />}
                    </ChartCard>
                </Box>

                <Box gridColumn="span 4" gridRow="span 2">
                    <ChartCard title="อาจารย์ตามสาขา">
                        {academicWork.length > 0 && <BarChartTeacher isDashboard={true} data={academicWork} />}
                    </ChartCard>
                </Box>

                <Box gridColumn="span 4" gridRow="span 2">
                    <ChartCard title="สายสนับสนุนตามสาขา">
                        {academicWork.length > 0 && <BarChartStaff isDashboard={true} data={academicWork} />}
                    </ChartCard>
                </Box>

                {/* ROW 4–5 — ตำแหน่งทางวิชาการ */}
                <Box gridColumn="span 4" gridRow="span 2">
                    <ChartCard title="ตำแหน่งทางวิชาการ">
                        {result?.academicPosition && <BarChartAcademicPosition isDashboard={true} data={result.academicPosition} />}
                    </ChartCard>
                </Box>

                <Box gridColumn="span 8" gridRow="span 2">
                    <ChartCard title="ตำแหน่งทางวิชาการตามสาขา">
                        {result?.academicPositionDept && <BarChartTecherDept isDashboard={true} data={result.academicPositionDept} />}
                    </ChartCard>
                </Box>

            </Box>
        </Box>
    )
}

export default Dashboard1
