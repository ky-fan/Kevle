from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class NewConnectionForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    categories = StringField('categories', validators=[DataRequired()])
    answers = StringField('answers', validators=[DataRequired()])
