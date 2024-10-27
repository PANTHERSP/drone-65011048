import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './์Nav.css';


const Nav = () => {
    const [active, setActive] = useState('View Config');
    return (
        <div className="sidebar">
            <ul>
                <motion.li whileHover={{ scale: 1.05}} whileTap={{ scale: 0.9 }}>
                    <Link onClick={() => setActive('View Config')} className={active === 'View Config' ? 'active' : ''} to="/">View Config</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.05}} whileTap={{ scale: 0.9 }}>
                    <Link onClick={() => setActive('Temperature Log Form')} className={active === 'Temperature Log Form' ? 'active' : ''} to="/temperature">Temperature Log Form</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.05}} whileTap={{ scale: 0.9 }}>
                    <Link onClick={() => setActive('View Logs')} className={active === 'View Logs' ? 'active' : ''} to="/logs">View Logs</Link>
                </motion.li>
                
            <img style={{ opacity: "0.3", position: 'absolute', bottom: 0, left: 0, width: '100%' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgIvwOHy3BE-U_WI9MrJ4dgxOq_-wLQjPHvw&s" alt="logo" />
            </ul>
        </div>
    );
};

export default Nav;
