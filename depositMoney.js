class UserRepository {
    constructor() {
        this.users = {};
    }

    getUser(userId) {
        return (this.users[userId] || { balance: 0 });
    }

    saveUser(userId, userData) {
        this.users[userId] = userData;
    }
}

class DepositMoneyCommand {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    depositMoney(userId, amount) {
        
        if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
            return false;
        }

        const user = this.userRepository.getUser(userId);
        user.balance += amount;

        this.userRepository.saveUser(userId, user);

        return true;
    }
}

module.exports = {
    UserRepository,
    DepositMoneyCommand,
};
