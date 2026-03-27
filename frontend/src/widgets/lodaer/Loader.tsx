import "./../../App.css"

function Loader(){
  return(
    <svg viewBox="0 0 185 267" id='diamond'>

            <polygon
              className="diamond"
              points="92.5,10 10,132.5 175,132.5"
            />

            <line
              className="stick"
              x1="92.5" y1="10"
              x2="10" y2="133.5"
              opacity="1"
            >
              <animate
                attributeName="x2"
                from="176"
                to="9.7"
                dur="6s"
                repeatCount="indefinite"
              />
            </line>
            <line
              className="stick"
              x1="92.5" y1="10"
              x2="10" y2="133.5"
              opacity="1"
            >
              <animate
                attributeName="x2"
                from="176"
                to="9.7"
                dur="6s"
                repeatCount="indefinite"
                begin="2s"
              />
            </line>
            <line
              className="stick"
              x1="92.5" y1="10"
              x2="10" y2="133.5"
              opacity="1"
            >
              <animate
                attributeName="x2"
                from="176"
                to="9.7"
                dur="6s"
                repeatCount="indefinite"
                begin="4s"
              />
            </line>
            <polygon
              className="diamond"
              points="92.5,257 10,140.4 175,140.4"
            />
            <line
              className="stick"
              x1="92.5" y1="257"
              x2="175" y2="139.5"
              opacity="1"
            >
              <animate
                attributeName="x2"
                from="176"
                to="9.7"
                dur="6s"
                repeatCount="indefinite"
              />
            </line>
            <line
              className="stick"
              x1="92.5" y1="257"
              x2="175" y2="139.3"
              opacity="1"
            >
              <animate
                attributeName="x2"
                from="176"
                to="9.7"
                dur="6s"
                repeatCount="indefinite"
                begin="2s"
              />
            </line>
            <line
              className="stick"
              x1="92.5" y1="257"
              x2="175" y2="139.5"
              opacity="1"
            >
              <animate
                attributeName="x2"
                from="176"
                to="9.7"
                dur="6s"
                repeatCount="indefinite"
                begin="4s"
              />
            </line>       
          </svg>
  )
}

export default Loader