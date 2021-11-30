## MySQL setup

To set up a SQL database, perform the following steps:

1. Download MySQL workbench (Put more things here)

2. Open MySQL workbench and create a new connection.
    - ![MySQL workbench home](/images/MySQL-setup-2.JPG)
    - Name the connection something appropriate and then left click the connection.

3. Run the following SQL codes to create the database with the correct settings.
    - CREATE DATABASE findchargers;
    - Use findchargers;
    - CREATE TABLE charger(
        id INTEGER NOT NULL UNIQUE PRIMARY KEY,
        address VARCHAR(100) NOT NULL,
        coordinate_long float,
        coordinate_lat float,
        email_address VARCHAR(100) NOT NULL,
        ac_1 BOOL,
        ac_2 BOOL,
        chademo BOOL,
        ccs BOOL,
        user_input VARCHAR(300)
    );

4. Now you will need 