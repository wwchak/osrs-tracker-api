[![Build Status](https://travis-ci.com/osrs-tracker/osrs-tracker-api.svg?branch=master)](https://travis-ci.com/osrs-tracker/osrs-tracker-api)
# OSRS Tracker API
The API for OSRS Tracker.

## Endpoints

- [Player](#player)
  - [Get player](#get-player)
  - [Insert player](#insert-player-deprecated)
- [Items](#items)
  - [Get item](#get-item)
  - [Get items](#get-items)

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

Endpoint: `POST /player`

Possible status codes: `201`, `204` and `500`.

Expected payload:
```ts
Player: {
  username: string,
  playerType: PlayerType,
  deIroned: boolean,
  dead: boolean,
}
```

### Items

#### Get item

Endpoint: `GET /item/:id`

Possible status codes: `201`, `404` and `500`.

Returns:
```ts
Items: [{
  id: number,
  name: string,
  description: string,
  current: string,
  today: string
}]
```

#### Get items

Endpoint: `GET /item?query=[string]`

Possible status codes: `200`, `204` and `500`.

Returns:
```ts
Items: [{
  id: number,
  name: string,
  description: string,
  current: string,
  today: string
}, ...]
```
