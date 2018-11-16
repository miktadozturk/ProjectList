# ProjectList

**Features Overview**

* Create Named "Projects" that can each hold their own list of "ProList".

* Remove "Projects" when desired.

* Create "ProList" inside "Projects" with their own names, descriptions, and due dates.

* Mark "ProList" as complete and remove them at will.

* Works with localStorage so your "Projects" and "To-Dos" are stored and remembered by the browser.

**Making a new Project**

If the user does not have any projects loaded in, the app will generate a default project that the user can you can place their ProList in.

At the top of the app, there is a small form labeled **Add New Project**.

If this form is not filled out completley, a prompt will appear, telling the user to fillin the incomplete fields.

If the form is complete, the app will create a new JS object for the project and push that object into an array of projects. It will render the full list of projects and any ProList it might have.

**Using the Project Interface**

If there are no ProList's in a project when the project is rendered, the interface will display the Project name and the description.

This data is retrieved from the JS object that was created when the **Add New Project** form was submitted.

There will also be a generated form, that allows a user to add a new ProList to that particular project. The app checks for all required fields and if satisfied, will create a ProList Object and push it into a property of the Project Object.

From there, it will print and render that new ProList in a section just below the Add ProList form.

The Project Interface also has two other buttons, the **Show/Hide Project Button** and the **Delete Project** button.

**Show/Hide**

This will hide the contents of the project and only display the project title, description, Show button, and Delete buttons.

This works by toggling a class that hides certain elements.

The class is toggled again when the button labelled Show Project is clicked, showing the project as it was before.

**Delete**

This will delete the current project.

A prompt appears to ensure that the action is desired. If a user clicks 'YES', the project is removed from the array of projects, and the app re-renders with the deleted project out of the picture.

**Using the ProList**

Each ProList that is rendered displays the Name, Description, Date Due, Complete Button, and Delete Button.

The Complete button marks the task as 'Complete'.

This toggles a property within the ProList object and adds a class to show the ProList as Green (or Complete).

The Delete button removes the task from the project.

This removes the ProList from the project object's ProList array and re-renders to update the display.

**Local Storage**

The app works with localStorage to store and remember the projects and ProList's the user has. The app also remembers whether or not certain projects were collapsed or certain tasks were completed.

**Made With**

* HTML

* CSS

* Javascript

* JQuery
