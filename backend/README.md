# TransparentProcure — Backend Infrastructure

This repository contains the FastAPI-driven backend for TransparentProcure, a civic-tech platform that monitors public procurement, detects procurement risk and fraud, and supports citizen oversight across Kenya's 47 counties.
The backend operates on a local SQLite database and features real-time analytic algorithms that cross-reference official procurement records with crowdsourced civic reports.

## Architecture & File Structure
The backend is intentionally lightweight and modular to enable rapid iteration and easy data management.

```text
backend/
├── transparent_procure.db        # Core SQLite Database containing all relational data
├── main.py                       # FastAPI application and HTTP route bindings
├── migrate_to_db.py              # Script to build/rebuild the SQLite DB from source JSON
├── README.md                     # This document
├── requirements.txt              # Python dependencies (FastAPI, Uvicorn, etc.)
├── data/                         # Legacy/Source JSON files (used for seeding the DB)
└── services/
    ├── __init__.py
    ├── data_loader.py            # SQLite database adapter and query layer
    ├── expand_data.py            # Data generation for the 47 counties (dev/testing)
    ├── reputation.py             # Risk Intelligence math engine (trust_score calculus)
    └── whistleblower.py          # Secure report intake & minimal audit trail
```

## Core Backend Logic
- **Data Model:** The application uses a persistent SQLite database (`transparent_procure.db`). Data logic is handled via `services/data_loader.py`, which securely queries the relational tables to expose read-only, normalized arrays for the endpoints.
- **Migration & Seeding:** The `migrate_to_db.py` script is used to convert and import the static JSON arrays in `/data` into the permanent SQLite tables. It handles strict typing and float conversion.
- **Event-Driven Cross-Referencing:** When new civic records are processed, the system cross-checks procurement records and contractors, calculating risk dynamically.
- **Stateless Engine:** `reputation.py` produces deterministic `trust_score` and `risk_level` outputs from the current dataset.

### Reputation & Risk Engine (services/reputation.py)

The reputation engine computes live `trust_score` values (0–100) and a categorical `risk_level` for both contractors and counties using weighted penalties:
- **Stalled Projects:** Projects marked `Stalled` apply a significant negative weight to the associated contractor and county.
- **Price Anomalies:** A penalty triggers when `tender_value / benchmark_value > 1.5` (configurable multiplier).
- **Citizen Oversight:** Geo-tagged civic posts marking abandonment, delay, or safety issues add a citizen-derived penalty and attach a `citizen_flag` to the tender.
- **Chronic Pending Payments:** Any unpaid invoice older than 180 days is treated as a chronic liability and strongly penalizes the responsible county and affects contractor liquidity/risk indicators.

The engine is intentionally transparent and deterministic so each penalty's contribution can be audited.

### Risk Cross-Referencing

- Tenders automatically surface derived tags: `price_anomaly`, `citizen_flag`, and `chronic_pending`.
- Contractor records returned via `GET /contractors` include `trust_score`, `risk_level` (Low / Medium / High / Blacklist), and a short explanation array specifying which rules affected the score.

### Whistleblower Intake (services/whistleblower.py)

- **Designed for privacy:** Tips are processed with minimal metadata. The service avoids storing unnecessary PII and emits audit events for authorized operators.
- The intake is intentionally simple in the MVP — for production, swap to an encrypted, access-controlled store.

## API Endpoints (High Level)

- `GET /tenders` — Paginated list of procurement projects. Supports filters: `county`, `category`, `status`. Each tender includes derived risk tags.
- `GET /tender/{id}` — Full tender record with risk annotations and linked citizen posts.
- `GET /contractors` — Contractor registry enhanced with `trust_score` and `risk_level`.
- `GET /posts` — Civic feed (geo-tagged crowd reports).
- `GET /payments` — Invoice ledger view; unpaid invoices older than 180 days are flagged as `chronic_pending`.

Internally, endpoints call `services/data_loader.py` for consistent dataset views and `services/reputation.py` to inject live signals.

## Setup & Execution

**Prerequisites:**
- Python 3.10+ (virtual environment recommended)

**Installation:**
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Database Setup/Reset:**
If you need to rebuild the database from the original data schemas:
```bash
python migrate_to_db.py
```

**Running the Server (Development):**
```bash
python -m uvicorn main:app --port 3001 --reload
```
The API will be available at http://localhost:3001 and the Swagger UI at http://localhost:3001/docs.

## Security & Scalability

- **MVP Security Posture:** Minimized exposure and local storage; whistleblower routing is recorded with minimal metadata.
- **For Production:** Add encryption-at-rest for whistleblower and sensitive records, role-based access controls, an audit log, and rate-limiting on intake endpoints. Migrate SQLite to a managed PostgreSQL cluster.

-- The TransparentProcure backend team
