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
let resourceRef = db.ref('resourcess');


const Login = {
    template: '#login-template',
    data: function() {
        return {
            email: '',
            password: ''
        }

    },
    methods: {
        login: function(e) {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                function(user) {
                    alert('You are now logged in')
                }, 
                function(err) {
                    alert('Invalid username/password')
                    this.password=''
                })
        }

    }
}
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
        addSkill: function(e) {
            e.preventDefault()
            skillRef.push({'value': this.newskill})
        this.newskill = ''
        }

    }
}
const Resource = {
    template: '#resource-template',
    data: function () {
        return {
            newResource: {name:'', email: '', manager: '', availableDate: '', skills:[]}
        }
    },
    firebase: function () {
        return {
            skills: skillRef,
            resources: resourceRef
        }
    },
    methods: {
        addResource: function(e) {
            e.preventDefault()
            resourceRef.push(Object.assign({}, this.newResource)),
            this.newResource = {name:'', email: '', manager: '', availableDate: '', skills:[]}
        }
    }
}
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
var signOut = function() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut().then(
            function(user) {
                console.log('You are now signed out')
            }, 
            function(err) {
                alert('Failed to signout')
            })
    }
    return '/login'

}
var router = new VueRouter({
    routes: [
        {path: '/skills', component: Skill, meta: {requiresAuth: true}},
        {path: '/resources', component: Resource, meta: {requiresAuth: true}},
        {path: '/projects', component: Project, meta: {requiresAuth: true}},
        {path: '/login', component: Login, nanem: 'login'},
        {path: '/signout'},
        {path: '*', redirect: '/login'},
        {path: '/', redirect: '/login'}
    ]
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    if (currentUser && to.path === '/signout') {
        signOut()
        next('login')
    } else { 
        let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        if (requiresAuth && !currentUser) next('login')
        else next()
    } 
})

new Vue({
    el: "#bench-app",
    router,
    methods: {
        signOut: function(e) {
            firebase.auth().signOut().then(
                function(user) {
                    console.log('You are now signed out')
                }, 
                function(err) {
                    alert('Failed to signout')
                })
            }
        }

})