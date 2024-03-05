from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    connection_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('connections.id')), nullable=False)
    comment_text = db.Column(db.String(140), nullable=False)

    user = db.relationship("User", back_populates="comment")
    connection = db.relationship("Connection", back_populates="comment")

    def to_dict(self):
        return{
            'id': self.id,
            'userId': self.user_id,
            'connectionId': self.connection_id,
            'commentText': self.comment_text,
            'authorName': self.user.to_dict().get('username')
        }
