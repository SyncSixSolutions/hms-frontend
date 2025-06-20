import React from 'react';

interface PieChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  title?: string;
  subtitle?: string;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 180,
  title,
  subtitle,
}) => {
  // Calculate the total value
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate the center of the circle
  const center = size / 2;
  const radius = center * 0.8;
  
  // Track the current angle for drawing segments
  let currentAngle = 0;
  
  // Generate the segments for the chart
  const segments = data.map((item) => {
    // Calculate the segment angle
    const percentage = item.value / total;
    const angle = percentage * 360;
    
    // Calculate SVG arc properties
    const startAngle = currentAngle;
    const endAngle = startAngle + angle;
    currentAngle = endAngle;
    
    const startX = center + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
    const startY = center + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
    
    const endX = center + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
    const endY = center + radius * Math.sin((endAngle - 90) * (Math.PI / 180));
    
    // Determine if the arc should be drawn as a large arc (> 180 degrees)
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    // Create the path for the arc
    const path = `
      M ${center} ${center}
      L ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
      Z
    `;
    
    return {
      path,
      color: item.color,
      percentage,
      label: item.label,
      value: item.value,
    };
  });

  return (
    <div className="flex flex-col items-center">
      {title && (
        <div className="mb-2 text-center">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              stroke="#fff"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
      
      {/* Legend */}      <div className="grid grid-cols-2 gap-2 mt-4 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-700">{item.label} ({Math.round(item.value / total * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
