import { useState } from 'react'
import { 
  Box,CssBaseline, TextField, Button, Grid, Grid2, Checkbox, FormControlLabel, Typography 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import  * as loginActions  from '../actions/login.action'

const Login = () => {

  const loginReducer = useSelector(state => state.app.loginReducer)
  const dispatch = useDispatch()

  const [account, setAccount] = useState({
    username: 'admin',
    password: '11111',
  })

  const [isConsentChecked, setIsConsentChecked] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('account ',account)
    dispatch(loginActions.letin({ ...account, navigate }))

  };

  const showError = () => {
    return (
    <Typography variant="h7" color='red' >
      รหัสผ่านหรือชื่อไม่ถูกต้อง
    </Typography>
    )
  }

  return (
    <Box 
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between',
            }}
    >
    <CssBaseline />
      <Box 
            sx={{
              backgroundImage: "url('images/sign-img-left.jpg')",
              backgroundSize: "cover",
              height: "100vh",
              width: '100%',
              display: { xs: 'none', sm: 'none', md: 'block' }
            }}  
      >
        {/* Left */}
      </Box>
      <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}  
      >
        {/* <Box sx={{ justifyContent:'center', alignItems: 'center' }}>
            <Box
                component="img"
                sx={{
                  height: 135,
                  maxHeight: { xs: 120, md: 160 },
                  alignItems: 'center',
                  marginTop: '20px',
                }}
                alt="logo"
                src="images/msulogo.png"        
            />
        </Box> */}
        <Box
            sx={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '35px',
              margin: '50px'
            }}
          >

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
                name={account.username}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, username: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name={account.password}
                label="รหัสผ่าน"
                type="password"
                id="password"
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
              />
              <Box>
              {/* ✅ Consent Checkbox */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isConsentChecked}
                        onChange={(e) => setIsConsentChecked(e.target.checked)}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        ฉันยอมรับ <a href="/terms" target="_blank" rel="noopener noreferrer">ข้อตกลงและเงื่อนไขการใช้งาน</a>
                      </Typography>
                    }
                  />
              </Box>               
              <Box>
              {loginReducer.isError ? showError() : null}
              </Box>              
              <Button
                disabled={!isConsentChecked}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  fontSize: '18px'
                }}
              >
                เข้าระบบ
              </Button>
              <Box>
                  <Grid2 item xs>
                  <Link to="/forgetpassword" variant="body2">
                    ลืมรหัสผ่าน
                  </Link>
                </Grid2>
              </Box>
              {/* <Grid container>
                <Grid item xs>
                  <Link to="/forgetpassword" variant="body2">
                    ลืมรหัสผ่าน
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/registration" variant="body2">
                    ลงทะเบียน
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
        </Box>            
      </Box>
    </Box>
  );
}

export default Login