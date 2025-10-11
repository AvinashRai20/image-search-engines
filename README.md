
# Image Search Engine

> README for a simple, production-ready Image Search Engine project.

## Overview

This repository contains an Image Search Engine that lets you index images and search them by visual similarity and metadata. It includes a lightweight web UI, a REST API, a CLI for indexing, and utilities for preprocessing images.

## Features

* Index local image folders, external image URLs, or CSV manifests
* Visual similarity search using embeddings (e.g., CLIP, ViT) or handcrafted features
* Metadata and tag filtering (filename, tags, date, source)
* Thumbnail generation and caching
* Simple web UI for browsing/searching results
* REST API with JSON responses for integration
* Dockerized for easy deployment

## Architecture

* **Indexer**: walks files/feeds, extracts embeddings, stores metadata in an index (SQLite, Faiss, or Milvus)
* **Search service**: exposes REST endpoints to query the index
* **Web UI**: React/Vue single-page app that calls the REST API
* **Storage**: local filesystem or object storage for image assets; SQLite or vector DB for search index

## Quickstart

### Prerequisites

* Python 3.10+ (or Node.js for the UI)
* pip or Poetry
* (Optional) Docker & Docker Compose

### Install

```bash
git clone https://github.com/yourname/image-search-engine.git
cd image-search-engine
python -m venv .venv
source .venv/bin/activate  # or .\.venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Environment

Copy `.env.example` to `.env` and fill the values:

```
# .env
DATABASE_URL=sqlite:///data/index.db
IMAGE_STORE=./data/images
EMBEDDING_MODEL=clip-vit-base-patch32
THUMBNAIL_SIZE=256
VECTOR_BACKEND=faiss
API_HOST=0.0.0.0
API_PORT=8000
```

### Build the index (example)

Index a folder of images:

```bash
python cli/index.py --source ./datasets/photos --recursive --batch-size 32
```

Index from a CSV manifest with metadata columns (path or url, title, tags):

```bash
python cli/index.py --manifest images.csv --batch-size 16
```

### Run locally

Start the API server:

```bash
uvicorn app.main:app --host $API_HOST --port $API_PORT --reload
```

Start the web UI (if provided):

```bash
cd web
npm install
npm run dev
```

Or use Docker Compose:

```bash
docker compose up --build
```

## Usage

### REST API

* `POST /api/v1/index` — trigger indexing job or upload a single image
* `GET /api/v1/search?q=<query>&k=10` — search by text + image (image upload via form), returns `k` nearest
* `POST /api/v1/search/image` — upload an image file and get visual nearest neighbors
* `GET /api/v1/image/<id>` — get image metadata and URLs

#### Example: search by image (curl)

```bash
curl -X POST "http://localhost:8000/api/v1/search/image?k=5" \
  -F "file=@/path/to/photo.jpg"
```

#### Example: search by text

```bash
curl "http://localhost:8000/api/v1/search?q=sunset+beach&k=8"
```

### CLI

* `cli/index.py` — build or update index from folders, CSVs, or URLs
* `cli/cleanup.py` — remove missing assets and rebuild thumbnails

## Indexing details

* Embeddings: the default uses a CLIP-style model to produce a fixed-size vector per image
* Vector store options: FAISS (local), SQLite + annoy, or Milvus for distributed
* Metadata stored in SQLite (id, filename, path/url, tags, created_at)
* Thumbnails: generated on indexing and stored at `${IMAGE_STORE}/thumbs`

## Filters & Advanced Queries

You can combine vector similarity with metadata filters (SQL):

* `q` and `k` — text or image query + number of neighbors
* `tags=cat,dog` — comma-separated tags
* `from_date=2023-01-01&to_date=2024-01-01` — date range

## Deployment

* Use Docker Compose to run the API and a chosen vector DB
* For production, prefer a managed vector database (Milvus, Pinecone) and object storage (S3)

### Example `docker-compose.yml` snippet

```yaml
version: '3.8'
services:
  api:
    build: .
    ports: ['8000:8000']
    env_file: .env
    volumes:
      - ./data:/app/data
  redis:
    image: redis:7
  faiss:
    image: some-faiss-image  # optional local faiss service
```

## Testing

Run unit tests:

```bash
pytest tests/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests and docs
4. Open a pull request

## Notes & Tips

* Use GPUs for faster embedding extraction (PyTorch + CUDA)
* If you only need quick prototyping, store vectors in SQLite using an Annoy index
* Monitor index size — embeddings (float32) can grow quickly; use compression or fp16 if supported

## Troubleshooting

* **No results**: ensure the index was built and `DATABASE_URL` points to the correct file
* **Slow searches**: check vector backend and use HNSW/IVF for large indexes

## License

MIT License — see `LICENSE` file.

## Contact

Maintainer: Your Name — [your.email@example.com](mailto:your.email@example.com)

---

*This README is a template. Edit sections to reflect your implementation details, models used, and deployment choices.*
