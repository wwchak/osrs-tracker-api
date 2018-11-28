[![Build Status](https://travis-ci.com/osrs-tracker/osrs-tracker-api.svg?branch=master)](https://travis-ci.com/osrs-tracker/osrs-tracker-api)
# OSRS Tracker API
The API for OSRS Tracker.

## Endpoints

- [Icons](#icons)
  - [Get icon](#get-icon)
- [Items](#items)
  - [Get item](#get-item)
  - [Get items](#get-items)
- [Player](#player)
  - [Get player](#get-player)
  - [Insert player (deprecated)](#insert-player-deprecated)
- [News](#news)
  - [Get news post](#get-news-post)
  - [Get news posts](#get-news-posts)
  - [Upvote](#upvote)
  - [Downvote](#downvote)
- [Player](#player)
  - [Insert initial XP datapoint (deprecated)](#insert-initial-xp-datapoint-deprecated)
  - [Get XP datapoints for player](#get-xp-datapoints-for-player)

### Icons

#### Get icon

Endpoint: `GET /icon/:id`

Possible status codes: `200` and `404`.

Returns:
```
An 96x96 image in GIF format.
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
{
  username: string,
  playerType: PlayerType,
  deIroned: boolean,
  dead: boolean,
}
```

### News

#### Get news post

Endpoint: `GET /news/:id?uuid=[string]`

The `uuid` is used to check if the user has up or downvoted this post.

Possible status codes: `200`, `404` and `500`.

Returns:
```ts
NewsPost: {
  id: number,
  title: string,
  date: Date,
  category: string,
  content: string,
  upvotes: number,
  downvotes: number,
  vote: number
}
```

#### Get news posts

Endpoint: `GET /news?uuid=[string]&offset=[number]`

The `uuid` is used to check if the user has up or downvoted posts.

Possible status codes: `200`, `404` and `500`.

Returns:
```ts
NewsPosts: [{
  id: number,
  title: string,
  date: Date,
  category: string,
  content: string,
  upvotes: number,
  downvotes: number,
  vote: number
}, ...]
```

#### Upvote

Endpoint: `POST /news/upvote`

Possible status codes: `204` and `500`.

Expected payload:
```ts
{
  newsId: number,
  uuid: string
}
```

#### Downvote

Endpoint: `POST /news/downvote`

Possible status codes: `204` and `500`.

Expected payload:
```ts
{
  newsId: number,
  uuid: string
}
```

### XP

#### Insert initial XP datapoint (deprecated)

Endpoint: `POST /xp/:username/initialDatapoint`

Possible status codes: `204`, `403` and `500`.

Expected payload:
```ts
{
  username: string,
  xpString: string
}
```

#### Get XP datapoints for player

Endpoint: `GET /exp/:username(/:period)?offset=[number]`

The `period` route parameter is optional, defaults to `7`.

Possible status codes: `200`, `404` and `500`.

Returns:
```ts
XpDatapoints: [{
    date: Date,
    xpString: string
}, ...]
```
