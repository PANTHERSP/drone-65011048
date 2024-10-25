import React, { useState } from "react";
import "../styles/styles.css";
import { motion, AnimatePresence } from "framer-motion";
const ViewLogsScreen = () => {
    const [logs, setLogs] = useState(null);

    const tableVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5 },
        },
      };


    const rowVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: (index) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.15
          },
        }),
      };

    const fetchLogs = async () => {
        const res = await fetch(`https://drone-65011048.vercel.app/api/logs?filter=(drone_id=65011048)`);
        const data = await res.json();
        const filteredData = data.items.filter(item => item.drone_id === 65011048);

        const resultData = data.items.sort((a, b) => (new Date(b.created)).getTime() - (new Date(a.created)).getTime());
        
        const [year, month, day] = filteredData[0].created.split(" ")[0].split("-");
        const [hour, minute, secondAndMillisecond] = filteredData[0].created.split(" ")[1].split(":");
        const [second, millisecond] = secondAndMillisecond.split(".");
        
        const yearInt = parseInt(year);
        const monthInt = parseInt(month);
        const dayInt = parseInt(day);
        const hourInt = parseInt(hour);
        const minuteInt = parseInt(minute);
        const secondInt = parseInt(second);
        const millisecondInt = parseInt(millisecond.substring(0, 3));
        
        const sumOfMilliseconds = (yearInt * 31536000000) + (monthInt * 2628000000) + (dayInt * 86400000) + (hourInt * 3600000) + (minuteInt * 60000) + (secondInt * 1000) + millisecondInt;

        console.log(sumOfMilliseconds);
        
        
        setLogs(resultData);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.h3 whileHover={{ scale: 1.1 }} className="title">View Logs</motion.h3>
        <h3 style={{ color: 'white',fontSize: '24px'}}>Click "Logs" button to get logs</h3> 
        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} id="logs-btn" onClick={fetchLogs}>Logs</motion.button>
        
        { logs && <motion.table 
        // variants={tableVariants}  // ใช้ variants สำหรับกรอบตาราง
        // initial="hidden"          // เริ่มต้นที่ซ่อน
        // animate="visible"        // แสดงเมื่ออยู่ในสถานะ visible
        
      whileHover={{ 
        y: [0, -3, 3, 0],  
        // scale: [1, 1.1, 1.1, 1],
        transition: {
          duration: 0.4,  
          ease: "easeOut",  
        }
      }} id="logs-table" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Created</th>
                        <th>Country</th>
                        <th>Drone ID</th>
                        <th>Drone Name</th>
                        <th>Celsius</th>
                        {/* <th>Num</th> */}
                    </tr>
                </thead>
                <tbody>
                    {logs.map((item, index) => (
                        <motion.tr 
                            key={index}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index} // ส่งค่า index เพื่อใช้ใน variants
                        >
                            <td>{(new Date(item.created)).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    hour12: false,
                                    timeZone: 'Asia/Bangkok',
                                })}
                            </td>
                            <td>{item.country}</td>
                            <td>{item.drone_id}</td>
                            <td>{item.drone_name}</td>
                            <td>{item.celsius}</td>
                            
                        </motion.tr>
                    ))}
                </tbody>
            </motion.table>}
            </div>
    ) 
}

export default ViewLogsScreen;