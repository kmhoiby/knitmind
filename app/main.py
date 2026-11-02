from fastapi import FastAPI

app = FastAPI(
    title = "KnitMind API"
)

@app.get("/")
def root():
    return{
        "message": "KnitMind API running"
    }