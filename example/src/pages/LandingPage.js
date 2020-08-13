import React from 'react';
import {Link} from 'react-router-dom';

function LandingPage() {

  return (
    <ul>
      <li><Link to='/cities-all-nodes'>Render All Nodes</Link></li>
      <li><Link to='/cities-bucket-nodes'>Bucket Nodes with {'<'} 0.15%</Link></li>
      <li><Link to='/cities-aggregate-nodes'>Aggregate and Bucket Nodes</Link></li>
      <li><Link to='/cities-aggregate-nodes-except-current'>Aggregate and Bucket Nodes, Except Current Country</Link></li>
    </ul>
  );
}

export default LandingPage;
