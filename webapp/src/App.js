import { BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation, } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import Home from './pages'
import Splash from './pages/splash'
import { useEffect, useState } from 'react'
import { Provider, useDispatch, useStore } from 'react-redux'
import app_store from './redux/stores'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { set_user, logout_user } from './redux/actions/user.js'
import { get_token } from 'drchrono-api-client'

function TopNav(props) {
    const dispatch = useDispatch()
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Apollo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {!props.user ? (
                        <Nav className="ml-auto">
                            <Nav.Link href="https://drchrono.com/o/authorize/?redirect_uri=http://localhost:3000/login&response_type=code&client_id=dkzdPUi9XUYshx0batJXVE4zm8enBvFqlZCR0G2s">
                                <p
                                    style={{
                                        float: 'left',
                                        marginTop: 10,
                                        color: 'black',
                                    }}
                                >
                                    Sign in
                                </p>
                            </Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="ml-auto">
                            <Nav.Link
                                href="/"
                                onClick={(e) => {
                                    localStorage.clear()
                                    dispatch(logout_user())
                                }}
                            >
                                Logout {props.user.firstName}
                            </Nav.Link>
                        </Nav>
                    )}
            </Navbar.Collapse>
        </Navbar>
    )
}

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

// This page gets the code and saves the access token to local storage
// and updates the Redux state
function Login() {
    const query = useQuery()
    const history = useHistory()
    const store = useStore()
    const dispatch = useDispatch()

    useEffect(() => {
        // do not login twice
        const u = store.getState().user
        if (Object.keys(u).length) {
            return history.push('/')
        }
        // get access token
        const code = query.get('code')
        fetch_token(code)

        async function fetch_token(code) {
            const access_token_res = await get_token(code)
            let access_token = access_token_res.data

            localStorage.setItem('user', JSON.stringify(access_token))
            dispatch(set_user(access_token))
            history.push('/')
        }
    })

    return (
        <div className="loader">
            <Loader
                type="TailSpin"
                color="#3b42bf"
                height={100}
                width={100}
                timeout={6000}
            />
        </div>
    )
}


function App() {

    const store = useStore()
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            // set up redux state
            dispatch(set_user(JSON.parse(user)))
            setUser(JSON.parse(user))
        }

        const unsubscribe = store.subscribe(() => {
            const u = store.getState().user
            setUser(u)
        })

        return function cleanup() {
            unsubscribe()
        }
    }, [dispatch, store])


    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    {user ? (
                        // display datas
                        <Route path="/">
                            <TopNav user={user} />
                            <Home />
                        </Route>
                    ) : (
                        // otherwise splash
                        <Route path="/">
                            <div className="hero">
                                <TopNav />
                                <Splash />
                            </div>
                        </Route>
                    )}
                    
                </Switch>
            </Router>
        </>
    )
}

function AppContainer() {
    return (
        <Provider store={app_store}>
            <App />
        </Provider>
    )
}

export default AppContainer