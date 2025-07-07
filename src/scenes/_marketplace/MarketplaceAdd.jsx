import { Container, Grid, Box, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import Header from 'components/Header'
import { Formik, Form } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import Textfield from 'components/FormsUI/Textfield'

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: useTheme().spacing(5),
    marginBottom: useTheme().spacing(8)
    }
  })
)

const INITIAL_FORM_STATE = {
  marketplacename: '',
  address: '',
  tambon: '',
  amphoe: '',
  province: '',
  postcode: '',
  latitude: '',
  longitude: '',
}

const FORM_VALIDATION = Yup.object().shape({
  marketplacename: Yup.string()
    .required('โปรดระบุ'),
  address: Yup.string()
    .required('โปรดระบุ'),
  tambon: Yup.string()
    .required('โปรดระบุ'),
  amphoe: Yup.string()
    .required('โปรดระบุ'),
  province: Yup.string()
    .required('โปรดระบุ'),
  postcode: Yup.string()
    .required('โปรดระบุ'),    
  latitude: Yup.number()
    .required('โปรดระบุ'),
  longitude: Yup.number()
    .required('โปรดระบุ'),    
})

const MarketplaceAdd = () => {
  const classes = useStyles()

  return (
      <div>
          <Grid container>
            <Grid item xs={12}>
              <Header title="เพิ่มข้อมูล" subtitle="แหล่งขายสินค้าการเกษตร"/>
            </Grid>
            <Container maxWidth="md">
              <div className={classes.formWrapper} >
                  <Formik 
                  initialValues={{
                    ...INITIAL_FORM_STATE
                  }}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={values => {
                    console.log('onSubmit values', values)
                  }}
                  >
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography>
                            รายละเอียดข้อมูล
                          </Typography>

                          <Grid item xs={6}>
                            <Textfield
                              name="marketplacename"
                              label="ชื่อสถานที่"
                            />
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Textfield
                              name="address"
                              label="ที่อยู่"
                            />
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Textfield
                              name="tambon"
                              label="ตำบล"
                            />
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Textfield
                              name="amphoe"
                              label="อำเภอ"
                            />
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Textfield
                              name="province"
                              label="จังหวัด"
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <Textfield
                              name="postcode"
                              label="รหัสไปรษณีย์"
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <Textfield
                              name="latitude"
                              label="ละติจูด"
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <Textfield
                              name="longitude"
                              label="ลองจิจูด"
                            />
                          </Grid>
                          <Grid item xs={6}>
                          <Button
                            variant="contained"
                            color="primary"
                          >
                            บันทึก
                          </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Form>
                  </Formik>
              </div>
            </Container>
          </Grid>
      </div>

  )
}

export default MarketplaceAdd