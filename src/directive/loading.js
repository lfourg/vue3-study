const loadingDirective = {
    mounted(el, binding, vnode) { },
    updated(el, binding) { },
    unmounted(el) { }
}

export default {
    install(app) {
        app.directive('loading', loadingDirective)
    }
}