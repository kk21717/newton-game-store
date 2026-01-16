# Newton Game Store

A video games catalogue application for browsing, searching, and managing video game entries.

## Project Structure

```
newton-web-store/
├── back-end/          # .NET 9 REST API
│   ├── src/
│   │   ├── Newton.GameStore.API            # Web API layer
│   │   ├── Newton.GameStore.Application    # Business logic & services
│   │   ├── Newton.GameStore.Domain         # Entities & interfaces
│   │   └── Newton.GameStore.Infrastructure # Data access & EF Core
│   └── tests/         # Unit tests
└── web-app/           # Angular 21 frontend
```

## Tech Stack

**Backend**
- .NET 9 / ASP.NET Core Web API
- Entity Framework Core 9 (SQL Server + In-Memory provider)
- Clean Architecture pattern
- Swagger/OpenAPI documentation

**Frontend**
- Angular 21 (standalone components)
- Bootstrap 5 + ng-bootstrap
- Bootstrap Icons

## Configuration

### Database

The API supports two database modes controlled via connection string in `appsettings.json`:

| Configuration | Behavior |
|---------------|----------|
| Connection string present | Uses SQL Server; database auto-created on startup |
| Connection string empty/missing | Uses in-memory database (data lost on restart) |

**Default connection string** (SQL Server):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=NewtonGameStore;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

To use in-memory mode, remove or clear the `ConnectionStrings` section.

## Default URLs

| Service | URL |
|---------|-----|
| API | http://localhost:5000 |
| Swagger UI | http://localhost:5000 |
| Frontend | http://localhost:4200 |

## Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18+)
- SQL Server (optional - can use in-memory mode)

### Run the API

```bash
cd back-end/src/Newton.GameStore.API
dotnet run
```

The API starts at `http://localhost:5000` with Swagger UI at the root.

### Run the Frontend

```bash
cd web-app
npm install
npm start
```

The app opens at `http://localhost:4200`.

## Features

- Browse video games catalogue with pagination
- Search by title, genre, or platform
- Add, edit, and delete entries
- Responsive UI with Bootstrap styling

## Screenshots

View the [Demo Gallery](https://htmlpreview.github.io/?https://github.com/kk21717/newton-game-store/blob/master/demo/index.html) for frontend screenshots.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/videogames` | List all (supports pagination) |
| GET | `/api/videogames/{id}` | Get by ID |
| GET | `/api/videogames/search?term=` | Search by title |
| GET | `/api/videogames/genre/{genre}` | Filter by genre |
| GET | `/api/videogames/platform/{platform}` | Filter by platform |
| POST | `/api/videogames` | Create new entry |
| PUT | `/api/videogames/{id}` | Update entry |
| DELETE | `/api/videogames/{id}` | Delete entry |

## License

MIT
