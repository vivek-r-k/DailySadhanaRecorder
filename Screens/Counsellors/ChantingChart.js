import React from 'react';
import { View, ScrollView } from 'react-native'; // Import ScrollView from react-native
import { VictoryChart, VictoryLine, VictoryAxis, VictoryScatter,VictoryTheme } from 'victory-native';

// const yData = ["15-40", "12-30", "15-30", "14-20"];
// const xData = ["10-08-2023", "09-08-2023", "08-08-2023", "07-08-2023"];



// console.log("line 12:",typeof(yNumericalData));

const ChantingChart = (props) => {
  // console.log("line 13:",props.yData);
  // console.log("line 14:",props.xData);  

  const yData = props.yData
  const xData = props.xData
  const combinedData = yData.map((time, index) => ({ time, index }));
  combinedData.sort((a, b) => {
    const [aHours, aMinutes] = a.time.split("-").map(Number);
    const [bHours, bMinutes] = b.time.split("-").map(Number);
    
    if (aHours !== bHours) {
      return aHours - bHours;
    } else {
      return aMinutes - bMinutes;
    }
  });

  const sortedIndices = combinedData.map(item => item.index);
  const yNumericalData = sortedIndices;
  const data = xData.map((x, index) => ({ x, y: yNumericalData[index] }));
  
  return (
    <ScrollView horizontal>
      <View style={{ width: xData.length * 150 /* Adjust width based on data */ }}>
        <VictoryChart width={300} height={220} theme={VictoryTheme.material}>
          <VictoryLine data={data} x="x" y="y" style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}/>
          <VictoryScatter data={data} x="x" y="y" size={5} />
          <VictoryAxis
            dependentAxis
            tickValues={yNumericalData}
            tickFormat={(t) => yData[t]}
          />
          <VictoryAxis tickFormat={(x) => x}
            style={{
              axisLabel: { padding: 30 },
              tickLabels: { angle: -25 }
            }}
          />
        </VictoryChart>
      </View>
    </ScrollView>
  );
};

export default ChantingChart;
