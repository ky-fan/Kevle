from flask import Blueprint, request
from app.models import Connection, db
from flask_login import current_user, login_required
from ..forms import NewConnectionForm

connection_routes = Blueprint('connections', __name__)

@connection_routes.route('/')
def connections_index():
    """Get basic display information for all Connections games."""
    connections = Connection.query.order_by(Connection.id.desc()).all()
    return {'connections':[connection.to_dict_index_info() for connection in connections]}

@connection_routes.route('/<int:connection_id>')
def connection_details(connection_id):
    """Get detailed information for a Connections game."""
    connection = Connection.query.get(connection_id)
    if (not connection):
        return {"message": "Connections game not found"}
    return connection.to_dict()

@connection_routes.route('/users/<int:user_id>')
def user_connections_index(user_id):
    """Get basic display information for all Connections games belonging to a user."""
    connections = Connection.query.filter(Connection.user_id == user_id).order_by(Connection.id.desc()).all()
    if (not connections):
        return {"message": "User connections not found"}
    return {'connections': [connection.to_dict_index_info() for connection in connections]}

@connection_routes.route('/', methods = ['POST'])
@login_required
def create_new_connection():
    """Create a new Connections game"""
    form = NewConnectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            "user_id": current_user.id,
            "title": form.data["title"],
            "categories": form.data["categories"],
            "answers": form.data["answers"]
        }
        new_connection = Connection(**params)
        db.session.add(new_connection)
        db.session.commit()
        return new_connection.to_dict()

    return form.errors, 401

@connection_routes.route('/<int:connection_id>', methods = ['PUT'])
@login_required
def update_connection(connection_id):
    """Update a Connections game by id"""
    connection = Connection.query.get(connection_id)
    if (not connection):
        return {"message": "Connections game not found"}

    if current_user.id != connection.user_id:
        return {"error": "You are not the owner of this Connections game",
                "currentUser": current_user.id,
                "connectionAuthor": connection.user_id}, 401

    form = NewConnectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        connection.title = form.data['title']
        connection.categories = form.data['categories']
        connection.answers = form.data['answers']

        db.session.commit()
        return connection.to_dict()

    return form.errors, 401

@connection_routes.route('/<int:connection_id>', methods = ['DELETE'])
@login_required
def delete_connection(connection_id):
    """Delete a Connections game by id"""
    connection = Connection.query.get(connection_id)

    if (not connection):
        return {"message": "Connections game not found"}

    if current_user.id != connection.user_id:
        return {"error": "You are not the owner of this Connections game",
                "currentUser": current_user.id,
                "connectionAuthor": connection.user_id}, 401

    db.session.delete(connection)
    db.session.commit()

    return {'message': 'Successfully deleted!'}
