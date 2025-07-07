import {
    useTheme, 
    Box, 
    Dialog, 
    DialogContent, 
    Fade, 
    IconButton, 
    Grid, 
    Typography, 
    Button 
} from "@mui/material"
import React, { forwardRef } from "react"
import { tokens } from '../theme'

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

function ConfirmBox({ open, closeDialog, title, deleteFunction, message }){

const theme = useTheme()
const colors = tokens(theme.palette.mode)

    return ( <Dialog
            //  fullWidth
             open={open}
             maxWidth='md'
             scroll="body"
             onClose={closeDialog}
            //  onBackdropClick={closeDialog}
             TransitionComponent={Transition}
             >
                <DialogContent sx={{px:8, py:6, position:'relative'}}>
                    <IconButton size='medium' onClick={closeDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem'}}>
                        x
                    </IconButton>

                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Box
                            sx={{
                                mt: 3,
                                display: "flex",
                                justifyContent: "flex-start",
                                flexDirection: "column",
                            }}
                            >
                            <Typography variant="h5" textAlign="center" >{message} {title && title}</Typography>

                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
                        >
                            {/* <Button onClick={deleteFunction} size="medium" variant="contained" color="error">
                                Delete
                            </Button>{" "} */}
                            <Button  
                                onClick={deleteFunction}
                                sx={{
                                    backgroundColor: colors.redAccent[600],
                                    // backgroundColor: colors.greenAccent[600],
                                    width: '80px',
                                    color: colors.grey[100],
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                    mr: "10px",
                                    mb: "10px",
                                    // '&:hover': {backgroundColor: colors.blueAccent[800]}
                                    '&:hover': {backgroundColor: colors.redAccent[800]}
                                }}
                            >
                                ยืนยัน
                            </Button> 

                            {/* <Button onClick={closeDialog} size="medium" variant="contained" color={colors.greenAccent[400]}>
                                Cancel
                            </Button> */}
                            <Button  
                                onClick={closeDialog}
                                sx={{
                                    // backgroundColor: colors.blueAccent[600],
                                    backgroundColor: colors.greenAccent[600],
                                    width: '80px',
                                    color: colors.grey[100],
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                    mr: "10px",
                                    mb: "10px",
                                    '&:hover': {backgroundColor: colors.greenAccent[800]}
                                }}
                            >
                                ยกเลิก
                            </Button>

                           
                        </Grid>
                    </Grid>
                </DialogContent>
        </Dialog>
    )
}

export default ConfirmBox