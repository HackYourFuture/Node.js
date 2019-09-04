const uuid = require('uuid');
const Util = require('./util');
const FILENAME = 'counters.json';
const util = new Util(FILENAME);

class Api {
  async readCounters(req, res) {
    let counters = await util.read();
    res.send(counters);
  }

  async createCounter(req, res) {
    try {
      const counters = await util.read();
      const counter = {
        name: req.body.name,
        id: uuid.v4()
      };
      counters.push(counter);
      await util.save(counters);
      res.end('Counter was successful created!');
    }
 catch (err) {
      res.end(err);
    }
  }

  async updateCounters(req, res) {
    try {
      let counters = await util.read();
      const counter = counters.find(counter => counter.id === req.params.id);
      if (!counter) return res.status(404).send('The counter with the given Id was not Found!');
      counter.name = req.body.name;
      await util.save(counters);
      res.status = 201;
      res.end('The update was successful!');
    }
 catch (err) {
      res.end(err);
    }
  }

  async getSpecificCounter(req, res) {
    let counters = await util.read();
    const counter = counters.find(counter => counter.id === req.params.id);
    if (!counter) return res.status(404).send('The counter with the given Id was not Found!');
    res.send(counter);
  }

  async deleteCounter(req, res) {
    try {
      let counters = await util.read();
      const counter = counters.find(counter => counter.id === req.params.id);
      if (!counter) return res.status(404).send('The counter with the given Id was not Found!');
      const index = counters.indexOf(counter);
      counters.splice(index, 1);
      await util.save(counters);
      res.status = 201;
      res.end('Counter successfully deleted!');
    }
 catch (err) {
      res.end(err);
    }
  }
}

module.exports = Api;
