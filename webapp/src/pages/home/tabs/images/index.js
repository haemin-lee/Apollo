import { useState, useEffect } from 'react'

import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


/*
function getType(props, filename) {
    if(filename.indexOf('.png') > -1)
    {
        return 
    }
}
*/

const slideImages = [
    
    
];

function getImages(props) {
    slideImages.push("data:image/png;base64," + props.userData.Image1)
    slideImages.push("data:image/png;base64," + props.userData.Image2)
    return (
        <div className="slide-container">
            <br>
            </br>
            <br>
            </br>
          <Slide autoplay={false}>

            <div className="each-slide">
              <div style={{'backgroundImage': `url(${"data:image/png;base64," + props.userData.Image1})`, width:"500px", height: "500px" }}>
              </div>
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${"data:image/png;base64," + props.userData.Image2})`, width: "500px", height: "500px" }}>
              </div>
            </div>
  
          </Slide>
        </div>
      )

}



export default getImages



