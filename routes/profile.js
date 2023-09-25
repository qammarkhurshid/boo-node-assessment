'use strict';

const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const Comment = require('../models/Comment');

module.exports = function () {
  router.post('/profile', async function createProfile(req, res, next) {
    console.log('POST /profile'); //replace with a proper logger in prod environment

    try {
      const userProfilePayload = req.body;
      if (!userProfilePayload.name) {
        res.status(400).send({ success: false, error: 'VALIDATION_ERROR', message: 'Name is required.' });
        return;
      }

      let profileToSave = new Profile(userProfilePayload);
      profileToSave = await profileToSave.save();
      res.status(201).send({ success: true, message: 'Profile created successfully.', data: profileToSave });
    } catch (err) {
      console.log(`${new Date().toUTCString()} - ERROR - [createProfile] ${err.message}`);
      res.status(500).send({ success: false, error: 'SERVER_ERROR', message: 'Unexpected Error' });
    }
  });

  router.get('/profile/:id', async function getProfile(req, res, next) {
    const { id } = req.params;
    console.log('GET /profile - ', id); //replace with a proper logger in prod environment
    try {
      if (!id) {
        res.render(`<h1>Please provide a valid id!</h1>`);
        return;
      }
      const requestedProfile = await Profile.findOne({ id });
      if (!requestedProfile) {
        res.status(404).render('404.ejs');
        return;
      }

      res.status(200).render('profile_template', {
        profile: requestedProfile,
      });
    } catch (err) {
      console.log(`${new Date().toUTCString()} - ERROR - [getProfile] ${err.message}`);
      res.status(500).send({ success: false, error: 'SERVER_ERROR', message: 'Unexpected Error' });
    }
  });

  router.post('/profile/comment', async function voteOrComment(req, res, next) {
    console.log('GET /profile/comment'); //replace with a proper logger in prod environment
    try {
      const commentPayload = req.body;
      if (!commentPayload.title && !commentPayload.description && !commentPayload.personalityVote) {
        res.status(400).send({ success: false, error: 'VALIDATION_ERROR', message: 'Comment or vote is required.' });
        return;
      }

      let commentToSave = new Comment(commentPayload);
      commentToSave = await commentToSave.save();
      res.status(201).send({ success: true, message: 'Profile created successfully.', data: commentToSave });
    } catch (err) {
      console.log(`${new Date().toUTCString()} - ERROR - [voteOrComment] ${err.message}`);
      res.status(500).send({ success: false, error: 'SERVER_ERROR', message: 'Unexpected Error' });
    }
  });

  router.get('/profile/:id/comments', async function voteOrComment(req, res, next) {
    console.log('GET /profile/:id/comments'); //replace with a proper logger in prod environment
    try {
      const userProfileForComments = req.params.id;

      // Allowed Values - Validation - Should be moved to a different layer or middleware in real time scenario
      const allowedFilterTypes = ['mbti', 'enneagram', 'zodiac'];
      const allowedSortOrderValues = ['asc', 'ascending', 'desc', 'descending', 1, -1];
      const allowedSortBy = ['likes', 'recent'];

      if (!userProfileForComments) {
        res.status(400).send({ success: false, error: 'VALIDATION_ERROR', message: 'Profile Id is required' });
        return;
      }

      //Default values
      let filter = { profileId: userProfileForComments };
      const defaultSortOrder = 'descending';
      const defaultSortBy = 'likes';

      //If Passed through query
      const sortOrder =
        req.query.sortOrder && allowedSortOrderValues.includes(req.query.sortOrder)
          ? req.query.sortOrder
          : defaultSortOrder;

      let sortBy =
        req.query.sortBy && allowedSortBy.includes(req.query.sortBy) && req.query.sortBy.toLowerCase() === 'likes'
          ? defaultSortBy
          : 'createdAt';

      if (req.query.filter && allowedFilterTypes.includes(req.query.filter.toLowerCase())) {
        filter.personalityVote = req.query.filter;
      }

      const commentsForProfiles = await Comment.find(filter).sort({
        [sortBy]: sortOrder,
      });

      res.status(200).send({ success: true, data: commentsForProfiles });
    } catch (err) {
      console.log(`${new Date().toUTCString()} - ERROR - [voteOrComment] ${err.message}`);
      res.status(500).send({ success: false, error: 'SERVER_ERROR', message: 'Unexpected Error' });
    }
  });

  //Incase, no profile id is provided - a random profile will be shown.
  router.get('/*', async function homePage(req, res, next) {
    console.log('GET /homepage'); //replace with a proper logger in prod environment
    try {
      // A `random (just the latest)` profile to be shown on homepage
      const randomProfile = await Profile.findOne();

      // If there are no profiles in db then 404 page will be shown
      if (!randomProfile) {
        res.status(404).render('404.ejs');
        return;
      }

      res.status(200).render('profile_template', {
        profile: randomProfile,
      });
    } catch (err) {
      console.log(`${new Date().toUTCString()} - ERROR - [homePage] ${err.message}`);
      res.status(500).render('server_error');
    }
  });

  return router;
};
