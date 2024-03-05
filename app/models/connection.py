from .db import db, environment, SCHEMA, add_prefix_for_prod

class Connection(db.Model):
    __tablename__ = 'connections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    categories = db.Column(db.String(255), nullable=False)
    answers = db.Column(db.String(255), nullable=False)

    user = db.relationship("User", back_populates="connection")
    comment = db.relationship('Comment', back_populates='connection', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'categories': self.categories.split(','),
            'answers': self.answers.split(','),
            'authorName': self.user.to_dict().get('username'),
            'numComments': len(self.comment)
        }

    def to_dict_index_info(self):
        return{
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'authorName': self.user.to_dict().get('username'),
            'numComments': len(self.comment)
        }
