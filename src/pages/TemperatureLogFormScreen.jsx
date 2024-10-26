import React, { useState, useEffect } from 'react';
import "../styles/styles.css";
import axios from 'axios';
import { motion } from "framer-motion";
import { format } from 'date-fns';
const TemperatureLogFormScreen = () => {
    const [temperature, setTemperature] = useState('');


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
          transition: { duration: 0.3 },
        },
      };

    // useEffect(() => {
    //     console.log(temperature);
    // }, [temperature]);

    const handleTemperatureChange = (event) => {
        setTemperature(event.target.value);
        console.log(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!temperature) {
            alert('Please enter a temperature.');
            return;
        }
        // console.log(temperature);
        console.log("event:", event.target.temperature.value);
        event.target.temperature.value = '';
        // setTemperature('');
        await fetch('/api/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                created: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS'Z'"),
                country: 'Thailand',
                drone_id: 65011048,
                drone_name: 'Suphakrit Parima',
                celsius: parseInt(temperature)
            }),
        })
        // .then((response) => {
        //     if (response.ok) {
        //         console.log('Temperature log submitted successfully!');
        //         event.target.temperature.value = '';
        //     } else {
        //         console.log('Failed to submit temperature log.');
        //     }
        // })
        
        // console.log('Temperature log submitted successfully!');
        // setTemperature('');
        


        
        // alert('Temperature log submitted successfully!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <motion.h3 whileHover={{ scale: 1.1 }} className="title">Temperature Log Form</motion.h3>
            <h3 style={{ color: 'white',fontSize: '24px'}}>Fill in the form to submit your drone temperature</h3>
            <motion.form 
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
             id="temperature-form" onSubmit={handleSubmit}>
                <label style={{ fontSize: '18px', color: 'black' }} htmlFor="temperature">Temperature: </label>
                <input placeholder='Enter temp'  type="number" id="temperature" value={temperature} onChange={(event) => handleTemperatureChange(event)}/>
                <input style={{ fontSize: '16px', border: '3px solid black', borderRadius: '10px' }} type="submit" value="Submit" />
            </motion.form>
            {/* <input type="number" /> */}
        </div>
    )
}

export default TemperatureLogFormScreen