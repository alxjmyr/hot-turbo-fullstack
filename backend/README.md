# Hot Turbo Backend

* Rest Service using python + FastAPI
    * To use install `python3.12.x` & `poetry`
        * run `poetry install` in this directory to install dependencies
    * To Upgrade DB Version in Alembic
        * run `alembic revision --autogenerate` inside app directory to create revision version
        * run `alembic upgrade head` inside app directory w/ db running locally to upgrade db w/ changes

To Do
* build update user endpoint
    * check for duplicate emails on update

