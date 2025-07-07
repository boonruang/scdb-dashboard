import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box,Typography } from '@mui/material'
  
const Terms = () => {
    return (
      <Box m="20px" display="flex" justifyContent="center">
        <Box height="80vh" width="100%" maxWidth="800px" textAlign="left">
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            ข้อตกลงและเงื่อนไขการใช้งาน
          </Typography>
  
          <Typography variant="body1" paragraph>
            การเข้าใช้งานระบบนี้ถือว่าผู้ใช้งานยอมรับข้อตกลงและเงื่อนไขการใช้งานทั้งหมดที่ระบุไว้ด้านล่างนี้ โปรดอ่านอย่างรอบคอบก่อนดำเนินการต่อ
          </Typography>
  
          <Typography variant="h6" gutterBottom>
            1. การเก็บข้อมูล
          </Typography>
          <Typography variant="body2" paragraph>
            ระบบอาจมีการเก็บข้อมูลส่วนบุคคล เช่น ชื่อผู้ใช้งาน อีเมล หรือข้อมูลอื่น ๆ ที่เกี่ยวข้อง เพื่อใช้ในการยืนยันตัวตนและให้บริการต่าง ๆ อย่างเหมาะสม
          </Typography>
  
          <Typography variant="h6" gutterBottom>
            2. ความปลอดภัยของบัญชี
          </Typography>
          <Typography variant="body2" paragraph>
            ผู้ใช้งานต้องรับผิดชอบในการเก็บรักษาชื่อผู้ใช้และรหัสผ่านให้ปลอดภัย หากพบว่ามีการใช้งานโดยไม่ได้รับอนุญาต กรุณาแจ้งผู้ดูแลระบบทันที
          </Typography>
  
          <Typography variant="h6" gutterBottom>
            3. การใช้งานที่เหมาะสม
          </Typography>
          <Typography variant="body2" paragraph>
            ห้ามนำระบบไปใช้ในทางที่ผิดกฎหมายหรือขัดต่อศีลธรรม เช่น การเผยแพร่ข้อมูลอันไม่เหมาะสม หรือเจตนาทำลายระบบ
          </Typography>
  
          <Typography variant="h6" gutterBottom>
            4. การแก้ไขข้อตกลง
          </Typography>
          <Typography variant="body2" paragraph>
            ผู้ดูแลระบบมีสิทธิ์ในการเปลี่ยนแปลงหรือปรับปรุงข้อตกลงและเงื่อนไขการใช้งานได้ตลอดเวลา โดยไม่จำเป็นต้องแจ้งให้ทราบล่วงหน้า
          </Typography>
  
          <Typography variant="body1" paragraph>
            หากท่านไม่เห็นด้วยกับเงื่อนไขข้างต้น กรุณาหยุดการใช้งานระบบนี้ทันที
          </Typography>
        </Box>
      </Box>
    );
  };
  
  export default Terms;