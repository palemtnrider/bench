/**
Bench vue components
**/

var localTags = [
    'foo',
    'bar'
]

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

var router = new VueRouter({
    routes: [
        {path:'/tags', component: Tag},
        {path:'/resources', component: Resource}
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