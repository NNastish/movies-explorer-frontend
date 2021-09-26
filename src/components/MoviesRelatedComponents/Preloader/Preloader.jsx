import React from 'react';
import './Preloader.css';

function Preloader({ preloaderState }) {

    return (
        <>
        {
            <div className='preloader'>
                <div className='preloader__container'>
                    {preloaderState ? <span className='preloader__round'/> : <span>Ничего не найдено</span>}
                </div>
            </div>
        }
        </>
    );
}

export default Preloader;
