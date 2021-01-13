import './splashScreen.css'
import { useEffect, useState, useRef } from 'react'
import BIRDS from 'vanta/dist/vanta.net.min.js'
import { Container } from 'react-bootstrap'

function Splash() {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                BIRDS({
                    el: myRef.current,
                    color: '#89cff0',
                    backgroundColor: 'black',
                })
            )
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    return (
        <div
            ref={myRef}
            style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                zIndex: -1,
            }}
        >
            <Container style={{ margin: 'auto', paddingTop: 300 }}>
                <div className="col-6">
                    <h2 style={{ color: '#d3d3d3', fontSize: 30 }}>
                        welcome to
                    </h2>
                    <div style={{ height: 10 }}></div>
                    <h1 style={{ color: 'white', fontSize: 70 }}>apollo</h1>
                    <div style={{ height: 10 }}></div>
                    <h2
                        style={{
                            margin: 'auto',
                            textAlign: 'left',
                            color: '#d3d3d3',
                            fontSize: 30,
                        }}
                    >
                        a smart assistant that helps you stay connected with
                        your doctor.
                    </h2>
                </div>
            </Container>
        </div>
    )
}

export default Splash

