import React from 'react';

import Categories from './Categories';
import PopularListings from './PopularListings';
import Statistics from './Statistics';
import FAQ from './FAQ';

import Partners from './Partners';

import Blog from './Blog';

const HomePage = () => {
    return (
        <div>
            <Categories />
            <PopularListings />
            <Statistics />
            <FAQ />
          
            <Partners />
            <Blog/>
          


         
            
        </div>
    );
};

export default HomePage;