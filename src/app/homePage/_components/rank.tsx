"use client";
import React, { useState, useEffect } from 'react';
import './rank.css';
import { getUsers, getMyRecordData, getTodayGlobalRanking, getAllTimeGlobalRanking } from '../actions';

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
  const [allRankData, setAllRankData] = useState<RankData[]>([]);
  const [mode, setMode] = useState('competition'); // ['competition', 'myrecord', 'alltime']
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
    setRankData(sumOfUser.slice().sort((a, b) => b.score - a.score));
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
    setRecordData(recordData.slice().sort((a, b) => b.performance - a.performance));
  };

  // Function to fetch and update rank data
  const fetchAllRankData = async () => {
    const recordsUserId= await getAllTimeGlobalRanking();
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
    setAllRankData(sumOfUser.slice().sort((a, b) => b.score - a.score));
  };

  // useEffect to fetch rank data on component mount
  useEffect(() => {
    fetchRankData();
  }, []);

  // Toggle between Competition and My Record modes
  // const toggleMode = () => {
  //   if (isInCompetitionMode) {
  //     fetchMyRecordData();
  //   } else {
  //     fetchRankData();
  //   }

  //   setIsInCompetitionMode(!isInCompetitionMode);
  // };

  const toCompetitionMode = () => {
    fetchRankData();
    setMode("competition");
  }
  const toMyRecordMode = () => {
    fetchMyRecordData();
    setMode("myrecord");
  }
  const toAllTimeMode = () => {
    fetchAllRankData();
    setMode("alltime");
  }

  return (
    <div>
      <div className='flex gap-4 text-xs p-2'>
          <button className="refresh-button flex-1 p-1" onClick={toCompetitionMode}>
            Competition
          </button>
          <button className="refresh-button flex-1" onClick={toMyRecordMode}>
            My Record
          </button>
          <button className="refresh-button flex-1" onClick={toAllTimeMode}>
            All Time
          </button>
        </div>
      <div className="rank-container">
        
        <h1 className="rank-heading text-lg font-bold">
          {mode==='competition' ? 'Daily Competition' : mode==='myrecord' ? 'My Record' : 'All Time Score'}
        </h1>
        <table className="rank-table">
          <thead>
            <tr>
              <th>{ mode==='competition' ? 'Name' : mode==='myrecord' ? 'Date' : 'Name' }</th>
              <th>{ mode==='competition' ? "Today's Score" : mode==='myrecord' ? 'Score' : 'Score' }</th>
            </tr>
          </thead>
          <tbody>
            {mode==='competition'
              ? rankData.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.score}</td>
                  </tr>
                ))
              : mode==='myrecord' 
              ? recordData.map((record) => (
                  <tr key={record.day}>
                    <td>{record.day}</td>
                    <td>{record.performance}</td>
                  </tr>
                ))
              : allRankData.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.score}</td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>
    </div>
  );
}
