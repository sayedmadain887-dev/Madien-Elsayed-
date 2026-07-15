// Animatedbackground.js

import React, {useEffect, useRef } from "react"
import gsap from "gsap"
import styles from "./AnimatedBackgound.css"
function AnimateBackground(){
    const blob1Ref =useRef(null)
    const blob2Ref = useRef(null)
    const particlesRef =useRef(null)
    useEffect(()=> {
        const ctx = gsap.context (()=>{
            gsap.to(blob1Ref.current,{
                x:120,
                y:80,
                scale:1.15,
                duration:14,
                ease:"sine.inOut",
                repeat:-1,
                yoyo:true,
            })
               gsap.to(blob2Ref.current,{
                x:-100,
                y:-60,
                scale:1.1,
                duration:18,
                ease:"sine.inOut",
                repeat:-1,
                yoyo:true,

        
            })
            Array.from(particlesRef.current.children).forEach(dot =>{
                gsap.to(dot,{
                    y:"random(-40, 40)",
                    x:"random(-30,30)",
                    opacity:"random(0.2,0.6)",
                    duration:gsap.utils.random(4, 9),
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut",
                    delay:gsap.utils.random(0, 4),
                })
            })
        })
       return()=> ctx.revert()
       
    },[])
    return(
        <div className={styles.wrapper}aria-hidden="true">
        {/* right  */}
        <div ref={blob1Ref} className={styles.blob1}>
            {/* left */}
            <div ref={blob2Ref} className={styles.blob2}>
                {/* particles */}
                <div ref={particlesRef} className={styles.particles}>
                    {Array.from({length:22 }).map((_, i)=>(
                        <span key={i}
                        className={styles.dot}
                        style={{
                            top:`${(i * 37 )% 100}`,
                            left:`${(i * 53)% 100}`,
                        }}>

                        </span>
                    ))}

                </div>
                <div className={styles.grid}></div>

            </div>

        </div>
         
        </div>
    )
}
export default AnimateBackground