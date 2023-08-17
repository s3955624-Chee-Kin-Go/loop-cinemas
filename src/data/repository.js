import BarbiePoster from '../movie_posters/barbie.jpeg';
import OppenheimerPoster from '../movie_posters/oppenheimer.jpeg';
import MissionImpossiblePoster from '../movie_posters/mission_impossible.jpeg';
import TheMoonPoster from '../movie_posters/the_moon.jpeg';
import TheMarvelsPoster from '../movie_posters/the_marvels.jpeg';
import WonkaPoster from '../movie_posters/wonka.jpeg';
import ConcreteUtopiaPoster from '../movie_posters/concrete_utopia.jpeg';
import DunePartTwoPoster from '../movie_posters/dune_part_two.jpeg';

const MOVIES_KEY = "movies";
const USERS_KEY = "users";
const USERINDEX_KEY = "index";
const USER_KEY = "user";
const USEREMAIL_KEY = "email";
const USERPASSWORD_KEY = "password";
const USERSIGNUPDATE_KEY = "signupDate";
const REVIEWS_KEY = "reviews";

// Initialise movies array into local storage
function initMovies() {
  // Stop if data is already initialised.
  if(localStorage.getItem(MOVIES_KEY) !== null)
    return;

  // Hard-coded movie data
  const movies = [
    {
      title: "Barbie",
      imageURL: [BarbiePoster],
      sessionTime: ["10:25am", "12:00pm", "2:30pm", "3:45pm", "5:00pm", "8:00pm"],
      averageRating: 0,
      ratingCount: 0
    },
    {
      title: "Oppenheimer",
      imageURL: [OppenheimerPoster],
      sessionTime: ["11:25am", "1:00pm", "2:45pm", "5:00pm", "6:30pm", "7:00pm"],
      averageRating: 0,
      ratingCount: 0
    },
    {
      title: "Mission: Impossible - Dead Reckoning Part 1",
      imageURL: [MissionImpossiblePoster],
      sessionTime: ["10:20am", "2:00pm", "2:45pm", "4:50pm", "5:20pm", "7:10pm", "9:00pm", "11:30pm"],
      averageRating: 0,
      ratingCount: 0
    },
    {
      title: "The Moon",
      imageURL: [TheMoonPoster],
      sessionTime: ["10:25am", "12:00pm", "2:30pm", "3:45pm", "5:00pm", "8:00pm"],
      averageRating: 0,
      ratingCount: 0
    },
    {
      title: "The Marvels",
      imageURL: [TheMarvelsPoster],
      sessionTime: ["9:00am", "11:10pm", "12:45pm", "2:00pm", "6:10pm"],
      averageRating: 0,
      ratingCount: 0
    },
    {
      title: "Wonka",
      imageURL: [WonkaPoster],
      sessionTime: ["8:50am", "10:10pm", "11:30pm", "5:10pm", "8:10pm"],
      averageRating: 0,
      ratingCount: 0
    },
    {
      title: "Concrete Utopia",
      imageURL: [ConcreteUtopiaPoster],
      sessionTime: ["11:50am", "1:00pm", "3:35pm", "4:45pm", "7:30pm", "9:30pm"],
      averageRating: 0,
      ratingCount: 0
    },
    {
      title: "Dune Part Two",
      imageURL: [DunePartTwoPoster],
      sessionTime: ["10:25am", "11:00am", "12:30pm", "1:45pm", "3:00pm", "5:10pm", "7:10pm"],
      averageRating: 0,
      ratingCount: 0
    }
  ];

  // Set movies array into local storage.
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialised.
  if(localStorage.getItem(USERS_KEY) !== null)
    return;

  // Hard-coded user data, passwords are in plain-text.
  const users = [
    {
      username: "mbolger",
      email: "mbolger@email.com",
      password: "abc123",
      signupDate: "Fri, 3 Mar 2023"
    },
    {
      username: "shekhar",
      email: "shekhar@email.com",
      password: "def456",
      signupDate: "Tue, 31 Jan 2023"
    }
  ];

  // Set ysers array into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Initialise local storage "reviews" with data, if the data is already set this function returns immediately.
function initReviews() {
  // Stop if data is already initialised.
  if(localStorage.getItem(REVIEWS_KEY) !== null)
    return;

  // Create reviews array
  const reviews = [];

  // Set reviews array into local storage.
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

// Get the movies array from local storage
function getMovies() {
  // Extract movie data from local storage.
  const data = localStorage.getItem(MOVIES_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

// Sort the movies array from highest to lowest
function sortMovies() {
  // Extract movie data from local storage.
  const movies = getMovies();

  // Sort Movies from highest to Lowest Rating
  movies.sort((movie1,movie2) => movie2.averageRating - movie1.averageRating);

  // Set movies array into local storage.
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

// Get the users array from local storage
function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

// Add newly signed-up user's name, email, password into local storage
function addNewUser(newUsername, newEmail, newPassword, newSignupDate) {
  const users = getUsers();

  // Push new user object into users array
  users.push({
    username: newUsername,
    email: newEmail,
    password: newPassword,
    signupDate: newSignupDate
  });

  // Update users array into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// update user's name and email into local storage
function updateUser(updatedUsername, updatedEmail, userIndex) {
  const users = getUsers();
  const reviews = getReviews();

  // Modify username and email to the updated value
  users[userIndex].username = updatedUsername;
  users[userIndex].email = updatedEmail;
  
  // Modify username for reviews
  for(const review of reviews) {
    if(getUser() === review.username)
    {
      review.username = updatedUsername;
    }
  }

  // Update reviews array with updated username
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Update user's username and email key value in local storage
  localStorage.setItem(USER_KEY, updatedUsername);
  localStorage.setItem(USEREMAIL_KEY, updatedEmail);

  // Update reviews array with updated username
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

// Verify the user email and password by comparing with user data stored in local storage
function verifyUser(email, password) {
  const users = getUsers();
  for(const user of users) {
    if(email === user.email && password === user.password)
    {
      setUser(user.username, user.email, user.password, user.signupDate, users.indexOf(user));
      return true;
    }
  }
  return false;
}

// Remove user and user's reviews from local storage
function deleteUser(currUsername) {
  const users = getUsers();
  const reviews = getReviews();
  const movies = getMovies();

  // Delete user profile
  for(const user of users) {
    if(currUsername === user.username)
    {
      const userIndex = users.indexOf(user);
      users.splice(userIndex, 1);
      break;
    }
  }

  // Delete all user's reviews
  for (var reviewIndex = reviews.length - 1; reviewIndex >= 0; --reviewIndex) {
    if (reviews[reviewIndex].username === currUsername) {

      // Recalculate average rating
      for(const movie of movies) {
        if (movie.title === reviews[reviewIndex].movie) {
          // Set the total rating = (average rating * rating count) - rating
          movie.averageRating = (movie.averageRating * movie.ratingCount) - reviews[reviewIndex].rating;
          // Decrement rating count
          movie.ratingCount--;
          // Calculate average rating
          if (movie.ratingCount === 0) {
            movie.averageRating = 0;
          }
          else {
            movie.averageRating =  movie.averageRating / movie.ratingCount;
          }
          break;
        }
      }  
      
      // Remove user's review
      reviews.splice(reviewIndex,1);
    }
  }

  // Update users array with updated username
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  // Update reviews array with updated username
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  // Set movies array into local storage.
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

// Set signed-in user's individual data fields into local storage
function setUser(username, email, password, signupDate, index) {
  localStorage.setItem(USER_KEY, username);
  localStorage.setItem(USEREMAIL_KEY, email);
  localStorage.setItem(USERPASSWORD_KEY, password);
  localStorage.setItem(USERSIGNUPDATE_KEY, signupDate);
  localStorage.setItem(USERINDEX_KEY, index);
}

// Get signed-in user's username field from local storage
function getUser() {
  return localStorage.getItem(USER_KEY);
}

// Get signed-in user's email field from local storage
function getEmail() {
  return localStorage.getItem(USEREMAIL_KEY);
}

// Get signed-in user's password field from local storage
function getPassword() {
  return localStorage.getItem(USERPASSWORD_KEY);
}

// Get signed-in user's sign up date field from local storage
function getSignUpDate() {
  return localStorage.getItem(USERSIGNUPDATE_KEY);
}

// Get signed-in user's sign up date field from local storage
function getIndex() {
  return localStorage.getItem(USERINDEX_KEY);
}

// Delete all signed-in user's individual data field in local storage
function removeUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(USEREMAIL_KEY);
  localStorage.removeItem(USERPASSWORD_KEY);
  localStorage.removeItem(USERSIGNUPDATE_KEY);
  localStorage.removeItem(USERINDEX_KEY);
}

// Get the reviews array from local storage
function getReviews() {
  // Extract reviews from local storage.
  const data = localStorage.getItem(REVIEWS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

// Add user's review into local storage including the username, movie title, rating and comment
function addNewReview(username, title, rating, comment) {
  const reviews = getReviews();
  const movies = getMovies();

  // Push new review object into reviews array
  reviews.push({
    username: username,
    movie: title,
    rating: rating,
    comment: comment
  });

  // Update movie average rating and increment rating counter
  for(const movie of movies) {
    if(movie.title === title) {
      // Set the total rating = average rating * rating count
      movie.averageRating = movie.averageRating * movie.ratingCount;
      // Add new rating into total rating
      movie.averageRating +=  rating;
      // Increment rating count
      movie.ratingCount++;
      // Calculate average rating = total rating / rating count
      movie.averageRating =  movie.averageRating / movie.ratingCount;
      break;
    }
  }

  // Set reviews array into local storage.
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  // Set movies array into local storage.
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

// update review's comment and rating into local storage
function editReview(newRating, newComment, postIndex) {
  const reviews = getReviews();
  const movies = getMovies();
  var movieName = null;
  var previousRating = null;

  // Update current review object
  for(const review of reviews) {
    if (reviews.indexOf(review) === postIndex) {
      //Intialise movieName variable with the review.movie
      movieName =  reviews[postIndex].movie;
      //Intialise previousRating variable with the review.rating
      previousRating = reviews[postIndex].rating;

      // Set new rating and comment for the current review object
      reviews[postIndex].rating = newRating;
      reviews[postIndex].comment = newComment;   
      break;
    }
  }

  // Update movie average rating
  for(const movie of movies) {
    if(movie.title === movieName) {
      // Set the current total rating = (average rating * rating count) -  previous rating
      movie.averageRating = (movie.averageRating * movie.ratingCount) - previousRating;
      // Add new rating into total rating
      movie.averageRating +=  newRating;
      // Calculate average rating = total rating / rating count
      movie.averageRating =  movie.averageRating / movie.ratingCount;
      break;
    }
  }

  // Set reviews array into local storage.
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  // Set movies array into local storage.
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

// Remove review from local storage
function deleteReview(currUsername, currMovieTitle, currRating, currComment) {
  const reviews = getReviews();
  const movies = getMovies();

  // Delete current review object from reveiws array
  for(const review of reviews) {
    if(currUsername === review.username && currMovieTitle === review.movie && currRating === review.rating && currComment === review.comment)
    {
      const postIndex = reviews.indexOf(review);
      reviews.splice(postIndex, 1);
      break;
    }
  }

  // Update movie average rating
  for(const movie of movies) {
    if(movie.title === currMovieTitle) {
      // Set the current total rating = (average rating * rating count) -  current rating
      movie.averageRating = (movie.averageRating * movie.ratingCount) - currRating;
      // Decrement rating count
      movie.ratingCount--;
      // Calculate average rating
      if (movie.ratingCount === 0) {
        movie.averageRating = 0;
      }
      else {
        movie.averageRating =  movie.averageRating / movie.ratingCount;
      }
      break;
    }
  }

  // Set reviews array into local storage.
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  // Set movies array into local storage.
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

export {
  initMovies,
  initUsers,
  initReviews,
  sortMovies,
  getMovies,
  getReviews,
  addNewReview,
  editReview,
  deleteReview,
  verifyUser,
  addNewUser,
  updateUser,
  deleteUser,
  getUser,
  getEmail,
  getPassword,
  getSignUpDate,
  getIndex,
  removeUser
}
