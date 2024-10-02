import React, {useEffect, useState} from 'react';
import s from "./Header.module.scss"
import {Button, Tab, Tabs} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";
import {Routes} from "../../utils/routes/routes";

const Header = () => {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className={s.header}>
            <div className={s.header__content}>
                <Tabs value={value} onChange={handleTabChange}>
                    <Tab
                        label="Edit Users"
                        value={Routes.EDIT_USERS}
                        component={NavLink}
                        to={Routes.EDIT_USERS}
                    />
                    <Tab
                        label="Users"
                        value={Routes.USERS}
                        component={NavLink}
                        to={Routes.USERS}
                    />
                </Tabs>
            </div>
            <hr className={s.header__hr} />
        </div>
    );
};

export default Header;