import React from "react";
import { Link } from "react-router-dom";
interface AnalyticsCardProps {
  count: number;
  title: string;
  link: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  count = 0,
  title = "",
  link,
}): React.ReactElement => {
  return (
    <Link to={link}>
      <div className="flex flex-col items-center justify-center cursor-pointer gap-2 w-[300px] h-[150px] bg-white border border-cardBorder rounded-[5px] text-fontDark  [&>*:nth-child(even)]:hover:underline  [&>*:nth-child(even)]:hover:text-primary hover:border-primary transition-all duration-300 ease-in-out">
        <p className="text-3xl font-medium ">{count}</p>
        <h3 className="text-base font-normal ">{title}</h3>
      </div>
    </Link>
  );
};

export default AnalyticsCard;
