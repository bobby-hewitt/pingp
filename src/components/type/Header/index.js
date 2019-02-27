import React from 'react';
import './style.scss'

const Header = ({copy, color}) => (
 <h3 className={`type type__header ${color}`}>{copy}</h3>
);

export default Header;