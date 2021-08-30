import React from "react";
import style from './Spin.module.css'

const Spin: React.FC = () => {
    return (
        <div className={style.container}>
            <div className={style.spin}></div>
        </div>
    );
}

export default Spin;