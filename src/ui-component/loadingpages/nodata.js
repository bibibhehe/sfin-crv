import React from 'react';
import nodata from 'assets/images/nodata.png';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const NoData = () => {
  const [loading, setLoading] = useState(true);
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowNoData(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <Box style={{ textAlign: 'center', padding: '20px', Height: '50%' }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

  return <div style={{ textAlign: 'center', padding: '20px', Height: '50%' }}>{showNoData && <img src={nodata} alt="No Data" />}</div>;
};

export default NoData;
