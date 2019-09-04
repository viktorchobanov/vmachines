var Expense = require("../models/Expense");
var Machine = require("../models/Machine");
var Message = require("../models/Message");
var Order = require("../models/Order");
var Product = require("../models/Product");
var User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");
var key = "supersectet";

module.exports = {
  authenticate: function(req, res) {
    if (!req.body.username || !req.body.password) {
      res
        .status(400)
        .json({ success: false, message: "Wrong username or password!" });
    } else {
      User.findOne({ username: req.body.username.toLowerCase() })
        .select("username password")
        .exec(function(err, user) {
          if (err) throw err;

          if (!user) {
            res.json({
              success: false,
              message: "Invalid username or password!"
            });
          } else if (user) {
            var isValid = user.authenticate(req.body.password);

            if (!isValid) {
              res.json({
                success: false,
                message: "Invalid username or password!"
              });
            } else {
              var token = jwt.sign({ username: user.username }, key, {
                expiresIn: "10sec"
              });
              res.json({ success: true, message: "success", token: token });
            }
          }
        });
    }
  },

  addUser: function(req, res) {
    var newUser = new User();

    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.email = req.body.email;

    newUser.save(err => {
      if (err) {
        res.json({ success: false, msg: "Error creating!" });
      } else {
        res.json({ success: true, msg: "Created successfully!" });
      }
    });
  },

  addMachine: function(req, res) {
    var newMachine = new Machine();

    newMachine.owner = req.body.owner;
    newMachine.country = req.body.country;
    newMachine.state = req.body.state;
    newMachine.city = req.body.city;
    newMachine.street = req.body.street;
    newMachine.type = req.body.type;
    newMachine.products = [];

    Machine.find({}, (err, machines) => {
      newMachine.machineID = machines.length + 1;

      User.findOne(
        {
          username: req.body.owner
        },
        (err, user) => {
          newMachine.owner = user.username;

          newMachine.save(err => {
            if (err) {
              console.log(err);
              res.json({ success: false, msg: "Error creating machine!" });
            } else {
              res.json({ success: true, msg: "Created successfully!" });
            }
          });
        }
      );
    });
  },

  addExpense: function(req, res) {
    var newExpense = new Expense();

    newExpense.type = req.body.type;
    newExpense.amount = req.body.amount;
    newExpense.owner = req.body.owner;

    var machineID = req.body.machineID;

    Machine.findOne({
      _id: machineID
    }).exec((err, machine) => {
      newExpense.machine = machine;

      newExpense.save(err => {
        if (err) {
          res.json({ success: false, msg: "Error creating!" });
        } else {
          res.json({ success: true, msg: "Created successfully!" });
        }
      });
    });
  },

  addProduct: function(req, res) {
    var newProduct = new Product();

    newProduct.name = req.body.name;
    newProduct.amount = req.body.amount;
    newProduct.price = req.body.price;
    newProduct.cost = req.body.cost;
    newProduct.machineID = req.body.machineID;

    Product.findOne(
      {
        name: newProduct.name
      },
      (err, product) => {
        if (err) {
          res.json({ success: false, msg: "Error creating!" });
        } else {
          if (product == null) {
            newProduct.save(err => {
              if (err) {
                res.json({ success: false, msg: "Error creating!" });
              } else {
                res.json({ success: true, msg: "Created successfully!" });
              }
            });
          } else {
            Product.findOneAndUpdate(
              {
                name: newProduct.name
              },
              newProduct,
              (err, updated) => {
                if (err) {
                  res.json({ success: false, msg: "Error updating!" });
                } else {
                  res.json({ success: true, msg: "Updated successfully!" });
                }
              }
            );
          }
        }
      }
    );
  },

  addOrder: function(req, res) {
    var newOrder = new Order();

    var productName = req.body.productName;
    var machineID = req.body.machineID;
    var owner = req.body.owner;
    newOrder.machineID = machineID;

    Product.findOne(
      {
        name: productName
      },
      (err, product) => {
        if (err) {
          res.json({ success: false, msg: "Error finding!" });
        } else {
          if (product && product != null && product.amount <= 0) {
            var newMessage = new Message();

            newMessage.machineID = machineID;
            newMessage.message = `Machine ${machineID} is out of ${productName}!`;
            newMessage.owner = owner;

            newMessage.save(err => {
              if (err) {
                res.json({ success: false, msg: "Error creating!" });
              } else {
                res.json({
                  success: false,
                  msg: `Machine ${machineID} is out of ${productName}!`
                });
              }
            });
          } else if (product && product != null){
            var newAmount = product.amount - 1;

            Product.findOneAndUpdate(
              {
                name: productName
              },
              {
                amount: newAmount
              },
              (err, updated) => {
                if (err) {
                  res.json({ success: false, msg: "Error updating!" });
                } else {
                  newOrder.order = product;

                  newOrder.save(err => {
                    if (err) {
                      res.json({ success: false, msg: "Error creating!" });
                    } else {
                      res.json({ success: true, msg: "Created successfully!" });
                    }
                  });
                }
              }
            );
          } else {
              res.json({ success: false, msg: product});
          }
        }
      }
    );
  },

  getAllMachines: function(req, res) {
    Machine.find(
      {
        owner: req.params.owner
      },
      function(err, machines) {
        res.send(machines);
      }
    );
  },

  getMachineByID: function(req, res) {
    var machineID = req.params.machineID;

    Machine.findOne({
      machineID: machineID
    })
      .select("machineID products")
      .exec(function(err, machine) {
        res.send(machine);
      });
  },

  getAllUsers: function(req, res) {
    User.find({}, function(err, users) {
      res.send(users);
    });
  },

  getAllProducts: function(req, res) {
    Product.find(
      {
        machineID: req.params.machineID
      },
      function(err, products) {
        res.send(products);
      }
    );
  },

  getAllOrders: function(req, res) {
    var owner = (req.params && req.params.owner) || "a";

    Machine.find({
      owner: owner
    }).exec((err, machines) => {
      if (err || !machines) {
        res.send([]);
      } else {
        var machineID = (machines[0] && machines[0].machineID) || 0;

        Order.find(
          {
            machineID: machineID
          },
          function(err, orders) {
            res.send(orders);
          }
        );
      }
    });
  },

  getAllOrdersByMachineID: function(req, res) {
    var machineID = (req.params && req.params.machineID) || 0;

    Order.find(
      {
        machineID: machineID
      },
      function(err, orders) {
        if (!orders) {
          res.send([]);
        } else {
          res.send(orders);
        }
      }
    );
  },

  getAllExpenses: function(req, res) {
    var owner = (req.params && req.params.owner) || "a";
    var expenses = {
      rent: 0,
      electicity: 0,
      other: 0
    };

    Expense.find({
      owner: owner,
      type: "rent"
    }).exec(function(err, rentExpenses) {
      rentExpenses.forEach(rent => {
        expenses.rent += rent.amount;
      });

      Expense.find({
        owner: owner,
        type: "electicity"
      }).exec(function(err, electicityExpenses) {
        electicityExpenses.forEach(electicity => {
          expenses.electicity += electicity.amount;
        });

        Expense.find({
          owner: owner,
          type: "other"
        }).exec(function(err, otherExpenses) {
          otherExpenses.forEach(other => {
            expenses.other += other.amount;
          });

          res.send(expenses);
        });
      });
    });
  },

  getAllMessages: function(req, res) {
    var owner = (req.params && req.params.owner) || "a";

    Message.find(
      {
        owner: owner
      },
      function(err, messages) {
        if (!messages) {
          res.send([]);
        } else {
          res.send(messages);
        }
      }
    );
  },

  updateMachine: function(req, res) {
    var machineID = req.params.machineID;
    var newMachine = req.body;

    Machine.findOneAndUpdate({ machineID }, newMachine, (err, updated) => {
      if (err) {
        res.json({ success: false, msg: "Machine could not be updated!" });
      }

      res.json({ success: true, msg: "Machine updated successfully." });
    });
  },

  updatePassword: function(req, res) {
    var username = req.body.username;
    var newPassword = req.body.newPassword;

    bcrypt.hash(newPassword, null, null, function(err, hash) {
      if (err) {
        res.json({ success: false, msg: "Could not change password!" });
      }

      User.findOne({ username: username.toLowerCase() })
        .select("username password")
        .exec(function(err, user) {
          if (err) throw err;

          if (!user) {
            res.json({
              success: false,
              message: "Invalid username or password!"
            });
          } else if (user) {
            var isValid = user.authenticate(req.body.oldPassword);

            if (isValid) {
              User.findOneAndUpdate(
                {
                  username
                },
                {
                  password: hash
                },
                (err, updated) => {
                  if (err) {
                    res.json({
                      success: false,
                      msg: "Could not change password!"
                    });
                  }

                  res.json({
                    success: true,
                    msg: "Password changed successfully."
                  });
                }
              );
            }
          }
        });
    });
  },

  updateExpense: function(req, res) {
    var expenseID = req.params.expenseID;
    var newExpense = req.body;

    Expense.findByIdAndUpdate(expenseID, newExpense, (err, updated) => {
      if (err) {
        res.json({ success: false, msg: "Expense count not be updated!" });
      }

      res.json({ success: true, msg: "Expense updated successfully." });
    });
  },

  deleteExpense: function(req, res) {
    var expenseID = req.params.expenseID;

    Expense.deleteOne({
      _id: expenseID
    }).exec(err => {
      if (err) {
        res.json({ success: false, msg: "Could not delete expense!" });
      }

      res.json({ success: true, msg: "Deleted successfully." });
    });
  },

  deleteProduct: function(req, res) {
    var name = req.params.name;

    Product.deleteOne({
      name: name
    }).exec(err => {
      if (err) {
        res.json({ success: false, msg: "Could not delete product!" });
      }

      res.json({ success: true, msg: "Deleted successfully." });
    });
  },

  deleteMachine: function(req, res) {
    var machineID = req.params.machineID;

    Machine.deleteOne({
      machineID: machineID
    }).exec(err => {
      if (err) {
        res.json({ success: false, msg: "Could not delete machine!" });
      }

      res.json({ success: true, msg: "Deleted successfully." });
    });
  },

  getIncome: function(req, res) {
    var income = 0;
    var owner = req.params.owner || "pesho";

    Machine.find({
      owner: owner
    })
      .select("-_id machineID")
      .exec(function(err, machines) {
        var ids = [];

        machines.forEach(machine => {
          ids.push(machine.machineID);
        });

        Order.find({
          machineID: {
            $in: ids
          }
        }).exec((err, orders) => {
          if (err || !orders) {
            res.json({ success: false, msg: "Error with orders!" });
          }

          if (orders && orders.length == 0) {
            res.json({ income: 0 });
          } else {
            orders.forEach(order => {
              income += order.order.price - order.order.cost;
            });

            res.json({ income });
          }
        });
      });
  },

  getMachineStatistics: function(req, res) {
    var machineID = req.params.machineID || "1";

    Order.find({
      machineID
    })
      .select("order -_id")
      .exec((err, resp) => {
        if (err || !resp || resp === []) {
          res.json({ success: false });
        } else {
          var lineChart = {
            labels: [],
            data: []
          };

          var pieChart = {
            labels: [],
            data: []
          };

          var barChart = {
            labels: [],
            data: []
          };

          resp.forEach(order => {
            var info = order.order;
            var amount = info.price - info.cost;

            if (!lineChart.labels.includes(info.name)) {
              lineChart.labels.push(info.name);
              lineChart.data.push(amount);

              pieChart.labels.push(info.name);
              pieChart.data.push(amount);

              barChart.labels.push(info.name);
              barChart.data.push(amount);
            } else {
              var index = lineChart.labels.indexOf(info.name);
              lineChart.data[index] += amount;

              index = pieChart.labels.indexOf(info.name);
              pieChart.data[index] += amount;

              index = barChart.labels.indexOf(info.name);
              barChart.data[index] += amount;
            }
          });

          res.json({ success: true, lineChart, pieChart, barChart });
        }
      });
  },

  getStatistics: function(req, res) {
    var user = req.params.owner;

    Order.find({
      // identify the user
    })
      .select("order -_id")
      .exec((err, resp) => {
        if (err || !resp || resp === []) {
          res.json({ success: false });
        } else {
          var lineChart = {
            labels: [],
            data: []
          };

          var pieChart = {
            labels: [],
            data: []
          };

          var barChart = {
            labels: [],
            data: []
          };

          // if (info.name == 'Fanta') {
          //   var ts = info._id.getTimestamp();
          //   lineChart.labels.push(info.name);
          //   lineChart.data.push(1);
          // } else {
          //   var index = lineChart.labels.indexOf(info.name);
          //   lineChart.data[index] += amount;
          // }  

          resp.forEach(order => {
            var info = order.order;
            var amount = info.price - info.cost;

            if (!lineChart.labels.includes(info.name)) {
              lineChart.labels.push(info.name);
              lineChart.data.push(1);

              pieChart.labels.push(info.name);
              pieChart.data.push(amount);

              barChart.labels.push(info.name);
              barChart.data.push(amount);
            } else {
              var index = lineChart.labels.indexOf(info.name);
              lineChart.data[index] += 1;

              index = pieChart.labels.indexOf(info.name);
              pieChart.data[index] += Math.round(amount, 2);

              index = barChart.labels.indexOf(info.name);
              barChart.data[index] += Math.round(amount, 2);
            }
          });

          res.json({ success: true, lineChart, pieChart, barChart });
        }
      });
  }
};
