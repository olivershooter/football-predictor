from fastapi import FastAPI, HTTPException, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings
import httpx

class Settings(BaseSettings):
    api_key: str
    api_host: str = "v3.football.api-sports.io"

    class Config:
        env_file = ".env"

settings = Settings()
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def make_api_request(params: dict):
    headers = {
        "x-rapidapi-key": settings.api_key,
        "x-rapidapi-host": settings.api_host,
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                "https://v3.football.api-sports.io/fixtures",
                params=params,
                headers=headers
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"External API error: {str(e)}"
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Internal server error: {str(e)}"
            )

@app.get("/api/football/fixtures")
async def get_fixtures(
    request: Request,
    id: int = Query(None),
    league: int = Query(None),
    season: int = Query(None)
):
    params = dict(request.query_params)
    return await make_api_request(params)