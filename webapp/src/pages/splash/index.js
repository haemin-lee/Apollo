import './splashScreen.css'
import { Row, Container, Col } from 'react-bootstrap'

function Splash() {
    return (
        <div className="container">
            <Container>
                <Row>
                    <Col>
                        <Row style={{ height: 200 }}></Row>
                        <Row>
                            <div className="text">
                                <h1 style={{ fontSize: 40, textAlign: 'left' }}>
                                    Welcome to
                                </h1>
                                <h1
                                    style={{
                                        fontSize: 80,
                                        color: '#FC94AF',
                                        textAlign: 'left',
                                    }}
                                >
                                    Apollo
                                </h1>
                                <div style={{ height: 40 }}></div>
                                
                            </div>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={{ height: 100 }}></Row>
                        <Row>
                            <h2>Add a photo</h2>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Splash