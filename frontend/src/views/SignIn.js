import React, { useState, useRef } from 'react'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import EmojiNatureIconOutlined from '@mui/icons-material/EmojiNatureOutlined'
import { useAuth } from '../authContext'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailr, setEmailr] = useState('')
  const [passwordr, setPasswordr] = useState('')
  const [flip, setFlip] = useState(true)
  const [passwordConfirmationr, setPasswordConfirmationr] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'https://medminer/api/v1/login',
        {
          user: {
            email: email,
            password: password,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const authToken = response.data.authToken
      console.log(response.data)
      login(authToken)
      navigate('/') // Change '/dashboard' to the desired route
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleRegister = async () => {
   
    try {
      const response = await axios.post('https://medminer/api/v1/signup', {
        user: {
          email: emailr,
          password: passwordr,
          password_confirmation: passwordConfirmationr,
        },
      })

      // Handle successful registration, such as redirecting to the login page
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  const flipCardLogin = () => {
    setFlip(!flip)
  }
  const flipCardRegister = () => {
    setFlip(!flip)
  }
  return (
    <>
      <div className={`signin-container`}>
        <div className={`right-content-signin ${flip}`}>
          <div className="front-card">
            <CardContent>
              <h2 className="log-head">Login</h2>

              <Box
                sx={{
                  maxWidth: '100%',
                }}
              ></Box>
              <form>
                <Box
                  sx={{
                    maxWidth: '100%',
                  }}
                >
                  <TextField
                    sx={{
                      borderRadius: '10px',
                      backgroundColor: '#fff',
                    }}
                    fullWidth
                    required
                    variant="filled"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    label="Email"
                    id="fullWidth"
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{
                      borderRadius: '10px',
                      backgroundColor: '#fff',
                    }}
                    fullWidth
                    variant="filled"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    label="Password"
                    id="password"
                  />
                </Box>
                <CardActions className="resi-btn">
                  <Button
                    onClick={handleLogin}
                    variant="contained"
                    size="small"
                    sx={{
                      borderRadius: '10px',
                      padding: '10px 20px',
                      width: '100%',
                      backgroundColor: '#eb7434',
                      color: '#fff',
                    }}
                  >
                    Sign In
                  </Button>
                </CardActions>
              </form>
            </CardContent>

            <p onClick={() => flipCardLogin()}>
              Don't have an account?
              <span
                className="switch-form"
                onClick={() => flipCardRegister()}
                style={{
                  color: '#eb7434',
                  fontSize: '1.1em',
                  cursor: 'pointer',
                }}
              >
                {' '}
                <div className="strong">Register</div>
              </span>
            </p>
            {/* <button onClick={() => flipCard()}>no</button> */}
          </div>
          <div className="back-card">
            <CardContent>
              <h2 className="log-head">Register</h2>
              <form onSubmit={handleRegister}>
                <Box
                  sx={{
                    maxWidth: '100%',
                  }}
                >
                  <TextField
                    id="email-user"
                    sx={{
                      borderRadius: '10px',
                      backgroundColor: '#fff',
                    }}
                    fullWidth
                    variant="filled"
                    type="email"
                    required
                    label="Email"
                    value={emailr}
                    onChange={e => setEmailr(e.target.value)}
                  />
                </Box>

                <Box>
                  <TextField
                    sx={{
                      borderRadius: '10px',
                      backgroundColor: '#fff',
                    }}
                    fullWidth
                    value={passwordr}
                    onChange={e => setPasswordr(e.target.value)}
                    variant="filled"
                    label="Password"
                    required
                    id="password"
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{
                      borderRadius: '10px',
                      backgroundColor: '#fff',
                    }}
                    fullWidth
                    variant="filled"
                    value={passwordConfirmationr}
                    onChange={(e) => setPasswordConfirmationr(e.target.value)}
                    label="Confirm Password"
                    required
                    id="confirm-password"
                  />
                </Box>
                <CardActions className="resi-btn">
                  <Button
                    variant="contained"
                    type="submit"
                    size="small"
                    sx={{
                      borderRadius: '10px',
                      padding: '10px 20px',
                      width: '100%',
                      backgroundColor: '#eb7434',
                      color: '#fff',
                    }}
                  >
                    Register
                  </Button>
                </CardActions>
              </form>
            </CardContent>

            {/* <p className='forgot-password'>
              Forgot Password?
              </p> */}

            <p className='margin-top-0'>
              Already have an account?
              <span
                className="switch-form"
                onClick={() => flipCardLogin()}
                style={{
                  color: '#eb7434',
                  fontSize: '1.1em',
                  cursor: 'pointer',
                }}
              >
                {' '}
                <div className="strong">Login</div>
              </span>
            </p>
          </div>
          {/* </Card> */}
        </div>
      </div>
    </>
  )
}

export default SignIn
