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

# Conclusion:
Our experience in working on this project was for the most part, decent one. We all found the idea of the application we were creating to be interesting. This caused us to put in a bit of extra work as we wanted to see the end product be something we enjoyed. Probably the main difficulty we encountered was properly dividing the labor. Since everyone was supposed to contribute fairly equally to all aspects of the application, having a team member push their code and then pulling it to add to what they worked on is somewhat inconvenient and makes testing the code less straightforward.