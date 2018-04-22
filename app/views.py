from flask import render_template, redirect, request, url_for, flash
from app import app, models, db, login_manager
from .forms import TripForm, LoginForm, SignUpForm
from .models import *
from flask_login import current_user, login_user, logout_user
from app.models import User
from flask_login import login_required
from werkzeug.security import generate_password_hash, check_password_hash
