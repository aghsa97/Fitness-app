Requirments
1) Download and setup MySQL server
2) Download and install Node.js
3) Install Express with the command "npm install express" in the vs code terminal
4) Install Express Sessions with the command "npm install express-session" in the vs code terminal
5) Install MySQL for Node.js withe the command "npm install mysql2" in the vs code terminal (mysql2 seems to have more functions than mysql)
6) Install Nodemon for Node.js with the command "npm install nodemon" in the vs code terminal

Express is a routing middleware. Its an easier way of routing different actions based on requested URL:s.

Express Session handles the session for the logged in user. When logged in, a session is created, and when logging out, the session is terminated.

Nodemon updates the server each time a save is made. This means that you dont have to restart the server each time you make a change. Very helpful for testing and UI design. 

-----HTML Structure-----
Use this shell structure for new HTML files
/*
<html>
    <%- include('../partials/head.ejs'); %>
    <body>
        <div class="wrapper">
            <%- include('../partials/nav.ejs'); %>
            <div class="content">
                PUT CONTENT HERE
                Example: Form, lists, etc.
                <form>
                    Your form
                </form>
            </div>
            <%- include('../partials/footer.ejs');
        </div>
    </body>
</html>
*/