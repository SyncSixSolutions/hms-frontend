import React from 'react';

interface DataPoint {
  date: string;
  value: number;
}

interface ColumnChartProps {
  data: DataPoint[];
  height?: number;
  color?: string;
  title?: string;
  subtitle?: string;
}

const ColumnChart: React.FC<ColumnChartProps> = ({ 
  data, 
  height = 250, 
  color = '#6B72D6', 
  title,
  subtitle
}) => {
  // Find the maximum value in the data to scale the chart
  const maxValue = Math.max(...data.map(point => point.value));
  
  // Add 10% padding to the top for better visualization
  const paddedMaxValue = maxValue * 1.1;
  
  // Calculate the bar height based on value
  const getBarHeight = (value: number) => {
    return (value / paddedMaxValue) * (height - 40); // Leave space for labels
  };
  
  // Calculate bar width based on container and data length
  const barWidth = 100 / (data.length * 2 - 1); // Adjust for spacing between bars

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      {title && (
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      <div className="relative w-full h-full">
        {/* Y-axis grid lines */}
        <div className="absolute inset-0">
          {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
            <div 
              key={ratio}
              className="absolute w-full border-t border-gray-200 z-0 pointer-events-none"
              style={{ bottom: `${ratio * (height - 40)}px` }}
            ></div>
          ))}
        </div>
        
        {/* Bars container */}
        <div className="absolute bottom-8 left-0 right-0 flex items-end justify-between h-[calc(100%-40px)]">
          {data.map((point, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
              style={{ width: `${barWidth}%` }}
            >
              <div
                className="relative w-4/5 rounded-t-md hover:opacity-90 transition-all cursor-pointer group"
                style={{ 
                  height: `${getBarHeight(point.value)}px`, 
                  background: `linear-gradient(to top, ${color}, ${color}CC)`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {/* Value tooltip on hover */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {point.value}
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="mt-2 text-xs text-gray-500">
                {point.date}
              </div>
            </div>
          ))}
        </div>
        
        {/* Y-axis values */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <div key={ratio} className="flex items-center h-6">
              <span className="text-xs text-gray-400">
                {Math.round(paddedMaxValue * (1 - ratio))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColumnChart;
