# DeBored

DeBored is an innovative app designed to combat boredom by allowing individuals to discover new hobbies and connect with like-minded people. Our goal is to create a personalized experience by offering tailored hobby suggestions while fostering friendships among users who share common interests!

**Release:** v1.0.0 (Beta)

## Directories

There are 4 top-level sub-directories detailed below:
- `.github/` contains all files for CI using GitHub Actions
- `frontend/` contains all of the frontend files including code and documentation
- `backend/` contains all of the backend files including code and documentation
- `reports/` contains all of the weekly status reports

## Development 

### Setup 

1. Install the Node.js runtime (v18.18.2) and Git in order to retrieve the source code and contribute to it
      1. This is necessary in order to build, test, and the run the system
2. `cd frontend` from the root directory
3. Run `npm install` to install dependencies
4. Install the Expo Go app on your mobile device
  
### Build and Run 

To build and run the system: 
1. `cd frontend` from the root directory
2. Run `npx expo start`
3. Scan the generated QR on your mobile device to launch the project

### Testing 

The root repository has GitHub Actions set up to automatically run the test suite on all pull requests and pushes to main. 

To manually test the frontend: 
1. `cd frontend` from the root directory
2. Run `npm run test` to run all of our tests

To add new tests to CI testing: 
1. Navigate into the `frontend/screens/__tests__` from the root directory
2. Create a test in a `TestName.test.js` file

## Releases

### Beta Release

For our Beta Release, we focused on implementing the use case of allowing a user to take a quiz inquiring about their interests and have our app come up with activities based off of the user's answers. In addition, DeBored is able to generate new ideas in the case that the user is not enticed by a suggested activity (regenerated ideas are also based off of user's responses).
