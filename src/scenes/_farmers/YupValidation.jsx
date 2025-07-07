import React from "react";
import * as Mui from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { get } from "lodash";

const YupValidation = () => {
  
  Yup.addMethod(Yup.array, "unique", function (message, path) {
    return this.test("unique", message, function (list) {
      const mapper = (x) => get(x, path);
      const set = [...new Set(list.map(mapper))];
      const isUnique = list.length === set.length;
      if (isUnique) {
        return true;
      }
      const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
      return this.createError({ path: `users[${idx}].${path}`, message });
    });
  });

  const schema = Yup.object().shape({
    users: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Name is required"),
        })
      )
      .unique("Duplicate user", "name"),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        users: [{ name: "" }],
      }}
      validationSchema={schema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors, touched }) => (
        <Form>
          <FieldArray
            name="users"
            render={(arrayHelpers) => (
              <>
                <Mui.Box display="flex" justifyContent="space-between" alignItems="center">
                  <Mui.Typography variant="h5" component="h5">
                    Users
                  </Mui.Typography>

                  <Mui.Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    type="button"
                    onClick={() => {
                      arrayHelpers.push({
                        name: "",
                      });
                    }}
                  >
                    Add New
                  </Mui.Button>
                </Mui.Box>

                <Mui.TableContainer>
                  <Mui.Table>
                    <Mui.TableHead>
                      <Mui.TableRow>
                        <Mui.TableCell component="th">SN</Mui.TableCell>
                        <Mui.TableCell component="th">USER</Mui.TableCell>
                        <Mui.TableCell component="th"></Mui.TableCell>
                      </Mui.TableRow>
                    </Mui.TableHead>

                    <Mui.TableBody>
                      {values.users.map((item, index) => (
                        <Mui.TableRow key={index}>
                          <Mui.TableCell component="td">{index + 1}</Mui.TableCell>

                          <Mui.TableCell component="td">
                            <Field name={`users.${index}.name`}>
                              {({ field, meta }) => (
                                <Mui.TextField
                                  InputLabelProps={{ shrink: true }}
                                  variant="outlined"
                                  placeholder="Name"
                                  helperText={
                                    touched?.users?.[index]?.name && errors?.users?.[index]?.name
                                      ? errors?.users?.[index]?.name
                                      : null
                                  }
                                  error={errors?.users?.[index]?.name ? true : false}
                                  {...field}
                                />
                              )}
                            </Field>
                          </Mui.TableCell>

                          <Mui.TableCell component="td">
                            <Mui.IconButton
                              size="small"
                              className="svg-danger"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              X
                            </Mui.IconButton>
                          </Mui.TableCell>
                        </Mui.TableRow>
                      ))}
                    </Mui.TableBody>
                  </Mui.Table>
                </Mui.TableContainer>
              </>
            )}
          />
          <Mui.Box mt={2} width="100%" display="flex" justifyContent="flex-end" flexWrap="wrap">
            <Mui.Button variant="contained" color="primary" disableElevation type="submit">
              Submit
            </Mui.Button>
          </Mui.Box>
        </Form>
      )}
    </Formik>
  );
};

export default YupValidation;