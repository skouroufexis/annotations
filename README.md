# Project Outline

Frontend: ReactJS

Backend: Django

Database: PostgreSql

# Database setup
Database can be set up in the **settings.py** file. Following is the setup for PostgreSql
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'Database Name'
        'USER': 'username',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}
```
# Routes
>/uploadFile/

Uploads Image to Database. POST method

>/getFiles/

Retrieves all image records from Database. GET method

>/deleteFile/

Deletes a single record from database based on record id. POST method

>/updateFile/

Modifies a single record in the database. POST method
    
# Python version
The project uses python 3

# Migrations
Before running the server, make the migrations by running:
>python manage.py makemigrations

and

>python manage.py migrate

# Activate virtual environment
Before running the server, activate the virtual environment by running
>source venv/bin/activate

# Start the React server
On the root directory run
>npm start

# Start the backend server
From the root directory navigate to venv/backend. Then run:
>python manage.py runserver

# Application url
The application runs on http://localhost:3000


