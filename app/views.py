from flask import render_template, redirect, request, url_for, flash
from app import app, models, db, login_manager
from .forms import LoginForm, SignUpForm
from .models import *
from flask_login import current_user, login_user, logout_user
from app.models import User
from flask_login import login_required
from werkzeug.security import generate_password_hash, check_password_hash


@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for(''))
    else:
        return redirect(url_for('login'))

@app.route('/signup', methods=['GET','POST'])
def signup():
    form = SignUpForm()
    if form.validate_on_submit():
        username = form.username.data
        email = form.email.data
        password = form.password.data
        user = getUserByUsername(username)
        # if username already exists
        if user is not None:
            flash("Username already exists. Please choose a different username.")
            return render_template('signup.html', title='Sign-Up', form=form)

        # if username doesn't already exist
        password_hash = generate_password_hash(password)
        create_user(username, email, password_hash)
        userID = getUserID(username)
        user = User(userID, username, email, password_hash)
        login_user(user)
        return redirect(url_for('index'))
    return render_template('signup.html', title='Sign-Up', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        checkUser = getUserByUsername(username)
        if checkUser is None or not check_password_hash(comparedUser.password_hash, password):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(comparedUser, remember = form.remember_me.data)
        return redirect(url_for('index'))
    return render_template('login.html', title='Log-In', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@login_manager.unauthorized_handler
def unauthorized_handler():
    return redirect(url_for('login'))
