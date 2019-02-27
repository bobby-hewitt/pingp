import React from 'react';
import './style.scss'

const Hero = ({copy, color}) => (
 <h1 className={`type type__hero ${color}`}>{copy}</h1>
);

export default Hero;