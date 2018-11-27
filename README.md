[![Build Status](https://travis-ci.com/osrs-tracker/osrs-tracker-api.svg?branch=master)](https://travis-ci.com/osrs-tracker/osrs-tracker-api)
# OSRS Tracker API
The API for OSRS Tracker.

## Endpoints

- [Player](#player)
  - [Get player](#get-player)
  - [Insert player](#insert-player-deprecated)

### Player

#### Get player

Endpoint: `GET /player/:username`

Possible status codes: `200`, `404` and `500`.

Returns:
```ts
player: {
  username: string,
  playerType: PlayerType,
  deIroned: boolean,
  dead: boolean,
  lastChecked: Date,
}
```

#### Insert player (deprecated)

Endpoint: `POST /player/:username`

Expected payload:
```ts
player: {
  username: string,
  playerType: PlayerType,
  deIroned: boolean,
  dead: boolean,
}
```

Possible status codes: `201`, `204` and `500`.
