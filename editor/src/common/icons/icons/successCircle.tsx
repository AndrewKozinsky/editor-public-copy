import React from 'react'

export default function SuccessCircle() {
    return (
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <circle fill="#28A645" cx="6.5" cy="6.5" r="6.5" />
            <polyline stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" points="4.5 6.5 6 8 9.5 4.5" />
        </g>
    )
}
