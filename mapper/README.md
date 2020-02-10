# mapper
🗺 | Simple &amp; easy way to map and retrieve data from JSONs

# Usage 
```javascript
// Using
const fetch = require('directory/to/fetch.js');
const map = new fetch.map();

// Code
```
# Docs
### Setup
```javascript
const fetch = require('directory/to/fetch.js');
const map = new fetch.map();
```

### Basics

Returns a `JSON.parse` file. (Faster than `require`)
```javascript
map.json('file/path/to/json', 'encoding type');
```

Setting up the collection / returns a Map object
```javascript
map.collection(const/map.json/json, { key: 'name', value: 'name' });
```

Aliases within the key values (often set this to the final input when using \*.get) returns a key
```javascript
map.alias('text here', map/collection, { key: 'aliases/name' });
```

Retrieve data or true/false
```javascript
map.get('text here / input', map.collection, 'type', { key: 'name / title' });
```

Using the data
```javascript
if (data[1]) {
    console.log(data[0]);
} else {
    console.log(data[0]);
}
```
