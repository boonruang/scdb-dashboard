
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
// import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useRef, useState, useEffect} from 'react'
import useAuth from 'hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import axios from '../utils/axios'
import { server } from '../constants'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
        HerbHuk ISAN
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () => {

  const { setAuth } = useAuth()
  
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef()
  const errRef = useRef()

  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   username: data.get('username'),
    //   password: data.get('password'),
    // });
      let username = data.get('username')
      let password =  data.get('password')

try {
  const response = await axios.post(server.LOGIN_URL,
    JSON.stringify({username,password}),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }
  )
  console.log(JSON.stringify(response?.data));
  const accessToken = response?.data?.accessToken
  const roles = response?.data?.roles
  setAuth({ username, password, roles, accessToken })
  navigate(from, { replace: true })
} catch (err) {
  console.log('err',err)
  // errRef.current.focus()
}

  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '35px',
            // borderColor: '#256333',
            borderRadius: '5px',
            border: 1,
            boxShadow: 3
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            เข้าใช้งานระบบ
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ชื่อ"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="บันทึกรหัส"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เข้าระบบ
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ลืมรหัสผ่าน
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"ลงทะเบียน"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 4, mb: 4 }} /> */}
      </Container>
  );
}

export default Login