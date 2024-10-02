import React from 'react';
import s from "./Header.module.scss"
import {Button} from "@mui/material";

const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.header__content}>
                <Button variant="contained" sx={{ backgroundColor: '#b6b6b6', color: 'black' }}>
                    Edit Users
                </Button>
                <Button variant="contained" sx={{ backgroundColor: '#ffffff', color: 'black' }}>
                    Users
                </Button>
            </div>
            <hr className={s.header__hr}/>
        </div>
    );
};

export default Header;