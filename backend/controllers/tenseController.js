import {db} from '../models/index.js';

export const getAllTenses = async (req, res) => {
  try {
    const tenses = await db.tense.findAll();
    res.json(tenses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getTenseWithVerb = async (req, res) => {
  try {
    const { tense } = req.params;
    const tenseData = await db[tense].find({
      include: [{
        model: db[tense], // assuming this is your junction table name between Verb and Tense
      }]
    });
    res.json(verbs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getPresentConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    console.log("db.Present: ", db.Present)
    const data = await db.Present.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getPreteriteConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Preterite.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getFutureConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Future.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getImperfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Imperfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getConditionalConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Conditional.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getPresentPerfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.PresentPerfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getPreteritePerfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.PreteritePerfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getPluperfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Pluperfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getFuturePerfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.FuturePerfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getConditionalPerfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.ConditionalPerfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getImperativeConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Imperative.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getNegativeImperativeConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.NegativeImperative.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getPresentSubjunctiveConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.PresentSubjunctive.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getImperfectSubjunctiveRaConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.ImperfectSubjunctiveRa.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getImperfectSubjunctiveSeConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.ImperfectSubjunctiveSe.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export default {
  getAllTenses,
  getConditionalConjugations,
  getConditionalPerfectConjugations,
  getFutureConjugations,
  getFuturePerfectConjugations,
  getImperativeConjugations,
  getImperfectConjugations,
  getImperfectSubjunctiveRaConjugations,
  getImperfectSubjunctiveSeConjugations,
  getNegativeImperativeConjugations,
  getPluperfectConjugations,
  getPresentConjugations,
  getPresentPerfectConjugations,
  getPresentSubjunctiveConjugations,
  getPreteriteConjugations,
  getPreteritePerfectConjugations,
  getTenseWithVerb
};
