"use client";
import { useState } from "react";
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const HomePage = () => {
  const [betAmount, setBetAmount] = useState<string>(""); // Сумма ставки
  const [betId, setBetId] = useState<number>(0); // ID ставки
  const [winner, setWinner] = useState<string>(""); // Адрес победителя

  // Хук для создания ставки
  const { writeContractAsync: createBet } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "createBet",
    args: [], // Мы не передаем параметры в контракте (кроме значения ставки)
    value: betAmount, // Сумма ставки
  });

  // Хук для получения информации о ставке
  const { data: bet } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "bets",
    args: [betId], // Передаем ID ставки для получения информации
  });

  // Хук для определения победителя
  const { writeContractAsync: determineWinner } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "determineWinner",
    args: [], // Опять же, здесь не передаем дополнительных аргументов
  });

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Betting DApp</h1>

      {/* Раздел для создания ставки */}
      <div className="w-1/2 border p-4">
        <h2>Создать ставку</h2>
        <input
          type="text"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Сумма ставки (ETH)"
          className="w-full p-2"
        />
        <button
          onClick={() => createBet()} // Используем writeContractAsync
          className="bg-blue-500 text-white p-2"
        >
          Создать
        </button>
      </div>

      {/* Раздел для завершения ставки */}
      <div className="w-1/2 border p-4">
        <h2>Завершить ставку</h2>
        <input
          type="number"
          value={betId}
          onChange={(e) => setBetId(Number(e.target.value))}
          placeholder="ID ставки"
          className="w-full p-2"
        />
        <input
          type="text"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          placeholder="Адрес победителя"
          className="w-full p-2"
        />
        <button
          onClick={() => determineWinner()} // Используем writeContractAsync
          className="bg-red-500 text-white p-2"
        >
          Завершить
        </button>
      </div>

      {/* Показать информацию о ставке */}
      {bet && (
        <div className="w-1/2 border p-4">
          <h2>Информация о ставке</h2>
          <p>Игрок: {bet.player}</p>
          <p>Сумма: {bet.amount} ETH</p>
          <p>Победитель: {bet.hasWon ? "Да" : "Нет"}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
