db.createUser({
  user: "Hussnain",
  pwd: "Hussnain.00",
  roles: [
    {
      role: "readWrite",
      db: "websterwork",
    },
  ],
});
