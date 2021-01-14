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
              <div style={{'backgroundImage': `url(${slideImages[0]})`, width:"500px", height: "500px" }}>
              </div>
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[1]})`, width: "500px", height: "500px" }}>
              </div>
            </div>
  
          </Slide>
        </div>
      )

}

// const Slideshow = () => {
//     return (
//       <div className="slide-container">
//         <Slide>
//           <div className="each-slide">
//             <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
//               <span>Slide 1</span>
//             </div>
//           </div>
//           <div className="each-slide">
//             <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
//               <span>Slide 2</span>
//             </div>
//           </div>

//         </Slide>
//       </div>
//     )
// }

export default getImages



// function Images(props) {
    
//     //console.log("image test")
//     //console.log(activeUser)
//     //console.log("Image1")
//     console.log(props.userData.Image3)


//     let url1 = "data:image/png;base64," + props.userData.Image1
//     let url2 = "data:image/png;base64," + props.userData.Image2
//     let url3 = "data:image/png;base64," + props.userData.Image3
//     //let img = atob(props.userData.Image1)
//     //console.log("img")
//     //console.log(img)
//     //let URI = "TESTINGTESTING";
    
//     //let source = "data:image/png;base64," + URI;
    
//     return (
        

//         <div>
//             <img src={url1} class="img-fluid" alt="Image1"></img>
//             <img src={url2} class="img-fluid" alt="Image2"></img>
//             <img src={url3} class="img-fluid" alt="Image3"></img>

//             <br>
//             </br>
//             <br>
//             </br>

//         </div>



//     );
// }

// export default Images
