import { Facebook, Google, Twitter } from '@mui/icons-material'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { FunctionComponent } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { NavLink } from 'react-router-dom'
import Carousel from '../components/Carousel/Carousel'
import minimum from '../components/Themes/minimum.module.scss'
import AuthService from '../services/auth.service'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const LoginPage: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = minimum
  const [loginError, setloginError] = React.useState<any>(null)
  const [loginData, setloginData] = React.useState<any>({
    Email: '',
    Password: '',
    RememberMe: false,
  })

  // Theme selection

  const onGoogleSuccess = (res) => {
    console.log('Login Success: Current User: ', res.profileObj)
  }

  const onGoogleFailure = (res) => {
    console.log('Login Failed: res: ', res)
    if (res.error === 'popup_closed_by_user') {
      setloginError('You must complete the login process in order to login.')
    }
  }

  const { signIn: googleSignIn } = useGoogleLogin({
    onSuccess: onGoogleSuccess,
    onFailure: onGoogleFailure,
    clientId: '185605994716-97itv5an2ligdaq8b4r3l4r8h95rlip6.apps.googleusercontent.com',
    isSignedIn: false,
    accessType: 'offline',
  })

  const handleLogin = () => {
    AuthService.login(loginData.Email, loginData.Password).then(
      (res) => {
        console.log(res)
        props.history.push('/admin')
      },
      (error) => {
        setloginError(error.response.data.message)
      }
    )
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.pages}>
          <div className={theme.orange}></div>

          <Container className={theme.loginPage} maxWidth={false}>
            <Grid container alignItems="stretch">
              <div className={theme.orange}>
                <NavLink to="/home" key="31cmPF3u">
                  voy a Home borrar
                </NavLink>
              </div>

              <Grid item xs={6} md={12} className={theme.paperleft}>
                <div>
                  <Typography variant="h3">Empresas que nos acompañan</Typography>

                  <Carousel height="30" autoPlay={true} arrowsOrDotsMethod="dots" showSlide={3}>
                    <picture>
                      <img src="/img/lenovo.png" alt="/img/lenovo.png" />
                    </picture>

                    <picture>
                      <img src="/img/jhondere.png" alt="/img/jhondere.png" />
                    </picture>

                    <picture>
                      <img src="/img/coca2.png" alt="/img/coca2.png" />
                    </picture>
                  </Carousel>
                </div>
              </Grid>

              <Grid item md={9}>
                <div className={theme.loginBox}>
                  <div>
                    <Typography variant="h3">Sign in to Aptugo-Admin</Typography>

                    <Typography variant="body1">Introduzca sus datos a continuación...</Typography>
                  </div>

                  <div className={theme.externalSignIn}>
                    <Button variant="outlined" onClickCapture={googleSignIn} className={theme.google} fullWidth>
                      <Google color="default" />
                    </Button>

                    <Button variant="outlined" onClickCapture={googleSignIn} className={theme.facebook} fullWidth>
                      <Facebook />
                    </Button>

                    <Button variant="outlined" onClickCapture={googleSignIn} className={theme.twitter} fullWidth>
                      <Twitter />
                    </Button>
                  </div>

                  <div className={theme.separatorLine}>o</div>

                  {loginError && (
                    <React.Fragment>
                      <Alert variant="standard" severity="error">
                        {loginError}
                      </Alert>
                    </React.Fragment>
                  )}

                  <TextField
                    variant="outlined"
                    placeholder="Email Address"
                    margin="normal"
                    label="Email"
                    type="text"
                    fullWidth
                    value={loginData.Email}
                    onChange={(e) => {
                      setloginData({ ...loginData, Email: e.target.value })
                    }}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    label="Password"
                    type="password"
                    fullWidth
                    value={loginData.Password}
                    onChange={(e) => {
                      setloginData({ ...loginData, Password: e.target.value })
                    }}
                  />

                  <div className={theme.flexLine}>
                    <FormControl margin="dense">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={loginData.RememberMe}
                            onClickCapture={() => {
                              setloginData({ ...loginData, RememberMe: !loginData.RememberMe })
                            }}
                          />
                        }
                        label="Recuerdame"
                      />
                    </FormControl>

                    <NavLink to="/forgot">
                      <span className={theme.greenText}>Olvido su password?</span>
                    </NavLink>
                  </div>

                  <Button variant="contained" color="primary" onClickCapture={handleLogin} fullWidth>
                    Login
                  </Button>
                  <div className={theme.separatorLine} style={{ marginTop: '3rem' }}></div>

                  <div className={theme.right} style={{ marginTop: '2rem' }}>
                    No tienes cuenta?
                    <a className={theme.greenText} href="/Register">
                      Registrate!
                    </a>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>

      <Container className={theme.loginPage} maxWidth={false}>
        <Grid container alignItems="stretch">
          <div className={theme.orange}>
            <NavLink to="/home" key="31cmPF3u">
              voy a Home borrar
            </NavLink>
          </div>

          <Grid item xs={6} md={12} className={theme.paperleft}>
            <div>
              <Typography variant="h3">Empresas que nos acompañan</Typography>

              <Carousel height="30" autoPlay={true} arrowsOrDotsMethod="dots" showSlide={3}>
                <picture>
                  <img src="/img/lenovo.png" alt="/img/lenovo.png" />
                </picture>

                <picture>
                  <img src="/img/jhondere.png" alt="/img/jhondere.png" />
                </picture>

                <picture>
                  <img src="/img/coca2.png" alt="/img/coca2.png" />
                </picture>
              </Carousel>
            </div>
          </Grid>

          <Grid item md={9}>
            <div className={theme.loginBox}>
              <div>
                <Typography variant="h3">Sign in to Aptugo-Admin</Typography>

                <Typography variant="body1">Introduzca sus datos a continuación...</Typography>
              </div>

              <div className={theme.externalSignIn}>
                <Button variant="outlined" onClickCapture={googleSignIn} className={theme.google} fullWidth>
                  <Google color="default" />
                </Button>

                <Button variant="outlined" onClickCapture={googleSignIn} className={theme.facebook} fullWidth>
                  <Facebook />
                </Button>

                <Button variant="outlined" onClickCapture={googleSignIn} className={theme.twitter} fullWidth>
                  <Twitter />
                </Button>
              </div>

              <div className={theme.separatorLine}>o</div>

              {loginError && (
                <React.Fragment>
                  <Alert variant="standard" severity="error">
                    {loginError}
                  </Alert>
                </React.Fragment>
              )}

              <TextField
                variant="outlined"
                placeholder="Email Address"
                margin="normal"
                label="Email"
                type="text"
                fullWidth
                value={loginData.Email}
                onChange={(e) => {
                  setloginData({ ...loginData, Email: e.target.value })
                }}
              />

              <TextField
                variant="outlined"
                margin="normal"
                label="Password"
                type="password"
                fullWidth
                value={loginData.Password}
                onChange={(e) => {
                  setloginData({ ...loginData, Password: e.target.value })
                }}
              />

              <div className={theme.flexLine}>
                <FormControl margin="dense">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={loginData.RememberMe}
                        onClickCapture={() => {
                          setloginData({ ...loginData, RememberMe: !loginData.RememberMe })
                        }}
                      />
                    }
                    label="Recuerdame"
                  />
                </FormControl>

                <NavLink to="/forgot">
                  <span className={theme.greenText}>Olvido su password?</span>
                </NavLink>
              </div>

              <Button variant="contained" color="primary" onClickCapture={handleLogin} fullWidth>
                Login
              </Button>
              <div className={theme.separatorLine} style={{ marginTop: '3rem' }}></div>

              <div className={theme.right} style={{ marginTop: '2rem' }}>
                No tienes cuenta?
                <a className={theme.greenText} href="/Register">
                  Registrate!
                </a>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default LoginPage
