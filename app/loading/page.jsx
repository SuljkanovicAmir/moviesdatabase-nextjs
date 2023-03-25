"use client"

import React, { useEffect, useState } from "react";

export default function Loading() {
    const [show, setShow] = useState(false);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setShow(true);
        }, 2000);
    
        return () => {
          clearTimeout(timeoutId);
        };
      }, []);

    return (
        <div className={show ? "loading-div hidden" : "loading-div"}>
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </div>
    );
}