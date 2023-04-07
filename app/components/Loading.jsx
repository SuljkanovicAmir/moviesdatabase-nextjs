"use client"

import { useEffect } from "react";

export default function Loading() {
    
    return (
        <div className="loading-div">
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    );
}