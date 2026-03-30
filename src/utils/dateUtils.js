/**
 * แปลงค่าวันที่จาก Excel ให้เป็น ISO string "YYYY-MM-DD" (ค.ศ.)
 * รองรับ 3 รูปแบบ:
 *   1. serial number (Excel internal date)
 *   2. string "DD/MM/YYYY" ที่ปีอาจเป็นพ.ศ. (> 2400)
 *   3. string "YYYY-MM-DD" ที่ปีอาจเป็นพ.ศ. (> 2400)
 * คืนค่า null ถ้าแปลงไม่ได้
 */
export function excelDateToISO(val) {
  if (!val && val !== 0) return null
  // Date object (XLSX parse บางครั้งคืน Date object ที่ปีเป็น พ.ศ.)
  if (val instanceof Date) {
    var y = val.getFullYear()
    if (y > 2400) y -= 543
    var mo = String(val.getMonth() + 1).padStart(2, '0')
    var da = String(val.getDate()).padStart(2, '0')
    return y + '-' + mo + '-' + da
  }
  if (typeof val === 'string' && val.trim()) {
    var s = val.trim().split('T')[0]  // ตัด T00:00:00.000Z ออก
    // format DD/MM/YYYY (พ.ศ. หรือ ค.ศ.)
    var m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
    if (m) {
      var day = m[1].padStart(2, '0')
      var mon = m[2].padStart(2, '0')
      var y = parseInt(m[3])
      if (y > 2400) y -= 543
      return y + '-' + mon + '-' + day
    }
    // format YYYY-MM-DD ที่อาจเป็นพ.ศ.
    var m2 = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (m2) {
      var y2 = parseInt(m2[1])
      if (y2 > 2400) return (y2 - 543) + '-' + m2[2] + '-' + m2[3]
      return s
    }
    return null
  }
  // serial number
  if (typeof val === 'number') {
    var d = new Date(Math.round((val - 25569) * 86400 * 1000))
    return d.toISOString().split('T')[0]
  }
  return null
}
