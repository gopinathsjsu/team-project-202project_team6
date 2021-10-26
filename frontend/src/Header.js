import React from 'react'
import "./Header.css"
// import { Link } from "react-router-dom"
import SearchIcon from '@material-ui/icons/Search';
// import Icon from '@material-ui/core/Icon';
// import SearchIcon from '@material-ui/icons/SearchIcon';


function Header() {
    return (
        <div className="header">
            <img src='https://s21.q4cdn.com/616071541/files/multimedia-gallery/assets/Logos/american-airlines/THUMB-aa_aa__ahz_rgb_grd_rev.png' className="header__logo" />
            <div className="header__search">
                <input className="header__searchInput" type="text"></input>
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__option">
                <span className="header__optionLineOne">
                    Hello
                </span>
                <span className="header__optionLineTwo">
                    Guest
                </span>
            </div>
        </div>
    )
}
export default Header
