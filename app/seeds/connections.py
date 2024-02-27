from app.models import db, Connection, environment, SCHEMA
from sqlalchemy.sql import text

def seed_connections():
    connections = [
        Connection(user_id=2, title="Obvious Test", categories="Letters,Numbers,Colors,Shapes", answers="A,B,C,D,1,2,3,4,Red,Blue,Yellow,Green,Circle,Triangle,Square,Pentagon")
    ]

    db.session.add_all(connections)
    db.session.commit()


def undo_connections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.connections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM connections"))

    db.session.commit()
