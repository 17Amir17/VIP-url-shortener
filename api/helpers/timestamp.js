const formatedTimestamp = () => {
  const d = new Date();
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return `${date} ${time}`;
};

const clickDateToOBJ = (dates) => {
  const date = new Date().toISOString().split('T')[0];
  if (dates[date]) dates[date] += 1;
  else dates[date] = 1;
  return dates;
};
module.exports = { formatedTimestamp, clickDateToOBJ };
