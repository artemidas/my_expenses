/* eslint-env node */

exports.up = pgm => {
  pgm.createTable("expenses", {
    id: "id",
    name: { type: "varchar(1000)", notNull: true },
    periodicity: { type: "varchar(1000)", notNull: true },
    fee: { type: "decimal", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};
