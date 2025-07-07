import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
import { getHerbals } from "actions/herbal.action";
import { getUsers } from "actions/user.action";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Autocomplete = () => {

    const [value, valuechange] = useState(null)
    const [data, setData] = useState([])
    const [emplist, empchange] = useState([])

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUsers())
    },[])


    const userReducer = useSelector((state) => state.app.userReducer)

    useEffect(() => {
        setData(userReducer.result)
    },[userReducer])

    const defprops = {
        options: data?.map((option) => ({ id: option.id, name: option.firstname })),
        getOptionLabel: (options) => options.name
    }
    const getdata = (data) => {
        console.log(data);
    }
    const asigndata = () => {
        valuechange({ code: 'SG', name: 'Singapore', currency: 'SGD' })
        
    }

    return (
        <div>
            <Grid container spacing={0} direction="column" alignItems="center">

                <h2>MUI - Autocomplete</h2>
                <Stack sx={{ width: 300 }} spacing={2}>
                    <Autocomplete
                        {...defprops}
                        renderInput={(params) => (
                            <TextField {...params} label="Country" variant="standard"></TextField>
                        )}
                        onChange={(event, value) => getdata(value)}
                    >

                    </Autocomplete>
                    <Button onClick={asigndata} variant="contained">Assign data</Button>
                </Stack>
            </Grid>

        </div>
    );
}

export default Auto;