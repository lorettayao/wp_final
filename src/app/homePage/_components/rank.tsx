"use client";
import React, { useState, useEffect } from 'react';
import './rank.css';

interface RankData {
  userId: number;
  score: number;
}

interface RecordData {
  day: number;
  performance: number;
}

export default function Rank() {
  const [rankData, setRankData] = useState<RankData[]>([]);
  const [recordData, setRecordData] = useState<RecordData[]>([]);
  const [isInCompetitionMode, setIsInCompetitionMode] = useState(true);

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

  // Function to fetch and update user's 10-day performance
  const fetchMyRecordData = () => {
    // For now, let's use fixed data. In a real-world scenario, you'd fetch this from a different database.
    const fixedRecordData: RecordData[] = [
      { day: 1, performance: 95 },
      { day: 2, performance: 88 },
      { day: 3, performance: 92 },
      // Add more sample data as needed
    ];

    setRecordData(fixedRecordData);
  };

  // useEffect to fetch rank data on component mount
  useEffect(() => {
    fetchRankData();
  }, []);

  // Toggle between Competition and My Record modes
  const toggleMode = () => {
    if (isInCompetitionMode) {
      fetchMyRecordData();
    } else {
      fetchRankData();
    }

    setIsInCompetitionMode(!isInCompetitionMode);
  };

  return (
    <div className="rank-container">
      <h1 className="rank-heading">{isInCompetitionMode ? 'Daily competition' : 'My record'}</h1>
      <button className="refresh-button" onClick={toggleMode}>
        {isInCompetitionMode ? 'My Record' : 'Competition'}
      </button>
      <table className="rank-table">
        <thead>
          <tr>
            <th>{isInCompetitionMode ? 'User ID' : 'Date'}</th>
            <th>{isInCompetitionMode ? "Today's Score" : 'Score'}</th>
          </tr>
        </thead>
        <tbody>
          {isInCompetitionMode
            ? rankData.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.score}</td>
                </tr>
              ))
            : recordData.map((record) => (
                <tr key={record.day}>
                  <td>{record.day}</td>
                  <td>{record.performance}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
