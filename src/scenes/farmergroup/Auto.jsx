import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
import { getHerbals } from "actions/herbal.action";
import { getUsers } from "actions/user.action";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Auto = () => {

    const [value, valuechange] = useState(null)
    const [emplist, empchange] = useState([])
    const [data, setData] = useState([])

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUsers())
    },[])


    const userReducer = useSelector((state) => state.app.userReducer)

    useEffect(() => {
        setData(userReducer.result)
    },[userReducer])

    // if (data) {
    //     console.log('data []',data)
    // }

    const country = [
        { code: 'IND', name: 'India', currency: 'INR' },
        { code: 'USA', name: 'USA', currency: 'USD' },
        { code: 'SG', name: 'Singapore', currency: 'SGD' }
    ]

    const defprops = {
        // options: emplist.map((option) => ({ id: option.id, name: option.name })),
        options: data?.map((option) => ({ id: option.id, name: option.firstname })),
        getOptionLabel: (options) => options.name
    }
    const getdata = (data) => {
        console.log(data);
    }
    const asigndata = () => {
        valuechange({ code: 'SG', name: 'Singapore', currency: 'SGD' })
        
    }


    // useEffect(() => {
    //     fetch('http://localhost:8000/employee').then(resp => {
    //         return resp.json();
    //     }).then(res => {
    //         empchange(res)
    //     }).catch(e => {
    //         console.log(e.message);
    //     })

    // }, [])
    return (
        <div>
            <Grid container spacing={0} direction="column" alignItems="center">

                <h2>MUI - Autocomplete</h2>
                <Stack sx={{ width: 300 }} spacing={2}>
                    <Autocomplete
                        {...defprops}
                        //options={country}
                        renderInput={(params) => (
                            <TextField {...params} label="Country" variant="standard"></TextField>
                        )}
                        onChange={(event, value) => getdata(value)}
                    >

                    </Autocomplete>

                    {/* <Autocomplete
                        {...defprops}
                        renderInput={(params) => (
                            <TextField {...params} label="Country" variant="filled"></TextField>
                        )}
                        onChange={(event, value) => getdata(value)}
                    >
                    </Autocomplete>

                    <Autocomplete
                        {...defprops}
                        freeSolo
                        value={value}
                        renderInput={(params) => (
                            <TextField {...params} label="Country" variant="outlined"></TextField>
                        )}
                        onChange={(event, value) => getdata(value)}
                    >

                    </Autocomplete> */}
                    <Button onClick={asigndata} variant="contained">Assign data</Button>
                </Stack>
            </Grid>

        </div>
    );
}

export default Auto;