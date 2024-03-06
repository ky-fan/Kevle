from app.models import db, Connection, environment, SCHEMA
from sqlalchemy.sql import text

def seed_connections():
    connections = [
        Connection(user_id=2, title="Obvious Test", categories="Letters,Numbers,Colors,Shapes", answers="A,B,C,D,1,2,3,4,Red,Blue,Yellow,Green,Circle,Triangle,Square,Pentagon"),
        Connection(user_id=3, title="Obvious Test 2 - AsecNum", categories="Numbers 1-4,Numbers 5-8,Numbers 9-12,Numbers 13-16", answers="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"),
        Connection(user_id=4, title="Easy Number Test", categories="One,Two,Three,Four", answers="Piece,Liner,I,Uno,He,Zwei,Squared,Programming,Trois,Musketeers,Triad,boto,四,Connect,Seasons,IV"),
        Connection(user_id=2, title="NYT Connections #260", categories="BASIC TASTES,STAND UP TO (AS A CHALLENGE),ILK,ART MOVEMENTS (WITH -ISM)", answers="BITTER,SALTY,SOUR,SWEET,BRAVE,CONFRONT,FACE,MEET,KIND,SORT,TYPE,VARIETY,EXPRESSION,MANNER,ROMANTIC,SURREAL")
    ]

    db.session.add_all(connections)
    db.session.commit()


def undo_connections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.connections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM connections"))

    db.session.commit()
