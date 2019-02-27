import React from 'react';
import './style.scss'

const Subheader = ({copy, color}) => (
 <h5 className={`type type__subheader ${color}`}>{copy}</h5>
);

export default Subheader;