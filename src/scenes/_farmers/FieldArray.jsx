import React, { useState } from 'react';
import { Box, Card, CardContent, Grid,Button, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import { array, boolean, number, object, string, ValidationError } from 'yup';
import Header from "../../components/Header"
// import { Typography } from '@mui/material';


const emptyDonation = { institution: '', percentage: 0}
const useStyles = makeStyles((theme) => ({
  errorColor: {
    color: theme.palette.error.main
  },
  stretch : {
    flexGrow : 1
  }
}))

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function Home() {

const classes = useStyles()
  
  return <Box m="20px">
  <Header title="Field Array Explore" />
  <Box>
    <Card>
      <CardContent>
        <Formik 
        initialValues={{
          fullName: '',
          donationsAmount: 0,
          termsAndConditions: false,
          donations: [emptyDonation]
        }} 
        validationSchema={object({
          fullName: string()
          .required('Your name is required')
          .min(2, 'Your name needs to be at least 3 characters')
          .max(10, 'Your name needs to be at most 10 characters'),
        donationsAmount: number().required().min(10),
        termsAndConditions: boolean().required().isTrue(),
        donations: array(object({
              institution: string().required().min(3).max(10),
              percentage: number().required('percentage is needed')
              .min(1, 'percentage needs to be at least 1')
              .max(100,'percentage not bigger than 100')
          })
        ).min(1)
        .max(3)
        .test((donations) => {
            const sum = donations.reduce((acc,curr) => acc + curr.percentage, 0)
            if (sum !== 100) {
              return new ValidationError(`Percentage shoud 100%, but you have ${sum}%`,
                 undefined,
                 'donations'
              )
            }
            return true
          })
        })}
        onSubmit={async ( values ) => {
          console.log('my values',values)
          return new Promise(res => setTimeout(res, 2500))
        }}
          >
          {({values,errors, isValid, isSubmitting}) => (
            <Form autoComplete='off'>
              <Grid container direction='column' spacing={2} >
                <Grid item>
                    <Field 
                    fullWidth
                    name="fullName" 
                    component={TextField} 
                    label="Full Name"/>
                </Grid>

                <Grid item>
                    <Field 
                    fullWidth
                    name="donationsAmount" 
                    type="number" 
                    component={TextField} l
                    label="Donamtion (THB)"/>
                </Grid>

                <FieldArray name='donations'>
                  {({push, remove, }) => (
                    <React.Fragment>
                      <Grid item>
                        <Typography variant='body2'>All your donations</Typography>
                      </Grid>
                      {values.donations.map((_, index) => (
                        <Grid container item key={index} spacing={2}>
                          <Grid item xs={12} sm="auto" className={classes.stretch}>
                            <Field 
                            fullWidth
                            name={`donations[${index}].institution`} 
                            component={TextField} label="Institution"/>
                          </Grid>
                          <Grid item xs={12} sm="auto" className={classes.stretch}>
                            <Field 
                            fullWidth
                            name={`donations[${index}].percentage`} 
                            component={TextField} type='number' label="Percentage"/>
                          </Grid>
                          <Grid item xs={12} sm="auto" className={classes.stretch}>
                            <Button disabled={isSubmitting} onClick={() => remove(index)}>
                              Delete
                              </Button>
                          </Grid>
                        </Grid>
                      ))}

                      <Grid item>
                        {typeof errors.donations === 'string' ? <Typography color='error'>{errors.donations}</Typography> : null}
                      </Grid>

                      <Grid item>
                        <Button variant='contained'
                        disabled={isSubmitting}
                        onClick={() => push(emptyDonation)}>
                          Add donation
                        </Button>
                      </Grid>
                    </React.Fragment>
                  )}
                </FieldArray>

                <Grid item>
                    <Field 
                    name="termsAndConditions" 
                    type="checkbox" 
                    component={CheckboxWithLabel} 
                    Label={{label: "I accept the terms and conditions", 
                    className: errors.termsAndConditions
                     ? classes.errorColor 
                     : undefined}}/>
                </Grid>

                <Grid item>
                  <Button disabled={!isValid || isSubmitting} 
                  type='submit' 
                  variant='contained' 
                  color='primary' 
                  startIcon={isSubmitting 
                  ? <CircularProgress size='0.9rem'/>
                  : undefined}>
                    {isSubmitting ? 'Submitting' : 'Submit'}
                  </Button>
                </Grid>

              </Grid>
              <pre>{JSON.stringify({values, errors, isSubmitting}, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
    </Box>
  </Box>
}
