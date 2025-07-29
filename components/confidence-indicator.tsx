import React from 'react';

interface ConfidenceIndicatorProps {
    level: number; // 0-100
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
                                                                            level,
                                                                            size = 'md',
                                                                            showLabel = true,
                                                                            className = ''
                                                                        }) => {
    const getColorClasses = (confidence: number) => {
        if (confidence >= 90) return 'bg-green-500 text-green-50';
        if (confidence >= 75) return 'bg-yellow-500 text-yellow-50';
        return 'bg-red-500 text-red-50';
    };

    const getSizeClasses = (size: string) => {
        switch (size) {
            case 'sm':
                return 'px-1.5 py-0.5 text-xs';
            case 'lg':
                return 'px-3 py-1.5 text-sm';
            default:
                return 'px-2 py-1 text-xs';
        }
    };

    return (
        <div className={`inline-flex items-center gap-0 ${className}`}>
            {showLabel && (
                <span className="text-xs text-white-600">Confidence Level:</span>
            )}
            <span
                className={`rounded-full font-medium ${getColorClasses(level)} ${getSizeClasses(size)}`}
            >
        {level}%
      </span>
        </div>
    );
};