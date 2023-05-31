import React from 'react';

interface MandatoryProps {
    fontSize?: string;
}

const Manditory: React.FC<MandatoryProps> = ({
    fontSize = 'sm',
}): React.ReactElement => {
    return (
        <span className={`text-fontError text-${fontSize} font-medium `}>*</span>
    );
};

export default Manditory;
