import React from 'react';
import {Route, Routes} from "react-router-dom";

import NotFound from "./notFound/NotFound";
import {publicRoutes} from "../utils/routes/consts";


const AppRouter:React.FC = () => {
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default AppRouter;