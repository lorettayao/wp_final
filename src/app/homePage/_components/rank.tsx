"use client";
import React, { useState, useEffect } from 'react';
import './rank.css';
import { getUsers, getMyRecordData, getTodayGlobalRanking } from '../actions';

interface RankData {
  userId: string;
  score: number;
}

interface RecordData {
  day: string;
  performance: number;
}

export default function Rank() {
  const [rankData, setRankData] = useState<RankData[]>([]);
  const [recordData, setRecordData] = useState<RecordData[]>([]);
  const [isInCompetitionMode, setIsInCompetitionMode] = useState(true);
  // Function to fetch and update rank data
  const fetchRankData = async () => {
    const recordsUserId= await getTodayGlobalRanking();
    const records = recordsUserId.records;

    const rankData:string[] = [];
    for(let i = 0; i < records.length; i++){
      if (!rankData.includes(records[i].userId)) {
        rankData.push(records[i].userId);
      }
    }
    // calculate the sum of learned of every user, and store it in an array with form like [userId, sum]
    const sumOfUser: RankData[] = [];
    for(let i = 0; i < rankData.length; i++){
      let sum = 0;
      const user = await getUsers(rankData[i]);
      const userName = user? user.name: rankData[i];
      for(let j = 0; j < records.length; j++){
        if(rankData[i] === records[j].userId){
          sum += 1;
        }
      }
      sumOfUser.push({ userId: userName, score: sum });
    }
    sumOfUser.sort((a, b) => {
      return b.score - a.score;
    });
    setRankData(sumOfUser);
  };

  // Function to fetch and update user's 10-day performance
  const fetchMyRecordData = async () => {
    // For now, let's use fixed data. In a real-world scenario, you'd fetch this from a different database.
    const records = await getMyRecordData();
    const dates:string[] = [];

    for (let i = 0; i < records.length; i++) {
      const learnedDate = records[i].learnedDate;
      if (learnedDate && !dates.includes(learnedDate)) {
        dates.push(learnedDate);
      }
    }
    dates.sort().reverse();
    const recordData = [];
    for (let i = 0; i < dates.length; i++) {
      let sum = 0;
      for (let j = 0; j < records.length; j++) {
        if (records[j].learnedDate === dates[i]) {
          sum += 1;
        }
      }
      recordData.push({ day: dates[i], performance: sum });
    }
    setRecordData(recordData);
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
