function generateRandomUser(index: number) {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const userId = String(getRandomInt(100000, 999999));
  const names = ['John Doe', 'Alice Johnson', 'Bob Smith', 'Emily Davis', 'David Lee'];
  const userName = names[getRandomInt(0, names.length - 1)];
  const email = `user${userId}@example.com`;
  const status = Math.random() < 0.5 ? 'active' : 'inactive';

  const createdDate = new Date(getRandomInt(2000, 2022), getRandomInt(0, 11), getRandomInt(1, 28));

  const lastUsedDate = new Date(getRandomInt(2000, 2022), getRandomInt(0, 11), getRandomInt(1, 28));

  const formatDate = (date: any) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return {
    rowId: index + 1,
    userId,
    userName,
    email,
    status,
    created_at: formatDate(createdDate),
    last_used: formatDate(lastUsedDate)
  };
}

export const usersManagementData = Array?.from({ length: 100 }, (_, index) =>
  generateRandomUser(index)
);
