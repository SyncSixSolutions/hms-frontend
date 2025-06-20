import React from 'react';

interface BarChartProps {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  height?: number;
  barWidth?: number;
  defaultColor?: string;
  title?: string;
  subtitle?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
  barWidth = 20,
  defaultColor = '#6B72D6',
  title,
  subtitle,
}) => {
  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  // Calculate chart dimensions
  // Chart dimensions are calculated based on the container width
  
  // Calculate bar height based on value
  const getBarHeight = (value: number) => {
    return (value / maxValue) * (height - 40); // Leave space for labels
  };

  return (
    <div className="w-full">
      {title && (
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}      <div className="relative" style={{ height: `${height}px` }}>
        <div className="flex items-end justify-around h-full">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="rounded-t-md transition-all hover:opacity-80"
                style={{
                  height: `${getBarHeight(item.value)}px`,
                  width: `${barWidth}px`,
                  backgroundColor: item.color || defaultColor,
                }}
              />
              <div className="text-xs text-gray-600 mt-1">{item.label}</div>
              <div className="text-xs font-medium text-gray-800">{item.value}</div>
            </div>
          ))}
        </div>
        
        {/* Optional: Y-axis grid lines */}
        <div className="absolute top-0 left-0 h-full w-full -z-10">          {[0.25, 0.5, 0.75, 1].map((tick, i) => (
            <div
              key={i}
              className="absolute border-t border-gray-200 w-full"
              style={{ top: `${height - (tick * (height - 40) + 40)}px` }}
            >
              <span className="text-[10px] text-gray-400 absolute -top-3 -left-5">
                {Math.round(maxValue * tick)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChart;
