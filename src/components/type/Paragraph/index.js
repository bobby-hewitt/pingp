import React from 'react';
import './style.scss'

const Paragraph = ({copy, color}) => (
 <p className={`type type__paragraph ${color}`}>{copy}</p>
);

export default Paragraph;