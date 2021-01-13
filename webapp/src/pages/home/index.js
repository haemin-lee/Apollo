import { Nav } from 'react-bootstrap'
import { Switch, Route, NavLink } from 'react-router-dom'

import { PatientInfo, Images, Graphs } from './tabs'

function Tabbar(props) {
    return (
        <div className="container">
            <Nav className="nav-pills">
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/"
                    >
                        Information
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/graphs"
                    >
                        Graphs
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/images"
                    >
                        Images
                    </NavLink>
                </li>
            </Nav>
            <Switch>
                <Route exact path="/">
                    <PatientInfo userData={props.userData} />
                </Route>
                <Route exact path="/graphs">
                    <Graphs userData={props.userData} />
                </Route>
                <Route exact path="/images">
                    <Images userData={props.userData} />
                </Route>
            </Switch>
        </div>
    )
}

export default Tabbar

