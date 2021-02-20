const users = {};

const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

users.register = async (req, resp) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    typeAdmin,
  } = req.body;
  const userData = {
    firstName,
    lastName,
    username,
    email,
    password,
    typeAdmin,
  };
  if (!firstName || !lastName || !username || !email || !password) {
    resp.status(200).json({
      message: {
        msgBody: "Not all fields have been entered.",
        msgError: true,
      },
    });
  }
  if (password.length < 5) {
    resp.status(200).json({
      message: {
        msgBody: "The password needs to be at least 5 characters long.",
        msgError: true,
      },
    });
  } else {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return resp.status(200).json({
        message: {
          msgBody: "An account with this email already exists.",
          msgError: true,
        },
      });
    }
    if (!existingUser) {
      bcrypt.hash(password, 10, (err, hash) => {
        userData.password = hash;
          UserModel.create(userData, (err, doc) => {
            if (err) {
              resp.status(200).json({
                message: {
                  msgBody: "Account Already Exists.",
                  msgError: true,
                },
              });
            } else {
              resp.status(200).json({
                message: {
                  msgBody: doc.email + " Registered.",
                  msgError: false,
                },
              });
            }
          });
      });
    }
  }
};

users.login = (req, resp) => {
  UserModel.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          //Password Match
          const payload = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            typeAdmin: user.typeAdmin,
          };
          let token = jwt.sign(payload, "secret", {
            expiresIn: 1440,
          });
          resp.status(200).json({
            token,
            message: {
              msgBody: "User is Logged.",
              msgError: false,
            },
          });
        } else {
          resp.status(200).json({
            message: {
              msgBody: "User does password exist.",
              msgError: true,
            },
          });
        }
      } else {
        resp.status(200).json({
          message: {
            msgBody: "User does not exist.",
            msgError: true,
          },
        });
      }
    })
    .catch((err) => {
      resp.send("error: " + err);
    });
};

users.profile = (req, resp) => {
  var decoded = jwt.verify(req.headers['authorization'], 'secret');

  UserModel.findOne({
    _id: decoded._id
  })
    .then(user => {
      if(user){
        resp.json(user);
      } else {
        resp.send('User does Exist');
      }
    })
    .catch(err => {
      resp.send('error: ' + err);
    });
}

users.users = (req, resp) => {
  UserModel.find((err, users) => {
    if (err) {
      resp.status(200).json({
        message: {
          msgBody: "Unabled to get User",
          msgError: true,
        },
      });
    } else {
      resp.status(200).json({ users });
    }
  });
};

users.deleteUsers = (req, resp) => {
  UserModel.findOneAndDelete({_id: req.params.id}, (err, doc) => {
    if(err){
      resp.status(200).json({ message: {
        msgBody: 'Unable to Delete User.',
        msgError: true
      }});
    } else {
      const payload = {
        _id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        username: doc.username,
        email: doc.email,
        typeAdmin: doc.typeAdmin,
      };
      let token = jwt.sign(payload, "secret", {
        expiresIn: 1440,
      });
      resp.status(200).json({ token, message: {
        msgBody: 'Succesfully Deleted User.',
        msgError: false
      }});
    }
  });
}

users.updateUsers = async (req, resp) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
  } = req.body;
  const userData = {
    password
  }
  if (!firstName || !lastName || !username || !email || !password) {
    resp.status(200).json({
      message: {
        msgBody: "Not all fields have been entered.",
        msgError: true,
      },
    });
  }
  if (password.length < 5) {
    resp.status(200).json({
      message: {
        msgBody: "The password needs to be at least 5 characters long.",
        msgError: true,
      },
    });
  } else {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return resp.status(200).json({
        message: {
          msgBody: "An account with this email already exists.",
          msgError: true,
        },
      });
    }
    if (!existingUser) {
      bcrypt.hash(password, 10, (err, hash) => {
        userData.password = hash;
          UserModel.findOneAndUpdate({_id: req.params.id}, {
            firstName,
            lastName,
            username,
            email,
            password: userData.password
          }, {runValidators:true}, (err, doc) => {
            if (err) {
              resp.status(200).json({
                message: {
                  msgBody: "Account Already Exists.",
                  msgError: true,
                },
              });
            } else {
              resp.status(200).json({
                message: {
                  msgBody: doc.email + " Updated.",
                  msgError: false,
                },
              });
            }
          });
      });
    }
  }
}

users.user = async (req, resp) => {
  const user = await UserModel.findById(req.params.id);
  resp.json(user);
}

module.exports = users;
