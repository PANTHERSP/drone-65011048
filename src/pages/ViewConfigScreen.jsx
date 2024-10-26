import React, { useState } from 'react';
import { motion } from "framer-motion";
import "../styles/styles.css";
const ViewConfigScreen = () => {
    const [droneData, setDroneData] = useState(null);

    const rowVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: (index) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.2
          },
        }),
      };

      const tableVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5 },
        },
      };
    
    
    
    const fetchConfig = async () => {
        const res = await fetch('/api/configs/40');
        const data = await res.json();
        setDroneData(data);
    };
    
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* <h1>Drone</h1> */}
            <motion.h3 whileHover={{ scale: 1.1 }} className="title">View Config</motion.h3>
            <h3 style={{ color: 'white',fontSize: '24px'}}>Click "Config" button to get config</h3>
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} id="config-btn" onClick={fetchConfig}>Config</motion.button>
            { droneData && <motion.div id="config"
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}

            >
                <div className="row" id="drone-id">Drone Id: {droneData.drone_id}</div>
                <div className="row" id="drone-name">Drone Name: {droneData.drone_name}</div>
                <div className="row" id="light">Light: {droneData.light}</div>
                <div className="row" id="maximum-speed">Maximum Speed: {droneData.max_speed}</div>
                <div className="row" id="country">Country: {droneData.country}</div>
                <div className="row" id="population">Population: {droneData.population}</div>
            </motion.div> }

            
        </div>
    );
};

export default ViewConfigScreen;
