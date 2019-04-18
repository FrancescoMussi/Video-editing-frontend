export default {
  get: jest.fn((url) => {
    if (url === '/something') {
      return Promise.resolve({
        data: 'data'
      });
    }
  }),
  post: jest.fn((url) => {
    if (url === 'http://localhost:8000/api/concat_videos') {
      return Promise.resolve({
        data: [{id: 1, name: 'video1'}, {id: 2, name: 'video2'}]
      });
    }
  }),
  create: jest.fn(function () {
    return this;
  })
};