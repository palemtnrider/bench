/**
Bench vue components
**/

var localTags = [
    'foo',
    'bar'
]

var localProjects = []

const Tag = {
    template: '#tag-template',
    data: function() {
        return {
            tags: localTags,
            newTag: ''
        }

    },
    methods: {
        addTag: function() {
            this.tags.push(this.newTag)
        this.newTag = ''
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
            skills: localTags
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
        {path:'/tags', component: Tag},
        {path:'/resources', component: Resource},
        {path:'/projects', component: Project}
    ]
})

new Vue({
    el: "#bench-app",
    router,
    data: {
        foobar: "I'm alive",
        tags: ['foo','bar'],
        newTag: ''

    },
    methods: {
        addTag: function() {
            this.tags.push(this.newTag)
            this.newTag = ''
        }
    }
})