from fastapi.testclient import TestClient

from app.core.config import API_V1_PREFIX


def test_hello(client: TestClient) -> None:
    """
    Test hello end point
    """
    response = client.get(f"/{API_V1_PREFIX}/hello")
    assert response.status_code == 200
    content = response.json()
    assert "message" in content
    assert content["message"] == "Hot Turbo Template API"


def test_health(client: TestClient) -> None:
    """
    Test health check endpoint
    """
    response = client.get(f"/{API_V1_PREFIX}/health")
    assert response.status_code == 200
    content = response.json()
    assert "message" in content
    assert content["message"] == "API is running & healthy"
