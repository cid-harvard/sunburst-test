import React from 'react';
import SunburstChart from '../components/Chart';
import raw from 'raw.macro';
import styled from 'styled-components';

const Root = styled.div`
  width: 800px;
  height: 500px;
`;

const destBostonEmployeeData = JSON.parse(raw('../data/boston_dest_employees.json'));

function App() {

  return (
    <Root>
      <SunburstChart
        rawData={destBostonEmployeeData}
        name='All Cities'
        maxLevels={2}
        excludeRoot={true}
        bucket={false}
      />
    </Root>
  );
}

export default App;
