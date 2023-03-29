"use client"

import React, { useEffect, useState } from "react";

export default function Loading() {
    const [show, setShow] = useState(false);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setShow(true);
        }, 1800);
    
        return () => {
          clearTimeout(timeoutId);
        };
      }, []);

    return (
        <div className={show ? "loading-div hidden" : "loading-div"}>
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    );
}