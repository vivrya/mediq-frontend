"""Backend tests for Mediq waitlist endpoints."""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://study-smart-48.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


def _unique_email(tag="t"):
    return f"TEST_{tag}_{int(time.time()*1000)}_{uuid.uuid4().hex[:6]}@example.com"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# -------- /api/waitlist POST --------
class TestWaitlistCreate:
    def test_create_valid_entry(self, session):
        email = _unique_email("create")
        payload = {"email": email, "role": "ug", "source": "hero"}
        r = session.post(f"{API}/waitlist", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["email"] == email.lower()
        assert isinstance(data["position"], int) and data["position"] > 0
        assert data["already_registered"] is False

    def test_duplicate_returns_already_registered(self, session):
        email = _unique_email("dup")
        payload = {"email": email, "role": "pg", "source": "hero"}
        r1 = session.post(f"{API}/waitlist", json=payload, timeout=15)
        assert r1.status_code == 200
        assert r1.json()["already_registered"] is False

        r2 = session.post(f"{API}/waitlist", json=payload, timeout=15)
        assert r2.status_code == 200, r2.text
        d2 = r2.json()
        assert d2["already_registered"] is True
        assert d2["email"] == email.lower()
        assert d2["id"] == r1.json()["id"]

    def test_duplicate_case_insensitive(self, session):
        email = _unique_email("case")
        session.post(f"{API}/waitlist", json={"email": email.lower(), "role": "ug"}, timeout=15)
        r = session.post(f"{API}/waitlist", json={"email": email.upper(), "role": "ug"}, timeout=15)
        assert r.status_code == 200
        assert r.json()["already_registered"] is True

    def test_invalid_email_returns_422(self, session):
        r = session.post(f"{API}/waitlist", json={"email": "not-an-email", "role": "ug"}, timeout=15)
        assert r.status_code == 422, r.text

    def test_invalid_role_returns_422(self, session):
        r = session.post(
            f"{API}/waitlist",
            json={"email": _unique_email("badrole"), "role": "invalid_role"},
            timeout=15,
        )
        assert r.status_code == 422, r.text

    def test_role_other_default_works(self, session):
        email = _unique_email("default")
        r = session.post(f"{API}/waitlist", json={"email": email}, timeout=15)
        assert r.status_code == 200
        assert r.json()["already_registered"] is False


# -------- /api/waitlist/count GET --------
class TestWaitlistCount:
    def test_count_shape_and_offset(self, session):
        r = session.get(f"{API}/waitlist/count", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "count" in data and "display_count" in data
        assert isinstance(data["count"], int)
        assert isinstance(data["display_count"], int)
        assert data["display_count"] == data["count"] + 12400

    def test_count_increments_after_create(self, session):
        before = session.get(f"{API}/waitlist/count", timeout=15).json()["count"]
        email = _unique_email("inc")
        session.post(f"{API}/waitlist", json={"email": email, "role": "ug"}, timeout=15)
        after = session.get(f"{API}/waitlist/count", timeout=15).json()["count"]
        assert after == before + 1


# -------- Sanity: status & root --------
class TestRoot:
    def test_root(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"
