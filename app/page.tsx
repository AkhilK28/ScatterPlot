'use client'
import React, { useState, useEffect } from 'react';
import './Scatterplot.css'; // Import the CSS file for styling

interface DataPoint {
  [key: string]: number | string;
  label: string;
}

const Scatterplot = () => {
  // Dummy data for the scatterplot
  const data: DataPoint[] = [
    { x1: 1, y1: 15, x2: 30, y2: 80, label: 'Data Point 1' },
    { x1: 2, y1: 9, x2: 40, y2: 60, label: 'Data Point 2' },
    { x1: 3, y1: 7, x2: 50, y2: 30, label: 'Data Point 3' },
    { x1: 4, y1: 13, x2: 60, y2: 70, label: 'Data Point 4' },
    { x1: 5, y1: 8, x2: 20, y2: 90, label: 'Data Point 5' },
  ];

  const [selectedX, setSelectedX] = useState('x1'); // Initial selected X indicator
  const [selectedY, setSelectedY] = useState('y1'); // Initial selected Y indicator
  const [isClient, setIsClient] = useState(false); // State to track client-side rendering

  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component is mounted on the client-side
  }, []);

  const handleXIndicatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedX(e.target.value);
  };

  const handleYIndicatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedY(e.target.value);
  };

  if (!isClient) {
    return null; // If not on the client-side, return null to avoid rendering the component
  }

  // Find the minimum and maximum values for x and y indicators
  const xValues = data.map(point => point[selectedX] as number);
  const yValues = data.map(point => point[selectedY] as number);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  const margin = 20; // Margin between points and graph edges
  const tickCount = 5; // Number of tick values

  return (
    <div className="scatterplot-container">
      <h2>Scatterplot with Dummy Data</h2><br></br>

      <div className="scatterplot" style={{ margin: `${margin}px` }}>
        {data.map((point, index) => (
          <div
            key={index}
            className="scatterplot-point"
            style={{
              left: `${
                ((point[selectedX] as number - xMin) / (xMax - xMin)) * 100
              }%`,
              bottom: `${
                ((point[selectedY] as number - yMin) / (yMax - yMin)) * 100
              }%`,
            }}
            title={`${point.label} (${point[selectedX]}, ${point[selectedY]})`}
          />
        ))}

        <div className="x-axis">
          {Array.from({ length: tickCount }).map((_, index) => {
            const tick = xMin + ((xMax - xMin) / (tickCount - 1)) * index;
            return (
              <div
                key={index}
                className="x-tick"
                style={{
                  left: `${
                    ((tick - xMin) / (xMax - xMin)) * 100
                  }%`,
                }}
              >
                {tick}
              </div>
            );
          })}
        </div>

        <div className="y-axis">
          {Array.from({ length: tickCount }).map((_, index) => {
            const tick = yMin + ((yMax - yMin) / (tickCount - 1)) * index;
            return (
              <div
                key={index}
                className="y-tick"
                style={{
                  bottom: `${
                    ((tick - yMin) / (yMax - yMin)) * 100
                  }%`,
                }}
              >
                {tick}
              </div>
            );
          })}
        </div>
      </div>

      <br></br>
      <div className="scatterplot-axis-titles">
        <div className="axis-title-x">
          <span>X Axis:</span>
          <select value={selectedX} onChange={handleXIndicatorChange}>
            <option value="x1">X1</option>
            <option value="x2">X2</option>
          </select>
        </div>

        <div className="axis-title-y">
          <span>Y Axis:</span>
          <select value={selectedY} onChange={handleYIndicatorChange}>
            <option value="y1">Y1</option>
            <option value="y2">Y2</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Scatterplot;
