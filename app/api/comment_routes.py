from flask import Blueprint, request
from app.models import Comment, db
from flask_login import current_user, login_required
from ..forms import NewCommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def comments_index():
    """Get information for all Comments."""
    comments = Comment.query.order_by(Comment.id.desc()).all()
    return {'comments':[comment.to_dict() for comment in comments]}

@comment_routes.route('/<int:comment_id>')
def comment_by_id(comment_id):
    """Get information for a specific comment."""
    comment = Comment.query.get(comment_id)
    if (not comment):
        return {"message": "Comment not found"}
    return comment.to_dict()

@comment_routes.route('/users/<int:user_id>')
def user_comments_index(user_id):
    """Get information for all comments belonging to a user."""
    comments = Comment.query.filter(Comment.user_id == user_id).order_by(Comment.id.desc()).all()
    if (not comments):
        return {"message": "User comments not found"}
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/connections/<int:connection_id>')
def connection_comments_index(connection_id):
    """Get information for all comments belonging to a Connections game."""
    comments = Comment.query.filter(Comment.connection_id == connection_id).order_by(Comment.id.desc()).all()
    if (not comments):
        return {"message": "Connection comments not found"}
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/', methods = ['POST'])
@login_required
def create_new_comment():
    """Create a new comment"""
    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            "user_id": current_user.id,
            "connection_id": form.data["connection_id"],
            "comment_text": form.data["comment_text"]
        }
        new_comment = Comment(**params)
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return form.errors, 401

@comment_routes.route('/<int:comment_id>', methods = ['PUT'])
@login_required
def update_comment(comment_id):
    """Update a comment by id"""
    comment = Comment.query.get(comment_id)
    if (not comment):
        return {"message": "comment not found"}

    if current_user.id != comment.user_id:
        return {"error": "You are not the owner of this comment",
                "currentUser": current_user.id,
                "commentAuthor": comment.user_id}, 401

    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment_text = form.data['comment_text']

        db.session.commit()
        return comment.to_dict()

    return form.errors, 401

@comment_routes.route('/<int:comment_id>', methods = ['DELETE'])
@login_required
def delete_comment(comment_id):
    """Delete a comments by id"""
    comment = Comment.query.get(comment_id)

    if (not comment):
        return {"message": "comment not found"}

    if current_user.id != comment.user_id:
        return {"error": "You are not the owner of this comment",
                "currentUser": current_user.id,
                "commentAuthor": comment.user_id}, 401

    db.session.delete(comment)
    db.session.commit()

    return {'message': 'Successfully deleted!'}
