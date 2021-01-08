import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import Home from './pages'
import Splash from './pages/splash'

function TopNav() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Welcome_Beemo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#link">Sign in</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

function App() {
    return (
        <>
            <TopNav />
            <Router>
                <Switch>
                    {/* this will probably have some 404 issues later... */}
                    <Route exact path="/splash">
                        <Splash />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                    
                </Switch>
            </Router>
        </>
    )
}

export default App
