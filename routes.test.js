const request = require('supertest');
const mongoose = require('mongoose');
const Profile = require('./models/profile');
const Comment = require('./models/comment');
const app = require('./app'); // Replace with the actual path to your Express app
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const userProfileForTesting = {
  id: 3,
  name: 'Alice Johnson',
  description: 'A description for Alice Johnson.',
  mbti: 'ISTJ',
  enneagram: '6w5',
  variant: 'so/sp',
  tritype: 152,
  socionics: 'LSI',
  sloan: 'RCOIN',
  psyche: 'FVEL',
  image: 'https://example.com/images/alice_johnson.png',
};

afterAll(async () => {
  app.close();
});

describe('Routes', () => {
  beforeEach(async () => {
    // Clear the database before each test
    await mongoose.connection.dropDatabase();
  });

  it('should create a new profile', async () => {
    const response = await request(app).post('/profile').send(userProfileForTesting);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    // Add more assertions as needed
  });

  it('should get a profile by ID', async () => {
    // Create a test profile in the database
    const testProfile = new Profile(userProfileForTesting);
    await testProfile.save();

    const response = await request(app).get(`/profile/${testProfile.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should create a new comment', async () => {
    const response = await request(app)
      .post('/profile/comment')
      .send({ title: 'Test Comment', description: 'This is a test comment', personalityVote: 'mbti' }); // Replace with valid payload

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should get comments for a profile', async () => {
    // Create a test profile in the database and comment on it so we can test
    const testProfile = new Profile({ name: 'Test User' });
    await testProfile.save();

    // Create a test comment associated with the profile
    const testComment = new Comment({
      title: 'Test Comment',
      description: 'This is a test comment',
      personalityVote: 'mbti',
    });
    testComment.profileId = testProfile._id;
    testComment.commentedBy = testProfile._id;
    await testComment.save();

    const response = await request(app).get(`/profile/${testProfile._id}/comments`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    // Assuming one comment was created
    expect(response.body.data).toHaveLength(1);
  });

  it('should render the homepage', async () => {
    const response = await request(app).get('/');

    // No profile in db as db is dropped before each test, so expect a 404
    expect(response.status).toBe(404);
  });
});
