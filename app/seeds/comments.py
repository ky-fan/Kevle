from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comments = [
        Comment(user_id=2, connection_id=1, comment_text="I think this game is very fun!"),
        Comment(user_id=3, connection_id=1, comment_text="My connections grid is way better..."),
        Comment(user_id=4, connection_id=1, comment_text="This one is way too easy"),
        Comment(user_id=2, connection_id=2, comment_text="What do the numbers mean?"),
        Comment(user_id=2, connection_id=3, comment_text="Another numbers grid???"),
        Comment(user_id=2, connection_id=7, comment_text="I can't believe you made this in 5 minutes!"),
        Comment(user_id=3, connection_id=7, comment_text="I don't know, it just came to me"),
        Comment(user_id=4, connection_id=7, comment_text="I'm going make one too!")
    ]

    db.session.add_all(comments)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
