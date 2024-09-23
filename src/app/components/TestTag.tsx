import React, { useEffect, useState } from 'react';
import { SITE_ID, TABLE_HEADERS } from '~/constants';

interface EventData {
    eventType: string;
    visitorId: string;
    data: JSON;
    createdAt: string;
}

interface Text {
    text: string;
}

const TableHeader = ({ text }: Text) => <th className="px-6 py-5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{text}</th>
const TableData = ({ text }: Text) => <td className="px-6 py-4 text-left whitespace-nowrap text-gray-600">{text}</td>

const TestTag = () => {
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState([])

    const handleFetchNewRecords = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/events?" + new URLSearchParams({ siteId: SITE_ID }))
            const resJson = await res.json()
            if (resJson.success) {
                setEventData(resJson.data)
            }
        }
        catch (err) {
            console.error("error while getting events");
        }
        setLoading(false)
    }

    useEffect(() => {
        handleFetchNewRecords()
    }, [])

    return (
        <div className="flex flex-col overflow-x-auto my-8">
            <table className="min-w-full divide-y divide-gray-200 py-4 border rounded-xl">
                <thead>
                    <tr>
                        {TABLE_HEADERS.map((item: string) => (
                            <TableHeader text={item} />
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {eventData.map((row: EventData, index: number) => (
                        <tr key={`${row.visitorId}_${index}`}>
                            <TableData text={row.eventType} />
                            <TableData text={row.visitorId} />
                            <TableData text={JSON.stringify(row.data)} />
                            <TableData text={row.createdAt} />
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className={`cursor-pointer self-end p-3 m-3 rounded-md ${loading ? "bg-gray-300 text-gray-700" : "bg-blue-500 text-white"}`} onClick={handleFetchNewRecords}>{loading ? "Checking" : "Test Tag"}</button>
        </div>
    );
};

export default TestTag;