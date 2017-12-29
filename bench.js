/**
Bench vue components
**/

var config = {
    apiKey: "AIzaSyAcCSHtU-QIFgGF4ppysJX7I_QsVQnMMK4",
    authDomain: "bench-13481.firebaseapp.com",
    databaseURL: "https://bench-13481.firebaseio.com",
    projectId: "bench-13481",
    storageBucket: "",
    messagingSenderId: "414982338775"
  };
let app = firebase.initializeApp(config);
let db = app.database();
let skillRef = db.ref('skills');
let projectRef = db.ref('projects');


const Skill = {
    template: '#skill-template',
    data: function() {
        return {
            newskill: ''
        }

    },
    firebase: function() {
        return {
            skills: skillRef
        }
    },
    methods: {
        addskill: function(e) {
            e.preventDefault()
            skillRef.push({'value': this.newskill})
        this.newskill = ''
        }

    }
}
const Resource = {template: '<div>Resources</div>'}
const Project = {
    template: '#project-template',
    data: function () {
        return {
            newProject: {name:'', owner: '', desc: '', startDate: '', skills:[]}
        }
    },
    firebase: function () {
        return {
            skills: skillRef,
            projects: projectRef
        }
    },
    methods: {
        addProject: function(e) {
            e.preventDefault()
            projectRef.push(Object.assign({}, this.newProject)),
            this.newProject = {name:'', owner: '', desc: '', startDate: '', skills:[]}
        }
    }
}

var router = new VueRouter({
    routes: [
        {path:'/skills', component: Skill},
        {path:'/resources', component: Resource},
        {path:'/projects', component: Project}
    ]
})

new Vue({
    el: "#bench-app",
    router
})