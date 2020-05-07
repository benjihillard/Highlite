# Team Name:
* Team Zeta

# Application Name:
* Highlite

# Semester:
* Spring 2020

# Overview:
Highlite is a web application that aims to assist those who have trouble reading due to Dyslexia, ADHD, and other cognitive disabilities. Highlite takes in PDFs as input and displays the text found in the document on a web page. The software creates an interactive page where the user can adjust the format of the text to the readability that best suits them. This includes changing font styles and colors, as well changing backgrounds to optimize text contrast. Highlite is a distraction free page that allows the user to highlight text by paragraph, sentence and even word by word. Users can toggle off these highlights at their own rate using keystrokes. Highlite ensures maximum readability of documents, even if it has to be read one word at a time.

# Team Members:
* Benjamin Hillard, Github: "benjihillard"
* Corey Sarkis, Github: "csarkis7"
* Alden Burgess, Github: "aldenburgess"

#User Interface
* Login Page:
  A place for users to login or sign up, and a place for user to drop thier files.
* Read page
  Displays the text of the dropped files, allows users to adjust setting of the
  text display such as font spacing, word spacing, line spacing and fontsize.
  In addtion users can choose font type and the colors of the text and background.
  Users can also choose a highlight color and how they want the text iterated by highliter.  
  Option include by word, sentance and paragraph.

# API
* /logout
  sends a request to the server to end the current users session
* /login
  sends a username to the server to be crossreferenced
  with the database then ties that username to a session
  so that the page can be customised to them
* /read/settingSave
  send a JSON of user settings to the server, if the user has a
  session running then there those settings will be stored in the
  database using there users username, else a signal will be sent down
  letting the user know they can only save when logged in
* /read/settingGet
  get setting is called automatically when a user goes to the read page
  is they have a session running, the server will grab them the settings
  associated with their username and send them down to be applyed
* /getSession
  return session information if a session is running
* /filedrop
  sends up a file to be parsed and reformated in the way it can be highlighted
* /read/getJSON
  asks for the parsed version of that file
* /signup
  send up a username to crossreferenced with the database, if the username
  doesnt already exist a new account will be created for them. a signal will
  be sent down to notify them they cannot use that username

# URL Routes/Mappings

![example image](api2.png)


# Database:
The Database has four functions:
* Put: which takes in X some JSON string and creates a new JSON object in the Database.
  This is user to place a JSON object with user: being a users username and settings:
  being some default setting asigned to the users
* Get: finds a users object based on the user name then returns their whole object including the settings
* Update: finds a object by user name and updates the users settings by the ones pasted by the parameters
* isfound: checks to see if a user exists in the data base returning true or false

# Division of Labor:

Corey Sarkis
* Worked on the HTML/CSS on read page
* Updated read page HTML: Sidebar setting options
* Updated read page JavaScript: storeSettings functionality
* Updated read page JavaScript: Alter displayed text based on settings
* Implemented settingsSave API: Send saved settings to server
* Updated spanify typescript file that parses text
* Properly set and stored parsed strings into a JSON object
* Tried to help with working on some of the background code

Alden Burgess
* Visual design
* Worked on the HTML/CSS on read page
* Implemented much of the read page javascript
* Added the functionality of swapping between word, sentence and paragraph highlighting
* Added the ability to change highlighted span
* Integrated spanify with read page
* Added database functionality for login, signup and default settings
* Implemented settingsGet API for retrieving JSON from the server
* Heroku Deployment

# Conclusion:
Overall, we found working on this project to be a decent experience. We all found the idea of the application we were creating to be interesting, so we were all motivated to put in the extra work required to make it polished and high quality. Probably the main difficulty we encountered was properly dividing the labor. Since everyone was supposed to contribute fairly equally to all aspects of the application, having a team member push their code and then pulling it to add to what they worked on is somewhat inconvenient and makes testing the code less straightforward. Through these struggles we learned a lot about collaborating through git. It was also necessary to learn the core web dev material; going into this project we knew relatively little about creating a website beyond HTML/CSS. When it comes to the design and implementation process, we definitely learned the value of refactoring existing code to improve consistency across multiple developers, and make sure that as we expand into new features our code doesn't devolve into an incomprehensible mess. As far as knowledge we wish we'd had before starting this project, we can all agree that having databases experience, even outside the realm of web development, would have made our lives significantly easier.
