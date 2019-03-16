const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodeMailer = require('nodemailer');
const handlebars = require('handlebars');
const CandidatUser = require('../../models/candidat-user');

const fs = require('fs');

const readHTMLFile = function(path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    var seed = crypto.randomBytes(20);
    var authToken = crypto
      .createHash('sha1')
      .update(seed + req.body.email)
      .digest('hex');
    const candidatuser = new CandidatUser({
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash
    });
    candidatuser.save().then(result => {
      res.status(201).json({
        message: 'User created!',
        result: result,
        userId: candidatuser._id
      });
    });
    console.log(candidatuser);
  });
};

exports.loginUser = (req, res, next) => {
  let fetchedUser;
  CandidatUser.findOne({ email: req.body.email })
    .then(candidatuser => {
      fetchedUser = candidatuser;
      return bcrypt.compare(req.body.password, candidatuser.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        'dfyuikbfIOKBVFYUIOLNBVFYUIKJHVFDFG',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
};

exports.getMyProfile = (req, res, next) => {
  CandidatUser.findById({ _id: req.userData.userId }).then(documents => {
    if (documents) {
      res.status(200).json(documents);
    } else {
      res.status(404).json({ message: 'Candidat not found!' });
    }
  });
};

exports.getProfiles = (req, res, next) => {
  CandidatUser.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched succesfully!',
      listCandidats: documents
    });
  });
};

exports.getProfileById = (req, res, next) => {
  CandidatUser.findById(req.params.id).then(documents => {
    if (documents) {
      res.status(200).json(documents);
    } else {
      res.status(404).json({ message: 'Candidat not found!' });
    }
  });
};

exports.DeleteCandidat = (req, res, next) => {
  CandidatUser.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Contact deleted!' });
  });
};
