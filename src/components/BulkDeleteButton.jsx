import React from 'react'
import { Button } from '@mui/material'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { httpClient } from '../utils/HttpClient'
import { server } from '../constants'

// ปุ่มลบรายการที่ติ๊กเลือกใน DataGrid (ลบจริงใน DB) ใช้คู่กับ checkboxSelection
// entity: budgetplan | budgetactivity | budgetdisbursement | publication | authorprofile
const BulkDeleteButton = ({ entity, selected, onDone, sx }) => {
  const count = selected?.length || 0
  if (!count) return null

  const handleClick = async () => {
    if (!window.confirm(`ลบข้อมูลที่เลือก ${count} รายการ?\nลบแล้วกู้คืนไม่ได้`)) return
    try {
      const res = await httpClient.post(`${server.BULK_DELETE_URL}/${entity}`, { ids: selected })
      if (res.data.status === 'ok') alert(`ลบแล้ว ${res.data.deleted} รายการ`)
      else alert('ลบไม่สำเร็จ: ' + res.data.result)
    } catch (e) {
      alert('ลบไม่สำเร็จ: ' + (e.response?.data?.result || e.message))
    }
    onDone && onDone()
  }

  return (
    <Button sx={sx} onClick={handleClick}>
      <DeleteSweepIcon sx={{ mr: '10px' }} />ลบที่เลือก ({count})
    </Button>
  )
}

// ล้างงบประมาณทั้งปีงบ: เบิกจ่าย → กิจกรรม → แผน ไว้ใช้ก่อน import ไฟล์ทั้งปีใหม่
export const clearBudgetFiscalYear = async (onDone) => {
  const year = window.prompt('ล้างข้อมูลงบประมาณทั้งปีงบ (แผน + ขออนุมัติ + เบิกจ่าย)\nพิมพ์ปีงบประมาณ พ.ศ. เช่น 2569')
  if (!year) return
  const be = parseInt(year)
  if (!be || be < 2500) { alert('ปีงบประมาณไม่ถูกต้อง'); return }
  if (window.prompt(`ยืนยันการลบข้อมูลงบประมาณปี ${be} ทั้งหมด\nพิมพ์ ${be} อีกครั้งเพื่อยืนยัน`) !== String(be)) return
  try {
    const res = await httpClient.post(`${server.BULK_DELETE_URL}/budget/fiscal-year`, { fiscal_year: be })
    if (res.data.status === 'ok') {
      const d = res.data.deleted
      alert(`ล้างปีงบ ${be} แล้ว\n• แผน: ${d.plans}\n• ขออนุมัติ: ${d.activities}\n• เบิกจ่าย: ${d.disbursements}`)
    } else alert('ลบไม่สำเร็จ: ' + res.data.result)
  } catch (e) {
    alert('ลบไม่สำเร็จ: ' + (e.response?.data?.result || e.message))
  }
  onDone && onDone()
}

export default BulkDeleteButton
