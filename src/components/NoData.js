import React from 'react'
import { useSelector } from 'react-redux'
import { Images } from '../data/Images';

const NoData = () => {

    const currentThemeRedux = useSelector((state) => state.theme.theme);
    console.log('currenthemeredux', currentThemeRedux)

    return (
        <div className='no_data_container'>
            <img
                src={currentThemeRedux == 'dark' ? Images.noDataDark : Images.noDataLight}
                className='no_data_image'
            />
            <p className='no_data_text'>No Data Found</p>
        </div>
    )
}

export default NoData