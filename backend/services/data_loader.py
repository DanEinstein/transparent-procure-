import sqlite3
import json
import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "transparent_procure.db")

def clean_numerical_value(value):
    """
    Standardizes currency strings into floats.
    """
    if isinstance(value, (int, float)):
        return float(value)
    if isinstance(value, str):
        sanitized = re.sub(r'[^\d.]', '', value)
        try:
            return float(sanitized) if sanitized else 0.0
        except ValueError:
            return 0.0
    return 0.0

def load_json(filename: str):
    """
    Mock function to maintain compatibility with existing codebase.
    Translates filename requests to database queries.
    """
    if not os.path.exists(DB_PATH):
        return []

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    result = []
    try:
        if "tender" in filename:
            cursor.execute("SELECT * FROM tenders")
            rows = cursor.fetchall()
            for r in rows:
                t = dict(r)
                t['is_demo_data'] = bool(t['is_demo_data'])
                if t.get('days_overdue') is None:
                    t.pop('days_overdue', None)
                if t.get('description') is None:
                    t.pop('description', None)
                result.append(t)
        elif "contractors" in filename:
            cursor.execute("SELECT * FROM contractors")
            rows = cursor.fetchall()
            for r in rows:
                c = dict(r)
                c['directors'] = json.loads(c['directors']) if c.get('directors') else []
                c['risk_flags'] = json.loads(c['risk_flags']) if c.get('risk_flags') else []
                c['is_demo_data'] = bool(c['is_demo_data'])
                result.append(c)
        elif "posts" in filename:
            cursor.execute("SELECT * FROM posts")
            rows = cursor.fetchall()
            for r in rows:
                p = dict(r)
                p['images'] = json.loads(p['images']) if p.get('images') else []
                p['is_demo_data'] = bool(p['is_demo_data'])
                p['author'] = {
                    "name": p.pop('author_name', None),
                    "avatar": p.pop('author_avatar', None),
                    "verified": bool(p.pop('author_verified', False))
                }
                result.append(p)
        elif "payment" in filename:
            cursor.execute("SELECT * FROM payments")
            rows = cursor.fetchall()
            for r in rows:
                p = dict(r)
                p['is_chronic'] = bool(p['is_chronic'])
                p['is_demo_data'] = bool(p['is_demo_data'])
                result.append(p)
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    finally:
        conn.close()

    return result

# Existing functions remain untouched to preserve Day 1/2 stability
def get_all_tenders():
    return load_json("tender.json")

def get_all_payments():
    return load_json("payment.json")

def get_all_contractors():
    return load_json("contractors.json")

# New Day 3 function for the Feed
def get_all_posts():
    return load_json("posts.json")