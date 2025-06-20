import React from 'react';

interface DataPoint {
  date: string;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
  height?: number;
  color?: string;
  title?: string;
  subtitle?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({ 
  data, 
  height = 200, 
  color = '#6B72D6', 
  title,
  subtitle
}) => {
  // Find the maximum value in the data to scale the chart
  const maxValue = Math.max(...data.map(point => point.value));
  
  // Get min value for better visualization
  const minValue = Math.max(0, Math.min(...data.map(point => point.value)) - (maxValue * 0.1));
  
  // Normalize values between 0 and 1 for rendering
  const normalizeValue = (value: number) => {
    return (value - minValue) / (maxValue - minValue);
  };

  // Generate path for the area
  const generatePath = () => {
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - normalizeValue(point.value) * 100;
      return `${x},${y}`;
    });

    // Start point (bottom left)
    const startPoint = `0,100`;
    // End point (bottom right)
    const endPoint = `100,100`;

    return `M${startPoint} L${points.join(' L')} L${endPoint} Z`;
  };

  // Generate path for the line
  const generateLinePath = () => {
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - normalizeValue(point.value) * 100;
      return `${x},${y}`;
    });

    return `M${points.join(' L')}`;
  };
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      {title && (
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className="relative w-full h-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Area fill */}
          <path
            d={generatePath()}
            fill={`${color}20`}
            stroke="none"
          />
          {/* Line on top */}
          <path
            d={generateLinePath()}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
          {/* Data points */}
          {data.map((point, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 100}
              cy={100 - normalizeValue(point.value) * 100}
              r="1.5"
              fill={color}
              stroke="#fff"
              strokeWidth="1"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
          {data.map((point, index) => {
            // Only show some labels to avoid overcrowding (first, last, and some in between)
            if (index === 0 || index === data.length - 1 || index % Math.ceil(data.length / 5) === 0) {
              return (
                <div key={index} className="text-xs text-gray-500 -mb-2">
                  {point.date}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
