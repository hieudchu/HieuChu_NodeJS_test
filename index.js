const { UserRepository, DepositMoneyCommand } = require('./depositMoney.js');
 
const userRepository = new UserRepository(); 
const depositMoneyCommand = new DepositMoneyCommand(userRepository);

// Example usage
const userId = "user123";
const depositAmount = 50;

const result = depositMoneyCommand.depositMoney(userId, depositAmount);
if (result) {
  console.log(
    `Deposit successful. New balance: ${userRepository.getUser(userId).balance} for user: ${userId}`,
  );
} else {
  console.log("Deposit failed. Please provide a valid amount.");
}
