"use client";
import React, { useState, useEffect } from 'react';

interface RankData {
    userId: number;
    score: number;
}

export default function Rank() {
    const [rankData, setRankData] = useState<RankData[]>([]);

    // Function to fetch and update rank data

const fetchRankData = () => {
    // For now, let's use fixed data. In a real-world scenario, you'd fetch this from a server.
    const fixedData: RankData[] = [
        { userId: 1, score: 100 },
        { userId: 2, score: 85 },
        { userId: 3, score: 92 },
        // Add more sample data as needed
    ];

    setRankData(fixedData);
};

    // useEffect to fetch rank data on component mount
    useEffect(() => {
        fetchRankData();
    }, []);

    return (
        <div>
            <h2>User Rank</h2>
            <button onClick={fetchRankData}>Refresh</button>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Today's Score</th>
                    </tr>
                </thead>
                <tbody>
                    {rankData.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
