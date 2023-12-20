import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const Graphe = () => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([44, 55, 41, 17, 15]);
  const [labels, setLabels] = useState(['A', 'B', 'C', 'D', 'E']);

  return (
    <div className="donut">
      <Chart options={options} series={series} type="donut" width="380" />
    </div>
  );
};

export default Graphe;