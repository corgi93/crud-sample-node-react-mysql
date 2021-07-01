/**
 * MySQL에 tutorial table 생성.
 * 생성될 column : id / title / description / published / createAt / updatedAt
 */

module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define('tutorial', {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Tutorial;
};
