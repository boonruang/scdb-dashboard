import React from 'react'
import { Button, useTheme } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { tokens } from 'theme'

// ปุ่มดาวน์โหลดไฟล์ Excel ตัวอย่าง (หัวคอลัมน์อย่างเดียว) จาก public/templates
// สร้างไฟล์ใหม่ด้วย scripts/make_templates.py เมื่อโครงไฟล์ของคณะเปลี่ยน
const TemplateDownloadButton = ({ file }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Button
      component="a"
      href={`${process.env.PUBLIC_URL}/templates/${file}`}
      download={file}
      sx={{
        backgroundColor: colors.primary[400], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold',
        padding: '10px 20px', mr: '10px', mb: '10px', border: `1px solid ${colors.grey[400]}`,
        '&:hover': { backgroundColor: colors.primary[300] },
      }}
    >
      <FileDownloadIcon sx={{ mr: '10px' }} />ไฟล์ตัวอย่าง
    </Button>
  )
}

export default TemplateDownloadButton
