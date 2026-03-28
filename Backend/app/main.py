from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routes import auth_routes, issue_routes

app = FastAPI()

app.include_router(auth_routes.router)
app.include_router(issue_routes.router)

app.mount("/uploads", StaticFiles(directory="app/static/uploads"), name="uploads")

@app.get("/")
def root():
    return {"message": "API running 🚀"}