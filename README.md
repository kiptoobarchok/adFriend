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
- Widgets for `Quotes`, `Top 3 urgent and important tasks` and `Eisenhower Matrix quadrant with tasks in each.`

# Screenshot of the extension
![Adfriend extension](./files/Screenshot%20from%202025-02-15%2000-36-37.png)

### Roadmap
1. `Phase 1` : Initial MVP development and testing
2. `Phase 2`: User feedback and feature enhancements
3. `Phase 3`: integrating AI and more customization tools and using more scalable tech stack


#### Techstack
- **_Frontend_** : (Html/css & Javascript for interactivity)
- **_Backend_** : JS
- **_API_**: quotable(for fetching random quotes), local storage(persist data), chrome extension API, Declarative net request API(intercept ads)


## Contributing
Contributions are welcome! To contribute:

- Fork the repo

- Create a feature branch (`git checkout -b feature-name`)

- Commit your changes (`git commit -m 'Added new feature'`)

- Push to your branch (`git push origin feature-name`)

- Open a **Pull Request**

# AUTHOR

<calebkiptoo9090@gmail.com> - KIPTOO CALEB