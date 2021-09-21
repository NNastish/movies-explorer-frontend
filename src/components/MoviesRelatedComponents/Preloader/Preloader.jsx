import React from 'react';
import './Preloader.css';

function Preloader({preloaderState, notFound}) {
    function showPreloader() {
        return preloaderState || notFound;
    }

    return (
        <>
        {
            showPreloader() &&
            <div className='preloader'>
                <div className='preloader__container'>
                    {preloaderState && <span className='preloader__round'/>}
                    {notFound && <span>Ничего не найдено</span>}
                </div>
            </div>
        }
        </>
    );
}

export default Preloader;
