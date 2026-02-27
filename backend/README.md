# TransparentProcure — Backend Infrastructure

This repository contains the FastAPI-driven backend for TransparentProcure, a civic-tech platform that monitors public procurement, detects procurement risk and fraud, and supports citizen oversight across Kenya's 47 counties.
Instead of a traditional transactional database during this MVP phase, the backend operates on modular JSON datasets and real-time analytic algorithms that cross-reference official procurement records with crowdsourced civic reports.

##  Architecture & File Structure
The backend is intentionally lightweight and modular to enable rapid iteration and offline usage.

```text
backend/
├── data/
│   ├── contractors.json          # Registry of licensed vendors and KRA PINs
│   ├── payment.json              # Invoice ledger (tracks invoice date, paid status)
│   ├── posts.json                # Crowdsourced civic feed (geo-tagged reports)
│   ├── tender.json               # Official procurement records (budgets, status)
│   └── whistle_blower_logs.json  # Secure intake ledger for anonymous tips
├── main.py                       # FastAPI application and HTTP route bindings
├── README.md                     # This document
├── requirements.txt              # Python dependencies (FastAPI, Uvicorn, etc.)
└── services/
    ├── __init__.py
    ├── data_loader.py            # JSON I/O and normalized view layer
    ├── expand_data.py            # Data generation for the 47 counties (dev/testing)
    ├── reputation.py             # Risk Intelligence math engine (trust_score calculus)
    └── whistleblower.py          # Secure report intake & minimal audit trail

## Core Backend Logic
- Data model: JSON files live under `/data` and are loaded via `services/data_loader.py`. Services expose read-only, normalized views so the algorithmic core is database-agnostic.
- Event-driven cross-referencing: when new civic `posts` are processed, the system cross-checks `tender` records and `contractors`, injecting flags like `citizen_flag` and recalculating risk.
- Stateless engine: `reputation.py` produces deterministic `trust_score` and `risk_level` outputs from the current dataset — easy to port to a DB-backed service later.

### Reputation & Risk Engine (services/reputation.py)

The reputation engine computes live `trust_score` values (0–100) and a categorical `risk_level` for both contractors and counties using weighted penalties:
- Stalled Projects: Projects marked `Stalled` apply a significant negative weight to the associated contractor and county.
- Price Anomalies: A penalty triggers when `tender_value / benchmark_value > 1.5` (configurable multiplier).
- Citizen Oversight: Geo-tagged `posts.json` entries marking abandonment, delay, or safety issues add a citizen-derived penalty and attach a `citizen_flag` to the tender.
- Chronic Pending Payments: Any unpaid invoice older than 180 days is treated as a chronic liability and strongly penalizes the responsible county and affects contractor liquidity/risk indicators.

The engine is intentionally transparent and deterministic so each penalty's contribution can be audited. `reputation.py` returns structured metadata alongside numeric scores to explain why a score changed (useful for UI and audits).

### Risk Cross-Referencing

- Tenders automatically surface derived tags: `price_anomaly`, `citizen_flag`, and `chronic_pending`.
- Contractor records returned via `GET /contractors` include `trust_score`, `risk_level` (Low / Medium / High / Blacklist), and a short `explain` array specifying which rules affected the score.

### Whistleblower Intake (services/whistleblower.py)

- Designed for privacy: tips are appended to `whistle_blower_logs.json` with minimal metadata. The service avoids storing unnecessary PII and emits audit events for authorized operators.
- The intake is intentionally simple in the MVP — for production, swap to an encrypted, access-controlled store.

## API Endpoints (high level)

- GET `/tenders` — Paginated list of procurement projects. Supports filters: `county`, `category`, `status`. Each tender includes derived risk tags.
- GET `/tender/{id}` — Full tender record with risk annotations and linked citizen posts.
- GET `/contractors` — Contractor registry enhanced with `trust_score` and `risk_level`.
- GET `/posts` — Civic feed (geo-tagged crowd reports).
- GET `/payments` — Invoice ledger view; unpaid invoices older than 180 days are flagged as `chronic_pending`.

Internally, endpoints call `services/data_loader.py` for consistent dataset views and `services/reputation.py` to inject live signals.

##  Setup & Execution

Prerequisites

- Python 3.10+ (virtual environment recommended)

Installation

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Running the server (development)

```bash
uvicorn main:app --port 3001 --reload
```

The API will be available at http://localhost:3001 and the Swagger UI at http://localhost:3001/docs.

## Notes on Data & Portability

- Current storage: local JSON files for rapid iteration and easy review.
- Future production plan: swap `services/data_loader.py` to a DB-backed adapter (e.g., PostgreSQL). The reputation and business logic in `services/reputation.py` are adapter-agnostic and should require little-to-no change.

##  Security & Scalability

- MVP security posture: minimized exposure and local storage; whistleblower logs are recorded with minimal metadata.
- For production: add encryption-at-rest for whistleblower and sensitive records, role-based access controls, an audit log, and rate-limiting on intake endpoints.

 

-- The TransparentProcure backend team
