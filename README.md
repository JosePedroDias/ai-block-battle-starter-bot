# AI Block Battle (starter bot)

* <http://theaigames.com/competitions/ai-block-battle>
* <http://theaigames.com/competitions/ai-block-battle/rules>
* <http://theaigames.com/competitions/ai-block-battle/getting-started>


engine/bot communication works via standard I/O


## engine -> bot

generic structure:

`settings [type] [value]`  
`action [type] [time]`  
`update [player] [type] [value]`

supported commands:

* `settings timebank t` -	Maximum time in milliseconds that your bot can have in its time bank
* `settings time_per_move t` -	Time in milliseconds that is added to your bot's time bank each move
* `settings player_names [b,...]` -	A list of all player names in this match, including your bot's name
* `settings your_bot b` -	The name of your bot for this match
* `settings field_width i` -	The width of the field, i.e. number of row-cells
* `settings field_height i` -	The height of the field, i.e. number of column-cells
* `update game round i` -	The number of the current round
* `update game this_piece_type s` -	The type of the piece that has just spawned on the field
* `update game next_piece_type s` -	The type of the piece that will spawn the next round
* `update game this_piece_position i,i` -	The starting position in the field for the current piece (top left corner of the piece bounding box)
* `update b row_points i` -	The amount of row points the given player has scored so far
* `update b combo i` -	The height of the current combo for the given player
* `update b field [[c,...];...]` -	The complete playing field of the given player
* `action moves t` - Request for the whole set of moves for this round



## bot -> engine

list of moves separated by commas

`left`
`right`
`turnleft`
`turnright`
`down`
`drop`
`no_moves`


## pieces

### I

```
....
OOOO
....
....
```

### J

```
..O
OOO
...
```

### L


```
O..
OOO
...
```

### O

```
OO
OO
```

### S

```
.OO
OO.
...
```

### T

```
.O.
OOO
...
```

### Z

```
OO.
.OO
...
```

## deployment

* add `//__main__` comment to main loop
* send as zip without top directory
* according to the FAQ, stderr is ignored but logged


## introspection

* [match on player](http://theaigames.com/competitions/ai-block-battle/games/55b6d0801c687b361d5ba3ff)
* [match data](http://theaigames.com/competitions/ai-block-battle/games/55b6d0801c687b361d5ba3ff/data)
* [match dump](http://theaigames.com/competitions/ai-block-battle/games/55b6d0801c687b361d5ba3ff/dump)
* [match raw dump](http://theaigames.com/competitions/ai-block-battle/games/55b6d0801c687b361d5ba3ff/rawdump)


## to test the bot against the rawdump

    node main.js < rawdump


## ROADMAP

* [x] working bot
* [x] interpret given state
* [ ] support applying possible actions to given state
* [ ] compare internal representation with next round state
* [ ] estimate basic strategy to make lines
* [ ] replicate hosting app locally (shouldn't be hard)
