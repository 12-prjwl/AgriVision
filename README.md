# AgriVision

Installation Steps:

A: Parent Directory

1. pip install virtualenv
2. virtualenv env_name
3. env_name/scripts/activate

B: Frontend Directory

1. npm install
2. npm run build
3. npm run dev

C: Backend Directory

1. pip install -r requirements.txt
2. python manage.py makemigrations
3. python manage.py migrate
4. python manage.py runserver
