/**
Bench vue components
**/

var localskills = [
    'Java',
    'C++'
]

var localProjects = []

const skill = {
    template: '#skill-template',
    data: function() {
        return {
            skills: localskills,
            newskill: ''
        }

    },
    methods: {
        addskill: function() {
            this.skills.push(this.newskill)
        this.newskill = ''
        }

    }
}
const Resource = {template: '<div>Resources</div>'}
const Project = {
    template: '#project-template',
    data: function () {
        return {
            projects: localProjects,
            newProject: {name:'', owner: '', desc: '', startDate: '', skills:[]},
            skills: localskills
        }
    },
    methods: {
        addProject: function() {
            localProjects.push(Object.assign({}, this.newProject)),
            this.newProject = {name:'', owner: '', desc: '', startDate: '', skills:[]}
        }
    }
}

var router = new VueRouter({
    routes: [
        {path:'/skills', component: skill},
        {path:'/resources', component: Resource},
        {path:'/projects', component: Project}
    ]
})

new Vue({
    el: "#bench-app",
    router
})