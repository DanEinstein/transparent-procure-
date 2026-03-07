import sqlite3
import json
import os
import re

def clean_numerical_value(value):
    if isinstance(value, (int, float)): return float(value)
    if isinstance(value, str):
        sanitized = re.sub(r'[^\d.]', '', value)
        return float(sanitized) if sanitized else 0.0
    return 0.0

def migrate():
    base_dir = os.path.dirname(__file__)
    data_dir = os.path.join(base_dir, 'data')
    db_path = os.path.join(base_dir, 'transparent_procure.db')
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Drop existing tables just to be sure
    cursor.execute("DROP TABLE IF EXISTS contractors")
    cursor.execute("DROP TABLE IF EXISTS tenders")
    cursor.execute("DROP TABLE IF EXISTS posts")
    cursor.execute("DROP TABLE IF EXISTS payments")

    # Create tables
    cursor.execute('''
    CREATE TABLE contractors (
        id TEXT PRIMARY KEY,
        name TEXT,
        kra_pin TEXT,
        reg_date TEXT,
        directors TEXT,
        phone TEXT,
        address TEXT,
        risk_flags TEXT,
        reputation_score INTEGER,
        is_demo_data BOOLEAN
    )
    ''')

    cursor.execute('''
    CREATE TABLE tenders (
        id TEXT PRIMARY KEY,
        title TEXT,
        county TEXT,
        category TEXT,
        value REAL,
        benchmark_value REAL,
        contractor_id TEXT,
        status TEXT,
        description TEXT,
        days_overdue INTEGER,
        is_demo_data BOOLEAN
    )
    ''')

    cursor.execute('''
    CREATE TABLE posts (
        id TEXT PRIMARY KEY,
        title TEXT,
        content TEXT,
        status TEXT,
        wardId TEXT,
        county TEXT,
        category TEXT,
        likes INTEGER,
        comments INTEGER,
        referenceId TEXT,
        author_name TEXT,
        author_avatar TEXT,
        author_verified BOOLEAN,
        timestamp TEXT,
        images TEXT,
        is_demo_data BOOLEAN
    )
    ''')

    cursor.execute('''
    CREATE TABLE payments (
        invoice_id TEXT PRIMARY KEY,
        entity_id TEXT,
        entity_name TEXT,
        amount REAL,
        status TEXT,
        days_outstanding INTEGER,
        is_chronic BOOLEAN,
        is_demo_data BOOLEAN
    )
    ''')

    # Insert Data - Contractors
    with open(os.path.join(data_dir, 'contractors.json')) as f:
        contractors = json.load(f)
        for c in contractors:
            cursor.execute('''
            INSERT INTO contractors (id, name, kra_pin, reg_date, directors, phone, address, risk_flags, reputation_score, is_demo_data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (c.get('id'), c.get('name'), c.get('kra_pin'), c.get('reg_date'), json.dumps(c.get('directors', [])), c.get('phone'), c.get('address'), json.dumps(c.get('risk_flags', [])), c.get('reputation_score'), c.get('is_demo_data', True)))

    # Insert Data - Tenders
    with open(os.path.join(data_dir, 'tender.json')) as f:
        tenders = json.load(f)
        for t in tenders:
            value = clean_numerical_value(t.get('value', 0))
            benchmark_value = clean_numerical_value(t.get('benchmark_value', 1))
            if 'value' in t and 'benchmark_value' not in t:
                benchmark_value = 1.0
            
            cursor.execute('''
            INSERT INTO tenders (id, title, county, category, value, benchmark_value, contractor_id, status, description, days_overdue, is_demo_data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (t.get('id'), t.get('title'), t.get('county'), t.get('category'), value, benchmark_value, t.get('contractor_id'), t.get('status'), t.get('description'), t.get('days_overdue'), t.get('is_demo_data', True)))

    # Insert Data - Posts
    with open(os.path.join(data_dir, 'posts.json')) as f:
        posts = json.load(f)
        for p in posts:
            author = p.get('author', {})
            cursor.execute('''
            INSERT INTO posts (id, title, content, status, wardId, county, category, likes, comments, referenceId, author_name, author_avatar, author_verified, timestamp, images, is_demo_data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (p.get('id'), p.get('title'), p.get('content'), p.get('status'), p.get('wardId'), p.get('county'), p.get('category'), p.get('likes'), p.get('comments'), p.get('referenceId'), author.get('name'), author.get('avatar'), author.get('verified'), p.get('timestamp'), json.dumps(p.get('images', [])), p.get('is_demo_data', True)))

    # Insert Data - Payments
    with open(os.path.join(data_dir, 'payment.json')) as f:
        payments = json.load(f)
        for p in payments:
            cursor.execute('''
            INSERT INTO payments (invoice_id, entity_id, entity_name, amount, status, days_outstanding, is_chronic, is_demo_data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (p.get('invoice_id'), p.get('entity_id'), p.get('entity_name'), clean_numerical_value(p.get('amount', 0)), p.get('status'), p.get('days_outstanding'), p.get('is_chronic'), p.get('is_demo_data', True)))

    conn.commit()
    conn.close()
    print("Migration successful")

if __name__ == '__main__':
    migrate()
