# AdFriend Extension

`Adfriend` - Productivity tool that intercepts ads and replaces them with helpful data helping one stay focused.

## Features

- `Eisenhower matrix` - Orgine tasks based on urgency and importance
- `Daily motivational quote` - Provide inspiration while browsing
- `Minimalist & Futuristic UI` - Designed for a sleek, engaging experience.
- `Add task form`- Insert tasks into each quadrant of the eisenhower matrix
- `Ad interception and replacement`- using declarative net request API

### Future additions
- seamless integration of reminders
- Customization to add advices based on personality tests (`16 personalities`, `pymatrix`)


#### Installation and Usage
1. Clone the repo
```
git clone https://github.com/kiptoobarchok/adFriend
```

2. Open Google chrome and navigate to `chrome://extensions/`
3. Enable _Developer mode_ on (Top right corner)
4. click "**load unpacked extensions**" and select `adFriend` folder

##### Working 
- Detect ad spaces on webpages and replace them
- Dynamic interactivity in adding tasks and management
- Data saved locally and managed via extension board
- Fetching quotes randomly and displaying them on default page with top 3 prioritized tasks
- Visually appealing UI

# Screenshot of the extension
![Adfriend extension](./files/Screenshot%20from%202025-02-15%2000-36-37.png)



#### Techstack
- **_Frontend_** : (Html/css & Javascript for interactivity)
- **_Backend_** : JS
- **_API_**: quotable(for fetching random quotes), local storage(persist data), chrome extension API, Declarative net request API(intercept ads)


