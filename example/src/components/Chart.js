import React, {useRef, useEffect} from 'react';
import Sunburst from 'sunburst-chart';
import {lighten} from 'polished';

const smallDatapointIdSuffix = 'smallDatapointIdSuffix';

function SunburstChart({rawData, name, maxLevels, excludeRoot, bucket, showCurrentCountry}) {

  const chart = Sunburst();

  const data = {
    name,
    percent: 100,
    children: [],
  }

  // transform data to match structure
  rawData.forEach((datum) => {
    const {id, title, value} = datum;
    let topLevelParentId;
    const color = value < 0.15 ? lighten(0.3, datum.color) : datum.color;
    if (showCurrentCountry && datum.topLevelParentId === 'USA') {
      if (bucket && value < 0.15) {
        topLevelParentId = 'Cities in USA with < 0.15%';
      } else {
        topLevelParentId = title;
      }
    } else {
      topLevelParentId = datum.topLevelParentId;
    }
    const existingNodeIndex = data.children.findIndex(({id}) => id === topLevelParentId);
    if (existingNodeIndex !== -1) {
      const node = {
        id, name: title, value, color, percent: value,
      };
      if (bucket && value < 0.15 && !(showCurrentCountry && datum.topLevelParentId === 'USA')) {
        const existingSmallDataNodeIndex =
          data.children[existingNodeIndex].children.findIndex(({id}) => id === topLevelParentId + smallDatapointIdSuffix);
        if (existingSmallDataNodeIndex !== -1) {
          data.children[existingNodeIndex].children[existingSmallDataNodeIndex].percent += value;
          data.children[existingNodeIndex].children[existingSmallDataNodeIndex].children.push({...node});
        } else {
          data.children[existingNodeIndex].children.push({
            name: 'Cities in ' + topLevelParentId + ' with <0.15%',
            id: topLevelParentId + smallDatapointIdSuffix,
            color,
            percent: value,
            children: [{...node}]
          });
        }
      } else {
        data.children[existingNodeIndex].children.push(node);
      }
      data.children[existingNodeIndex].percent += value;
    } else {
      let node;
      if (!(showCurrentCountry && datum.topLevelParentId === 'USA')) {
        node = bucket && value < 0.15 ? {
          name: topLevelParentId,
          id: topLevelParentId,
          color,
          percent: value,
          children: [{
            id: topLevelParentId + smallDatapointIdSuffix,
            name: name + ' in ' + topLevelParentId + ' with <0.15% representation',
            value,
            percent: value,
            color,
            children: [{id, name: title, value, percent: value, color}]
          }]
        } : {
          name: topLevelParentId,
          id: topLevelParentId,
          color,
          percent: value,
          children: [{
            id, name: title, value, color, percent: value,
          }]
        }
      } else {
        node = bucket && value < 0.15 ? {
          name: topLevelParentId,
          id: topLevelParentId,
          color,
          percent: value,
          children: [{
            id: topLevelParentId + smallDatapointIdSuffix,
            name: name + ' in ' + topLevelParentId + ' with <0.15% representation',
            percent: value,
            color,
          }]
        } : {id, name: title, value, color, percent: value}
      }
      data.children.push(node)
    }
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (node) {
      chart
        .width(node.offsetWidth)
        .width(500)
        .data(data)(node)
        .excludeRoot(excludeRoot)
        .color('color')
        .radiusScaleExponent(1)
        .minSliceAngle(0)
        .maxLevels(maxLevels)
        .centerRadius(0.3)
        .onClick(n => {
          if (n && n.children && n.children.length) {
            chart.focusOnNode(n);
          }
        })
        .tooltipTitle(n => {
          if (n.percent) {
            return n.name + ': ' + parseFloat(n.percent.toFixed(2)) + '%';
          } else {
            return n.name;
          }
        })

      if (showCurrentCountry) {
        chart.sort((a, b) => {
          if (a.data.color === '#ff0029') {
            return -1;
          } else {
            return 1;
          }
        })
      }
    }
  }, [containerRef, data, chart, maxLevels, excludeRoot, showCurrentCountry])

  return (
    <div ref={containerRef}>
    </div>
  );
}

export default SunburstChart;
