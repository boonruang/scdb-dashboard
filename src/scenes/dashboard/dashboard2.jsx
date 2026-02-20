import React, { useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from "../../theme"
import Header from '../../components/Header'
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import StatBox from "../../components/StatBox"
import StatBoxStudent from "../../components/StatBoxStudent"
import { useDispatch, useSelector } from 'react-redux'
import { getDashboard } from 'actions/dashboard2.action'

// ── Gauge colors ─────────────────────────────────────────────────────
// กำหนดสีแต่ละ gauge ได้ที่นี่
const GAUGE_COLORS = [
    '#f59e0b', // สถิติ         — amber
    '#6366f1', // คณิตศาสตร์   — indigo
    '#3b82f6', // เคมี          — blue
    '#06b6d4', // นวัฒกรรมชีวเคมี — cyan
    '#22c55e', // ชีววิทยา     — green
    '#84cc16', // จุลชีววิทยา  — lime
    '#a16207', // พันธุศาสตร์   — yellow-dark
    '#ef4444', // ฟิสิกส์       — red
    '#f97316', // ประยุกต์      — orange
    '#ec4899', // ประยุกต์พลังงาน — pink
    '#8b5cf6', // ประยุกต์อิเล็กทรอนิกส์ — violet
    '#14b8a6', // พลังงาน      — teal
    '#f43f5e', // กศ.บ.ฟิสิกส์ — rose
    '#a855f7', // ฟิสิกส์ 2.1  — purple
    '#d946ef', // ฟิสิกส์ 2.2  — fuchsia
    '#16a34a', // รวม           — green-dark
]

// ── Mock data (ใช้ชั่วคราวจนกว่าข้อมูลจริงจะพร้อม) ───────────────────
const MOCK = {
    amountDept: 4,
    amountBachelor: 15,
    amountMaster: 8,
    amountPhd: 6,
    studentStat: 54,       studentStatPercent: 0.54,
    studentMath: 339,      studentMathPercent: 0.82,
    studentChem: 465,      studentChemPercent: 0.91,
    studentBioChemInno: 118, studentBioChemInnoPercent: 0.65,
    studentBio: 571,       studentBioPercent: 0.88,
    studentMicro: 261,     studentMicroPercent: 0.72,
    studentGen: 67,        studentGenPercent: 0.45,
    studentPhysic: 95,     studentPhysicPercent: 0.60,
    studentApply: 31,      studentApplyPercent: 0.38,
    studentApplyEnergy: 2, studentApplyEnergyPercent: 0.10,
    studentApplyElec: 3,   studentApplyElecPercent: 0.15,
    studentEnergy: 54,     studentEnergyPercent: 0.50,
    studentPhysicEdu: 118, studentPhysicEduPercent: 0.65,
    studentPhysic21: 8,    studentPhysic21Percent: 0.20,
    studentPhysic22: 5,    studentPhysic22Percent: 0.12,
    studentTotal: 2191,    studentTotalPercent: 1.0,
}

const Dashboard2 = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    useEffect(() => {
        dispatch(getDashboard())
    }, [dispatch])

    const dashboard2Reducer = useSelector((state) => state.app.dashboard2Reducer)

    // ใช้ข้อมูลจาก API ถ้ามี ไม่งั้นใช้ mock
    const d = (dashboard2Reducer.result && dashboard2Reducer.result.studentTotal > 0)
        ? dashboard2Reducer.result
        : MOCK

    const gauges = [
        { title: d.studentStat,         subtitle: 'สถิติ',                    progress: d.studentStatPercent,         color: GAUGE_COLORS[0]  },
        { title: d.studentMath,         subtitle: 'คณิตศาสตร์',               progress: d.studentMathPercent,         color: GAUGE_COLORS[1]  },
        { title: d.studentChem,         subtitle: 'เคมี',                     progress: d.studentChemPercent,         color: GAUGE_COLORS[2]  },
        { title: d.studentBioChemInno,  subtitle: 'นวัฒกรรมชีวเคมี',           progress: d.studentBioChemInnoPercent,  color: GAUGE_COLORS[3]  },
        { title: d.studentBio,          subtitle: 'ชีววิทยา',                  progress: d.studentBioPercent,          color: GAUGE_COLORS[4]  },
        { title: d.studentMicro,        subtitle: 'จุลชีววิทยา',               progress: d.studentMicroPercent,        color: GAUGE_COLORS[5]  },
        { title: d.studentGen,          subtitle: 'พันธุศาสตร์โมเลกุล',        progress: d.studentGenPercent,          color: GAUGE_COLORS[6]  },
        { title: d.studentPhysic,       subtitle: 'ฟิสิกส์',                   progress: d.studentPhysicPercent,       color: GAUGE_COLORS[7]  },
        { title: d.studentApply,        subtitle: 'ประยุกต์',                   progress: d.studentApplyPercent,        color: GAUGE_COLORS[8]  },
        { title: d.studentApplyEnergy,  subtitle: 'ประยุกต์พลังงาน',            progress: d.studentApplyEnergyPercent,  color: GAUGE_COLORS[9]  },
        { title: d.studentApplyElec,    subtitle: 'ประยุกต์อิเล็กทรอนิกส์',    progress: d.studentApplyElecPercent,    color: GAUGE_COLORS[10] },
        { title: d.studentEnergy,       subtitle: 'พลังงาน',                   progress: d.studentEnergyPercent,       color: GAUGE_COLORS[11] },
        { title: d.studentPhysicEdu,    subtitle: 'กศ.บ.ฟิสิกส์',              progress: d.studentPhysicEduPercent,    color: GAUGE_COLORS[12] },
        { title: d.studentPhysic21,     subtitle: 'ฟิสิกส์ 2.1',              progress: d.studentPhysic21Percent,     color: GAUGE_COLORS[13] },
        { title: d.studentPhysic22,     subtitle: 'ฟิสิกส์ 2.2',              progress: d.studentPhysic22Percent,     color: GAUGE_COLORS[14] },
        { title: d.studentTotal,        subtitle: 'รวม',                       progress: 1.0,                          color: GAUGE_COLORS[15] },
    ]

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="แดชบอร์ดข้อมูลด้านนิสิต" subtitle="" />
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 — หลักสูตร */}
                {[
                    { title: d.amountDept,     subtitle: 'ภาควิชา' },
                    { title: d.amountBachelor, subtitle: 'หลักสูตร ป.ตรี' },
                    { title: d.amountMaster,   subtitle: 'หลักสูตร ป.โท' },
                    { title: d.amountPhd,      subtitle: 'หลักสูตร ป.เอก' },
                ].map((item, i) => (
                    <Box
                        key={i}
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBoxStudent
                            title={item.title}
                            subtitle={item.subtitle}
                            icon={<PeopleOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                        />
                    </Box>
                ))}

                {/* ROW 2–5 — gauge นิสิตรายหลักสูตร */}
                {gauges.map((g, i) => (
                    <Box
                        key={i}
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={g.title}
                            subtitle={g.subtitle}
                            progress={g.progress}
                            increase={`${((g.progress || 0) * 100).toFixed(0)}%`}
                            color={g.color}
                            icon={<PeopleOutlinedIcon sx={{ color: g.color, fontSize: '26px' }} />}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Dashboard2
