import React, { useEffect, useState } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material'
import { tokens } from 'theme'
import { httpClient } from '../utils/HttpClient'
import { server } from '../constants'

// รายชื่อบุคลากรในหลักสูตรพร้อมบทบาท (อ่านอย่างเดียว เพิ่ม/ลบที่หน้ารายละเอียดบุคลากร)
const ProgramStaffList = ({ programId }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (!programId) return
    httpClient.get(`${server.STAFF_PROFILE_URL}/program/${programId}`).then((res) => {
      if (res.data.status === 'ok') setRows(res.data.result)
    })
  }, [programId])

  const name = (r) => [r.title_th, r.firstname_th, r.lastname_th].filter(Boolean).join(' ')

  return (
    <Box mt="30px" p="16px" sx={{ backgroundColor: colors.primary[400], borderRadius: '8px' }}>
      <Typography variant="h5" fontWeight="bold" color={colors.greenAccent[400]} mb="10px">
        บุคลากรในหลักสูตร ({rows.length} คน)
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ชื่อ-สกุล</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>ตำแหน่ง</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>บทบาท</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 && (
            <TableRow><TableCell colSpan={3} sx={{ color: colors.grey[400] }}>ยังไม่มีบุคลากร (ผูกได้ที่หน้ารายละเอียดบุคลากร)</TableCell></TableRow>
          )}
          {rows.map((r) => (
            <TableRow key={r.program_staff_id}>
              <TableCell>{name(r)}</TableCell>
              <TableCell>{r.position || '-'}</TableCell>
              <TableCell>{r.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default ProgramStaffList
