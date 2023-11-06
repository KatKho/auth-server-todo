'use strict';

const express = require('express');
const bearer = require('../middlewares/bearer.js');
const acl = require('../middlewares/acl.js');
const { TodoModel } = require('../models/index.js');
const router = express.Router();

router.get('/todo', bearer, acl('read'), async (req, res, next) => {
  try {
    let todos = await TodoModel.findAll({});
    res.status(200).json(todos);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.get('/todo/:id', bearer, acl('read'), async (req, res, next) => {
  try {
    let todo = await TodoModel.findOne({ where: { id: req.params.id }});
    res.status(200).json(todo);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.post('/todo', bearer, acl('create'), async (req, res, next) => {
  try {
    let todo = await TodoModel.create(req.body);
    res.status(201).json(todo);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.put('/todo/:id', bearer, acl('update'), async (req, res, next) => {
  try {
    let todo = await TodoModel.findOne({ where: {id: req.params.id }});
    await todo.update(req.body);
    res.status(200).json(todo);
  } catch(e) {
    next(e);
  }
});
router.delete('/todo/:id', bearer, acl('delete'), async (req, res, next) => {
  try {
    await TodoModel.destroy({ where: {id: req.params.id }});
    res.sendStatus(204);
  } catch(e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;