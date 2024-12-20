// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YourContract {
    // Структура для ставки
    struct Bet {
        address player;
        uint256 amount;
        bool hasWon;
    }

    // Массив для хранения адресов игроков
    address[] public players;

    // Маппинг для ставок
    mapping(address => Bet) public bets;

    uint256 public totalBets;

    // Адрес владельца контракта
    address public owner;

    // Событие для логирования создания ставки
    event BetCreated(address indexed player, uint256 amount);

    // Конструктор для установки владельца контракта
    constructor() {
        owner = msg.sender; // Владелец контракта - тот, кто его развернул
    }

    // Функция для создания ставки
    function createBet() external payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
        require(bets[msg.sender].amount == 0, "You have already placed a bet"); // Запрещает повторные ставки

        // Запись ставки
        bets[msg.sender] = Bet(msg.sender, msg.value, false);
        totalBets += msg.value;

        // Добавление игрока в массив
        players.push(msg.sender);

        // Логирование события
        emit BetCreated(msg.sender, msg.value);
    }

    // Функция для получения информации о ставке
    function getBet(address player) external view returns (Bet memory) {
        return bets[player];
    }

    // Функция для определения победителя (например, случайным образом)
    function determineWinner() external {
        // Просто для примера: если ставка больше 1 эфира, то игрок выигрывает
        for (uint256 i = 0; i < players.length; i++) {
            address player = players[i];
            if (bets[player].amount > 1 ether) {
                bets[player].hasWon = true;
                payable(player).transfer(bets[player].amount * 2); // Возвращаем удвоенную сумму победителю
                break;
            }
        }
    }

    // Функция для вывода средств с контракта владельцем
    function withdraw() external {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
