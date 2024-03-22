from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    kevin = User(
        username='kyfn', email='kyfn@aa.io', password='kevpassword')
    cathy = User(
        username='fillercat', email='fillercat@aa.io', password='fillercat')
    changming = User(
        username='cmxu', email='cmxu@aa.io', password='password')
    NYT = User(
        username='NYT', email='nyt@aa.io', password='nytpassword'
    )
    thomas= User(
        username='thomashpark', email='thomashpark@aa.io', password='password'
    )

    db.session.add(demo)
    db.session.add(kevin)
    db.session.add(cathy)
    db.session.add(changming)
    db.session.add(NYT)
    db.session.add(thomas)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
