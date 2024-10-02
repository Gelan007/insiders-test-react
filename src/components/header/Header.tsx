import React from 'react';
import s from "./Header.module.scss"
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";
import {EDIT_USERS_ROUTE, USERS_ROUTE} from "../../utils/routes/routes";

const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.header__content}>
                <Button variant="contained" sx={{ backgroundColor: '#b6b6b6', color: 'black' }}>
                    <NavLink to={EDIT_USERS_ROUTE}>Edit Users</NavLink>
                </Button>
                <Button variant="contained" sx={{ backgroundColor: '#ffffff', color: 'black' }}>
                    <NavLink to={USERS_ROUTE}>Users</NavLink>v
                </Button>
            </div>
            <hr className={s.header__hr}/>
        </div>
    );
};

export default Header;