# 5 NGÀY "VỌC" VỚI MOBILE APP

**To do:**
- Day 1: Planning & Researching
- Day 2: React + Ionic | Specification
- Day 3: Features + Components + Props (Build App)
- Day 4: Integrate + Science research
- Day 5: Documentation

## PLANNING
### DAY 1: Planning & Researching
**Task: **
1. Understand about React (What, How, Why, install, distinguish [feature.component.page])
2. How do ionic app with React Framework? - Weather app, Login&Register app
3. Firebase + React

### DAY 2: React + Ionic | Specification
**Task: **
1. Make the WeatherApp & Login-RegisterApp Specification 
2. Build WeatherApp
3. Build Login&RegisterApp
4. How to publish app to my mobile

### DAY 3: Features + Components + Props
**Task: **
1. Add features (possible)
2. Add Components (possible)
3. Add Props (possible)
4. Pratice 

### DAY 4: integrate + Science research
**Task: **
1. Specification
2. Analysic + Desgin
3. Coding
4. Testing


### DAY 5: Documentation
**Task:**
1. Overview the NCKH project
2. Overview React + Ionic
3. Detail the "App điểm danh" idea
4. Review module
5. Review applicability + reality

---------------------------------
## Researching

### React 

**What**
- Web Library
- front-end (majoyrity)

**Why (what I see)**
- utilities
- supported by JS libs
- can over the internet
- flexiable

**How work (core)** 
- JSX (JavaScript Syntax Extension) <-(basic)


**Install**
Requirement: 
- Download the Nodejs last version ( >= 8.0)
- NPX - Node Package Exec
- NPM - Node Package Manager

check create-react-app
```
npm --version create-react-app
```

Exist -> init a new project:
```
npx create-react-app <name-project>
```

finally -> run:
```
cd <name-project>
yarn start
```

and if(custome):
```
# goto /src 
del * # windows
rm -f * # Linux | MAC
```

### React Props
attributes(name=value) tagHTML -> function's parameters | class's attribute (props)

### React state
"State" - contain data | info (Component)


### React Components
Functions and Classes

### React Features
- JSX
- Virtual DOM
- Extension
- Performance
- Debugging
- One-way data binding


## DAY 2: How do Ionic + React

### How to

**Start project**

Before proceeding, make sure our computer have Nodejs, npm. After, turn on terminal:

```
npm install --global ionic [cordova | capacitor]
```


To start:
```
ionic start [name-project] [--type=angular|react|vue]
```

To run:
```
ionic serve
```


**Integrate**
If probably a react project then procee two command to it:
```
npm install @ionic/react
npm install @ionic/react-router
```