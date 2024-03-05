from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class NewCommentForm(FlaskForm):
    comment_text = StringField('comment_text', validators=[DataRequired()])
    connection_id = IntegerField('connection_id', validators=[DataRequired()])
