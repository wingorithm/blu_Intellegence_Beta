import React from 'react';
import {FileText, ExternalLink} from 'lucide-react';

export interface CitedDocument {
    id: string;
    name: string;
    confidenceLevel: number; // 0-100
    url?: string;
    type?: 'pdf' | 'doc' | 'txt' | 'web' | 'other';
}

interface CitedDocumentsProps {
    documents?: CitedDocument[];
    className?: string;
}

export const CitedDocuments: React.FC<CitedDocumentsProps> = ({documents, className = ''}) => {
    // Dummy data if no documents provided
    const defaultDocuments: CitedDocument[] = [
        {
            id: '1',
            name: 'Research Paper on AI Models',
            confidenceLevel: 92,
            type: 'pdf',
            url: '#'
        },
        {
            id: '2',
            name: 'Technical Documentation Guide',
            confidenceLevel: 87,
            type: 'doc',
            url: '#'
        },
        {
            id: '3',
            name: 'Best Practices Manual',
            confidenceLevel: 95,
            type: 'pdf',
            url: '#'
        }
    ];

    const displayDocuments = documents || defaultDocuments;

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 90) return 'text-green-600 bg-green-50';
        if (confidence >= 75) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf':
            case 'doc':
            case 'txt':
                return <FileText className="w-4 h-4"/>;
            case 'web':
                return <ExternalLink className="w-4 h-4"/>;
            default:
                return <FileText className="w-4 h-4"/>;
        }
    };

    if (displayDocuments.length === 0) return null;

    return (
        <div className={`mt-4 ${className}`}>
            <div className="mb-3">
                <h4 className="text-sm font-medium text-white-700 mb-2">Cited Sources</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {displayDocuments.map((doc) => (
                        <div
                            key={doc.id}
                            className="relative bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow duration-200 group"
                        >
                            {/* Confidence Badge */}
                            <div
                                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(doc.confidenceLevel)}`}>
                                {doc.confidenceLevel}%
                            </div>

                            {/* Document Info */}
                            <div className="pr-12">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="text-gray-500">
                                        {getFileIcon(doc.type || 'other')}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {doc.name}
                                        </p>
                                    </div>
                                </div>

                                {doc.url && (
                                    <button
                                        onClick={() => window.open(doc.url, '_blank')}
                                        className="text-xs text-blue-600 transition-opacity duration-200 flex items-center gap-1">
                                        <ExternalLink className="w-3 h-3"/>
                                        View Source
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};