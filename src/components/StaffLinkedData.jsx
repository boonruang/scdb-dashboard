import React, { useCallback, useEffect, useState } from 'react'
import {
  Box, Button, MenuItem, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, useTheme,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { tokens } from 'theme'
import { httpClient } from '../utils/HttpClient'
import { server, ROLES } from '../constants'

// ข้อมูลที่เชื่อมกับบุคลากรหนึ่งคน: ประวัติการศึกษา, ประวัติตำแหน่งวิชาการ, หลักสูตร + บทบาท, ผลงานวิจัย
// ใช้ในหน้ารายละเอียดบุคลากร

const POSITIONS = ['อาจารย์', 'ผู้ช่วยศาสตราจารย์', 'รองศาสตราจารย์', 'ศาสตราจารย์']
const toBE = (y) => (y ? Number(y) + 543 : '-')
const thaiDate = (d) => (d ? new Date(d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) : '-')

const emptyPosition = { academic_position: '', field_of_study: '', appointed_date: '', order_no: '' }
const emptyProgram = { program_id: '', role: '' }

const StaffLinkedData = ({ staffId }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const loginReducer = useSelector((state) => state.app.loginReducer)
  const canEdit = loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor, ROLES.HR, ROLES.Academic].includes(r))

  const [data, setData] = useState(null)
  const [options, setOptions] = useState({ programs: [], roles: [] })
  const [position, setPosition] = useState(emptyPosition)
  const [program, setProgram] = useState(emptyProgram)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const res = await httpClient.get(`${server.STAFF_PROFILE_URL}/${staffId}`)
    if (res.data.status === 'ok') setData(res.data.result)
    else setError(res.data.result)
  }, [staffId])

  useEffect(() => {
    if (!staffId) return
    load()
    httpClient.get(`${server.STAFF_PROFILE_URL}/programs/options`).then((res) => {
      if (res.data.status === 'ok') setOptions(res.data.result)
    })
  }, [staffId, load])

  const send = async (request) => {
    setError('')
    const res = await request
    if (res.data.status !== 'ok') { setError(res.data.result); return false }
    await load()
    return true
  }

  const addPosition = async () => {
    const body = { ...position, staff_id: staffId, appointed_date: position.appointed_date || null }
    if (await send(httpClient.post(`${server.STAFF_PROFILE_URL}/position`, body))) setPosition(emptyPosition)
  }
  const addProgram = async () => {
    if (await send(httpClient.post(`${server.STAFF_PROFILE_URL}/program`, { ...program, staff_id: staffId }))) setProgram(emptyProgram)
  }

  const section = (title, children) => (
    <Box mt="30px" p="16px" sx={{ backgroundColor: colors.primary[400], borderRadius: '8px' }}>
      <Typography variant="h5" fontWeight="bold" color={colors.greenAccent[400]} mb="10px">{title}</Typography>
      {children}
    </Box>
  )
  const head = (cols) => (
    <TableHead><TableRow>{cols.map((c) => <TableCell key={c} sx={{ fontWeight: 'bold' }}>{c}</TableCell>)}</TableRow></TableHead>
  )
  const empty = (n, text) => <TableRow><TableCell colSpan={n} sx={{ color: colors.grey[400] }}>{text}</TableCell></TableRow>
  const delBtn = (onClick) => canEdit && <Button size="small" color="error" variant="outlined" onClick={onClick}>ลบ</Button>

  if (!data) return error ? <Typography color="error" mt="20px">{error}</Typography> : null

  return (
    <Box>
      {error && <Typography color="error" mt="20px">{error}</Typography>}

      {section('ประวัติการศึกษา', (
        <Table size="small">
          {head(['ระดับ', 'วุฒิ', 'สถาบัน', 'ปีที่จบ'])}
          <TableBody>
            {data.education.length === 0 && empty(4, 'ยังไม่มีข้อมูล (นำเข้าจากชีต ประวัติการศึกษา ในหน้านำเข้าข้อมูลบุคลากร)')}
            {data.education.map((e) => (
              <TableRow key={e.education_id}>
                <TableCell>{e.level || '-'}</TableCell><TableCell>{e.degree}</TableCell><TableCell>{e.university}</TableCell><TableCell>{e.year || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))}

      {section('ประวัติการดำรงตำแหน่งทางวิชาการ', (
        <>
          <Table size="small">
            {head(['ตำแหน่ง', 'สาขาวิชา', 'วันที่แต่งตั้ง', 'เลขที่คำสั่ง', ''])}
            <TableBody>
              {data.positions.length === 0 && empty(5, 'ยังไม่มีข้อมูล')}
              {data.positions.map((p) => (
                <TableRow key={p.history_id}>
                  <TableCell>{p.academic_position}</TableCell>
                  <TableCell>{p.field_of_study || '-'}</TableCell>
                  <TableCell>{thaiDate(p.appointed_date)}</TableCell>
                  <TableCell>{p.order_no || '-'}</TableCell>
                  <TableCell align="right">{delBtn(() => send(httpClient.delete(`${server.STAFF_PROFILE_URL}/position/${p.history_id}`)))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {canEdit && (
            <Box display="flex" gap="10px" mt="12px" flexWrap="wrap">
              <TextField select required size="small" label="ตำแหน่ง" sx={{ minWidth: 200 }}
                value={position.academic_position} onChange={(e) => setPosition({ ...position, academic_position: e.target.value })}>
                {POSITIONS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </TextField>
              <TextField size="small" label="สาขาวิชา" value={position.field_of_study}
                onChange={(e) => setPosition({ ...position, field_of_study: e.target.value })} />
              <TextField size="small" type="date" label="วันที่แต่งตั้ง" InputLabelProps={{ shrink: true }} value={position.appointed_date}
                onChange={(e) => setPosition({ ...position, appointed_date: e.target.value })} />
              <TextField size="small" label="เลขที่คำสั่ง" value={position.order_no}
                onChange={(e) => setPosition({ ...position, order_no: e.target.value })} />
              <Button variant="contained" color="success" disabled={!position.academic_position} onClick={addPosition}>เพิ่ม</Button>
            </Box>
          )}
        </>
      ))}

      {section('หลักสูตรและบทบาท', (
        <>
          <Table size="small">
            {head(['หลักสูตร/สาขา', 'ระดับ', 'บทบาท', ''])}
            <TableBody>
              {data.programs.length === 0 && empty(4, 'ยังไม่ได้ผูกกับหลักสูตร')}
              {data.programs.map((p) => (
                <TableRow key={p.program_staff_id}>
                  <TableCell>{p.program_name}</TableCell>
                  <TableCell>{p.degree_level || '-'}</TableCell>
                  <TableCell>{p.role}</TableCell>
                  <TableCell align="right">{delBtn(() => send(httpClient.delete(`${server.STAFF_PROFILE_URL}/program/${p.program_staff_id}`)))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {canEdit && (
            <Box display="flex" gap="10px" mt="12px" flexWrap="wrap">
              <TextField select required size="small" label="หลักสูตร" sx={{ minWidth: 280 }}
                value={program.program_id} onChange={(e) => setProgram({ ...program, program_id: e.target.value })}>
                {options.programs.map((p) => (
                  <MenuItem key={p.program_id} value={p.program_id}>{p.program_name}{p.degree_level ? ` (${p.degree_level})` : ''}</MenuItem>
                ))}
              </TextField>
              <TextField select required size="small" label="บทบาท" sx={{ minWidth: 220 }}
                value={program.role} onChange={(e) => setProgram({ ...program, role: e.target.value })}>
                {options.roles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </TextField>
              <Button variant="contained" color="success" disabled={!program.program_id || !program.role} onClick={addProgram}>เพิ่ม</Button>
            </Box>
          )}
        </>
      ))}

      {section(`ผลงานวิจัย (${data.publications.length} เรื่อง)`, (
        <Table size="small">
          {head(['ปีเผยแพร่ (พ.ศ.)', 'ชื่อเรื่อง', 'วารสาร', 'Quartile'])}
          <TableBody>
            {data.publications.length === 0 && empty(4, data.authorLinked
              ? 'ยังไม่มีผลงานที่ผูกกับบุคลากรคนนี้'
              : 'ยังไม่พบใน Author profile (จับคู่ด้วยเลขประจำตำแหน่ง)')}
            {data.publications.map((p) => (
              <TableRow key={p.pub_id}>
                <TableCell>{toBE(p.publication_year)}</TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.journal_name}</TableCell>
                <TableCell>{p.quartile || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))}
    </Box>
  )
}

export default StaffLinkedData
