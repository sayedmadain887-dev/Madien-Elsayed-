// logo.js
// The brand mark of the protfolio.
// used inside the sidebar component and pages.
 

import React from "react"
import {Link} from "react-router-dom"
import styles from "./Logo.module.css"
function Logo(){
    return(
        <Link to="/" className={styles.logo} aria-label="Sayed Madien - Home">
        
        <span className={styles.mark}>
            <span className={styles.letters}>SM</span>
        </span>
        <span className={styles.cursor}></span>
       </Link>

    )
}
export default Logo;